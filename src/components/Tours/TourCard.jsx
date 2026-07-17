import "./TourCard.css";

export default function TourCard({ tour, onOpen }) {
  return (
    <div className="tour-card">
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
      </div>

      <div className="tour-content">
        <div className="rating">
          {"★".repeat(tour.rating)}
          {"☆".repeat(5 - tour.rating)}
        </div>

        <h3>{tour.title}</h3>

        <p>{tour.description}</p>

        <div className="tour-meta">
          📅 {tour.duration}
        </div>

        <div className="price">
          From ${tour.price}
        </div>

        <button onClick={onOpen}>
          View Safari
        </button>
      </div>
    </div>
  );
}