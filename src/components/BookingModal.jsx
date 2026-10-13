import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaTimes, FaWhatsapp, FaCalendarAlt, FaUsers, FaCompass, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import "./BookingModal.css";

const TOURS_LIST = [
  "3-Day Maasai Mara Big Five Safari",
  "2-Day Amboseli Elephant & Kilimanjaro Safari",
  "3-Day Samburu Northern Special Five Safari",
  "1-Day Lake Nakuru Rhino & Flamingo Safari",
  "1-Day Lake Naivasha Boat & Crescent Island Tour",
  "1-Day Nairobi National Park Safari",
  "Custom Multi-Park Kenya Itinerary",
];

const ACCOMMODATION_TIERS = [
  "Luxury Tented Camp (5-Star)",
  "Mid-Range Safari Lodge",
  "Comfort Safari Camp",
  "Budget / Camping Safari",
  "Not sure yet — recommend options",
];

const BUDGET_RANGES = [
  "Flexible / Best Value",
  "$300 – $600 per person",
  "$600 – $1,200 per person",
  "$1,200 – $2,500 per person",
  "$2,500+ Luxury tier",
];

export default function BookingModal({ isOpen, onClose, initialData = {} }) {
  const [form, setForm] = useState({
    tour: initialData.tour || TOURS_LIST[0],
    travelDate: initialData.travelDate || "",
    guests: initialData.guests || "2 travellers",
    accommodation: initialData.accommodation || ACCOMMODATION_TIERS[1],
    budget: initialData.budget || BUDGET_RANGES[0],
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialData.tour) {
      setForm((prev) => ({
        ...prev,
        tour: initialData.tour,
        travelDate: initialData.travelDate || prev.travelDate,
        guests: initialData.guests || prev.guests,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatusMessage("");
      setIsSuccess(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      "Hello VoyageMara Safaris! I would like to book / enquire about a Kenya safari:",
      "",
      `*Selected Tour:* ${form.tour}`,
      `*Approx. Travel Date:* ${form.travelDate || "Flexible / To be confirmed"}`,
      `*Number of Travellers:* ${form.guests}`,
      `*Accommodation Preference:* ${form.accommodation}`,
      `*Budget Preference:* ${form.budget}`,
      "",
      `*Full Name:* ${form.fullName || "Prospective Traveller"}`,
      form.email ? `*Email:* ${form.email}` : "",
      form.phone ? `*Phone/WhatsApp:* ${form.phone}` : "",
      form.specialRequests ? `*Special Requests / Notes:* ${form.specialRequests}` : "",
      "",
      "Please confirm availability, custom dates, and provide a tailored quote. Thank you!",
    ].filter(Boolean);

    return encodeURIComponent(lines.join("\n"));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const encoded = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/254705814181?text=${encoded}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email) {
      setStatusMessage("Please provide your name and email address so we can reply.");
      return;
    }

    setLoading(true);
    setStatusMessage("");

    const structuredNotes = `
SAFARI ENQUIRY DETAILS:
- Safari Package: ${form.tour}
- Approx Travel Date: ${form.travelDate || "Flexible"}
- Travellers: ${form.guests}
- Accommodation Tier: ${form.accommodation}
- Budget: ${form.budget}
- Phone/WhatsApp: ${form.phone || "Not provided"}

SPECIAL REQUESTS & NOTES:
${form.specialRequests || "No extra notes specified."}
    `.trim();

    const templateParams = {
      name: form.fullName,
      email: form.email,
      subject: `Safari Booking Enquiry: ${form.tour} (${form.guests})`,
      message: structuredNotes,
      time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        "service_egs1gmk",
        "template_qmm8w9k",
        templateParams,
        "XlvozJruwt1UBTXLu"
      );
      setIsSuccess(true);
      setStatusMessage("Thank you! Your safari enquiry has been sent to our planning team. We will respond promptly.");
    } catch {
      setStatusMessage("We could not send your message online just now. You can chat directly with us on WhatsApp or call +254 705 814 181.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vm-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="vm-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="vm-modal-close" onClick={onClose} type="button" aria-label="Close booking modal">
          <FaTimes />
        </button>

        <div className="vm-modal-header">
          <span className="vm-modal-kicker">
            <FaCompass /> VOYAGEMARA DIRECT BOOKING &amp; ENQUIRY
          </span>
          <h2 id="modal-title">Plan Your Kenya Safari Experience</h2>
          <p>
            Share your preferred dates and travel style. We will craft a transparent, customized itinerary with no hidden costs.
          </p>
        </div>

        {isSuccess ? (
          <div className="vm-modal-success">
            <FaCheckCircle className="vm-success-icon" />
            <h3>Enquiry Successfully Received!</h3>
            <p>Our safari director is reviewing your request. For immediate assistance or instant date confirmation, chat with us directly on WhatsApp.</p>
            <div className="vm-modal-actions single">
              <a
                href={`https://wa.me/254705814181?text=${buildWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="vm-btn-whatsapp"
              >
                <FaWhatsapp /> Continue on WhatsApp (+254 705 814 181)
              </a>
            </div>
          </div>
        ) : (
          <form className="vm-modal-form" onSubmit={handleEmailSubmit}>
            <div className="vm-form-grid">
              {/* Tour Selection */}
              <div className="vm-form-group full-width">
                <label htmlFor="vm-tour">Selected Safari Tour</label>
                <select id="vm-tour" name="tour" value={form.tour} onChange={handleChange}>
                  {TOURS_LIST.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Date */}
              <div className="vm-form-group">
                <label htmlFor="vm-date">
                  <FaCalendarAlt /> Approximate Travel Date
                </label>
                <input
                  type="date"
                  id="vm-date"
                  name="travelDate"
                  value={form.travelDate}
                  onChange={handleChange}
                />
              </div>

              {/* Guests */}
              <div className="vm-form-group">
                <label htmlFor="vm-guests">
                  <FaUsers /> Number of Travellers
                </label>
                <select id="vm-guests" name="guests" value={form.guests} onChange={handleChange}>
                  <option value="1 Solo Traveller">1 Solo Traveller</option>
                  <option value="2 Travellers (Couple / Friends)">2 Travellers (Couple / Friends)</option>
                  <option value="3-4 Travellers (Small Group)">3-4 Travellers (Small Group)</option>
                  <option value="5-8 Travellers (Family / Group)">5-8 Travellers (Family / Group)</option>
                  <option value="9+ Large Group Departure">9+ Large Group Departure</option>
                </select>
              </div>

              {/* Accommodation Preference */}
              <div className="vm-form-group">
                <label htmlFor="vm-accommodation">Accommodation Preference</label>
                <select
                  id="vm-accommodation"
                  name="accommodation"
                  value={form.accommodation}
                  onChange={handleChange}
                >
                  {ACCOMMODATION_TIERS.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Range */}
              <div className="vm-form-group">
                <label htmlFor="vm-budget">Budget Tier (Per Person)</label>
                <select id="vm-budget" name="budget" value={form.budget} onChange={handleChange}>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div className="vm-form-group">
                <label htmlFor="vm-name">Full Name *</label>
                <input
                  type="text"
                  id="vm-name"
                  name="fullName"
                  placeholder="e.g. John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Address */}
              <div className="vm-form-group">
                <label htmlFor="vm-email">Email Address *</label>
                <input
                  type="email"
                  id="vm-email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone / WhatsApp */}
              <div className="vm-form-group full-width">
                <label htmlFor="vm-phone">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  id="vm-phone"
                  name="phone"
                  placeholder="+1 555-0199 or +254 700 000 000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Special Requests */}
              <div className="vm-form-group full-width">
                <label htmlFor="vm-requests">Special Requests / Notes (Optional)</label>
                <textarea
                  id="vm-requests"
                  name="specialRequests"
                  rows="3"
                  placeholder="Tell us about must-see wildlife, photography goals, children travelling, or airport transfer needs..."
                  value={form.specialRequests}
                  onChange={handleChange}
                />
              </div>
            </div>

            {statusMessage && (
              <p className={`vm-modal-status ${isSuccess ? "success" : "notice"}`} role="status">
                {statusMessage}
              </p>
            )}

            <div className="vm-modal-actions">
              <button
                type="button"
                className="vm-btn-whatsapp"
                onClick={handleWhatsAppSubmit}
              >
                <FaWhatsapp /> Send via WhatsApp
              </button>

              <button
                type="submit"
                className="vm-btn-email"
                disabled={loading}
              >
                <FaPaperPlane /> {loading ? "Sending Enquiry..." : "Send Email Enquiry"}
              </button>
            </div>

            <p className="vm-modal-guarantee">
              🔒 We respect your privacy. No spam. You will speak directly with our local Nairobi safari planning team.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
