  import { useState, useEffect } from "react";
  import "./TourModal.css";

  export default function TourModal({ tour, onClose }) {
    const [current, setCurrent] = useState(0);

    // Hooks must come before any return
    useEffect(() => {
      if (!tour) return;

      const handleKeyDown = (e) => {
        switch (e.key) {
          case "Escape":
            onClose();
            break;

          case "ArrowRight":
            setCurrent((prev) => (prev + 1) % tour.gallery.length);
            break;

          case "ArrowLeft":
            setCurrent((prev) =>
              prev === 0 ? tour.gallery.length - 1 : prev - 1
            );
            break;

          default:
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [tour, onClose]);

    // Early return AFTER hooks
    if (!tour) {
      return null;
    }

    const nextImage = () => {
      setCurrent((prev) => (prev + 1) % tour.gallery.length);
    };

    const prevImage = () => {
      setCurrent((prev) =>
        prev === 0 ? tour.gallery.length - 1 : prev - 1
      );
    };

    return (
      <div
        className="tour-modal-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="tour-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>

          <div className="tour-gallery">
          <img
    src={tour.gallery[current]}
    alt={`${tour.title} ${current + 1}`}
    loading="eager"
    decoding="async"
    width="1200"
    height="800"
    draggable="false"
  />

            <button
              className="gallery-arrow left"
              onClick={prevImage}
              aria-label="Previous image"
            >
              ❮
            </button>

            <button
              className="gallery-arrow right"
              onClick={nextImage}
              aria-label="Next image"
            >
              ❯
            </button>

            <div className="thumbnail-row">
              {tour.gallery.map((image, index) => (
               <img
  src={image}
  alt={`${tour.title} thumbnail ${index + 1}`}
  loading="lazy"
  decoding="async"
  width="120"
  height="80"
  draggable="false"
  className={current === index ? "thumb active" : "thumb"}
  onClick={() => setCurrent(index)}
/>
              ))}
            </div>
          </div>

          <div className="tour-info">
            <span className="tour-category">{tour.category}</span>

            <h2>{tour.title}</h2>

            <div className="tour-rating">
              {"★".repeat(tour.rating)}
              {"☆".repeat(5 - tour.rating)}
            </div>

            <p>{tour.description}</p>

            <h3>Highlights</h3>

            <ul className="tour-highlights">
              {tour.highlights.map((item) => (
                <li key={item}>✔ {item}</li>
              ))}
            </ul>

            <div className="tour-footer">
              <span>📅 {tour.duration}</span>
              <strong>From ${tour.price}</strong>
            </div>

            <button className="book-btn">
              Book This Safari
            </button>
          </div>
        </div>
      </div>
    );
  }