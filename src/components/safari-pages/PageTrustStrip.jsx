import { FaStar, FaShieldAlt, FaTruck, FaAward, FaComments } from "react-icons/fa";
import "./PageTrustStrip.css";

export default function PageTrustStrip() {
  return (
    <div className="vm-page-trust-strip" role="region" aria-label="Trust and ratings bar">
      <div className="vm-trust-stat">
        <span className="vm-stat-score">
          5.0 <span className="vm-stat-star">★</span>
        </span>
        <span className="vm-stat-label">TripAdvisor Rating</span>
      </div>

      <div className="vm-trust-stat">
        <span className="vm-stat-num">1,152</span>
        <span className="vm-stat-label">Traveller Reviews</span>
      </div>

      <div className="vm-trust-stat">
        <span className="vm-stat-highlight">100%</span>
        <span className="vm-stat-label">Native Maasai-Guided</span>
      </div>

      <div className="vm-trust-stat">
        <span className="vm-stat-highlight">Direct</span>
        <span className="vm-stat-label">Operator, No Agent Markup</span>
      </div>

      <div className="vm-trust-stat">
        <span className="vm-stat-highlight">Private</span>
        <span className="vm-stat-label">Custom 4x4 Land Cruisers</span>
      </div>
    </div>
  );
}
