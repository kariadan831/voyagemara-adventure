import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaRegClock,
  FaWhatsapp,
  FaCheckCircle,
  FaTimesCircle,
  FaCar,
  FaUsers,
  FaMapSigns,
  FaPlaneDeparture,
  FaPaperPlane,
  FaTripadvisor,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaWifi,
  FaShieldAlt,
  FaStar,
  FaBolt,
  FaCamera,
  FaCheck,
  FaPhoneAlt,
} from "react-icons/fa";
import MaasaiMaraGuideContent from "../components/MaasaiMaraGuideContent";
import "./SafariDetail.css";

const SITE_URL = "https://voyagemara-adventure.vercel.app";
const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g294207-d34744740-Reviews-VoyageMara_Safaris-Nairobi.html";
const EMAILJS_SERVICE  = "service_egs1gmk";
const EMAILJS_TEMPLATE = "template_qmm8w9k";
const EMAILJS_KEY      = "XlvozJruwt1UBTXLu";

const DEFAULT_INCLUSIONS = [
  "Private custom Toyota 4×4 Land Cruiser with pop-up roof",
  "High-speed onboard Wi-Fi connection & USB charging ports",
  "All national park / conservancy entrance fees & government tariffs",
  "Professional native Maasai driver-guide (certified KWS)",
  "Full-board accommodation or safari lunch box where applicable",
  "Unlimited bottled drinking water on all game drives",
  "Door-to-door Nairobi hotel or airport pickup & drop-off",
  "24/7 direct WhatsApp line with Head Guide Duncan",
];

const DEFAULT_EXCLUSIONS = [
  "International flights to/from Nairobi",
  "Kenya Electronic Travel Authorisation (eTA)",
  "Travel and medical insurance (recommended)",
  "Alcoholic drinks, sodas & personal purchases",
  "Optional hot air balloon safari (in Maasai Mara)",
  "Gratuities & tips for driver-guide (recommended $15–$25/day)",
];

const DEFAULT_REVIEWS = [
  {
    name: "Meg C.",
    date: "Oct 2024",
    rating: 5,
    title: "Great day out with Duncan",
    text: "Great day out with Duncan our guide and driver. Saw so many animals including 2 lions, zebras, giraffes, hippos, rhinos, impalas, an eagle, herons, and cranes! Highly recommend booking direct with VoyageMara.",
  },
  {
    name: "Daniel W.",
    date: "Nov 2024",
    rating: 5,
    title: "Unreal wildlife right near the city",
    text: "Most experienced guide ever and so enjoyed seeing the real wildlife. The 4x4 Land Cruiser was pristine with pop-up roof, Wi-Fi, and cold bottled water. Best direct safari experience in Kenya.",
  },
];

