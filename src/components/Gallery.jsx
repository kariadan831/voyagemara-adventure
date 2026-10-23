import { useState, useEffect, useCallback } from "react";
import { FaCalendarAlt, FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus } from "react-icons/fa";
import { galleryImages } from "../data/galleryData";
import "../styles/styles.css";

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // ── Keyboard navigation ───────────────────────────────────
  const handleKey = useCallback(
    (e) => {
      if (lightboxIdx === null) return;
      if (e.key === "ArrowRight") setLightboxIdx((i) => Math.min(i + 1, galleryImages.length - 1));
      else if (e.key === "ArrowLeft") setLightboxIdx((i) => Math.max(i - 1, 0));
      else if (e.key === "Escape") setLightboxIdx(null);
    },
    [lightboxIdx]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // ── Lock scroll when lightbox open ───────────────────────
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  const currentImg = lightboxIdx !== null ? galleryImages[lightboxIdx] : null;

  return (
    <>
      {/* ── Gallery section ─────────────────────────────────── */}
      <section className="gallery-section" id="gallery">
        <div className="gallery-header">
          <h2>Safari Gallery</h2>
          <p>Moments from the wild — captured by our guides &amp; guests</p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, idx) => (
            <div
              className="gallery-item"
              key={image.src + idx}
              onClick={() => setLightboxIdx(idx)}
              tabIndex={0}
              role="button"
              aria-label={`Open photo: ${image.caption}`}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setLightboxIdx(idx)}
            >
              <img
                src={image.thumb || image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                width="480"
                height="240"
              />
              <div className="gallery-item-zoom" aria-hidden="true">
                <FaSearchPlus />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {currentImg && (
        <div
          className="gallery-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo lightbox: ${currentImg.caption}`}
          onClick={(e) => e.target === e.currentTarget && setLightboxIdx(null)}
        >
          {/* Close */}
          <button
            type="button"
            className="lb-close-btn"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close lightbox"
          >
            <FaTimes /> Close
          </button>

          {/* Prev */}
          <button
            type="button"
            className="lb-nav-btn lb-prev"
            onClick={() => setLightboxIdx((i) => Math.max(i - 1, 0))}
            disabled={lightboxIdx === 0}
            aria-label="Previous photo"
          >
            <FaChevronLeft /> Previous
          </button>

          <div
            className="gallery-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-lightbox-img-wrap">
              <img
                key={currentImg.src}
                className="gallery-lightbox-img"
                src={currentImg.src}
                alt={currentImg.alt}
                loading="eager"
              />
              <div className="gallery-lightbox-caption">
                <strong>{currentImg.caption}</strong>
                <span>
                  <FaCalendarAlt style={{ marginRight: "0.3rem", verticalAlign: "middle" }} />
                  {currentImg.date} · {currentImg.category}
                </span>
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            type="button"
            className="lb-nav-btn lb-next"
            onClick={() => setLightboxIdx((i) => Math.min(i + 1, galleryImages.length - 1))}
            disabled={lightboxIdx === galleryImages.length - 1}
            aria-label="Next photo"
          >
            Next <FaChevronRight />
          </button>

          {/* Counter */}
          <div className="lb-counter" aria-live="polite">
            {lightboxIdx + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
}
