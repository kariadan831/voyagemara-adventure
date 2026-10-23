import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight, FaCamera } from "react-icons/fa";
import { galleryImages, GALLERY_CATEGORIES } from "../data/galleryData";
import "./GalleryPage.css";

// ── How many cards to show per page ──────────────────────────────
const PAGE_SIZE = 20;

// Insert a "VIEW EXPERIENCE" promo card every N real cards
const PROMO_INTERVAL = 8;

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxIdx, setLightboxIdx] = useState(null); // index into filteredImages

  // ── Filtered images ──────────────────────────────────────────
  const filteredImages =
    activeFilter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  const shownImages = filteredImages.slice(0, visible);
  const hasMore = visible < filteredImages.length;

  // ── Keyboard navigation for lightbox ────────────────────────
  const handleKey = useCallback(
    (e) => {
      if (lightboxIdx === null) return;
      if (e.key === "ArrowRight") {
        setLightboxIdx((i) => Math.min(i + 1, filteredImages.length - 1));
      } else if (e.key === "ArrowLeft") {
        setLightboxIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Escape") {
        setLightboxIdx(null);
      }
    },
    [lightboxIdx, filteredImages.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // ── Lock body scroll when lightbox is open ───────────────────
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  // ── Reset visible count on filter change ─────────────────────
  const handleFilterChange = (cat) => {
    setActiveFilter(cat);
    setVisible(PAGE_SIZE);
    setLightboxIdx(null);
  };

  // ── Open lightbox from card index in shownImages ─────────────
  const openLightbox = (shownIdx) => {
    // shownIdx = index in shownImages, which maps 1:1 to filteredImages
    setLightboxIdx(shownIdx);
  };

  const currentImg = lightboxIdx !== null ? filteredImages[lightboxIdx] : null;

  // ── Build masonry grid items (cards + promo tiles) ───────────
  const gridItems = [];
  shownImages.forEach((img, i) => {
    if (i > 0 && i % PROMO_INTERVAL === 0) {
      gridItems.push({ type: "promo", key: `promo-${i}` });
    }
    gridItems.push({ type: "image", img, idx: i, key: img.src + i });
  });

  return (
    <div className="gallery-page">
      {/* ── Hero banner ─────────────────────────────────────── */}
      <div className="gallery-page-hero">
        <div className="gallery-hero-inner">
          <div className="gallery-hero-badge">
            <FaCamera /> Safari Photo Gallery
          </div>
          <h1>Moments from the Wild</h1>
          <p>Real photos from our Maasai Mara &amp; Kenya safaris — captured by our guides &amp; guests</p>
        </div>
      </div>

      {/* ── Filter bar ──────────────────────────────────────── */}
      <div className="gallery-filters-bar" role="toolbar" aria-label="Filter gallery by category">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`gallery-filter-btn${activeFilter === cat ? " active" : ""}`}
            onClick={() => handleFilterChange(cat)}
            aria-pressed={activeFilter === cat}
          >
            {cat}
          </button>
        ))}
        <span className="gallery-count-badge">{filteredImages.length} photos</span>
      </div>

      {/* ── Masonry grid ────────────────────────────────────── */}
      {shownImages.length === 0 ? (
        <div className="gallery-empty">No photos in this category yet. Check back soon!</div>
      ) : (
        <div className="gallery-masonry" role="list" aria-label="Safari photo gallery">
          {gridItems.map((item) => {
            if (item.type === "promo") {
              return (
                <Link key={item.key} to="/booking" className="gallery-promo-card" role="listitem" aria-label="Book your safari experience">
                  <div className="gallery-promo-icon">📸</div>
                  <div className="gallery-promo-label">View Experience</div>
                  <div className="gallery-promo-sub">Book your own safari →</div>
                </Link>
              );
            }
            const { img, idx } = item;
            return (
              <div
                key={item.key}
                className="gallery-card"
                role="listitem"
                tabIndex={0}
                aria-label={`Open photo: ${img.caption}`}
                onClick={() => openLightbox(idx)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openLightbox(idx)}
              >
                <span className="gallery-card-category">{img.category}</span>
                <img
                  src={img.thumb || img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  width="480"
                  height="320"
                />
                <div className="gallery-card-overlay">
                  <p className="gallery-card-caption">{img.caption}</p>
                  <div className="gallery-card-meta">
                    <FaCalendarAlt aria-hidden="true" />
                    <span>{img.date}</span>
                  </div>
                </div>
                <div className="gallery-card-zoom" aria-hidden="true">
                  <FaSearchPlus />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Load more ────────────────────────────────────────── */}
      {hasMore && (
        <div className="gallery-load-more-wrap">
          <button
            type="button"
            className="gallery-load-more-btn"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Load more photos ({filteredImages.length - visible} remaining)
          </button>
        </div>
      )}

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

          <div className="gallery-lightbox-inner" onClick={(e) => e.stopPropagation()}>
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
            onClick={() => setLightboxIdx((i) => Math.min(i + 1, filteredImages.length - 1))}
            disabled={lightboxIdx === filteredImages.length - 1}
            aria-label="Next photo"
          >
            Next <FaChevronRight />
          </button>

          {/* Counter */}
          <div className="lb-counter" aria-live="polite">
            {lightboxIdx + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
