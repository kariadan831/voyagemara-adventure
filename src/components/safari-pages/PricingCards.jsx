import { FaCheck, FaWhatsapp, FaShieldAlt } from "react-icons/fa";
import "./PricingCards.css";

export default function PricingCards({ cards = [], onOpenBooking }) {
  return (
    <div className="vm-pricing-cards-grid">
      {cards.map((card, i) => (
        <article
          key={i}
          className={`vm-pricing-card ${card.isHot ? "hot" : ""}`}
        >
          {card.isHot && <span className="vm-hot-badge">{card.badgeText || "Most Booked"}</span>}
          
          <header className="vm-card-head">
            <h3 className="vm-card-tier">{card.tier}</h3>
            <div className="vm-card-price">{card.price}</div>
            <small className="vm-card-period">{card.period}</small>
          </header>

          <ul className="vm-card-features">
            {card.features.map((feat, idx) => (
              <li key={idx}>
                <FaCheck className="vm-feat-check" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <footer className="vm-card-foot">
            <a
              href={`https://wa.me/254705814181?text=${encodeURIComponent(
                card.whatsappText || `Hello VoyageMara, I want a quote for the ${card.tier} safari package.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="vm-btn-card-quote"
            >
              <FaWhatsapp /> Get This Quote
            </a>
            {onOpenBooking && (
              <button
                type="button"
                className="vm-btn-card-custom"
                onClick={() => onOpenBooking({ tour: `${card.tier} Safari Package` })}
              >
                Customize Itinerary
              </button>
            )}
          </footer>
        </article>
      ))}
    </div>
  );
}
