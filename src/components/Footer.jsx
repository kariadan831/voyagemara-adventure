import { useState } from "react";
import emailjs from "@emailjs/browser";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "Our story", href: "/#about" },
  { label: "Safari itineraries", href: "/#itineraries" },
  { label: "Safari experiences", href: "/#tours" },
  { label: "Contact", href: "/#contact" },
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
          <div>
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
          <div className="footer-box footer-brand">
            <a className="footer-brand-link" href="/#home" aria-label="VoyageMara Safaris home">
              <img src="/logo.png" alt="" width="52" height="52" loading="lazy" />
              <span>VoyageMara <strong>Safaris</strong></span>
            </a>
            <p>Locally planned journeys into Kenya’s wild places, made personal from the very first conversation.</p>
            <span className="footer-location"><span aria-hidden="true">⌖</span> Nairobi, Kenya · Exploring all of Kenya</span>
          </div>

          <nav className="footer-box footer-links" aria-label="Footer navigation">
            <h3>Explore</h3>
            {footerLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>

          <div className="footer-box footer-contact">
            <h3>Get in touch</h3>
            <a href="mailto:info@voyagemara.com">info@voyagemara.com</a>
            <a href="tel:+254705814181">+254 705 814 181</a>
            <a href="https://wa.me/254705814181" target="_blank" rel="noopener noreferrer">WhatsApp our team <span aria-hidden="true">↗</span></a>
            <span>Daily, 8:00 am – 8:00 pm EAT</span>
          </div>

          <section className="footer-box footer-newsletter" aria-labelledby="newsletter-heading">
            <h3 id="newsletter-heading">Notes from the wild</h3>
            <p>Occasional safari inspiration, destination stories and travel updates. No noise.</p>
            <form onSubmit={subscribe}>
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
                {submitting ? "Sending…" : "Subscribe"}
              </button>
            </form>
            <p className="newsletter-consent">By subscribing, you agree to receive occasional email updates. Unsubscribe at any time.</p>
            <p className="newsletter-status" role="status" aria-live="polite">{status}</p>
          </section>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VoyageMara Safaris. All rights reserved.</span>
          <a href="/about">About VoyageMara</a>
          <span>Thoughtfully planned in Kenya.</span>
        </div>
      </div>
    </footer>
  );
}
