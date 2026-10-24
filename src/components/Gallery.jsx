import { useState, useEffect, useCallback, useRef } from "react";
import { galleryImages } from "../data/galleryData";
import "../styles/styles.css";

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Keyboard navigation
  const handleKey = useCallback(
    (e) => {
      if (lightboxIdx === null) return;
      if (e.key === "ArrowRight") {
        setLightboxIdx((i) => (i + 1) % galleryImages.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIdx((i) => (i - 1 + galleryImages.length) % galleryImages.length);
      } else if (e.key === "Escape") {
        setLightboxIdx(null);
      }
    },
    [lightboxIdx]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Lock scroll & toggle lightbox-open class on body
  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("lightbox-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    };
  }, [lightboxIdx]);

  // Touch swipe support (left = next, right = prev)
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        // Swiped left -> Next
        setLightboxIdx((i) => (i + 1) % galleryImages.length);
      } else {
        // Swiped right -> Previous
        setLightboxIdx((i) => (i - 1 + galleryImages.length) % galleryImages.length);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentImg = lightboxIdx !== null ? galleryImages[lightboxIdx] : null;

  return (
    <>
      {/* ── Safari Gallery Section (Light background, 41 cards) ── */}
      <section className="gallery-section" id="gallery">
        <div className="gallery-header">
          <h2>Safari Gallery</h2>
          <p>Moments from the wild &mdash; captured by our guides &amp; guests</p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, idx) => (
            <div
              className="gallery-card"
              key={image.src + idx}
              onClick={() => setLightboxIdx(idx)}
              tabIndex={0}
              role="button"
              aria-label={`Open photo: ${image.caption || image.alt}`}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setLightboxIdx(idx)}
            >
              {/* Photo top (4/5 aspect ratio) */}
              <div className="gallery-photo-wrap">
                <img
                  src={image.thumb || image.src}
                  alt={image.alt || image.caption || "Maasai Mara Safari"}
                  loading="lazy"
                  decoding="async"
                  className="gallery-card-img"
                  width="400"
                  height="500"
                />
                {/* Purple gradient hover overlay */}
                <div className="gallery-photo-overlay" aria-hidden="true">
                  <div className="gallery-photo-overlay-content">
                    <svg
                      className="gallery-overlay-camera"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <span className="gallery-overlay-text">VIEW EXPERIENCE</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="gallery-card-footer">
                <svg
                  className="gallery-card-cal-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{image.date || image.caption || "Masai Mara · Oct 2025"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lightbox (100vh flex column, zero scrolling, blurred grid behind) ── */}
      {currentImg && (
        <div
          className="gallery-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo lightbox: Experience ${lightboxIdx + 1} of ${galleryImages.length}`}
          onClick={(e) => e.target === e.currentTarget && setLightboxIdx(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Button Row: Previous | Close | Next */}
          <div className="gallery-lightbox-header" onClick={(e) => e.stopPropagation()}>
            {/* Previous */}
            <button
              type="button"
              className="lb-btn lb-btn-prev"
              onClick={() => setLightboxIdx((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
              aria-label="Previous photo"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Previous</span>
            </button>

            {/* Close */}
            <button
              type="button"
              className="lb-btn lb-btn-close"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close lightbox"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span>Close</span>
            </button>

            {/* Next */}
            <button
              type="button"
              className="lb-btn lb-btn-next"
              onClick={() => setLightboxIdx((i) => (i + 1) % galleryImages.length)}
              aria-label="Next photo"
            >
              <span>Next</span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Centered Image (max 90vw, max 70vh, contain, border-radius 14px) */}
          <div className="gallery-lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <img
              key={currentImg.src}
              className="gallery-lightbox-img"
              src={currentImg.src}
              alt={currentImg.alt || currentImg.caption || "Safari photo"}
              loading="eager"
            />
          </div>

          {/* Bottom Counter Pill ("Experience X of 41") */}
          <div className="gallery-lightbox-footer" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-lightbox-counter-pill">
              Experience {lightboxIdx + 1} of {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}