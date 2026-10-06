import { useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/styles.css";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const templateParams = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
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
        setStatus("Thanks — your message is on its way. We’ll be in touch soon.");

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

      })
      .catch(() => {
        setStatus("We couldn’t send your message just now. Please email info@voyagemara.com.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

 return (
  <section className="contact-section" id="contact">

    {/* HERO HEADER */}
    <div className="contact-header">
      <span className="contact-eyebrow">LET’S PLAN SOMETHING REMARKABLE</span>
      <h2>Get in Touch</h2>
      <p>
        Tell us what you’re dreaming of. Our Kenya-based team will help shape the right safari for you.
      </p>
    </div>

    {/* MAIN GRID */}
    <div className="contact-grid">

      {/* LEFT CARD */}
      <div className="contact-box info-box">

      <span className="contact-card-label">HERE WHEN YOU NEED US</span>
        <h3>Contact Details</h3>
      <p className="contact-card-intro">Speak directly with our local safari planning team.</p>

      <a className="info-item" href="https://maps.google.com/?q=Nairobi,Kenya"><span className="contact-icon" aria-hidden="true">⌖</span><span><strong>Based in Nairobi</strong><small>Planning safaris across Kenya</small></span></a>
      <a className="info-item" href="tel:+254705814181"><span className="contact-icon" aria-hidden="true">↗</span><span><strong>+254 705 814 181</strong><small>Call our safari team</small></span></a>
      <div className="info-item"><span className="contact-icon" aria-hidden="true">◷</span><span><strong>Daily, 8:00 am – 8:00 pm</strong><small>East Africa Time</small></span></div>

        <a
          className="whatsapp-btn"
          href="https://wa.me/254705814181"
          target="_blank"
          rel="noreferrer"
        >
          Chat on WhatsApp →
        </a>

      </div>

      {/* RIGHT FORM */}
      <form className="contact-box form-box" onSubmit={sendMessage}>

        <span className="contact-card-label">START YOUR JOURNEY</span>
        <h3>Send us a message</h3>
        <p className="contact-card-intro">Share a few details and we’ll help you plan the next step.</p>

        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />

        <label htmlFor="contact-email">Email address</label>
        <input
          id="contact-email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />

        <label htmlFor="contact-subject">What are you planning? <span>(optional)</span></label>
        <input
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
        />

        <label htmlFor="contact-message">Tell us about your trip</label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending your message…" : "Send enquiry"}<span aria-hidden="true">→</span>
        </button>
        <p className="contact-status" role="status" aria-live="polite">{status}</p>

      </form>

    </div>
    </section>
  );
}