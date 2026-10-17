import { useState, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";
import {
  FaTimes, FaWhatsapp, FaCalendarAlt, FaUsers, FaCompass,
  FaCheckCircle, FaPaperPlane, FaArrowRight, FaArrowLeft,
  FaStar, FaShieldAlt, FaBed, FaMoneyBillWave, FaUser,
  FaEnvelope, FaPhone, FaChevronRight
} from "react-icons/fa";
import "./BookingModal.css";

/* ─── Data ─────────────────────────────────────────────── */
const PACKAGES = [
  {
    id: "nairobi",
    title: "Nairobi National Park Day Safari",
    duration: "1 Day",
    slug: "nairobi-national-park",
    lowPrice: 180,
    peakPrice: 220,
    badge: null,
    icon: "🦏",
  },
  {
    id: "nakuru",
    title: "Lake Nakuru Flamingo Safari",
    duration: "1 Day",
    slug: "lake-nakuru",
    lowPrice: 450,
    peakPrice: 520,
    badge: null,
    icon: "🦩",
  },
  {
    id: "naivasha",
    title: "Lake Naivasha Boat & Crescent Island",
    duration: "1 Day",
    slug: "lake-naivasha",
    lowPrice: 300,
    peakPrice: 360,
    badge: null,
    icon: "🚤",
  },
  {
    id: "amboseli",
    title: "Amboseli Elephant Safari",
    duration: "2 Days / 1 Night",
    slug: "amboseli",
    lowPrice: 520,
    peakPrice: 650,
    badge: null,
    icon: "🐘",
  },
  {
    id: "maasai-mara",
    title: "Maasai Mara Big Five Safari",
    duration: "3 Days / 2 Nights",
    slug: "maasai-mara",
    lowPrice: 620,
    peakPrice: 820,
    badge: "BEST SELLER",
    icon: "🦁",
  },
  {
    id: "samburu",
    title: "Samburu Special Five Safari",
    duration: "3 Days / 2 Nights",
    slug: "samburu",
    lowPrice: 750,
    peakPrice: 1000,
    badge: null,
    icon: "🦒",
  },
  {
    id: "combo",
    title: "Mara + Amboseli Combo",
    duration: "6 Days / 5 Nights",
    slug: "maasai-mara",
    lowPrice: 1350,
    peakPrice: 1780,
    badge: "BEST VALUE",
    icon: "🌍",
  },
  {
    id: "custom",
    title: "Custom Multi-Park Itinerary",
    duration: "Flexible",
    slug: null,
    lowPrice: null,
    peakPrice: null,
    badge: null,
    icon: "🗺️",
  },
];

const ACCOMMODATION_TIERS = [
  {
    id: "budget",
    label: "Budget",
    desc: "Shared tented camps, comfortable basics",
    priceAdd: 0,
    icon: "🏕️",
  },
  {
    id: "mid-range",
    label: "Mid-Range",
    desc: "En-suite lodges, full board, private vehicle",
    priceAdd: 150,
    icon: "🏠",
    recommended: true,
  },
  {
    id: "luxury",
    label: "Luxury",
    desc: "5-star camps, gourmet meals, spa services",
    priceAdd: 400,
    icon: "✨",
  },
  {
    id: "luxury-plus",
    label: "Luxury Plus",
    desc: "Governors' Camp, Angama Mara, private butler",
    priceAdd: 900,
    icon: "👑",
  },
];

const GUEST_OPTIONS = [
  { value: "1", label: "1 — Solo Traveller (+30% supplement)" },
  { value: "2", label: "2 — Couple / Friends" },
  { value: "3", label: "3 Travellers" },
  { value: "4", label: "4 Travellers" },
  { value: "5-6", label: "5–6 Travellers (Small Group)" },
  { value: "7-10", label: "7–10 Travellers (Group)" },
  { value: "10+", label: "10+ Travellers (Corporate / Large Group)" },
];

/* ─── Helpers ───────────────────────────────────────────── */
function isPeakSeason(dateStr) {
  if (!dateStr) return false;
  const month = new Date(dateStr).getMonth(); // 0-indexed
  return month >= 6 && month <= 11; // Jul–Dec
}

function calcEstimate(pkg, tier, guests) {
  if (!pkg || pkg.lowPrice === null) return null;
  const base = isPeakSeason("") ? pkg.peakPrice : pkg.lowPrice;
  const tierAdd = tier?.priceAdd ?? 0;
  const pax = parseInt(guests) || 2;
  let pp = base + tierAdd;
  if (pax === 1) pp = Math.round(pp * 1.3);
  return pp;
}

function calcFromDate(pkg, date, tier, guests) {
  if (!pkg || pkg.lowPrice === null) return null;
  const peak = isPeakSeason(date);
  const base = peak ? pkg.peakPrice : pkg.lowPrice;
  const tierAdd = tier?.priceAdd ?? 0;
  const pax = parseInt(guests) || 2;
  let pp = base + tierAdd;
  if (pax === 1) pp = Math.round(pp * 1.3);
  return { perPerson: pp, season: peak ? "Peak" : "Low", total: pp * pax };
}

const STEPS = ["Package", "Dates & Guests", "Accommodation", "Your Details", "Review"];

/* ─── Step Components ────────────────────────────────────── */
function StepPackage({ selected, onSelect }) {
  return (
    <div className="bm-step">
      <p className="bm-step-intro">Choose your Kenya safari package. You can customise dates and accommodation next.</p>
      <div className="bm-package-grid">
        {PACKAGES.map((pkg) => (
          <button
            key={pkg.id}
            type="button"
            className={`bm-package-card${selected?.id === pkg.id ? " selected" : ""}`}
            onClick={() => onSelect(pkg)}
          >
            <span className="bm-pkg-icon">{pkg.icon}</span>
            {pkg.badge && <span className="bm-pkg-badge">{pkg.badge}</span>}
            <strong className="bm-pkg-title">{pkg.title}</strong>
            <span className="bm-pkg-duration">{pkg.duration}</span>
            {pkg.lowPrice ? (
              <span className="bm-pkg-from">From ${pkg.lowPrice}/pp</span>
            ) : (
              <span className="bm-pkg-from">Custom Quote</span>
            )}
            {selected?.id === pkg.id && <FaCheckCircle className="bm-pkg-check" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDatesGuests({ form, onChange }) {
  const peak = isPeakSeason(form.travelDate);
  return (
    <div className="bm-step">
      <div className="bm-form-grid">
        <div className="bm-field full">
          <label htmlFor="bm-date">
            <FaCalendarAlt /> Approximate Start Date
          </label>
          <input
            type="date"
            id="bm-date"
            name="travelDate"
            value={form.travelDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={onChange}
          />
          {form.travelDate && (
            <p className={`bm-season-tag${peak ? " peak" : " low"}`}>
              {peak ? "🔥 Peak Season (Jul–Dec) — higher rates apply" : "🌿 Low Season (Jan–Jun) — best value rates"}
            </p>
          )}
        </div>

        <div className="bm-field">
          <label htmlFor="bm-guests">
            <FaUsers /> Number of Travellers
          </label>
          <select id="bm-guests" name="guests" value={form.guests} onChange={onChange}>
            {GUEST_OPTIONS.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>

        <div className="bm-field">
          <label htmlFor="bm-return-date">
            <FaCalendarAlt /> Return / Flexibility
          </label>
          <select id="bm-return-date" name="flexibility" value={form.flexibility} onChange={onChange}>
            <option value="exact">Exact dates</option>
            <option value="flexible-3">Flexible ± 3 days</option>
            <option value="flexible-7">Flexible ± 1 week</option>
            <option value="month">Flexible within a month</option>
            <option value="open">Fully open — suggest best dates</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function StepAccommodation({ selected, onSelect }) {
  return (
    <div className="bm-step">
      <p className="bm-step-intro">Choose your preferred accommodation tier. All options include private 4×4 transport and expert guide.</p>
      <div className="bm-tier-grid">
        {ACCOMMODATION_TIERS.map((tier) => (
          <button
            key={tier.id}
            type="button"
            className={`bm-tier-card${selected?.id === tier.id ? " selected" : ""}${tier.recommended ? " recommended" : ""}`}
            onClick={() => onSelect(tier)}
          >
            {tier.recommended && <span className="bm-tier-recommended">RECOMMENDED</span>}
            <span className="bm-tier-icon">{tier.icon}</span>
            <strong className="bm-tier-label">{tier.label}</strong>
            <p className="bm-tier-desc">{tier.desc}</p>
            <span className="bm-tier-price">
              {tier.priceAdd === 0 ? "Lowest cost" : `+$${tier.priceAdd}/pp`}
            </span>
            {selected?.id === tier.id && <FaCheckCircle className="bm-tier-check" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDetails({ form, onChange }) {
  return (
    <div className="bm-step">
      <div className="bm-form-grid">
        <div className="bm-field">
          <label htmlFor="bm-name"><FaUser /> Full Name *</label>
          <input
            type="text"
            id="bm-name"
            name="fullName"
            placeholder="e.g. John Smith"
            value={form.fullName}
            onChange={onChange}
            required
          />
        </div>
        <div className="bm-field">
          <label htmlFor="bm-email"><FaEnvelope /> Email Address *</label>
          <input
            type="email"
            id="bm-email"
            name="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="bm-field full">
          <label htmlFor="bm-phone"><FaPhone /> Phone / WhatsApp</label>
          <input
            type="tel"
            id="bm-phone"
            name="phone"
            placeholder="+1 555-0199 or +254 700 000 000"
            value={form.phone}
            onChange={onChange}
          />
        </div>
        <div className="bm-field full">
          <label htmlFor="bm-nationality">Nationality / Country</label>
          <input
            type="text"
            id="bm-nationality"
            name="nationality"
            placeholder="e.g. United States, UK, Germany"
            value={form.nationality}
            onChange={onChange}
          />
        </div>
        <div className="bm-field full">
          <label htmlFor="bm-requests">Special Requests / Notes</label>
          <textarea
            id="bm-requests"
            name="specialRequests"
            rows="3"
            placeholder="Dietary needs, photography goals, children's ages, accessibility needs, must-see wildlife, add-ons (balloon safari, bush walk, Maasai village)..."
            value={form.specialRequests}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

function StepReview({ selectedPkg, selectedTier, form, priceInfo }) {
  const summary = [
    { label: "Package", value: selectedPkg?.title ?? "—" },
    { label: "Duration", value: selectedPkg?.duration ?? "—" },
    { label: "Start Date", value: form.travelDate || "Flexible" },
    { label: "Date Flexibility", value: form.flexibility || "Exact" },
    { label: "Travellers", value: form.guests },
    { label: "Accommodation", value: selectedTier?.label ?? "—" },
    { label: "Season", value: priceInfo?.season ?? "—" },
    { label: "Name", value: form.fullName || "—" },
    { label: "Email", value: form.email || "—" },
    { label: "Phone", value: form.phone || "—" },
    { label: "Nationality", value: form.nationality || "—" },
  ];

  return (
    <div className="bm-step">
      <div className="bm-review-card">
        {priceInfo && (
          <div className="bm-price-estimate">
            <p className="bm-estimate-label">Estimated Cost</p>
            <p className="bm-estimate-pp">${priceInfo.perPerson.toLocaleString()}<span>/person</span></p>
            {priceInfo.total !== priceInfo.perPerson && (
              <p className="bm-estimate-total">~${priceInfo.total.toLocaleString()} total for {form.guests} pax</p>
            )}
            <p className="bm-estimate-note">
              {priceInfo.season} season pricing. Final quote confirmed by our safari team.
            </p>
          </div>
        )}

        <div className="bm-summary-grid">
          {summary.filter(r => r.value && r.value !== "—").map((row) => (
            <div key={row.label} className="bm-summary-row">
              <span className="bm-summary-label">{row.label}</span>
              <span className="bm-summary-value">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {form.specialRequests && (
        <div className="bm-review-notes">
          <strong>Notes:</strong> {form.specialRequests}
        </div>
      )}

      <div className="bm-guarantee-bar">
        <span><FaShieldAlt /> No payment now</span>
        <span>🔒 100% private</span>
        <span>⚡ Reply within 2 hours</span>
        <span>✅ Free consultation</span>
      </div>
    </div>
  );
}

/* ─── Main Modal ─────────────────────────────────────────── */
export default function BookingModal({ isOpen, onClose, initialData = {} }) {
  const [step, setStep] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [selectedTier, setSelectedTier] = useState(ACCOMMODATION_TIERS[1]);
  const [form, setForm] = useState({
    travelDate: "",
    guests: "2",
    flexibility: "flexible-3",
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    specialRequests: "",
  });
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Pre-populate from parent
  useEffect(() => {
    if (initialData.tour) {
      const pkg = PACKAGES.find(p => p.title === initialData.tour || p.id === initialData.tour);
      if (pkg) setSelectedPkg(pkg);
    }
    if (initialData.travelDate) setForm(f => ({ ...f, travelDate: initialData.travelDate }));
    if (initialData.guests) setForm(f => ({ ...f, guests: initialData.guests }));
  }, [initialData]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatusMsg("");
      setSuccess(false);
      setStep(0);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }, []);

  const priceInfo = selectedPkg && form.guests
    ? calcFromDate(selectedPkg, form.travelDate, selectedTier, form.guests)
    : null;

  // Build WhatsApp message
  const buildWAMsg = () => {
    const lines = [
      "Hello VoyageMara Safaris! I'd like to request a safari quote:",
      "",
      `*Package:* ${selectedPkg?.title ?? "Custom"}`,
      `*Duration:* ${selectedPkg?.duration ?? "—"}`,
      `*Start Date:* ${form.travelDate || "Flexible"}`,
      `*Flexibility:* ${form.flexibility || "Exact"}`,
      `*Travellers:* ${form.guests}`,
      `*Accommodation:* ${selectedTier?.label ?? "—"}`,
      priceInfo ? `*Estimated Budget:* ~$${priceInfo.perPerson}/pp (${priceInfo.season} season)` : "",
      "",
      `*Name:* ${form.fullName || "—"}`,
      form.email ? `*Email:* ${form.email}` : "",
      form.phone ? `*Phone:* ${form.phone}` : "",
      form.nationality ? `*Nationality:* ${form.nationality}` : "",
      form.specialRequests ? `*Notes:* ${form.specialRequests}` : "",
      "",
      "Please confirm availability and send a detailed itinerary. Thank you!",
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  };

  const handleWA = (e) => {
    if (e) e.preventDefault();
    window.open(`https://wa.me/254705814181?text=${buildWAMsg()}`, "_blank", "noopener,noreferrer");
  };

  const handleEmailSend = async () => {
    if (!form.fullName || !form.email) {
      setStatusMsg("Please provide your name and email so we can reply.");
      return;
    }
    setSending(true);
    setStatusMsg("");

    const notes = [
      `Package: ${selectedPkg?.title ?? "Custom"}`,
      `Duration: ${selectedPkg?.duration ?? "—"}`,
      `Start Date: ${form.travelDate || "Flexible"}`,
      `Flexibility: ${form.flexibility}`,
      `Travellers: ${form.guests}`,
      `Accommodation: ${selectedTier?.label}`,
      priceInfo ? `Est. Budget: ~$${priceInfo.perPerson}/pp (${priceInfo.season} season)` : "",
      `Phone: ${form.phone || "Not provided"}`,
      `Nationality: ${form.nationality || "Not provided"}`,
      `Notes: ${form.specialRequests || "None"}`,
    ].filter(Boolean).join("\n");

    try {
      await emailjs.send("service_egs1gmk", "template_qmm8w9k", {
        name: form.fullName,
        email: form.email,
        subject: `Safari Booking Enquiry — ${selectedPkg?.title ?? "Custom Safari"} (${form.guests} pax)`,
        message: notes,
        time: new Date().toLocaleString(),
      }, "XlvozJruwt1UBTXLu");
      setSuccess(true);
      setStatusMsg("Your enquiry has been sent! Our safari team will reply within 2 hours.");
    } catch {
      setStatusMsg("Could not send email right now. Please chat on WhatsApp or call +254 705 814 181.");
    } finally {
      setSending(false);
    }
  };

  const canNext = () => {
    if (step === 0 && !selectedPkg) return false;
    if (step === 3 && (!form.fullName || !form.email)) return false;
    return true;
  };

  const next = () => { if (canNext()) setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const prev = () => setStep(s => Math.max(s - 1, 0));

  if (!isOpen) return null;

  return (
    <div
      className="bm-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bm-title"
    >
      <div className="bm-modal" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className="bm-close" onClick={onClose} type="button" aria-label="Close booking form">
          <FaTimes />
        </button>

        {/* Header */}
        <div className="bm-header">
          <div className="bm-header-text">
            <span className="bm-kicker"><FaCompass /> FREE SAFARI QUOTE — NO PAYMENT NOW</span>
            <h2 id="bm-title">Plan Your Kenya Safari</h2>
          </div>
          {/* Progress Steps */}
          <div className="bm-progress" role="navigation" aria-label="Booking steps">
            {STEPS.map((s, i) => (
              <button
                key={s}
                type="button"
                className={`bm-step-dot${i === step ? " active" : ""}${i < step ? " done" : ""}`}
                onClick={() => i < step && setStep(i)}
                aria-label={`Step ${i + 1}: ${s}`}
                aria-current={i === step ? "step" : undefined}
                disabled={i > step}
              >
                <span className="bm-dot-num">{i < step ? <FaCheckCircle /> : i + 1}</span>
                <span className="bm-dot-label">{s}</span>
              </button>
            ))}
            <div className="bm-progress-bar">
              <div
                className="bm-progress-fill"
                style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bm-body">
          {!success ? (
            <>
              <div className="bm-step-title">
                <strong>Step {step + 1} of {STEPS.length}:</strong> {STEPS[step]}
              </div>

              {step === 0 && <StepPackage selected={selectedPkg} onSelect={pkg => { setSelectedPkg(pkg); next(); }} />}
              {step === 1 && <StepDatesGuests form={form} onChange={handleChange} />}
              {step === 2 && <StepAccommodation selected={selectedTier} onSelect={tier => { setSelectedTier(tier); next(); }} />}
              {step === 3 && <StepDetails form={form} onChange={handleChange} />}
              {step === 4 && <StepReview selectedPkg={selectedPkg} selectedTier={selectedTier} form={form} priceInfo={priceInfo} />}

              {statusMsg && (
                <p className={`bm-status ${success ? "success" : "error"}`} role="alert">
                  {statusMsg}
                </p>
              )}

              {/* Nav buttons */}
              <div className="bm-footer-btns">
                {step > 0 && (
                  <button type="button" className="bm-btn-back" onClick={prev}>
                    <FaArrowLeft /> Back
                  </button>
                )}
                <div className="bm-footer-right">
                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      className="bm-btn-next"
                      onClick={next}
                      disabled={!canNext()}
                    >
                      Continue <FaArrowRight />
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="bm-btn-wa"
                        onClick={handleWA}
                      >
                        <FaWhatsapp /> Send via WhatsApp
                      </button>
                      <button
                        type="button"
                        className="bm-btn-email"
                        onClick={handleEmailSend}
                        disabled={sending}
                      >
                        <FaPaperPlane /> {sending ? "Sending..." : "Send Email Enquiry"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="bm-success">
              <div className="bm-success-icon-wrap">
                <FaCheckCircle />
              </div>
              <h3>Enquiry Received!</h3>
              <p>
                Thank you, <strong>{form.fullName}</strong>! Our Nairobi safari team will
                contact you at <strong>{form.email}</strong> within 2 hours with a fully
                customised itinerary and transparent quote.
              </p>
              <p className="bm-success-sub">
                For instant confirmation, chat with us on WhatsApp — Peter or David will reply immediately.
              </p>
              <button
                type="button"
                className="bm-btn-wa bm-btn-lg"
                onClick={handleWA}
              >
                <FaWhatsapp /> Continue on WhatsApp (+254 705 814 181)
              </button>
              <button type="button" className="bm-success-close" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
