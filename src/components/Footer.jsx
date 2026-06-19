    export default function Footer() {
    return (
        <footer className="footer">

        {/* TOP CTA */}
        <div className="footer-cta">
            <h2>Ready for Your Adventure?</h2>
            <p>Contact us to book your unforgettable safari experience</p>

            <a
            className="whatsapp-btn"
            href="https://wa.me/254705814181"
            target="_blank"
            rel="noreferrer"
            >
            💬 Chat on WhatsApp
            </a>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="footer-grid">

            {/* BRAND */}
            <div className="footer-box">
            <h3>VoyageMara Adventure</h3>
            <p>
                Experience unforgettable adventures across Africa. Explore wildlife,
                culture, and breathtaking landscapes with us.
            </p>

            <div className="verified">
                ✔ TripAdvisor Verified
            </div>
            </div>

            {/* QUICK LINKS */}
            <div className="footer-box">
            <h3>Quick Links</h3>
        <a href="#home">→ Home</a>
    <a href="#about">→ About</a>
    <a href="#itineraries">→ Itineraries</a>
    <a href="#tours">→ Tours</a>
    <a href="#booking">→ Booking</a>
    <a href="#gallery">→ Gallery</a>
            </div>

            {/* CONTACT */}
            <div className="footer-box">
            <h3>Contact</h3>

            <p>📍 Nairobi, Kenya</p>
            <p>✉️ info@voyagemara.com</p>
            <p>📧 support@voyagemara.com</p>
            <p>📞 +254 705 814 181</p>
            <p>💬 WhatsApp: +254 705 814 181</p>
            </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
            <p>© 2026 VoyageMara Adventure | Powered by Dktech</p>
        </div>

        </footer>
    );
    }