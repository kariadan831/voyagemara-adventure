import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaTripadvisor,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

import TripAdvisorBadge from "./TripAdvisorBadge";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g294207-d34744740-Reviews-VoyageMara_Safaris-Nairobi.html";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "Our story", href: "/about" },
  { label: "Book a Safari (Quote)", href: "/booking" },
  { label: "Safari itineraries", href: "/#itineraries" },
  { label: "Safari experiences", href: "/#tours" },
  { label: "Photo gallery", href: "/#gallery" },
  { label: "Contact us", href: "/#contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const subscribe = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      await emailjs.send(
        "service_egs1gmk",
        "template_qmm8w9k",
        {
          name: "Newsletter subscriber",
          email,
          subject: "Safari newsletter subscription",
          message: `Please add ${email} to the VoyageMara safari newsletter. The subscriber requested safari ideas, travel updates, and occasional offers.`,
          time: new Date().toLocaleString(),
        },
        "XlvozJruwt1UBTXLu"
      );
      setEmail("");
      setStatus("Thanks — your newsletter request has been sent.");
    } catch {
      setStatus("We could not send your request just now. Please email info@voyagemara.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <section className="footer-cta" aria-labelledby="footer-cta-heading">
          <div className="footer-cta-text">
            <span className="footer-eyebrow">YOUR NEXT GREAT STORY STARTS HERE</span>
            <h2 id="footer-cta-heading">Ready to plan your Kenya safari?</h2>
            <p>Talk with our local team and start shaping a journey around you.</p>
          </div>
          <a
            className="footer-cta-button"
            href="https://wa.me/254705814181?text=Hello%20VoyageMara%2C%20I%27d%20like%20to%20plan%20a%20Kenya%20safari."
            target="_blank"
            rel="noopener noreferrer"
          >
            Start planning <span aria-hidden="true">→</span>
          </a>
        </section>

        <div className="footer-grid">
          {/* Brand Box with Socials */}
          <div className="footer-box footer-brand">
            <a className="footer-brand-link" href="/#home" aria-label="VoyageMara Safaris home">
              <img src="/logo.webp" alt="VoyageMara Safaris Logo" width="46" height="46" loading="lazy" />
              <span>VoyageMara <strong>Safaris</strong></span>
            </a>
            <p className="footer-tagline">
              Locally planned journeys into Kenya’s wild places, made personal from the very first conversation.
            </p>
            <div className="footer-location">
              <FaMapMarkerAlt aria-hidden="true" className="footer-loc-icon" />
              <span>Nairobi, Kenya · Exploring all of Kenya</span>
            </div>

            <div className="footer-social-wrapper">
              <span className="footer-social-label">Follow Us</span>
              <div className="footer-social-links">
                <a
                  href="https://www.tiktok.com/@voyagemara"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow VoyageMara on TikTok"
                  title="TikTok"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://www.instagram.com/voyagemara/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow VoyageMara on Instagram"
                  title="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61595111565710"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow VoyageMara on Facebook"
                  title="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={TRIPADVISOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Review VoyageMara Safaris on TripAdvisor"
                  title="TripAdvisor"
                >
                  <FaTripadvisor />
                </a>
              </div>
            </div>

            {/* ── Official TripAdvisor Verified Showcase (Matching Reference) ── */}
            <div className="footer-ta-showcase">
              <a
                href={TRIPADVISOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-ta-card"
                title="Top-Rated on TripAdvisor - VoyageMara Safaris #d34744740"
                aria-label="View VoyageMara Safaris reviews on TripAdvisor"
              >
                <TripAdvisorBadge size={118} />
              </a>

              <a
                href={TRIPADVISOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-ta-verified"
                title="Verified TripAdvisor Operator"
              >
                <span className="footer-ta-check">✓</span> Verified
              </a>

              <p className="footer-ta-desc">
                Experience unforgettable adventures across Africa with VoyageMara Safaris. Explore wildlife, culture, and breathtaking landscapes with us.
              </p>
            </div>
          </div>

          {/* Explore Links */}
          <nav className="footer-box footer-links" aria-label="Footer navigation">
            <h3>Explore</h3>
            <div className="footer-links-list">
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Contact Details */}
          <div className="footer-box footer-contact">
            <h3>Get in touch</h3>
            <div className="footer-contact-list">
              <a href="tel:+254705814181" className="footer-contact-item">
                <FaPhoneAlt className="footer-contact-icon" />
                <span>+254 705 814 181</span>
              </a>
              <a href="mailto:kariadan831@gmail.com" className="footer-contact-item">
                <FaEnvelope className="footer-contact-icon" />
                <span>kariadan831@gmail.com</span>
              </a>
              <a
                href="https://wa.me/254705814181?text=Hello%20VoyageMara%2C%20I%27d%20like%20to%20plan%20a%20Kenya%20safari."
                target="_blank"
                rel="noopener noreferrer"
                className="footer-whatsapp-pill"
              >
                <FaWhatsapp className="footer-wa-icon" />
                <span>WhatsApp Us</span>
              </a>
              <span className="footer-hours">Daily, 8:00 am – 8:00 pm EAT</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <section className="footer-box footer-newsletter" aria-labelledby="newsletter-heading">
            <h3 id="newsletter-heading">Safari Dispatch</h3>
            <p>Occasional safari inspiration, destination stories and travel updates. No noise.</p>
            <form onSubmit={subscribe} className="footer-newsletter-form">
              <label className="visually-hidden" htmlFor="footer-newsletter-email">Email address</label>
              <input
                id="footer-newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit" disabled={submitting} aria-label="Subscribe to the newsletter">
                {submitting ? "..." : "Subscribe"}
              </button>
            </form>
            <p className="newsletter-consent">By subscribing, you agree to receive occasional updates. Unsubscribe anytime.</p>
            {status && (
              <p className="newsletter-status" role="status" aria-live="polite">{status}</p>
            )}
          </section>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VoyageMara Safaris. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="/about">About VoyageMara</a>
            <span className="footer-bottom-sep" aria-hidden="true">·</span>
            <span>Thoughtfully planned in Kenya.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
