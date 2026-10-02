import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./TourModal.css";

export default function TourModal({ tour, onClose }) {
  const [current, setCurrent] = useState(0);
  const closeButtonRef = useRef(null);

  const images = [...new Set([tour.cover, ...tour.gallery].filter(Boolean))];
  const itinerary = tour.itinerary ?? [];
  const bookingMessage = encodeURIComponent(
    `Hello VoyageMara, I would like to enquire about the ${tour.title}.`
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        setCurrent((previous) => (previous + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        setCurrent((previous) => (previous === 0 ? images.length - 1 : previous - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [images.length, onClose]);

  const nextImage = () => setCurrent((previous) => (previous + 1) % images.length);
  const prevImage = () => setCurrent((previous) => (previous === 0 ? images.length - 1 : previous - 1));

  return createPortal(
    <div
      className="tour-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${tour.title} safari details`}
    >
      <div className="tour-modal" onClick={(event) => event.stopPropagation()}>
        <button
          ref={closeButtonRef}
          className="tour-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close safari details"
        >
          <span aria-hidden="true">×</span> Close
        </button>

        <div className="tour-modal-content">
          <section className="tour-gallery" aria-label={`${tour.title} photo gallery`}>
            <div className="tour-gallery-main">
              <img
                src={images[current]}
                alt={tour.imageAlts?.[images[current]] ?? `${tour.title} safari photo ${current + 1}`}
                loading="eager"
                decoding="async"
                width="1200"
                height="800"
                draggable="false"
              />
              <span className="gallery-counter" aria-live="polite">
                {current + 1} / {images.length}
              </span>
              {images.length > 1 && (
                <>
                  <button className="gallery-arrow left" type="button" onClick={prevImage} aria-label="Previous photo">
                    <span aria-hidden="true">‹</span><span className="gallery-arrow-label">Previous</span>
                  </button>
                  <button className="gallery-arrow right" type="button" onClick={nextImage} aria-label="Next photo">
                    <span className="gallery-arrow-label">Next</span><span aria-hidden="true">›</span>
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="thumbnail-row" aria-label="Choose a safari photo">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    className={current === index ? "thumb active" : "thumb"}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Show photo ${index + 1}`}
                    aria-current={current === index ? "true" : undefined}
                  >
                    <img src={image} alt="" loading="lazy" decoding="async" width="120" height="80" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <div className="tour-info">
            <span className="tour-category">{tour.category} <span aria-hidden="true">·</span> {tour.duration}</span>
            <h2>{tour.title}</h2>
            <div className="tour-rating" aria-label={`${tour.rating} out of 5 stars`}>
              {"★".repeat(tour.rating)}{"☆".repeat(5 - tour.rating)}
            </div>
            <p className="tour-description">{tour.description}</p>

            <h3>Safari highlights</h3>
            <ul className="tour-highlights">
              {tour.highlights.map((item) => <li key={item}>{item}</li>)}
            </ul>

            {itinerary.length > 0 && (
              <section className="tour-itinerary" aria-labelledby="tour-itinerary-heading">
                <h3 id="tour-itinerary-heading">Your itinerary</h3>
                <ol>
                  {itinerary.map((stop, index) => (
                    <li key={`${stop.day}-${stop.title}`}>
                      <span className="itinerary-step" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <span className="itinerary-day">{stop.day}</span>
                        <h4>{stop.title}</h4>
                        <p>{stop.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <div className="tour-footer">
              <div className="tour-price">
                <span className="price-label">Starting from</span>
                <strong>US${Number(tour.price).toLocaleString()}</strong>
                <span className="price-note">per person · confirm final quote with our team</span>
              </div>
              <a
                className="book-btn"
                href={`https://wa.me/254705814181?text=${bookingMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire about this safari <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
