import { useState, useEffect, useCallback } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus } from "react-icons/fa";
import { galleryImages } from "../data/galleryData";
import "../styles/styles.css";

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // Keyboard navigation
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

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  const currentImg = lightboxIdx !== null ? galleryImages[lightboxIdx] : null;

  return (
    <>
      {/* Gallery section */}
      <section className="gallery-section" id="gallery">
        <div className="gallery-header">
          <h2>Safari Gallery</h2>
          <p>Moments from the wild &mdash; captured by our guides &amp; guests</p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, idx) => (
            <div
              className="gallery-item"
              key={image.src + idx}
              onClick={() => setLightboxIdx(idx)}
              tabIndex={0}
              role="button"
              aria-label={`View photo: ${image.caption}`}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setLightboxIdx(idx)}
            >
              <img
                src={image.thumb || image.src}
                alt={image.alt}
                loading={idx < 8 ? "eager" : "lazy"}
                fetchpriority={idx < 4 ? "high" : "auto"}
                decoding="async"
                width="480"
                height="320"
              />
              <div className="gallery-item-overlay" aria-hidden="true">
                <span className="gallery-item-caption">{image.caption}</span>
                <FaSearchPlus className="gallery-item-zoom-icon" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {currentImg && (
        <div
          className="gallery-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo lightbox: ${currentImg.caption}`}
          onClick={(e) => e.target === e.currentTarget && setLightboxIdx(null)}
        >
          {/* Previous */}
          <button
            type="button"
            className="lb-nav-btn lb-prev"
            onClick={() => setLightboxIdx((i) => Math.max(i - 1, 0))}
            disabled={lightboxIdx === 0}
            aria-label="Previous photo"
          >
            <FaChevronLeft /> Previous
          </button>

          {/* Close */}
          <button
            type="button"
            className="lb-close-btn"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close lightbox"
          >
            <FaTimes /> Close
          </button>

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

          {/* Image */}
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
                <span>{currentImg.category} &middot; {currentImg.date}</span>
              </div>
            </div>
          </div>

          {/* Counter */}
          <div className="lb-counter" aria-live="polite">
            {lightboxIdx + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
}
