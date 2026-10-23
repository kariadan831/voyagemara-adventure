import { FaStar, FaTripadvisor, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";
import { SHARED_REVIEWS, REVIEWS_SUMMARY } from "../../data/sharedReviewsData";
import "./ReviewsGrid.css";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g294207-d34744740-Reviews-VoyageMara_Safaris-Nairobi.html";

export default function ReviewsGrid({ reviews = SHARED_REVIEWS, title = "What Travellers Say" }) {
  return (
    <section className="vm-reviews-section">
      <div className="vm-reviews-header">
        <div>
          <h2 className="vm-section-title">{title}</h2>
          <div className="vm-reviews-score-bar">
            <span className="vm-score-stars">★★★★★</span>
            <strong>{REVIEWS_SUMMARY.rating} out of 5</strong>
            <span className="vm-score-sep">·</span>
            <span>Based on {REVIEWS_SUMMARY.reviewCount.toLocaleString()} traveler reviews</span>
          </div>
        </div>

        <a
          href={TRIPADVISOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="vm-btn-ta-reviews"
        >
          <FaTripadvisor /> TripAdvisor Listed Operator ({REVIEWS_SUMMARY.tripadvisorListingId})
        </a>
      </div>

      <div className="vm-reviews-cards-grid">
        {reviews.map((rev) => (
          <article key={rev.id} className="vm-review-card">
            <div className="vm-rev-top">
              <div className="vm-rev-stars">
                {"★".repeat(rev.rating)}
              </div>
              <span className="vm-rev-date">{rev.date}</span>
            </div>

            <h4 className="vm-rev-title">{rev.title}</h4>
            <p className="vm-rev-quote">"{rev.quote}"</p>

            <div className="vm-rev-author">
              <div className="vm-rev-avatar-wrap">
                {rev.avatar ? (
                  <img src={rev.avatar} alt={rev.author} loading="lazy" />
                ) : (
                  <div className="vm-rev-avatar-initials">{rev.author.charAt(0)}</div>
                )}
              </div>
              <div>
                <strong>{rev.author}</strong>
                <small>{rev.country} · {rev.tripType}</small>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