export default function SafariDetail({ tour, onOpenBooking }) {
  const canonical = `${SITE_URL}/safaris/${tour.slug}`;
  const images = [...new Set([tour.cover, ...(tour.gallery || [])].filter(Boolean))];

  const [saved, setSaved] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const message = encodeURIComponent(
    `Hello VoyageMara Safaris, I would like to book the ${tour.title} (Duration: ${tour.duration}). Please confirm availability, seasonal pricing and dates.`
  );

  const inclusions = tour.inclusions ?? DEFAULT_INCLUSIONS;
  const exclusions = tour.exclusions ?? DEFAULT_EXCLUSIONS;
  const reviews = tour.reviews ?? DEFAULT_REVIEWS;

  const faqs = tour.faqs ?? [
    {
      question: `How long is the ${tour.title}?`,
      answer: `This safari experience is scheduled as ${tour.duration}. We customize morning and afternoon pickup arrangements based on your flights and preference.`,
    },
    {
      question: `What is the starting price for this tour?`,
      answer: `The listed direct starting price is US$${Number(tour.price).toLocaleString()} per adult (varies by party size). Booking directly on our website eliminates 20% OTA reseller markups.`,
    },
    {
      question: "What vehicle will we travel in?",
      answer:
        "All VoyageMara safaris guarantee a private 4×4 Toyota Land Cruiser fitted with a full pop-up observation roof, high-clearance suspension, UHF wildlife tracking radio, free onboard Wi-Fi, USB chargers, and a cooler box.",
    },
    {
      question: "What is your booking deposit and cancellation policy?",
      answer:
        "Free cancellation with 100% refund up to 24 hours before day safaris, or 14 days before multi-day safaris. A flexible deposit reserves your vehicle and permits with free date changes.",
    },
  ];

  // Quick enquiry form state
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", guests: "2", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEnquiry = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSending(true);
    setSendError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          safari_package: tour.title,
          travel_date: form.date,
          guests: form.guests,
          full_name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          message: form.message || `Enquiry for ${tour.title}`,
          accommodation: "To be confirmed",
          budget: "To be confirmed",
        },
        EMAILJS_KEY
      );
      setSent(true);
    } catch {
      setSendError("Could not send email automatically. Please WhatsApp Duncan directly for immediate booking confirmation.");
    } finally {
      setSending(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.title,
        text: `Check out ${tour.title} with VoyageMara Safaris!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${canonical}#trip`,
        name: tour.title,
        description: tour.seoDescription ?? tour.description,
        url: canonical,
        image: images.map((img) => `${SITE_URL}${img}`),
        touristType: "Wildlife and nature travellers",
        provider: {
          "@type": "TravelAgency",
          "@id": `${SITE_URL}/#organization`,
          name: "VoyageMara Safaris",
          url: `${SITE_URL}/`,
          telephone: "+254705814181",
          email: "kariadan831@gmail.com",
        },
        offers: {
          "@type": "Offer",
          price: tour.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: canonical,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  const ratingVal = tour.rating || 4.9;
  const reviewCount = tour.reviewCount || 1152;
  const recPct = tour.recommendedPct || 98;

  return (
    <main className="safari-detail-page ta-styled-page">
      <Helmet>
        <title>{tour.seoTitle ?? `${tour.title} | VoyageMara Safaris`}</title>
        <meta name="description" content={tour.seoDescription ?? tour.description} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* TRIPADVISOR-STYLE BREADCRUMBS & TOP UTILITY BAR */}
      <div className="ta-top-bar">
        <div className="safari-detail-container ta-top-bar-inner">
          <nav className="ta-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Africa</Link>
            <span className="ta-bc-sep">›</span>
            <Link to="/">Kenya</Link>
            <span className="ta-bc-sep">›</span>
            <Link to="/#destinations">{tour.location.split(",")[0]}</Link>
            <span className="ta-bc-sep">›</span>
            <Link to="/#tours">Wildlife Tours</Link>
          </nav>

          <div className="ta-lpg-badge">
            <FaShieldAlt className="ta-lpg-icon" />
            <span>Lowest Price Guarantee (Direct Operator)</span>
          </div>
        </div>
      </div>

      <div className="safari-detail-container">
        {/* HEADER: TITLE, RATING & ACTIONS */}
        <header className="ta-product-header">
          <div className="ta-header-main">
            <h1 className="ta-product-title">{tour.title}</h1>

            <div className="ta-rating-row">
              <div className="ta-rating-bubbles" title={`${ratingVal} out of 5 bubbles`}>
                <span className="ta-bubble filled">●</span>
                <span className="ta-bubble filled">●</span>
                <span className="ta-bubble filled">●</span>
                <span className="ta-bubble filled">●</span>
                <span className="ta-bubble filled">●</span>
              </div>
              <strong className="ta-score">{ratingVal}</strong>
              <span className="ta-reviews-count">({reviewCount.toLocaleString()} reviews)</span>
              <span className="ta-divider">·</span>
              <span className="ta-recommended-tag">
                <FaCheckCircle className="ta-rec-icon" /> Recommended by <strong>{recPct}%</strong> of travelers
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

          <div className="ta-header-actions">
            <button
              type="button"
              className="ta-btn-action"
              onClick={handleShare}
              aria-label="Share this tour"
            >
              <FaShareAlt /> <span>Share</span>
            </button>
            <button
              type="button"
              className={`ta-btn-action ${saved ? "saved" : ""}`}
              onClick={() => setSaved(!saved)}
              aria-label={saved ? "Saved to wishlist" : "Save to wishlist"}
            >
              {saved ? <FaHeart className="ta-heart-filled" /> : <FaRegHeart />}
              <span>{saved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </header>

        {shareToast && <div className="ta-toast" role="alert">Link copied to clipboard!</div>}

        {/* TRIPADVISOR 1-LARGE + 2-STACKED PHOTO GALLERY */}
        <section className="ta-gallery-mosaic" aria-label="Tour photos">
          <div className="ta-gallery-main">
            <img
              src={tour.cover}
              alt={tour.imageAlts?.[tour.cover] ?? tour.title}
              width="850"
              height="540"
              fetchPriority="high"
            />
            <div className="ta-photo-caption">{tour.location}</div>
          </div>

          <div className="ta-gallery-side">
            <div className="ta-gallery-side-item">
              <img
                src={images[1] || tour.cover}
                alt={tour.imageAlts?.[images[1]] ?? `${tour.title} photo 2`}
                loading="lazy"
                width="420"
                height="260"
              />
            </div>
            <div className="ta-gallery-side-item">
              <img
                src={images[2] || images[1] || tour.cover}
                alt={tour.imageAlts?.[images[2]] ?? `${tour.title} photo 3`}
                loading="lazy"
                width="420"
                height="260"
              />
              <button
                type="button"
                className="ta-view-photos-btn"
                onClick={() => scrollToSection("gallery-section")}
              >
                <FaCamera /> <span>{images.length + 8} photos</span>
              </button>
            </div>
          </div>
        </section>

        {/* STICKY SUBNAV TABS */}
        <nav className="ta-subnav-tabs" aria-label="Product navigation tabs">
          <button
            type="button"
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => scrollToSection("overview")}
          >
            Overview
          </button>
          <button
            type="button"
            className={activeTab === "details" ? "active" : ""}
            onClick={() => scrollToSection("details")}
          >
            Details
          </button>
          <button
            type="button"
            className={activeTab === "itinerary" ? "active" : ""}
            onClick={() => scrollToSection("itinerary")}
          >
            Itinerary
          </button>
          <button
            type="button"
            className={activeTab === "inclusions" ? "active" : ""}
            onClick={() => scrollToSection("inclusions")}
          >
            Inclusions
          </button>
          <button
            type="button"
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => scrollToSection("reviews")}
          >
            Reviews
          </button>
          <button
            type="button"
            className={activeTab === "faq" ? "active" : ""}
            onClick={() => scrollToSection("faq")}
          >
            FAQ
          </button>
        </nav>

        {/* MAIN TRIPADVISOR 2-COLUMN LAYOUT */}
        <div className="ta-content-grid">
          {/* LEFT COLUMN: ABOUT, WHY TRAVELERS LOVE THIS, DETAILS, ITINERARY */}
          <div className="ta-main-col">
            {/* OVERVIEW / ABOUT */}
            <section id="overview" className="ta-section">
              <h2 className="ta-section-title">About this experience</h2>
              <div className="ta-about-text">
                <p>
                  {tour.description}
                  {readMore && (
                    <span>
                      {" "}VoyageMara Safaris provides complete door-to-door Nairobi hotel and
                      airport pickup. Travel comfortably in a private 4×4 Land Cruiser fitted
                      with a pop-up roof for 360-degree photography, free onboard Wi-Fi, and
                      guidance from native Maasai trackers born and raised in the savannah.
                    </span>
                  )}
                </p>
                <button
                  type="button"
                  className="ta-btn-readmore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Read less" : "Read more"}
                </button>
              </div>
            </section>

            {/* WHY TRAVELERS LOVE THIS (TRIPADVISOR REVIEW HIGHLIGHTS) */}
            <section className="ta-section ta-why-love-section">
              <div className="ta-why-love-header">
                <h3>Why travelers love this</h3>
                <span className="ta-sub-score">
                  <span className="ta-bubble filled">●</span>
                  <span className="ta-bubble filled">●</span>
                  <span className="ta-bubble filled">●</span>
                  <span className="ta-bubble filled">●</span>
                  <span className="ta-bubble filled">●</span>
                  <strong>{ratingVal}</strong> ({reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              <div className="ta-review-cards-row">
                {reviews.map((rev, idx) => (
                  <article key={idx} className="ta-review-card">
                    <div className="ta-rev-top">
                      <div className="ta-rev-bubbles">
                        <span className="ta-bubble filled">●</span>
                        <span className="ta-bubble filled">●</span>
                        <span className="ta-bubble filled">●</span>
                        <span className="ta-bubble filled">●</span>
                        <span className="ta-bubble filled">●</span>
                      </div>
                      <span className="ta-rev-date">{rev.date}</span>
                    </div>
                    <strong className="ta-rev-author">{rev.name}</strong>
                    <p className="ta-rev-body">&ldquo;{rev.text}&rdquo;</p>
                  </article>
                ))}
              </div>
            </section>

            {/* EXPERIENCE QUICK SPECS (MATCHING SCREENSHOT) */}
            <section id="details" className="ta-section ta-specs-section">
              <ul className="ta-specs-list">
                <li className="ta-spec-item">
                  <FaUsers className="ta-spec-icon" />
                  <div>
                    <strong>Ages 0–80, Private 4×4 Group</strong>
                    <span>Exclusive Land Cruiser for your party — never crammed with strangers</span>
                  </div>
                </li>
                <li className="ta-spec-item">
                  <FaRegClock className="ta-spec-icon" />
                  <div>
                    <strong>Duration: {tour.duration}</strong>
                    <span>Flexible morning (06:00 AM) or afternoon (01:30 PM) departures</span>
                  </div>
                </li>
                <li className="ta-spec-item">
                  <FaCheckCircle className="ta-spec-icon" />
                  <div>
                    <strong>Mobile ticket accepted</strong>
                    <span>Instant confirmation sent straight to your WhatsApp and email</span>
                  </div>
                </li>
                <li className="ta-spec-item">
                  <FaShieldAlt className="ta-spec-icon" />
                  <div>
                    <strong>TripAdvisor Animal Welfare Standards</strong>
                    <span>100% ethical, respectful game viewing with certified native guides</span>
                  </div>
                </li>
                <li className="ta-spec-item">
                  <FaWifi className="ta-spec-icon" />
                  <div>
                    <strong>Free Onboard Wi-Fi & USB Charging</strong>
                    <span>Stay connected and upload your wildlife photos live from the savannah</span>
                  </div>
                </li>
                <li className="ta-spec-item">
                  <FaCar className="ta-spec-icon" />
                  <div>
                    <strong>Door-to-door hotel & airport transport</strong>
                    <span>Complimentary pickup from any Nairobi hotel, residence, or airport</span>
                  </div>
                </li>
              </ul>
            </section>

            {/* ITINERARY */}
            <section id="itinerary" className="ta-section">
              <h2 className="ta-section-title">What to expect (Itinerary)</h2>
              <div className="ta-itinerary-timeline">
                {tour.itinerary.map((stop, i) => (
                  <div key={i} className="ta-itinerary-step">
                    <div className="ta-step-badge">{stop.day}</div>
                    <div className="ta-step-body">
                      <h3>{stop.title}</h3>
                      <p>{stop.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INCLUSIONS & EXCLUSIONS */}
            <section id="inclusions" className="ta-section">
              <h2 className="ta-section-title">What&apos;s Included / Not Included</h2>
              <div className="ta-inc-grid">
                <div className="ta-inc-col">
                  <h3>
                    <FaCheckCircle className="ta-inc-ico-yes" /> What&apos;s Included
                  </h3>
                  <ul className="ta-inc-bullets">
                    {inclusions.map((item, idx) => (
                      <li key={idx}>
                        <FaCheck className="ta-bullet-check" /> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ta-inc-col">
                  <h3>
                    <FaTimesCircle className="ta-inc-ico-no" /> What&apos;s Not Included
                  </h3>
                  <ul className="ta-inc-bullets ta-exc-bullets">
                    {exclusions.map((item, idx) => (
                      <li key={idx}>
                        <span className="ta-bullet-x">✕</span> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* MAASAI MARA DEDICATED CONTENT IF APPLICABLE */}
            {tour.slug === "maasai-mara" && (
              <section className="ta-section">
                <MaasaiMaraGuideContent onOpenBooking={onOpenBooking} />
              </section>
            )}

            {/* PHOTO GALLERY */}
            <section id="gallery-section" className="ta-section">
              <h2 className="ta-section-title">Photo Gallery</h2>
              <div className="ta-full-photo-grid">
                {images.map((img, i) => (
                  <figure key={i} className="ta-photo-thumb">
                    <img src={img} alt={`${tour.title} ${i + 1}`} loading="lazy" />
                  </figure>
                ))}
              </div>
            </section>

            {/* REVIEWS & TRIPADVISOR COMMUNITY */}
            <section id="reviews" className="ta-section">
              <div className="ta-reviews-header">
                <h2 className="ta-section-title">Traveler Reviews</h2>
                <a
                  href={TRIPADVISOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ta-btn-write-review"
                >
                  <FaTripadvisor /> Write a Review on TripAdvisor
                </a>
              </div>

              <div className="ta-reviews-breakdown-card">
                <div className="ta-score-large">
                  <strong>{ratingVal}</strong>
                  <div className="ta-rating-bubbles">
                    <span className="ta-bubble filled">●</span>
                    <span className="ta-bubble filled">●</span>
                    <span className="ta-bubble filled">●</span>
                    <span className="ta-bubble filled">●</span>
                    <span className="ta-bubble filled">●</span>
                  </div>
                  <span>Based on {reviewCount.toLocaleString()} reviews</span>
                </div>
                <div className="ta-score-perks">
                  <div>✓ <strong>98%</strong> would recommend this safari</div>
                  <div>✓ <strong>100%</strong> Native Maasai Guided</div>
                  <div>✓ <strong>Zero</strong> Middleman / Third-Party Commission</div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="ta-section">
              <h2 className="ta-section-title">Frequently Asked Questions</h2>
              <div className="ta-faq-list">
                {faqs.map((faq, i) => (
                  <details key={i} className="ta-faq-item">
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* QUICK DIRECT ENQUIRY CARD */}
            <section className="ta-section ta-enquiry-section">
              <div className="ta-enquiry-card">
                <h3>Have custom questions or special travel dates?</h3>
                <p>Send our Nairobi team a note and we will reply within 2 hours with availability and an itemized quote.</p>

                {sent ? (
                  <div className="ta-enquiry-success">
                    <FaCheckCircle className="ta-success-ico" />
                    <strong>Thank you! Your inquiry was sent to Duncan.</strong>
                    <p>For instant answers, connect directly on WhatsApp:</p>
                    <a
                      href={`https://wa.me/254705814181?text=${message}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ta-btn-wa-direct"
                    >
                      <FaWhatsapp /> Chat on WhatsApp (+254 705 814 181)
                    </a>
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
                        onChange={handleChange}
                        className="ta-input"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="ta-input"
                      />
                    </div>
                    <div className="ta-form-row">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="WhatsApp / Phone number"
                        value={form.phone}
                        onChange={handleChange}
                        className="ta-input"
                      />
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="ta-input"
                      />
                    </div>
                    <textarea
                      name="message"
                      rows="3"
                      placeholder="Tell us your group size, flight arrival times, or questions..."
                      value={form.message}
                      onChange={handleChange}
                      className="ta-textarea"
                    />

                    {sendError && <div className="ta-error-msg">{sendError}</div>}

                    <div className="ta-form-submit-row">
                      <button type="submit" disabled={sending} className="ta-btn-submit-enquiry">
                        {sending ? "Sending..." : "Send Safari Inquiry"}
                      </button>
                      <a
                        href={`https://wa.me/254705814181?text=${message}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ta-btn-wa-secondary"
                      >
                        <FaWhatsapp /> Quick WhatsApp
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: STICKY TRIPADVISOR BOOKING CARD (MATCHING SCREENSHOT) */}
          <aside className="ta-sidebar-col" aria-label="Booking and availability widget">
            <div className="ta-sticky-booking-widget">
              {/* PRICE HEADER */}
              <div className="ta-price-header">
                <span className="ta-price-label">From</span>
                <div className="ta-price-amount">
                  <span className="ta-curr">US$</span>
                  <strong className="ta-val">{Number(tour.price).toLocaleString()}.00</strong>
                </div>
                <span className="ta-price-sub">per adult (price varies by group size)</span>
              </div>

              {/* CHECK AVAILABILITY BUTTON */}
              <Link
                to={`/booking?tour=${tour.slug}`}
                className="ta-btn-check-availability"
              >
                <span>Check availability</span>
                <FaArrowRight className="ta-btn-arr" />
              </Link>

              {/* WHATSAPP INSTANT ACTION */}
              <a
                href={`https://wa.me/254705814181?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ta-btn-wa-booking"
              >
                <FaWhatsapp /> Instant Confirmation on WhatsApp
              </a>

              {/* TRIPADVISOR GUARANTEES & CANCELLATION */}
              <div className="ta-widget-guarantees">
                <div className="ta-wg-item">
                  <FaCheck className="ta-wg-check" />
                  <div>
                    <strong>Free cancellation</strong>
                    <p>Full refund if cancelled up to 24 hours before the experience starts (local time)</p>
                  </div>
                </div>

                <div className="ta-wg-item">
                  <FaCheck className="ta-wg-check" />
                  <div>
                    <strong>Reserve now &amp; pay later</strong>
                    <p>Secure your spot while staying flexible with zero upfront penalty</p>
                  </div>
                </div>
              </div>

              {/* URGENCY ALERT BANNER */}
              <div className="ta-urgency-callout">
                <FaBolt className="ta-urg-icon" />
                <span>
                  <strong>Book ahead</strong> — This safari is booked 12 days in advance on average.
                </span>
              </div>

              {/* HAVE QUESTIONS BOX */}
              <div className="ta-widget-help">
                <span className="ta-help-title">Have booking questions?</span>
                <div className="ta-help-actions">
                  <a href="tel:+254705814181" className="ta-help-phone">
                    <FaPhoneAlt /> +254 705 814 181
                  </a>
                  <a
                    href={`https://wa.me/254705814181?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ta-help-chat"
                  >
                    Chat now
                  </a>
                </div>
              </div>

              {/* OPERATOR CREDENTIAL PILL */}
              <div className="ta-widget-operator-info">
                <FaTripadvisor className="ta-op-icon" />
                <div>
                  <strong>VoyageMara Safaris</strong>
                  <span>Official TripAdvisor Operator #d34744740 · Nairobi</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
