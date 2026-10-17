import { useState, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { FaTimes, FaWhatsapp, FaPaperPlane, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import "./BookingModal.css";

const SAFARI_STYLES = ["Budget Safari", "Mid-Range Safari", "Luxury Safari"];
const CURRENCIES = ["GBP", "EUR", "USD", "KES"];

export default function BookingModal({ isOpen, onClose, initialData = {} }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    adults: "",
    kids: "",
    infants: "",
    currency: "USD",
    safariStyle: "Mid-Range Safari",
    details: "",
  });
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Pre-populate from parent
  useEffect(() => {
    if (initialData.tour) {
      setForm((f) => ({
        ...f,
        details: f.details || `Interested in: ${initialData.tour}`,
      }));
    }
    if (initialData.travelDate)
      setForm((f) => ({ ...f, startDate: initialData.travelDate }));
    if (initialData.guests)
      setForm((f) => ({ ...f, adults: String(initialData.guests) }));
  }, [initialData]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatusMsg("");
      setSuccess(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  // Build WhatsApp message
  const buildWAMsg = () => {
    const lines = [
      "Hello VoyageMara Safaris! I'd like to request a safari quote:",
      "",
      `*Name:* ${form.fullName || "—"}`,
      `*Email:* ${form.email || "—"}`,
      form.phone ? `*Phone:* ${form.phone}` : "",
      `*Trip Dates:* ${form.startDate || "Flexible"} → ${form.endDate || "Flexible"}`,
      `*Adults:* ${form.adults || "—"} | *Kids:* ${form.kids || "0"} | *Infants:* ${form.infants || "0"}`,
      `*Currency:* ${form.currency}`,
      `*Safari Style:* ${form.safariStyle}`,
      form.details ? `*Details:* ${form.details}` : "",
      "",
      "Please send a detailed itinerary and quote. Thank you!",
    ]
      .filter(Boolean)
      .join("\n");
    return encodeURIComponent(lines);
  };

  const handleWA = (e) => {
    if (e) e.preventDefault();
    window.open(
      `https://wa.me/254705814181?text=${buildWAMsg()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email) {
      setStatusMsg("Please provide your name and email.");
      return;
    }
    setSending(true);
    setStatusMsg("");

    const message = [
      `Trip Dates: ${form.startDate || "Flexible"} → ${form.endDate || "Flexible"}`,
      `Adults: ${form.adults || "—"} | Kids: ${form.kids || "0"} | Infants: ${form.infants || "0"}`,
      `Currency: ${form.currency}`,
      `Safari Style: ${form.safariStyle}`,
      `Phone: ${form.phone || "Not provided"}`,
      `Details: ${form.details || "None"}`,
    ].join("\n");

    try {
      await emailjs.send(
        "service_egs1gmk",
        "template_qmm8w9k",
        {
          name: form.fullName,
          email: form.email,
          subject: `Safari Booking Inquiry — ${form.safariStyle} (${form.adults || "?"} adults)`,
          message,
          time: new Date().toLocaleString(),
        },
        "XlvozJruwt1UBTXLu"
      );
      setSuccess(true);
      setStatusMsg(
        "Your inquiry has been sent! Our safari team will reply within 2 hours."
      );
    } catch {
      setStatusMsg(
        "Could not send email. Please chat on WhatsApp or call +254 705 814 181."
      );
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="bm-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bm-title"
    >
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          className="bm-close"
          onClick={onClose}
          type="button"
          aria-label="Close booking form"
        >
          <FaTimes />
        </button>

        {!success ? (
          <form className="bm-form" onSubmit={handleSubmit} noValidate>
            {/* Header */}
            <div className="bm-header">
              <h2 id="bm-title">Book Your Dream Safari</h2>
              <p>Fill in the details to begin your adventure</p>
            </div>

            {/* Full Name */}
            <div className="bm-field">
              <label htmlFor="bm-name">Full Name</label>
              <input
                type="text"
                id="bm-name"
                name="fullName"
                placeholder="Name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="bm-field">
              <label htmlFor="bm-email">Email Address</label>
              <input
                type="email"
                id="bm-email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="bm-field">
              <label htmlFor="bm-phone">WhatsApp / Phone Number</label>
              <input
                type="tel"
                id="bm-phone"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* Dates Row */}
            <div className="bm-row">
              <div className="bm-field">
                <label htmlFor="bm-start">Trip Start Date</label>
                <input
                  type="date"
                  id="bm-start"
                  name="startDate"
                  value={form.startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleChange}
                />
              </div>
              <div className="bm-field">
                <label htmlFor="bm-end">Trip End Date</label>
                <input
                  type="date"
                  id="bm-end"
                  name="endDate"
                  value={form.endDate}
                  min={form.startDate || new Date().toISOString().split("T")[0]}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Guests Row */}
            <label className="bm-label-top">Number of Guests</label>
            <div className="bm-row bm-guests-row">
              <div className="bm-field bm-mini">
                <label htmlFor="bm-adults">Adults</label>
                <input
                  type="text"
                  id="bm-adults"
                  name="adults"
                  placeholder="Adults (12+)"
                  value={form.adults}
                  onChange={handleChange}
                />
              </div>
              <div className="bm-field bm-mini">
                <label htmlFor="bm-kids">Kids</label>
                <input
                  type="text"
                  id="bm-kids"
                  name="kids"
                  placeholder="Kids (3-11yrs)"
                  value={form.kids}
                  onChange={handleChange}
                />
              </div>
              <div className="bm-field bm-mini">
                <label htmlFor="bm-infants">Infants</label>
                <input
                  type="text"
                  id="bm-infants"
                  name="infants"
                  placeholder="Infants (Below 3)"
                  value={form.infants}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Currency */}
            <div className="bm-field">
              <label className="bm-label-top">Preferred Currency</label>
              <div className="bm-radio-group">
                {CURRENCIES.map((c) => (
                  <label key={c} className="bm-radio">
                    <input
                      type="radio"
                      name="currency"
                      value={c}
                      checked={form.currency === c}
                      onChange={handleChange}
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Safari Style */}
            <div className="bm-field">
              <label className="bm-label-top">Safari Style</label>
              <div className="bm-radio-group">
                {SAFARI_STYLES.map((s) => (
                  <label key={s} className="bm-radio">
                    <input
                      type="radio"
                      name="safariStyle"
                      value={s}
                      checked={form.safariStyle === s}
                      onChange={handleChange}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="bm-field">
              <label htmlFor="bm-details">Safari Details & Special Requests</label>
              <textarea
                id="bm-details"
                name="details"
                rows="4"
                placeholder="Please share any additional details, preferred national parks (e.g., Maasai Mara, Amboseli), accommodation preferences, interests, or specific requests for your customized safari experience… We are planning our honeymoon and want a"
                value={form.details}
                onChange={handleChange}
              />
            </div>

            {statusMsg && !success && (
              <p className="bm-status error" role="alert">
                {statusMsg}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bm-submit-btn"
              disabled={sending}
            >
              {sending ? "Sending..." : "SUBMIT BOOKING INQUIRY ✉"}
            </button>

            {/* WhatsApp alternative */}
            <button
              type="button"
              className="bm-wa-alt"
              onClick={handleWA}
            >
              <FaWhatsapp /> Or send via WhatsApp
            </button>

            {/* Trust strip */}
            <div className="bm-trust">
              <span><FaShieldAlt /> No payment now</span>
              <span>🔒 100% private</span>
              <span>⚡ Reply in 2 hours</span>
            </div>
          </form>
        ) : (
          /* ── Success State ────────────────────────── */
          <div className="bm-success">
            <div className="bm-success-icon">
              <FaCheckCircle />
            </div>
            <h3>Inquiry Received!</h3>
            <p>
              Thank you, <strong>{form.fullName}</strong>! Our Nairobi safari team
              will contact you at <strong>{form.email}</strong> within 2 hours
              with a fully customised itinerary and transparent quote.
            </p>
            <p className="bm-success-sub">
              For instant confirmation, chat with us on WhatsApp — Peter or David
              will reply immediately.
            </p>
            <button type="button" className="bm-wa-success" onClick={handleWA}>
              <FaWhatsapp /> Continue on WhatsApp
            </button>
            <button type="button" className="bm-close-success" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
