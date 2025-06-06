// src/components/StickerButton.js
import React from "react";
import "./StickerButton.css";

/**
 * Props:
 * - imageSrc: URL of the sticker PNG (e.g. placeholder.com)
 * - label: fallback text label (e.g. 'Lion')
 * - onClick: callback when the button is clicked
 */
export default function StickerButton({ imageSrc, label, onClick }) {
  return (
    <button className="sticker-button" onClick={onClick}>
      {imageSrc ? (
        <img src={imageSrc} alt={label} className="sticker-button__img" />
      ) : (
        <span className="sticker-button__label">{label}</span>
      )}
    </button>
  );
}
