import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import "./CtaBand.css";

export default function CtaBand({
  title = "Get Your Free Safari Quote",
  subtitle = "Direct operator planning with Duncan and our certified native Maasai guides in Nairobi. No middleman fees.",
}) {
  return (
    <aside className="vm-cta-band" aria-label="Direct contact call to action">
      <div className="vm-cta-band-in">
        <h2 className="vm-cta-band-title">{title}</h2>
        <p className="vm-cta-band-sub">{subtitle}</p>

        <div className="vm-cta-band-actions">
          <a
            href="https://wa.me/254705814181?text=Hello%20VoyageMara%2C%20please%20send%20me%20a%20safari%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="vm-btn-band-whatsapp"
          >
            <FaWhatsapp style={{ fontSize: "1.25rem" }} /> WhatsApp (+254 705 814 181)
          </a>

          <a href="tel:+254705814181" className="vm-btn-band-call">
            <FaPhoneAlt /> Call (+254 705 814 181)
          </a>
        </div>
      </div>
    </aside>
  );
}
