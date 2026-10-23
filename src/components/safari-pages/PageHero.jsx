import { Link } from "react-router-dom";
import { FaShieldAlt, FaCalendarCheck, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import "./PageHero.css";

export default function PageHero({
  title,
  subtitle,
  breadcrumbSection = "Kenya Safaris",
  breadcrumbSectionLink = "/kenya-safaris/all-safari-packages",
  breadcrumbPage,
  imageSrc,
  imageAlt,
  placeholderFile,
  onOpenBooking,
  whatsappMsg,
}) {
  return (
    <div className="vm-page-hero-wrapper">
      {/* ── Breadcrumb & Top Guarantee Bar ── */}
      <div className="vm-hero-top-crumb">
        <div className="vm-hero-container vm-crumb-row">
          <nav className="vm-breadcrumbs" aria-label="Breadcrumbs">
            <Link to="/">Africa</Link>
            <span className="vm-sep">›</span>
            <Link to="/">Kenya</Link>
            <span className="vm-sep">›</span>
            <Link to={breadcrumbSectionLink}>{breadcrumbSection}</Link>
            <span className="vm-sep">›</span>
            <span className="vm-crumb-active">{breadcrumbPage}</span>
          </nav>
          <div className="vm-hero-lpg">
            <FaShieldAlt className="vm-lpg-icon" />
            <span>Lowest Price Guarantee · Direct Operator</span>
          </div>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <header className="vm-hero-banner">
        <div className="vm-hero-bg-overlay" />
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt || title}
            className="vm-hero-bg-img"
            loading="eager"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <div className="vm-hero-container vm-hero-content">
          <span className="vm-hero-kicker">VOYAGEMARA ADVENTURE</span>
          <h1 className="vm-hero-title">{title}</h1>
          <p className="vm-hero-lead">{subtitle}</p>

          <div className="vm-hero-actions">
            <button
              type="button"
              className="vm-hero-btn-quote"
              onClick={() => {
                if (onOpenBooking) {
                  onOpenBooking({ tour: title });
                } else {
                  document.getElementById("request-quote-section")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <FaCalendarCheck /> Get a Quote
            </button>

            {whatsappMsg && (
              <a
                href={`https://wa.me/254705814181?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="vm-hero-btn-whatsapp"
              >
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
