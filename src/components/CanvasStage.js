import React from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import "./CanvasStage.css";

/**
 * Props:
 *   - stickers: Array of { id, src, x, y }
 *   - onDragEnd, onDoubleClick, stageRef, gridSize
 */
export default function CanvasStage({
  stickers,
  onDragEnd,
  onDoubleClick,
  stageRef,
  gridSize = 0,
}) {
  return (
    <div className="canvas-wrapper">
      <Stage width={600} height={400} ref={stageRef} className="canvas-stage">
        <Layer>
          {stickers.map((sticker) => (
            <DraggableSticker
              key={sticker.id}
              sticker={sticker}
              onDragEnd={onDragEnd}
              onDoubleClick={onDoubleClick}
              gridSize={gridSize}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

/**
 * The fix is right here: pass 'Anonymous' as second argument to useImage.
 */
function DraggableSticker({ sticker, onDragEnd, onDoubleClick, gridSize }) {
  // ⚠️ This must include 'Anonymous' to avoid tainting the canvas
  const [image] = useImage(sticker.src, "Anonymous");

  const handleDragEnd = (e) => {
    let newX = e.target.x();
    let newY = e.target.y();
    if (gridSize > 0) {
      newX = Math.round(newX / gridSize) * gridSize;
      newY = Math.round(newY / gridSize) * gridSize;
    }
    onDragEnd(sticker.id, newX, newY);
  };

  const handleDblClick = () => {
    onDoubleClick(sticker.id);
  };

  return (
    <KonvaImage
      image={image}
      x={sticker.x}
      y={sticker.y}
      width={100}
      height={100}
      draggable
      onDragEnd={handleDragEnd}
      onDblClick={handleDblClick}
    />
  );
}
