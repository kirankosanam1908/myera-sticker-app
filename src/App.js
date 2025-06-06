// src/App.js
import React, { useState, useRef } from "react";
import CanvasStage from "./components/CanvasStage";
import StickerButton from "./components/StickerButton";
import "./App.css";

function App() {
  // State: array of { id, src, x, y }
  const [stickers, setStickers] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Ref to Konva Stage (for exporting)
  const stageRef = useRef(null);

  // Grid snapping size (40px). Set to 0 to disable.
  const GRID_SIZE = 40;

  // Three URLs for stickers (now pointing to public/images/*)
  const STICKER_URLS = [
    "/images/dragon.png", // from public/images/dragon.png
    "/images/fox.avif", // from public/images/fox.avif
    "/images/lion.jpg", // from public/images/lion.jpg
  ];

  /** Add a new sticker at default (50,50), then snap to grid if needed */
  const handleAddSticker = (src) => {
    let defaultX = 50;
    let defaultY = 50;

    if (GRID_SIZE > 0) {
      defaultX = Math.round(defaultX / GRID_SIZE) * GRID_SIZE;
      defaultY = Math.round(defaultY / GRID_SIZE) * GRID_SIZE;
    }

    const newSticker = {
      id: nextId,
      src,
      x: defaultX,
      y: defaultY,
    };

    setStickers((prev) => [...prev, newSticker]);
    setNextId((id) => id + 1);
  };

  /** Update a sticker’s x,y after drag */
  const handleDragEnd = (id, newX, newY) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, x: newX, y: newY } : s))
    );
  };

  /** Remove a sticker when double-clicked */
  const handleDeleteSticker = (id) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  /** Export the current canvas to PNG and trigger download */
  const handleDownload = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 1 });

    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <StickerButton
          imageSrc={STICKER_URLS[0]}
          label="Dragon"
          onClick={() => handleAddSticker(STICKER_URLS[0])}
        />
        <StickerButton
          imageSrc={STICKER_URLS[1]}
          label="Fox"
          onClick={() => handleAddSticker(STICKER_URLS[1])}
        />
        <StickerButton
          imageSrc={STICKER_URLS[2]}
          label="Lion"
          onClick={() => handleAddSticker(STICKER_URLS[2])}
        />

        <button className="download-button" onClick={handleDownload}>
          Download PNG
        </button>
      </div>

      <CanvasStage
        stickers={stickers}
        onDragEnd={handleDragEnd}
        onDoubleClick={handleDeleteSticker}
        stageRef={stageRef}
        gridSize={GRID_SIZE}
      />
    </div>
  );
}

export default App;
