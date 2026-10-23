import { useState } from "react";
import { FaWhatsapp, FaCheckCircle } from "react-icons/fa";
import "./QuoteForm.css";

export default function QuoteForm({ defaultSafariType = "Kenya Safari Tour", title = "Get Your Free Safari Quote" }) {
  const [formData, setFormData] = useState({
    name: "",
    dates: "",
    travelers: "2",
    safariType: defaultSafariType,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setSubmitted(true);

    const messageText = `Hello VoyageMara, I am ${formData.name.trim()}. Safari Type: ${formData.safariType}. Preferred Dates: ${
      formData.dates.trim() || "Flexible"
    }. Number of Travelers: ${formData.travelers}.${
      formData.message.trim() ? " Note: " + formData.message.trim() : ""
    }`;

    window.open(
      `https://wa.me/254705814181?text=${encodeURIComponent(messageText)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="vm-quote-form-section" id="request-quote-section">
      <div className="vm-quote-form-card">
        <div className="vm-quote-header">
          <h2 className="vm-quote-title">{title}</h2>
          <p className="vm-quote-sub">
            Fill in your trip details below. We instantly prepare a pre-filled WhatsApp message directly to Duncan and our Nairobi team.
          </p>
        </div>

        {submitted ? (
          <div className="vm-quote-success">
            <FaCheckCircle className="vm-success-icon" />
            <h3>Thank you, {formData.name}!</h3>
            <p>Your safari inquiry was formatted and WhatsApp was opened. If WhatsApp did not open automatically, click the button below:</p>
            <a
              href={`https://wa.me/254705814181?text=${encodeURIComponent(
                `Hello VoyageMara, I am ${formData.name}. Safari: ${formData.safariType}. Dates: ${formData.dates || "Flexible"}. Travelers: ${formData.travelers}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="vm-btn-whatsapp-direct"
            >
              <FaWhatsapp /> Open WhatsApp (+254 705 814 181)
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="vm-quote-grid-form" noValidate>
            {error && <div className="vm-form-error">{error}</div>}

            <div className="vm-field">
              <label htmlFor="qf-name">Full Name *</label>
              <input
                id="qf-name"
                name="name"
                type="text"
                required
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                className="vm-input"
              />
            </div>

            <div className="vm-field">
              <label htmlFor="qf-dates">Travel Dates</label>
              <input
                id="qf-dates"
                name="dates"
                type="text"
                placeholder="e.g. 10–18 August or Flexible"
                value={formData.dates}
                onChange={handleChange}
                className="vm-input"
              />
            </div>

            <div className="vm-field">
              <label htmlFor="qf-travelers">Number of Travellers</label>
              <input
                id="qf-travelers"
                name="travelers"
                type="number"
                min="1"
                max="50"
                value={formData.travelers}
                onChange={handleChange}
                className="vm-input"
              />
            </div>

            <div className="vm-field">
              <label htmlFor="qf-type">Safari Type</label>
              <select
                id="qf-type"
                name="safariType"
                value={formData.safariType}
                onChange={handleChange}
                className="vm-input vm-select"
              >
                <option value="Maasai Mara 3-Day Safari">Maasai Mara 3-Day Safari</option>
                <option value="Great Wildebeest Migration Safari">Great Wildebeest Migration Safari</option>
                <option value="Luxury Mara Camps Safari">Luxury Mara Camps Safari</option>
                <option value="Maasai Culture Experience">Maasai Culture Experience</option>
                <option value="Family Safari">Family Safari</option>
                <option value="Honeymoon Safari">Honeymoon Safari</option>
                <option value="Group / Corporate Safari">Group / Corporate Safari</option>
                <option value="Amboseli & Kilimanjaro Safari">Amboseli &amp; Kilimanjaro Safari</option>
                <option value="Lake Nakuru & Naivasha Safari">Lake Nakuru &amp; Naivasha Safari</option>
                <option value="Custom Kenya Circuit">Custom Kenya Circuit</option>
              </select>
            </div>

            <div className="vm-field vm-field-full">
              <label htmlFor="qf-message">Message &amp; Special Requests</label>
              <textarea
                id="qf-message"
                name="message"
                rows="3"
                placeholder="Tell us what you want to see, preferred budget tier, or special occasions..."
                value={formData.message}
                onChange={handleChange}
                className="vm-input vm-textarea"
              />
            </div>

            <button type="submit" className="vm-btn-submit-quote">
              <FaWhatsapp style={{ fontSize: "1.2rem" }} /> Send on WhatsApp (+254 705 814 181)
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
