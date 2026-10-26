import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaTripadvisor,
  FaWhatsapp,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBinoculars,
  FaClock,
  FaCheck,
  FaTimes,
  FaChevronRight,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaPhoneAlt,
  FaLeaf,
  FaCamera,
} from "react-icons/fa";
import { MAASAI_MARA_PAGES } from "../data/maasaiMaraPagesData";
import PageTrustStrip from "../components/safari-pages/PageTrustStrip";
import ReviewsGrid from "../components/safari-pages/ReviewsGrid";
import CtaBand from "../components/safari-pages/CtaBand";
import "./MaasaiMaraSubPage.css";
import "./SafariDetail.css";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g294207-d34744740-Reviews-VoyageMara_Safaris-Nairobi.html";

/* ─── Image Slot with Error / Fallback Placeholder ──────────── */
function ImageSlot({ src, placeholderFile, alt, className = "", caption }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`mm-img-slot ${className}`}>
      {!imgError && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: "220px",
            background: "linear-gradient(135deg, #0f3b2a 0%, #1b5a40 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            fontSize: "0.88rem",
          }}
        >
          <span>{alt || "VoyageMara Safaris Photo"}</span>
        </div>
      )}

      {caption && <div className="mm-gallery-caption"><span>{caption}</span></div>}
    </div>
  );
}

