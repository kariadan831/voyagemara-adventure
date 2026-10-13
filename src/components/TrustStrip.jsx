import { FaCompass, FaBinoculars, FaShieldAlt, FaWhatsapp } from "react-icons/fa";
import "./TrustStrip.css";

export default function TrustStrip({ onOpenBooking }) {
  const credentials = [
    {
      icon: <FaCompass />,
      value: "Native Maasai",
      label: "Certified Local Guides",
      desc: "Born & raised wildlife trackers with deep savannah knowledge",
    },
    {
      icon: <FaBinoculars />,
      value: "Private 4x4 Fleet",
      label: "Custom Land Cruisers",
      desc: "Pop-up observation roofs, high clearance & guaranteed window seats",
    },
    {
      icon: <FaShieldAlt />,
      value: "Zero Hidden Fees",
      label: "Transparent Pricing",
      desc: "Park entry fees, full board lodging & transfers itemised in your quote",
    },
    {
      icon: <FaWhatsapp />,
      value: "24/7 Ground Team",
      label: "Direct WhatsApp Line",
      desc: "Real assistance from Nairobi arrival to departure flight",
    },
  ];

  return (
    <section className="vm-trust-strip" aria-label="VoyageMara Safaris credentials and standards">
      <div className="vm-trust-container">
        <div className="vm-trust-grid">
          {credentials.map((c, i) => (
            <div className="vm-trust-item" key={i}>
              <div className="vm-trust-icon" aria-hidden="true">
                {c.icon}
              </div>
              <div className="vm-trust-text">
                <span className="vm-trust-value">{c.value}</span>
                <strong className="vm-trust-title">{c.label}</strong>
                <p className="vm-trust-desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
