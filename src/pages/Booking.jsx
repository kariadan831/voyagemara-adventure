import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import {
  FaCheckCircle,
  FaWhatsapp,
  FaShieldAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaMapMarkerAlt,
  FaCar,
  FaBinoculars,
  FaTripadvisor,
  FaClock,
  FaStar,
  FaPlaneArrival,
  FaInfoCircle,
} from "react-icons/fa";
import tours from "../data/tours";
import "./Booking.css";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g294207-d34744740-Reviews-VoyageMara_Safaris-Nairobi.html";

const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
  KES: { symbol: "KSh ", rate: 130, label: "KES (KSh)" },
};

const ACCOMMODATION_TIERS = [
  {
    id: "mid-range",
    name: "Mid-Range Tented Lodges",
    multiplier: 1.0,
    desc: "En-suite luxury tents with hot showers, swimming pools & bush restaurants. Best balance of authentic wild feel and comfort.",
    tag: "Most Popular",
  },
  {
    id: "luxury",
    name: "Luxury 5-Star Safari Lodges",
    multiplier: 1.45,
    desc: "Top-tier private safari camps (Governor's Camp, Serena, Mara Ashnil) with premium panoramic views, private verandas & gourmet bush dining.",
    tag: "Premium Experience",
  },
  {
    id: "budget",
    name: "Budget / Adventure Bush Camps",
    multiplier: 0.78,
    desc: "Clean, comfortable safari camp cottages or permanent tents with private bathroom facilities. Perfect for budget-conscious wildlife lovers.",
    tag: "Budget Friendly",
  },
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const preselectedTourSlug = searchParams.get("tour");

  const [selectedTourSlug, setSelectedTourSlug] = useState(
    preselectedTourSlug || "maasai-mara"
  );
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [dateFlexibility, setDateFlexibility] = useState("flexible");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [infants, setInfants] = useState(0);
  const [accommodationTier, setAccommodationTier] = useState("mid-range");
  const [currency, setCurrency] = useState("USD");

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCountry, setGuestCountry] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Set default min date to tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  const currentTour =
    tours.find((t) => t.slug === selectedTourSlug) ||
    tours.find((t) => t.slug === "maasai-mara") ||
    tours[0];

  const selectedTier =
    ACCOMMODATION_TIERS.find((t) => t.id === accommodationTier) ||
    ACCOMMODATION_TIERS[0];

  // Auto-calculate return date when tour or start date changes
  useEffect(() => {
    if (!travelDate) return;
    const start = new Date(travelDate);
    const durationDays = currentTour.duration.includes("3")
      ? 3
      : currentTour.duration.includes("2")
      ? 2
      : 1;
    const end = new Date(start);
    end.setDate(end.getDate() + (durationDays - 1));
    setReturnDate(end.toISOString().split("T")[0]);
  }, [travelDate, currentTour]);

  // Price calculations
  const curr = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const baseTourPriceUSD = Number(currentTour?.price || 620);
  const adjustedBaseRate = Math.round(baseTourPriceUSD * selectedTier.multiplier);

  // Group pricing estimate (Adults full price, Kids 50%, Infants free)
  const totalUSD = Math.round(
    adjustedBaseRate * adults + adjustedBaseRate * 0.5 * kids
  );
  const totalFormatted = Math.round(totalUSD * curr.rate).toLocaleString();
  const perAdultFormatted = Math.round(adjustedBaseRate * curr.rate).toLocaleString();

  // WhatsApp formatted inquiry message
  const buildWhatsAppMessage = () => {
    const lines = [
      "🦁 *NEW SAFARI BOOKING ENQUIRY — VOYAGEMARA*",
      "──────────────────────────",
      `*Tour:* ${currentTour.title}`,
      `*Duration:* ${currentTour.duration} (${currentTour.location})`,
      `*Start Date:* ${travelDate || "Dates to be confirmed"}`,
      `*Return Date:* ${returnDate || "Flexible"}`,
      `*Flexibility:* ${dateFlexibility}`,
      `*Party Size:* ${adults} Adults` +
        (kids > 0 ? `, ${kids} Kids (3-11y)` : "") +
        (infants > 0 ? `, ${infants} Infants` : ""),
      `*Accommodation Tier:* ${selectedTier.name}`,
      `*Vehicle:* Private 4x4 Pop-Up Roof Safari Land Cruiser`,
      `*Estimated Total:* ~${curr.symbol}${totalFormatted} (${currency})`,
      "──────────────────────────",
      `*Traveler Name:* ${guestName || "To be provided"}`,
      `*Email:* ${guestEmail || "To be provided"}`,
      guestPhone ? `*Phone/WhatsApp:* ${guestPhone}` : "",
      guestCountry ? `*Country:* ${guestCountry}` : "",
      specialRequests ? `*Special Notes:* ${specialRequests}` : "",
      "──────────────────────────",
      "TripAdvisor Listing: #d34744740 (VoyageMara Safaris)",
      "Please confirm availability, best seasonal rates, and itinerary details. Thank you!",
    ]
      .filter(Boolean)
      .join("\n");
    return encodeURIComponent(lines);
  };

  const handleWhatsAppBooking = (e) => {
    if (e) e.preventDefault();
    const url = `https://wa.me/254705814181?text=${buildWhatsAppMessage()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      setErrorMessage("Please enter your name and email address.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    const message = [
      `Tour Package: ${currentTour.title}`,
      `Duration: ${currentTour.duration}`,
      `Location: ${currentTour.location}`,
      `Start Date: ${travelDate || "Flexible"}`,
      `Return Date: ${returnDate || "Flexible"}`,
      `Date Flexibility: ${dateFlexibility}`,
      `Party Size: ${adults} Adults, ${kids} Children, ${infants} Infants`,
      `Accommodation Tier: ${selectedTier.name}`,
      `Vehicle: Private 4x4 Safari Land Cruiser`,
      `Estimated Price: ${curr.symbol}${totalFormatted} (${currency})`,
      `Phone: ${guestPhone || "Not specified"}`,
      `Country: ${guestCountry || "Not specified"}`,
      `Special Requests: ${specialRequests || "None"}`,
    ].join("\n");

    try {
      await emailjs.send(
        "service_egs1gmk",
        "template_qmm8w9k",
        {
          name: guestName,
          email: guestEmail,
          subject: `Safari Booking Request: ${currentTour.title} (${adults} Adults)`,
          message,
          time: new Date().toLocaleString(),
        },
        "XlvozJruwt1UBTXLu"
      );
      setSubmitted(true);
    } catch {
      setErrorMessage(
        "Could not send email automatically. Please connect with us directly on WhatsApp (+254 705 814 181) for instant confirmation."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="vm-booking-page">
      <Helmet>
        <title>Book Your Kenya Safari | Direct TripAdvisor Listed Operator | VoyageMara Safaris</title>
        <meta
          name="description"
          content="Book your Kenya safari directly with VoyageMara Safaris. TripAdvisor verified local Nairobi operator (#d34744740). Private 4x4 Land Cruisers, Maasai guides, instant quotes & zero middleman fees."
        />
        <link rel="canonical" href="https://voyagemara-adventure.vercel.app/booking" />
      </Helmet>

      {/* TOP NOTIFICATION BAR */}
      <aside className="vm-booking-top-trust" aria-label="TripAdvisor verification">
        <div className="vm-booking-container vm-top-trust-inner">
          <div className="vm-ta-tag">
            <FaTripadvisor className="vm-ta-icon" />
            <span>TripAdvisor Listed Tour Operator</span>
            <span className="vm-ta-stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </span>
          </div>
          <div className="vm-ta-perks">
            <span>✓ Direct Local Booking · No 20% OTA Markup</span>
            <span>✓ 100% Private 4×4 Land Cruiser Guaranteed</span>
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="vm-ta-link"
            >
              View on TripAdvisor →
            </a>
          </div>
        </div>
      </aside>

      {/* PAGE HEADER */}
      <header className="vm-booking-header">
        <div className="vm-booking-container">
          <span className="vm-booking-eyebrow">
            OFFICIAL RESERVATIONS & INSTANT QUOTE ENGINE
          </span>
          <h1>Custom Kenya Safari Reservations</h1>
          <p className="vm-booking-subtitle">
            Plan and price your safari with Duncan Ronkorua and our Nairobi-based wildlife team.
            Transparent itemized pricing, certified native Maasai guides, and zero hidden park fees.
          </p>

          <div className="vm-booking-highlights-bar">
            <div className="vm-b-hl-item">
              <FaShieldAlt className="vm-b-hl-icon" />
              <div>
                <strong>TripAdvisor Verified</strong>
                <span>Direct Kenya Operator #d34744740</span>
              </div>
            </div>
            <div className="vm-b-hl-item">
              <FaCar className="vm-b-hl-icon" />
              <div>
                <strong>Private 4×4 Fleet</strong>
                <span>Guaranteed window seats & pop-up roof</span>
              </div>
            </div>
            <div className="vm-b-hl-item">
              <FaBinoculars className="vm-b-hl-icon" />
              <div>
                <strong>Maasai Trackers</strong>
                <span>Born & raised savannah trackers</span>
              </div>
            </div>
            <div className="vm-b-hl-item">
              <FaClock className="vm-b-hl-icon" />
              <div>
                <strong>Fast Availability</strong>
                <span>Direct WhatsApp responses in under 1 hour</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN BOOKING CALCULATOR & FORM */}
      <main className="vm-booking-main" id="booking-calculator">
        <div className="vm-booking-container vm-booking-layout">
          {/* LEFT COLUMN: THE BOOKING CONFIGURATOR */}
          <section className="vm-booking-configurator" aria-label="Safari reservation options">
            {submitted ? (
              <div className="vm-booking-success-card">
                <FaCheckCircle className="vm-success-icon" />
                <h2>Booking Request Received!</h2>
                <p>
                  Asante sana, <strong>{guestName}</strong>! Your safari inquiry for the{" "}
                  <strong>{currentTour.title}</strong> has been logged. Our Nairobi team is
                  reviewing lodge availability and park permits for your dates.
                </p>

                <div className="vm-success-summary">
                  <div>
                    <span>Selected Safari</span>
                    <strong>{currentTour.title} ({currentTour.duration})</strong>
                  </div>
                  <div>
                    <span>Travel Party</span>
                    <strong>{adults} Adults {kids > 0 ? `, ${kids} Children` : ""}</strong>
                  </div>
                  <div>
                    <span>Dates</span>
                    <strong>{travelDate || "Flexible"} → {returnDate || "Flexible"}</strong>
                  </div>
                  <div>
                    <span>Estimated Total</span>
                    <strong>{curr.symbol}{totalFormatted} {currency}</strong>
                  </div>
                </div>

                <p className="vm-success-note">
                  Need an instant confirmation or have quick questions? Tap below to connect
                  directly with our Head Guide Duncan on WhatsApp:
                </p>

                <button
                  type="button"
                  className="vm-btn-whatsapp-large"
                  onClick={handleWhatsAppBooking}
                >
                  <FaWhatsapp /> Chat Directly on WhatsApp (+254 705 814 181)
                </button>

                <button
                  type="button"
                  className="vm-btn-reset"
                  onClick={() => setSubmitted(false)}
                >
                  Modify or Book Another Safari
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitEmail} noValidate>
                {/* STEP 1: SELECT TOUR */}
                <fieldset className="vm-step-card">
                  <legend className="vm-step-legend">
                    <span className="vm-step-num">1</span>
                    <div>
                      <h2>Choose Your Kenya Safari Experience</h2>
                      <p>Select one of our signature itineraries or customize your own route</p>
                    </div>
                  </legend>

                  <div className="vm-tours-pill-grid">
                    {tours.map((t) => (
                      <button
                        key={t.slug}
                        type="button"
                        className={`vm-tour-select-card ${
                          selectedTourSlug === t.slug ? "active" : ""
                        }`}
                        onClick={() => setSelectedTourSlug(t.slug)}
                      >
                        <div className="vm-tsc-img-wrap">
                          <img
                            src={t.cover}
                            alt={t.title}
                            loading="lazy"
                            width="120"
                            height="80"
                          />
                        </div>
                        <div className="vm-tsc-content">
                          <span className="vm-tsc-category">{t.category}</span>
                          <strong className="vm-tsc-title">{t.title}</strong>
                          <div className="vm-tsc-meta">
                            <span><FaClock /> {t.duration}</span>
                            <span><FaMapMarkerAlt /> {t.location.split(",")[0]}</span>
                          </div>
                          <span className="vm-tsc-price">
                            From <strong>${t.price}</strong> / adult
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* STEP 2: DATES & TIMING */}
                <fieldset className="vm-step-card">
                  <legend className="vm-step-legend">
                    <span className="vm-step-num">2</span>
                    <div>
                      <h2>Dates & Flexibility</h2>
                      <p>When would you like to explore Kenya?</p>
                    </div>
                  </legend>

                  <div className="vm-form-row vm-form-dates-row">
                    <div className="vm-field-col">
                      <label htmlFor="b-start-date">
                        <FaCalendarAlt /> Safari Departure Date
                      </label>
                      <input
                        id="b-start-date"
                        type="date"
                        min={minDateStr}
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="vm-input"
                      />
                    </div>

                    <div className="vm-field-col">
                      <label htmlFor="b-return-date">
                        <FaCalendarAlt /> Safari Return Date
                      </label>
                      <input
                        id="b-return-date"
                        type="date"
                        min={travelDate || minDateStr}
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="vm-input"
                      />
                    </div>
                  </div>

                  <div className="vm-flexibility-options">
                    <span className="vm-label-small">Date Flexibility:</span>
                    <div className="vm-radio-group">
                      {[
                        { id: "flexible", label: "Flexible (+/- 3 days)" },
                        { id: "exact", label: "Fixed / Exact Dates" },
                        { id: "exploring", label: "Just Exploring Seasons" },
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          className={`vm-radio-pill ${
                            dateFlexibility === opt.id ? "active" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="dateFlexibility"
                            value={opt.id}
                            checked={dateFlexibility === opt.id}
                            onChange={(e) => setDateFlexibility(e.target.value)}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </fieldset>

                {/* STEP 3: PARTY SIZE & VEHICLE */}
                <fieldset className="vm-step-card">
                  <legend className="vm-step-legend">
                    <span className="vm-step-num">3</span>
                    <div>
                      <h2>Party Size & Vehicle Setup</h2>
                      <p>Every VoyageMara safari includes an exclusive 4×4 Land Cruiser</p>
                    </div>
                  </legend>

                  <div className="vm-counter-grid">
                    <div className="vm-counter-box">
                      <div className="vm-cb-info">
                        <strong>Adults (12+ yrs)</strong>
                        <span>Full safari rate</span>
                      </div>
                      <div className="vm-counter-controls">
                        <button
                          type="button"
                          onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                          aria-label="Decrease adults"
                        >
                          −
                        </button>
                        <span>{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults((prev) => Math.min(14, prev + 1))}
                          aria-label="Increase adults"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="vm-counter-box">
                      <div className="vm-cb-info">
                        <strong>Children (3–11 yrs)</strong>
                        <span>50% discounted rate</span>
                      </div>
                      <div className="vm-counter-controls">
                        <button
                          type="button"
                          onClick={() => setKids((prev) => Math.max(0, prev - 1))}
                          aria-label="Decrease children"
                        >
                          −
                        </button>
                        <span>{kids}</span>
                        <button
                          type="button"
                          onClick={() => setKids((prev) => Math.min(6, prev + 1))}
                          aria-label="Increase children"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="vm-counter-box">
                      <div className="vm-cb-info">
                        <strong>Infants (0–2 yrs)</strong>
                        <span>Travel free</span>
                      </div>
                      <div className="vm-counter-controls">
                        <button
                          type="button"
                          onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                          aria-label="Decrease infants"
                        >
                          −
                        </button>
                        <span>{infants}</span>
                        <button
                          type="button"
                          onClick={() => setInfants((prev) => Math.min(3, prev + 1))}
                          aria-label="Increase infants"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="vm-vehicle-guarantee-note">
                    <FaCar className="vm-vgn-icon" />
                    <div>
                      <strong>Guaranteed Private Safari Land Cruiser</strong>
                      <p>
                        You will never be crammed with strangers. Your group gets an exclusive
                        4WD Toyota Land Cruiser with pop-up roof hatches, high-frequency radio,
                        cool-box, charging sockets & guaranteed window seats.
                      </p>
                    </div>
                  </div>
                </fieldset>

                {/* STEP 4: ACCOMMODATION TIER */}
                <fieldset className="vm-step-card">
                  <legend className="vm-step-legend">
                    <span className="vm-step-num">4</span>
                    <div>
                      <h2>Accommodation Style</h2>
                      <p>Select your preferred lodge category for this journey</p>
                    </div>
                  </legend>

                  <div className="vm-tier-cards-grid">
                    {ACCOMMODATION_TIERS.map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        className={`vm-tier-card ${
                          accommodationTier === tier.id ? "active" : ""
                        }`}
                        onClick={() => setAccommodationTier(tier.id)}
                      >
                        <div className="vm-tc-top">
                          <span className="vm-tc-tag">{tier.tag}</span>
                          <strong className="vm-tc-name">{tier.name}</strong>
                        </div>
                        <p className="vm-tc-desc">{tier.desc}</p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* STEP 5: TRAVELER CONTACT DETAILS */}
                <fieldset className="vm-step-card">
                  <legend className="vm-step-legend">
                    <span className="vm-step-num">5</span>
                    <div>
                      <h2>Your Contact Information</h2>
                      <p>We use these details only to deliver your quote and itinerary</p>
                    </div>
                  </legend>

                  <div className="vm-form-grid">
                    <div className="vm-field-col">
                      <label htmlFor="b-name">
                        Full Name <span className="vm-req">*</span>
                      </label>
                      <input
                        id="b-name"
                        type="text"
                        required
                        placeholder="e.g. Michael Turner"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="vm-input"
                        autoComplete="name"
                      />
                    </div>

                    <div className="vm-field-col">
                      <label htmlFor="b-email">
                        Email Address <span className="vm-req">*</span>
                      </label>
                      <input
                        id="b-email"
                        type="email"
                        required
                        placeholder="e.g. michael@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="vm-input"
                        autoComplete="email"
                      />
                    </div>

                    <div className="vm-field-col">
                      <label htmlFor="b-phone">
                        WhatsApp / Phone (with country code)
                      </label>
                      <input
                        id="b-phone"
                        type="tel"
                        placeholder="+1 555 123 4567 or +44 7..."
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="vm-input"
                        autoComplete="tel"
                      />
                    </div>

                    <div className="vm-field-col">
                      <label htmlFor="b-country">
                        Country / City of Residence
                      </label>
                      <input
                        id="b-country"
                        type="text"
                        placeholder="e.g. United Kingdom, USA, Germany..."
                        value={guestCountry}
                        onChange={(e) => setGuestCountry(e.target.value)}
                        className="vm-input"
                      />
                    </div>
                  </div>

                  <div className="vm-field-col vm-field-full">
                    <label htmlFor="b-requests">
                      Special Requests / Notes (Flight Arrival, Dietary, Honeymoon)
                    </label>
                    <textarea
                      id="b-requests"
                      rows="3"
                      placeholder="Tell us if you have flight arrival times, vegetarian meals, photography focus, or special celebrations..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="vm-textarea"
                    />
                  </div>

                  {errorMessage && (
                    <div className="vm-booking-error" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  {/* SUBMISSION BUTTONS */}
                  <div className="vm-booking-action-buttons">
                    <button
                      type="button"
                      className="vm-btn-whatsapp-primary"
                      onClick={handleWhatsAppBooking}
                      aria-label="Confirm booking via WhatsApp"
                    >
                      <FaWhatsapp className="vm-btn-icon" />
                      <span>Instant Booking on WhatsApp</span>
                      <small>Fastest confirmation · Direct to Duncan</small>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="vm-btn-email-secondary"
                      aria-label="Submit booking request via email"
                    >
                      <span>
                        {submitting
                          ? "Sending Safari Request..."
                          : "Send Official Booking Request (Email)"}
                      </span>
                      <small>Formal invoice & itinerary response within 2 hrs</small>
                    </button>
                  </div>
                </fieldset>
              </form>
            )}
          </section>

          {/* RIGHT COLUMN: STICKY TRIP SUMMARY & TRIPADVISOR TRUST CARD */}
          <aside className="vm-booking-sidebar" aria-label="Reservation summary and pricing estimate">
            <div className="vm-sticky-summary-card">
              <div className="vm-summary-header">
                <span className="vm-summary-eyebrow">ESTIMATED SUMMARY</span>
                <h3>{currentTour.title}</h3>
                <span className="vm-summary-duration">
                  <FaClock /> {currentTour.duration} · {currentTour.location.split(",")[0]}
                </span>
              </div>

              {/* CURRENCY TOGGLE */}
              <div className="vm-currency-switch-wrap">
                <span className="vm-cs-label">Currency:</span>
                <div className="vm-currency-buttons">
                  {Object.entries(CURRENCY_RATES).map(([code, c]) => (
                    <button
                      key={code}
                      type="button"
                      className={`vm-curr-btn ${currency === code ? "active" : ""}`}
                      onClick={() => setCurrency(code)}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICE DISPLAY */}
              <div className="vm-price-breakdown-box">
                <div className="vm-price-main">
                  <span className="vm-pm-label">Total Estimated Group Rate</span>
                  <div className="vm-pm-amount">
                    <span className="vm-pm-symbol">{curr.symbol}</span>
                    <strong className="vm-pm-number">{totalFormatted}</strong>
                    <span className="vm-pm-code">{currency}</span>
                  </div>
                  <span className="vm-pm-per-adult">
                    ~{curr.symbol}{perAdultFormatted} / adult · {adults} {adults === 1 ? "Adult" : "Adults"}
                    {kids > 0 && ` + ${kids} Children`}
                  </span>
                </div>

                <div className="vm-price-details-list">
                  <div className="vm-pdl-row">
                    <span>Selected Tier</span>
                    <strong>{selectedTier.name}</strong>
                  </div>
                  <div className="vm-pdl-row">
                    <span>Dates</span>
                    <strong>{travelDate ? `${travelDate}` : "Select dates"}</strong>
                  </div>
                  <div className="vm-pdl-row">
                    <span>Private Vehicle</span>
                    <strong className="vm-text-green">Included (4×4 Land Cruiser)</strong>
                  </div>
                  <div className="vm-pdl-row">
                    <span>Maasai Guide & Fuel</span>
                    <strong className="vm-text-green">Included</strong>
                  </div>
                  <div className="vm-pdl-row">
                    <span>Park Entry & Permits</span>
                    <strong className="vm-text-green">All Included</strong>
                  </div>
                  <div className="vm-pdl-row">
                    <span>Lodge Meals (Full Board)</span>
                    <strong className="vm-text-green">Included</strong>
                  </div>
                </div>
              </div>

              {/* TRIPADVISOR DIRECT GUARANTEE */}
              <div className="vm-tripadvisor-guarantee-card">
                <div className="vm-tag-header">
                  <FaTripadvisor className="vm-tag-icon" />
                  <div>
                    <strong>TripAdvisor Listed Operator</strong>
                    <span>Listing #d34744740 · Nairobi, Kenya</span>
                  </div>
                </div>
                <p>
                  Why book directly on our website instead of TripAdvisor/Viator resellers?
                </p>
                <ul className="vm-tag-perks">
                  <li>✓ <strong>Save 15–20%</strong> without third-party portal platform commissions</li>
                  <li>✓ <strong>Direct line</strong> to Head Guide Duncan Ronkorua</li>
                  <li>✓ <strong>Tailored itineraries</strong> & customized game drive hours</li>
                  <li>✓ <strong>100% deposit protection</strong> & flexible date rebooking</li>
                </ul>
                <a
                  href={TRIPADVISOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vm-btn-ta-profile"
                >
                  <FaTripadvisor /> Check our TripAdvisor Profile
                </a>
              </div>

              {/* QUICK WHATSAPP FLOATING BANNER */}
              <div className="vm-sidebar-direct-call">
                <FaPlaneArrival className="vm-sdc-icon" />
                <div>
                  <strong>Airport Pickups Included</strong>
                  <p>Complimentary transfer from Jomo Kenyatta (NBO) or Wilson Airport.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* WHY BOOK DIRECT COMPARISON TABLE */}
      <section className="vm-booking-compare-section" aria-labelledby="compare-heading">
        <div className="vm-booking-container">
          <div className="vm-compare-header">
            <span className="vm-booking-eyebrow">TRANSPARENT VALUE</span>
            <h2 id="compare-heading">Book Direct vs Third-Party Online Travel Resellers</h2>
            <p>
              Compare booking your safari directly with VoyageMara Safaris versus large overseas booking agencies.
            </p>
          </div>

          <div className="vm-compare-table-wrap">
            <div className="vm-table-scroll-hint" aria-hidden="true">
              <span>← Swipe table horizontally to compare →</span>
            </div>
            <table className="vm-compare-table">
              <thead>
                <tr>
                  <th scope="col">Safari Feature</th>
                  <th scope="col" className="vm-col-direct">VoyageMara Safaris (Direct)</th>
                  <th scope="col" className="vm-col-ota">OTA Resellers (Viator, GetYourGuide, etc.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Pricing</strong></td>
                  <td className="vm-cell-win">✓ Direct local rates (Zero 20–25% commission)</td>
                  <td className="vm-cell-loss">✗ Marked up with high middleman fees</td>
                </tr>
                <tr>
                  <td><strong>Safari Vehicle</strong></td>
                  <td className="vm-cell-win">✓ Guaranteed 4×4 Land Cruiser with pop-up roof</td>
                  <td className="vm-cell-loss">Often low-clearance minivans or shared buses</td>
                </tr>
                <tr>
                  <td><strong>Safari Guide</strong></td>
                  <td className="vm-cell-win">✓ Certified native Maasai naturalist tracker</td>
                  <td className="vm-cell-loss">Random third-party contracted drivers</td>
                </tr>
                <tr>
                  <td><strong>Customization</strong></td>
                  <td className="vm-cell-win">✓ 100% customized to your schedule & wildlife wishes</td>
                  <td className="vm-cell-loss">Rigid, cookie-cutter fixed departure schedules</td>
                </tr>
                <tr>
                  <td><strong>Direct Ground Support</strong></td>
                  <td className="vm-cell-win">✓ 24/7 WhatsApp connection with your Nairobi team</td>
                  <td className="vm-cell-loss">Overseas call center tickets & slow responses</td>
                </tr>
                <tr>
                  <td><strong>Local Conservation Impact</strong></td>
                  <td className="vm-cell-win">✓ 100% stays in Kenya with Maasai communities</td>
                  <td className="vm-cell-loss">Substantial revenues leave Kenya to foreign tech platforms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="vm-booking-faq-section" aria-labelledby="booking-faq-heading">
        <div className="vm-booking-container">
          <div className="vm-compare-header">
            <span className="vm-booking-eyebrow">COMMON QUESTIONS</span>
            <h2 id="booking-faq-heading">Frequently Asked Booking Questions</h2>
          </div>

          <div className="vm-b-faq-list">
            <details className="vm-b-faq-item">
              <summary>How does the booking & confirmation process work?</summary>
              <p>
                Once you submit your inquiry or reach us on WhatsApp, we verify lodge room
                availability and Land Cruiser allocation for your dates. We send you a formal
                itemized quote. To secure your dates and permits, a 30% deposit is made via
                secure bank wire or international card. The remaining balance is payable 14
                days prior to safari or upon arrival in Nairobi.
              </p>
            </details>

            <details className="vm-b-faq-item">
              <summary>What if our travel dates change?</summary>
              <p>
                We understand international flight schedules can shift. VoyageMara allows free
                date changes up to 14 days before your safari start date, subject to lodge
                seasonal room availability.
              </p>
            </details>

            <details className="vm-b-faq-item">
              <summary>Are park conservation fees included in the price?</summary>
              <p>
                Yes! Unlike some tour operators who advertise lower base rates and then surprise
                guests with mandatory park fee cash demands at the gate, VoyageMara quotes are
                100% all-inclusive of all Kenya Wildlife Service (KWS) and Maasai Mara National
                Reserve conservation tariffs.
              </p>
            </details>

            <details className="vm-b-faq-item">
              <summary>Can we book directly on TripAdvisor?</summary>
              <p>
                VoyageMara Safaris is an officially listed operator on TripAdvisor (#d34744740).
                While TripAdvisor facilitates traveler reviews and connects with Viator, booking
                directly with us on this website or on WhatsApp saves you 15–20% in booking fees
                and gives you direct communication with your guide.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}