export default function MaasaiMaraSubPage({ pageKey: propKey, onOpenBooking }) {
  const params = useParams();
  const pageKey = propKey || params.subpage || "overview";
  const page = MAASAI_MARA_PAGES[pageKey] || MAASAI_MARA_PAGES.overview;

  const [form, setForm] = useState({ name: "", email: "", phone: "", dates: "", travelers: "2" });
  const [sent, setSent] = useState(false);

  const handleEnquiry = (e) => {
    e.preventDefault();
    setSent(true);
    const msg = encodeURIComponent(
      `Hello Duncan! My name is ${form.name}. I'm interested in the ${page.name} on ${form.dates || "flexible dates"} for ${form.travelers} traveler(s). Email: ${form.email}, WhatsApp: ${form.phone}.`
    );
    window.open(`https://wa.me/254705814181?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const canonical = `https://voyagemara-adventure.vercel.app${page.route}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voyagemara-adventure.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Kenya", item: "https://voyagemara-adventure.vercel.app/#destinations" },
      { "@type": "ListItem", position: 3, name: "Maasai Mara", item: "https://voyagemara-adventure.vercel.app/safaris/maasai-mara" },
      { "@type": "ListItem", position: 4, name: page.breadcrumbName, item: canonical },
    ],
  };

  const tripSchema = page.slug === "3-day-big-five-safari" ? {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: page.title,
    description: page.seo.description,
    touristType: ["Wildlife", "Safari", "Photography"],
    provider: {
      "@type": "TravelAgency",
      name: "VoyageMara Safaris",
      url: "https://voyagemara-adventure.vercel.app",
    },
  } : null;

  return (
    <div className="safari-detail-page ta-styled-page mm-sub-page">
      {/* ── SEO METADATA ── */}
      <Helmet prioritizeSeoTags>
        <title>{page.seo.title}</title>
        <meta name="description" content={page.seo.description} />
        <meta name="keywords" content={page.seo.keywords} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="VoyageMara Safaris" />
        <meta property="og:title" content={page.seo.title} />
        <meta property="og:description" content={page.seo.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={page.seo.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.seo.title} />
        <meta name="twitter:description" content={page.seo.description} />
        <meta name="twitter:image" content={page.seo.ogImage} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {tripSchema && <script type="application/ld+json">{JSON.stringify(tripSchema)}</script>}
      </Helmet>

      {/* ── BREADCRUMBS & TOP UTILITY BAR (Requirement 2) ── */}
      <div className="ta-top-bar">
        <div className="safari-detail-container ta-top-bar-inner">
          <nav className="ta-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Africa</Link>
            <span className="ta-bc-sep">›</span>
            <Link to="/">Kenya</Link>
            <span className="ta-bc-sep">›</span>
            <Link to="/safaris/maasai-mara">Maasai Mara</Link>
            <span className="ta-bc-sep">›</span>
            <span className="ta-bc-current">{page.breadcrumbName}</span>
          </nav>

          <div className="ta-lpg-badge">
            <FaShieldAlt className="ta-lpg-icon" />
            <span>Lowest Price Guarantee · Direct Local Operator (#d34744740)</span>
          </div>
        </div>
      </div>

      {/* ── TRUST STRIP ── */}
      <PageTrustStrip />

      <div className="safari-detail-container">
        {/* ── SUB-PAGE QUICK NAV TABS ── */}
        <nav className="mm-sub-nav-bar" aria-label="Maasai Mara Sections">
          {Object.values(MAASAI_MARA_PAGES).map((p) => (
            <Link
              key={p.slug}
              to={p.route}
              className={`mm-sub-nav-pill ${p.slug === page.slug ? "active" : ""}`}
            >
              {p.name}
            </Link>
          ))}
        </nav>

        {/* ── HEADER: TITLE, RATING & TRUST ── */}
        <header className="ta-product-header">
          <div className="ta-header-main">
            <span className="mm-sub-hero-badge">VOYAGEMARA MAASAI MARA SAFARIS</span>
            <h1 className="ta-product-title">{page.title}</h1>
            <p className="mm-sub-lead">{page.heroSubtitle}</p>

            <div className="ta-rating-row">
              <div className="ta-rating-bubbles" title="5.0 out of 5 bubbles">
                <span className="ta-bubble filled">●</span>
                <span className="ta-bubble filled">●</span>
                <span className="ta-bubble filled">●</span>
                <span className="ta-bubble filled">●</span>
                <span className="ta-bubble filled">●</span>
              </div>
              <strong className="ta-score">5.0</strong>
              <span className="ta-reviews-count">(128 reviews)</span>
              <span className="ta-divider">·</span>
              <span className="ta-recommended-tag">
                <FaCheckCircle className="ta-rec-icon" /> Recommended by <strong>98%</strong> of travelers
              </span>
              <span className="ta-divider">·</span>
              <a
                href={TRIPADVISOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ta-official-pill"
              >
                <FaTripadvisor /> Listed on TripAdvisor #d34744740
              </a>
            </div>
          </div>
        </header>

        {/* ── HERO IMAGE SLOT ── */}
        <ImageSlot
          src={page.heroImage.src}
          placeholderFile={page.heroImage.placeholderFile}
          alt={page.heroImage.alt}
          className="hero-slot"
        />

        {/* ── 2-COLUMN LAYOUT (Matching SafariDetail) ── */}
        <div className="ta-content-grid">
          {/* ════════ LEFT COLUMN: MAIN CONTENT ════════ */}
          <div className="ta-main-col">
            {/* ── 1. OVERVIEW PAGE SPECIFIC CONTENT ── */}
            {page.slug === "overview" && (
              <>
                <section className="ta-section">
                  <h2 className="ta-section-title">Ecosystem Key Facts</h2>
                  <div className="mm-sub-facts-grid">
                    {page.facts.map((fact, i) => (
                      <div key={i} className="mm-sub-fact-card">
                        <span className="mm-sub-fact-label">{fact.label}</span>
                        <p className="mm-sub-fact-value">{fact.value}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">Why Visit Maasai Mara</h2>
                  <div className="mm-sub-card-grid">
                    {page.whyVisit.map((item, i) => (
                      <div key={i} className="mm-sub-info-card">
                        <h4><FaCheckCircle style={{ color: "#10b981", flexShrink: 0 }} /> {item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">Practical Information</h2>
                  <div className="mm-sub-card-grid">
                    {page.practicalInfo.map((info, i) => (
                      <div key={i} className="mm-sub-info-card">
                        <h4><FaInfoCircle style={{ color: "#b89a63", flexShrink: 0 }} /> {info.label}</h4>
                        <p>{info.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* ── 2. 3-DAY BIG FIVE SAFARI CONTENT ── */}
            {page.slug === "3-day-big-five-safari" && (
              <>
                <section className="ta-section">
                  <h2 className="ta-section-title">3-Day Daily Safari Itinerary</h2>
                  <div className="mm-sub-table-wrap">
                    <table className="mm-sub-table">
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Detailed Expedition Plan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page.itinerary.map((item, i) => (
                          <tr key={i}>
                            <td className="day-badge">{item.day}</td>
                            <td>
                              <strong style={{ display: "block", color: "#0f3b2a", marginBottom: "4px" }}>
                                {item.title}
                              </strong>
                              {item.plan}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">What is Included &amp; Excluded</h2>
                  <div className="mm-sub-inc-grid">
                    <div className="mm-sub-inc-box">
                      <h4><FaCheck style={{ color: "#10b981" }} /> What's Included</h4>
                      <ul>
                        {page.included.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mm-sub-inc-box not-included">
                      <h4><FaTimes style={{ color: "#ef4444" }} /> Not Included</h4>
                      <ul>
                        {page.notIncluded.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* ── 3. GREAT WILDEBEEST MIGRATION CONTENT ── */}
            {page.slug === "great-wildebeest-migration" && (
              <>
                <section className="ta-section">
                  <h2 className="ta-section-title">The Yearly Migration Cycle</h2>
                  <div className="mm-sub-table-wrap">
                    <table className="mm-sub-table">
                      <thead>
                        <tr>
                          <th>Period</th>
                          <th>Location</th>
                          <th>Wildlife Phenomenon</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page.yearlyCycle.map((cycle, i) => (
                          <tr key={i}>
                            <td className="period-badge">{cycle.period}</td>
                            <td><strong>{cycle.location}</strong></td>
                            <td>{cycle.highlight}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">{page.crossingDetails.title}</h2>
                  <div className="mm-sub-info-card" style={{ marginBottom: "20px" }}>
                    <p style={{ marginBottom: "12px", fontSize: "1rem" }}>{page.crossingDetails.intro}</p>
                    <p style={{ fontSize: "1rem" }}>{page.crossingDetails.body}</p>
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">Tips for Watching the Migration</h2>
                  <div className="mm-sub-card-grid">
                    {page.tips.map((tip, i) => (
                      <div key={i} className="mm-sub-info-card">
                        <h4><FaBinoculars style={{ color: "#b89a63", flexShrink: 0 }} /> Pro Tip #{i + 1}</h4>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* ── 4. LUXURY MARA CAMPS CONTENT ── */}
            {page.slug === "luxury-mara-camps" && (
              <>
                <section className="ta-section">
                  <h2 className="ta-section-title">What to Expect in Luxury Mara Lodges</h2>
                  <div className="mm-sub-card-grid">
                    {page.whatToExpect.map((item, i) => (
                      <div key={i} className="mm-sub-info-card">
                        <h4><FaLeaf style={{ color: "#10b981", flexShrink: 0 }} /> {item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">Choosing a Camp by Location</h2>
                  <div className="mm-sub-table-wrap">
                    <table className="mm-sub-table">
                      <thead>
                        <tr>
                          <th>Location Zone</th>
                          <th>Best Suited For</th>
                          <th>Iconic Examples</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page.choosingByLocation.map((loc, i) => (
                          <tr key={i}>
                            <td className="period-badge">{loc.zone}</td>
                            <td>{loc.goodFor}</td>
                            <td><em>{loc.examples}</em></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">Featured Luxury Camps (Customizable)</h2>
                  <div className="mm-sub-camp-grid">
                    {page.featuredCamps.map((camp, i) => (
                      <div key={i} className="mm-sub-camp-card">
                        <div className="mm-camp-img-wrap">
                          <img src={camp.image} alt={camp.name} loading="lazy" />
                          <span className="mm-camp-tier-badge">{camp.tier}</span>
                        </div>
                        <div className="mm-camp-body">
                          <h4>{camp.name}</h4>
                          <span className="mm-camp-loc"><FaMapMarkerAlt /> {camp.location}</span>
                          <span className="mm-camp-price">{camp.price}</span>
                          <p className="mm-camp-desc">{camp.highlights}</p>
                          <div className="mm-camp-actions">
                            <button
                              type="button"
                              className="mm-camp-btn-enquire"
                              onClick={() => {
                                if (onOpenBooking) {
                                  onOpenBooking({ tour: `Maasai Mara — ${camp.name}` });
                                }
                              }}
                            >
                              Request Rates
                            </button>
                            <a
                              href={camp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mm-camp-btn-link"
                              title="Official Camp Details"
                            >
                              <FaExternalLinkAlt />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* ── 5. MAASAI CULTURE EXPERIENCE CONTENT ── */}
            {page.slug === "maasai-culture-experience" && (
              <>
                <section className="ta-section">
                  <h2 className="ta-section-title">{page.whoAreTheMaasai.title}</h2>
                  <div className="mm-sub-info-card">
                    <p style={{ fontSize: "1rem", lineHeight: "1.7" }}>{page.whoAreTheMaasai.text}</p>
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">{page.dressAndBeadwork.title}</h2>
                  <p style={{ marginBottom: "16px", color: "#4b5563" }}>{page.dressAndBeadwork.intro}</p>
                  <div className="mm-sub-bead-grid">
                    {page.dressAndBeadwork.colors.map((c, i) => {
                      const colorClass = c.color.toLowerCase().split("/")[0].trim();
                      return (
                        <div key={i} className="mm-sub-bead-card">
                          <div className={`mm-bead-swatch ${colorClass}`} />
                          <div>
                            <strong>{c.color}</strong>
                            <p>{c.meaning}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">{page.ageSetsAndWarriors.title}</h2>
                  <div className="mm-sub-info-card">
                    <p style={{ fontSize: "1rem", lineHeight: "1.7" }}>{page.ageSetsAndWarriors.text}</p>
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">{page.adumuDance.title}</h2>
                  <div className="mm-sub-info-card">
                    <p style={{ fontSize: "1rem", lineHeight: "1.7" }}>{page.adumuDance.text}</p>
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">{page.foodAndDailyLife.title}</h2>
                  <div className="mm-sub-info-card">
                    <p style={{ fontSize: "1rem", lineHeight: "1.7" }}>{page.foodAndDailyLife.text}</p>
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">What You Can Do on a Cultural Visit</h2>
                  <div className="mm-sub-card-grid">
                    {page.visitorActivities.map((act, i) => (
                      <div key={i} className="mm-sub-info-card">
                        <h4><FaCheckCircle style={{ color: "#10b981", flexShrink: 0 }} /> Activity #{i + 1}</h4>
                        <p>{act}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="ta-section">
                  <h2 className="ta-section-title">Visiting Respectfully &amp; Etiquette</h2>
                  <div className="mm-sub-card-grid">
                    {page.respectfulVisitingTips.map((tip, i) => (
                      <div key={i} className="mm-sub-info-card">
                        <h4><FaShieldAlt style={{ color: "#b89a63", flexShrink: 0 }} /> Guideline #{i + 1}</h4>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* ── PHOTO GALLERY GRID (Requirement 4 & 5) ── */}
            <section className="ta-section">
              <h2 className="ta-section-title">Experience Photo Gallery</h2>
              <div className="mm-sub-gallery-grid">
                {page.gallery.map((img, i) => (
                  <ImageSlot
                    key={i}
                    src={img.src}
                    placeholderFile={img.placeholderFile}
                    alt={img.alt}
                    caption={img.caption}
                    className="mm-gallery-card"
                  />
                ))}
              </div>
            </section>

            {/* ── WHATSAPP / BOOKING CTA ACTION BUTTONS (Requirement 6) ── */}
            <section className="ta-section">
              <div className="mm-cta-buttons-wrap">
                <a
                  href={`https://wa.me/254705814181?text=${encodeURIComponent(page.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mm-btn-whatsapp-cta"
                >
                  <FaWhatsapp style={{ fontSize: "1.2rem" }} /> Chat on WhatsApp (+254 705 814 181)
                </a>

                <button
                  type="button"
                  className="mm-btn-quote-cta"
                  onClick={() => {
                    if (onOpenBooking) {
                      onOpenBooking({ tour: page.name });
                    }
                  }}
                >
                  <FaCalendarAlt /> Get an Instant Quote
                </button>
              </div>
            </section>

            {/* ── QUICK DIRECT ENQUIRY FORM ── */}
            <section className="ta-section ta-enquiry-section">
              <div className="ta-enquiry-card">
                <h3>Request Personalized Information for {page.name}</h3>
                <p>Send our Nairobi team your travel dates and group size. We reply within 2 hours with customized rates.</p>

                {sent ? (
                  <div className="ta-enquiry-success">
                    <FaCheckCircle className="ta-success-ico" />
                    <strong>Thank you! Your enquiry has been sent to Duncan.</strong>
                    <p>We are opening WhatsApp for direct conversation.</p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquiry} className="ta-enquiry-form">
                    <div className="ta-form-row">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="ta-input"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="ta-input"
                      />
                    </div>
                    <div className="ta-form-row">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="WhatsApp / Phone number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="ta-input"
                      />
                      <input
                        type="text"
                        name="dates"
                        placeholder="Preferred travel month/dates"
                        value={form.dates}
                        onChange={(e) => setForm({ ...form, dates: e.target.value })}
                        className="ta-input"
                      />
                    </div>
                    <button type="submit" className="ta-btn-submit-enquiry">
                      <FaWhatsapp /> Send Inquiry via WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>

          {/* ════════ RIGHT COLUMN: STICKY BOOKING CARD ════════ */}
          <aside className="ta-sidebar-col">
            <div className="ta-sticky-card">
              <div className="ta-card-badge-row">
                <span className="ta-badge-lpg">
                  <FaShieldAlt /> DIRECT OPERATOR GUARANTEE
                </span>
                <span className="ta-badge-instant">INSTANT CONFIRMATION</span>
              </div>

              <div className="ta-price-box">
                <span className="ta-price-label">Reserve your safari with</span>
                <div className="ta-price-amount">
                  <strong>Zero Middleman Fees</strong>
                </div>
                <span className="ta-price-note">
                  Direct rates with licensed Kenyan operator #d34744740
                </span>
              </div>

              <div className="ta-card-actions">
                <button
                  type="button"
                  className="ta-btn-check-avail"
                  onClick={() => {
                    if (onOpenBooking) {
                      onOpenBooking({ tour: page.name });
                    }
                  }}
                >
                  <FaCalendarAlt /> Plan My {page.breadcrumbName}
                </button>

                <a
                  href={`https://wa.me/254705814181?text=${encodeURIComponent(page.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ta-btn-whatsapp-sidebar"
                >
                  <FaWhatsapp className="ta-wa-ico" /> Chat on WhatsApp
                </a>
              </div>

              <div className="ta-perks-list">
                <div className="ta-perk">
                  <FaCheck className="ta-perk-chk" />
                  <div>
                    <strong>Private 4x4 Land Cruiser</strong>
                    <span>Pop-up photographic roof &amp; unlimited mileage</span>
                  </div>
                </div>
                <div className="ta-perk">
                  <FaCheck className="ta-perk-chk" />
                  <div>
                    <strong>Native Maasai Guides</strong>
                    <span>Born &amp; raised in the savannah with lifetime tracking experience</span>
                  </div>
                </div>
                <div className="ta-perk">
                  <FaCheck className="ta-perk-chk" />
                  <div>
                    <strong>Flexible Custom Itineraries</strong>
                    <span>Tailored departure dates, luxury camps &amp; balloon flights</span>
                  </div>
                </div>
              </div>

              <div className="ta-operator-trust">
                <FaTripadvisor className="ta-op-icon" />
                <div>
                  <strong>Official TripAdvisor Operator</strong>
                  <span>VoyageMara Safaris · Nairobi #d34744740</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ── REVIEWS SECTION ── */}
        <ReviewsGrid title="What Travelers Say About Our Maasai Mara Safaris" />
      </div>

      {/* ── FINAL CALL-TO-ACTION BAND ── */}
      <CtaBand
        title="Plan Your Maasai Mara Safari With Duncan"
        subtitle="100% Native Maasai guided. Direct Land Cruiser bookings with zero middleman commissions."
      />
    </div>
  );
}
