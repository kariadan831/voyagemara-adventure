import "./TourCard.css";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaCheck, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { preloadSafariDetail, preloadImage } from "../../utils/preload";

export default function TourCard({ tour, onOpen, onOpenBooking }) {
  const defaultInclusions = [
    "Custom 4x4 pop-up roof Land Cruiser",
    "Professional native Maasai driver-guide",
    "Full-board lodge or luxury tented camp",
    "All national park & reserve entrance fees",
  ];

  return (
    <article
      className="tour-card"
      aria-label={`Safari package: ${tour.title}`}
      onMouseEnter={() => {
        preloadSafariDetail();
        preloadImage(tour.cover);
      }}
      onTouchStart={() => {
        preloadSafariDetail();
        preloadImage(tour.cover);
      }}
    >
      <div className="tour-image">
        <img
          src={tour.cover}
          alt={tour.title}
          loading="lazy"
          decoding="async"
          width="420"
          height="280"
          draggable={false}
        />

        <span className="badge">{tour.category}</span>
        <span className="tour-duration-badge">
          <FaCalendarAlt /> {tour.duration}
        </span>
      </div>

      <div className="tour-content">
        <div className="rating" aria-label={`${tour.rating} out of 5 stars`}>
          {"★".repeat(tour.rating)}
          {"☆".repeat(5 - tour.rating)}
        </div>

        <h3>{tour.title}</h3>

        <p>{tour.description}</p>

        {/* INCLUSIONS LIST */}
        <ul className="tour-card-inclusions">
          {defaultInclusions.slice(0, 3).map((inc, i) => (
            <li key={i}>
              <FaCheck className="inc-icon" /> {inc}
            </li>
          ))}
        </ul>

        {/* PRICING */}
        <div className="tour-card-pricing">
          <span className="price-kicker">Starting from</span>
          <div className="price-value">
            ${tour.price} <small>/ person</small>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="tour-card-actions">
          <button
            type="button"
            className="tour-book-btn"
            onClick={() =>
              onOpenBooking
                ? onOpenBooking({ tour: tour.title })
                : onOpen()
            }
          >
            <span>Book / Enquire</span>
            <FaArrowRight />
          </button>

          <button
            type="button"
            className="tour-view-btn"
            onClick={onOpen}
          >
            Quick View
          </button>
        </div>

        <Link
          className="tour-details-link"
          to={`/safaris/${tour.slug}`}
          onMouseEnter={() => {
            preloadSafariDetail();
            preloadImage(tour.cover);
          }}
          onTouchStart={() => {
            preloadSafariDetail();
            preloadImage(tour.cover);
          }}
        >
          Detailed Itinerary &amp; FAQs <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}