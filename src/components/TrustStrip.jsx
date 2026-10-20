import { FaCompass, FaBinoculars, FaShieldAlt, FaTripadvisor } from "react-icons/fa";
import "./TrustStrip.css";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g294207-d34744740-Reviews-VoyageMara_Safaris-Nairobi.html";

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
      icon: <FaTripadvisor />,
      value: "TripAdvisor Listed",
      label: "Official Operator #d34744740",
      desc: "Verified Nairobi safari provider · Book direct with zero middleman fees",
      href: TRIPADVISOR_URL,
      isExternal: true,
    },
    {
      icon: <FaShieldAlt />,
      value: "Zero Hidden Fees",
      label: "Transparent Pricing",
      desc: "Park entry fees, full board lodging & transfers itemised in your quote",
      href: "/booking",
      isLink: true,
    },
  ];

  return (
    <section className="vm-trust-strip" aria-label="VoyageMara Safaris credentials and standards">
      <div className="vm-trust-container">
        <div className="vm-trust-grid">
          {credentials.map((c, i) => {
            const content = (
              <>
                <div className="vm-trust-icon" aria-hidden="true">
                  {c.icon}
                </div>
                <div className="vm-trust-text">
                  <span className="vm-trust-value">{c.value}</span>
                  <strong className="vm-trust-title">{c.label}</strong>
                  <p className="vm-trust-desc">{c.desc}</p>
                </div>
              </>
            );

            if (c.href) {
              return (
                <a
                  href={c.href}
                  key={i}
                  className="vm-trust-item vm-trust-item-link"
                  {...(c.isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {content}
                </a>
              );
            }

            return (
              <div className="vm-trust-item" key={i}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
