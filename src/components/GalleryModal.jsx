import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1547970810-dc1eac37d174",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
];

export default function GalleryModal({ open, setOpen }) {
  const [index, setIndex] = useState(0);

  if (!open) return null;

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery-modal">
      <div className="gallery-overlay" onClick={() => setOpen(false)}></div>

      <div className="gallery-content">
        <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

        <img src={images[index]} alt="Gallery view" />

        <div className="gallery-controls">
          <button onClick={prev}>⟵ Prev</button>
          <button onClick={next}>Next ⟶</button>
        </div>
      </div>
    </div>
  );
}