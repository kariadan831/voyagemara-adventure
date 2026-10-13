import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "../styles/styles.css";

const SAFARI_OPTIONS = [
  "3-Day Maasai Mara Big Five Safari",
  "2-Day Amboseli Elephant & Kilimanjaro Safari",
  "3-Day Samburu Northern Special Five Safari",
  "1-Day Lake Nakuru Rhino & Flamingo Safari",
  "1-Day Lake Naivasha Boat & Crescent Island Tour",
  "Custom Kenya Safari Itinerary (2026/2027)",
  "General Safari Question / Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    safari: SAFARI_OPTIONS[0],
    travelDate: "",
    guests: "2 travellers",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsAppChat = () => {
    const lines = [
      "Hello VoyageMara Safaris, I would like to enquire about a Kenya safari:",
      "",
      `*Selected Tour:* ${form.safari}`,
      form.travelDate ? `*Approx. Date:* ${form.travelDate}` : "",
      `*Travellers:* ${form.guests}`,
      form.name ? `*My Name:* ${form.name}` : "",
      form.email ? `*Email:* ${form.email}` : "",
      form.phone ? `*Phone:* ${form.phone}` : "",
      form.message ? `*Notes:* ${form.message}` : "",
      "",
      "Please provide itinerary advice and an itemised quote.",
    ].filter(Boolean);

    const encoded = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/254705814181?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setIsSuccess(false);

    const detailedMessage = `
CUSTOMER ENQUIRY DETAILS:
- Safari Package: ${form.safari}
- Approx Travel Date: ${form.travelDate || "Flexible"}
- Number of Travellers: ${form.guests}
- Customer Phone/WhatsApp: ${form.phone || "Not provided"}

CUSTOMER MESSAGE & NOTES:
${form.message || "No additional message provided."}
    `.trim();

    const templateParams = {
      name: form.name,
      email: form.email,
      subject: `New Safari Enquiry: ${form.safari} (${form.guests})`,
      message: detailedMessage,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_egs1gmk",
        "template_qmm8w9k",
        templateParams,
        "XlvozJruwt1UBTXLu"
      )
      .then(() => {
        setIsSuccess(true);
        setStatus("Thank you! Your safari enquiry has been sent to our local planning team. We will review your dates and reply shortly.");
        setForm({
          name: "",
          email: "",
          phone: "",
          safari: SAFARI_OPTIONS[0],
          travelDate: "",
          guests: "2 travellers",
          message: "",
        });
      })
      .catch(() => {
        setIsSuccess(false);
        setStatus("We couldn’t send your message online just now. Please chat directly with us on WhatsApp (+254 705 814 181) or email kariadan831@gmail.com");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      {/* HERO HEADER */}
      <div className="contact-header">
        <span className="contact-eyebrow">LET’S PLAN SOMETHING REMARKABLE</span>
        <h2 id="contact-heading">Get in Touch with Our Safari Specialists</h2>
        <p>
          Tell us the journey you have in mind. Our Nairobi-based team will shape an authentic, transparent safari tailored to your travel style.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="contact-grid">
        {/* LEFT CARD */}
        <div className="contact-box info-box">
          <span className="contact-card-label">HERE WHEN YOU NEED US</span>
          <h3>VoyageMara Safaris · Booking Desk</h3>
          <p className="contact-card-intro">
            Speak directly with our local safari planning team for immediate advice on seasons, park fees, and custom itineraries.
          </p>

          <a className="info-item" href="https://maps.google.com/?q=Nairobi,Kenya" target="_blank" rel="noopener noreferrer">
            <span className="contact-icon" aria-hidden="true"><FaMapMarkerAlt /></span>
            <span>
              <strong>Based in Nairobi, Kenya</strong>
              <small>Serving Maasai Mara, Amboseli, Samburu &amp; Rift Valley</small>
            </span>
          </a>

          <a className="info-item" href="tel:+254705814181">
            <span className="contact-icon" aria-hidden="true"><FaPhoneAlt /></span>
            <span>
              <strong>+254 705 814 181</strong>
              <small>Call our direct safari hotline</small>
            </span>
          </a>

          <a className="info-item" href="mailto:kariadan831@gmail.com">
            <span className="contact-icon" aria-hidden="true"><FaEnvelope /></span>
            <span>
              <strong>kariadan831@gmail.com</strong>
              <small>Email our booking directors</small>
            </span>
          </a>

          <div className="info-item">
            <span className="contact-icon" aria-hidden="true"><FaClock /></span>
            <span>
              <strong>Daily, 8:00 am – 8:00 pm</strong>
              <small>East Africa Time (EAT)</small>
            </span>
          </div>

          <a
            className="whatsapp-btn"
            href="https://wa.me/254705814181"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp /> Chat Directly on WhatsApp →
          </a>
        </div>

        {/* RIGHT FORM */}
        <form className="contact-box form-box" onSubmit={sendMessage}>
          <span className="contact-card-label">START YOUR ENQUIRY</span>
          <h3>Send Us a Safari Request</h3>
          <p className="contact-card-intro">Fill in what you know so far — we'll reply with a real itinerary, not a template.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label htmlFor="contact-name">Your Full Name *</label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Jenkins"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-email">Email Address *</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "10px" }}>
            <div>
              <label htmlFor="contact-phone">Phone / WhatsApp</label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+254 700 000 000"
              />
            </div>

            <div>
              <label htmlFor="contact-guests">Number of Travellers</label>
              <select
                id="contact-guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(21, 56, 45, 0.2)",
                  background: "var(--card-bg, #fff)",
                  color: "inherit",
                }}
              >
                <option value="1 Solo Traveller">1 Solo Traveller</option>
                <option value="2 Travellers (Couple / Friends)">2 Travellers (Most Popular)</option>
                <option value="3-4 Travellers (Small Group)">3–4 Travellers</option>
                <option value="5+ Family / Private Group">5+ Family / Group</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "12px", marginTop: "10px" }}>
            <div>
              <label htmlFor="contact-safari">Safari Package of Interest</label>
              <select
                id="contact-safari"
                name="safari"
                value={form.safari}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(21, 56, 45, 0.2)",
                  background: "var(--card-bg, #fff)",
                  color: "inherit",
                }}
              >
                {SAFARI_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contact-date">Approx. Travel Date</label>
              <input
                id="contact-date"
                type="date"
                name="travelDate"
                value={form.travelDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <label htmlFor="contact-message">Tell Us About Your Trip</label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your target wildlife, preferred accommodation tier (luxury tented camp or lodge), budget, or special celebration..."
              rows="4"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "14px" }}>
            <button type="submit" disabled={loading} style={{ margin: 0, justifyContent: "center" }}>
              {loading ? "Sending Enquiry…" : "Send Email Enquiry"} <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppChat}
              style={{
                background: "#25d366",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 16px",
                fontWeight: 700,
                fontSize: "0.95rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <FaWhatsapp /> Send via WhatsApp
            </button>
          </div>

          <p
            className={`contact-status ${isSuccess ? "status-success" : ""}`}
            role="status"
            aria-live="polite"
            style={{ marginTop: "12px", fontWeight: 600 }}
          >
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}