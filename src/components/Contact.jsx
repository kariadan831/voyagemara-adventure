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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setLoading(true);

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
        alert("Message sent!");

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to send message");
        setLoading(false);
      });
  };

 return (
  <section className="contact-section" id="contact">

    {/* HERO HEADER */}
    <div className="contact-header">
      <h2>Get in Touch</h2>
      <p>
        Plan your Maasai Mara safari, beach holiday, or custom Kenya adventure with VoyageMara.
      </p>
    </div>

    {/* MAIN GRID */}
    <div className="contact-grid">

      {/* LEFT CARD */}
      <div className="contact-box info-box">

        <h3>Contact Details</h3>
        <p className="subtitle">We respond within 24 hours</p>

        <div className="info-item">📍 Maasai Mara, Kenya</div>
        <div className="info-item">📞 +254 705 814 181</div>
        <div className="info-item">✉️ info@voyagemara.com</div>
        <div className="info-item">⏰ Mon - Sun: 8AM - 8PM</div>

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

        <h3>Send Message</h3>
        <p className="subtitle">Tell us your travel plans</p>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />

        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          required
        />

        <button type="submit">
          {loading ? "Sending..." : "Send Message →"}
        </button>

      </form>

    </div>
    </section>
  );
}