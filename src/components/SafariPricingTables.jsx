import { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaLeaf, FaCrown, FaMapMarkerAlt, FaUsers, FaInfoCircle } from "react-icons/fa";
import "./SafariPricingTables.css";

const WA_NUMBER = "254705814181";

function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const EMAIL = "kariadan831@gmail.com";

function emailLink(subject) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    "Hello VoyageMara Safaris,\n\nI am interested in learning more about " +
      subject +
      ".\n\nPlease send me the details and availability.\n\nThank you."
  )}`;
}

/* ─────────────────────────────────────────────────────────── */
/*  DATA                                                        */
/* ─────────────────────────────────────────────────────────── */

const midRangePackages = [
  {
    id: "mara-3d",
    park: "Maasai Mara National Reserve",
    duration: "3 Days / 2 Nights",
    lowSeason: { months: "Jan–Jun", perPerson: 620, groupNote: "2–4 pax sharing" },
    peakSeason: { months: "Jul–Dec", perPerson: 820, groupNote: "2–4 pax sharing" },
    includes: ["Private 4×4 Land Cruiser (pop-up roof)", "2 Nights mid-range tented camp (full board)", "Maasai tracker/guide", "Airport/hotel transfers", "All seasonal park fees"],
    highlight: "Great Wildebeest Migration – Jul to Oct",
    badge: "BEST SELLER",
    waMsg: "Hi! I'd like to book the 3-Day Maasai Mara Mid-Range Safari. Please share availability and payment details.",
    emailSubject: "3-Day Maasai Mara Mid-Range Safari Enquiry",
  },
  {
    id: "amboseli-2d",
    park: "Amboseli National Park",
    duration: "2 Days / 1 Night",
    lowSeason: { months: "Jan–Jun", perPerson: 520, groupNote: "2–4 pax sharing" },
    peakSeason: { months: "Jul–Dec", perPerson: 650, groupNote: "2–4 pax sharing" },
    includes: ["Private 4×4 Land Cruiser (pop-up roof)", "1 Night lodge (full board)", "Professional guide", "Nairobi return transfers", "All park fees included"],
    highlight: "Elephant herds with Mt Kilimanjaro backdrop",
    badge: "ICONIC VIEW",
    waMsg: "Hi! I'd like to book the 2-Day Amboseli Elephant Safari. Please share availability.",
    emailSubject: "2-Day Amboseli Elephant Safari Enquiry",
  },
  {
    id: "nakuru-1d",
    park: "Lake Nakuru National Park",
    duration: "1 Day (Full Day)",
    lowSeason: { months: "Jan–Jun", perPerson: 450, groupNote: "2–6 pax sharing" },
    peakSeason: { months: "Jul–Dec", perPerson: 520, groupNote: "2–6 pax sharing" },
    includes: ["Shared safari vehicle", "Professional driver-guide", "Packed lunch", "Nairobi transfers", "Park fees included"],
    highlight: "Black & white rhinos + flamingos",
    badge: "DAY TRIP",
    waMsg: "Hi! I'd like to book the Lake Nakuru Day Safari. Please share availability.",
    emailSubject: "Lake Nakuru Day Safari Enquiry",
  },
  {
    id: "samburu-4d",
    park: "Samburu National Reserve",
    duration: "4 Days / 3 Nights",
    lowSeason: { months: "Jan–Jun", perPerson: 890, groupNote: "2–4 pax sharing" },
    peakSeason: { months: "Jul–Dec", perPerson: 1100, groupNote: "2–4 pax sharing" },
    includes: ["Private 4×4 Land Cruiser", "3 Nights tented camp (full board)", "Expert Samburu guide", "Flight or road transfers", "All reserve fees included"],
    highlight: "Exclusive 'Samburu Special Five' northern wildlife",
    badge: "UNIQUE WILDLIFE",
    waMsg: "Hi! I'd like to book the 4-Day Samburu Safari. Please send pricing and availability.",
    emailSubject: "4-Day Samburu National Reserve Safari Enquiry",
  },
  {
    id: "combo-6d",
    park: "Maasai Mara + Amboseli Combo",
    duration: "6 Days / 5 Nights",
    lowSeason: { months: "Jan–Jun", perPerson: 1350, groupNote: "2–4 pax sharing" },
    peakSeason: { months: "Jul–Dec", perPerson: 1780, groupNote: "2–4 pax sharing" },
    includes: ["Private 4×4 Land Cruiser throughout", "5 Nights tented camps / lodges (full board)", "Head guide + park specialists", "All flights & transfers", "All park fees both reserves"],
    highlight: "Best of Kenya Big Five + Migration in one trip",
    badge: "BEST VALUE COMBO",
    waMsg: "Hi! I'd like to book the 6-Day Maasai Mara + Amboseli Combo Safari. Please share pricing and availability.",
    emailSubject: "6-Day Mara + Amboseli Combo Safari Enquiry",
  },
];

const parkFees = [
  {
    id: "pk-mara",
    park: "Maasai Mara National Reserve",
    region: "Narok County",
    lowSeason: { months: "Jan 1 – Jun 30", adult: 100, child: 50 },
    peakSeason: { months: "Jul 1 – Dec 31", adult: 200, child: 50 },
    currency: "USD",
    notes: "Peak coincides with the Great Wildebeest Migration (Jul–Oct). Child rate is for ages 3–18.",
    waMsg: "Hi! I have a question about Maasai Mara park fees and the best season to visit.",
    emailSubject: "Maasai Mara Park Fees & Season Enquiry",
  },
  {
    id: "pk-amboseli",
    park: "Amboseli National Park",
    region: "Kajiado County",
    lowSeason: { months: "Jan 1 – Mar 31", adult: 60, child: 35 },
    peakSeason: { months: "Apr 1 – Dec 31", adult: 80, child: 40 },
    currency: "USD",
    notes: "Green season (Apr–Jun) offers lush landscapes and fewer visitors at mid-range cost.",
    waMsg: "Hi! I'd like to know about Amboseli park fees for my safari trip.",
    emailSubject: "Amboseli National Park Fees Enquiry",
  },
  {
    id: "pk-nakuru",
    park: "Lake Nakuru National Park",
    region: "Rift Valley",
    lowSeason: { months: "Jan 1 – Jun 30", adult: 50, child: 25 },
    peakSeason: { months: "Jul 1 – Dec 31", adult: 70, child: 30 },
    currency: "USD",
    notes: "Flamingos are best spotted Nov–Mar. Home to endangered black & white rhinos year-round.",
    waMsg: "Hi! I'd like information about Lake Nakuru park fees and flamingo season.",
    emailSubject: "Lake Nakuru Park Fees Enquiry",
  },
  {
    id: "pk-samburu",
    park: "Samburu National Reserve",
    region: "Samburu County",
    lowSeason: { months: "Jan 1 – Jun 30", adult: 70, child: 35 },
    peakSeason: { months: "Jul 1 – Dec 31", adult: 90, child: 45 },
    currency: "USD",
    notes: "Dry season (Jun–Oct) is best for wildlife spotting in the riverine vegetation.",
    waMsg: "Hi! I'm interested in Samburu park fees and safari planning.",
    emailSubject: "Samburu National Reserve Fees Enquiry",
  },
  {
    id: "pk-nairobi",
    park: "Nairobi National Park",
    region: "Nairobi",
    lowSeason: { months: "Jan 1 – Jun 30", adult: 35, child: 20 },
    peakSeason: { months: "Jul 1 – Dec 31", adult: 45, child: 20 },
    currency: "USD",
    notes: "World's only national park inside a capital city. Great half-day option.",
    waMsg: "Hi! I'd like to add Nairobi National Park to my itinerary. Can you help?",
    emailSubject: "Nairobi National Park Visit Enquiry",
  },
  {
    id: "pk-naivasha",
    park: "Lake Naivasha / Crescent Island",
    region: "Rift Valley",
    lowSeason: { months: "Jan 1 – Jun 30", adult: 25, child: 15 },
    peakSeason: { months: "Jul 1 – Dec 31", adult: 35, child: 20 },
    currency: "USD",
    notes: "Walking safari on Crescent Island with hippos, giraffe & zebra. No predators – walk freely!",
    waMsg: "Hi! I'd like to know more about Lake Naivasha and Crescent Island fees.",
    emailSubject: "Lake Naivasha / Crescent Island Enquiry",
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  SUB-COMPONENTS                                              */
/* ─────────────────────────────────────────────────────────── */

function ActionButtons({ waMsg, emailSubject, compact }) {
  return (
    <div className={`spt-actions${compact ? " spt-actions--compact" : ""}`}>
      <a
        href={waLink(waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="spt-btn spt-btn--wa"
        aria-label="Book via WhatsApp"
      >
        <FaWhatsapp />
        <span>Book via WhatsApp</span>
      </a>
      <a
        href={emailLink(emailSubject)}
        className="spt-btn spt-btn--email"
        aria-label="Send email query"
      >
        <FaEnvelope />
        <span>Send Query</span>
      </a>
    </div>
  );
}

function IncludesList({ items }) {
  return (
    <ul className="spt-includes">
      {items.map((item, i) => (
        <li key={i}>
          <span className="spt-check">✓</span> {item}
        </li>
      ))}
    </ul>
  );
}

function BadgePill({ label }) {
  return <span className="spt-badge">{label}</span>;
}

/* ─────────────────────────────────────────────────────────── */
/*  TABLE 1 – Mid-Range Package Prices                         */
/* ─────────────────────────────────────────────────────────── */

function MidRangeTable() {
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <div className="spt-table-wrap">
      <p className="spt-disclaimer">
        <FaInfoCircle /> All prices are <strong>per person (USD)</strong>, based on 2–4 guests sharing a private vehicle. Solo travellers: add 30% single supplement. Prices include full-board accommodation, park fees &amp; transfers.
      </p>
      <div className="spt-scroll-wrap">
        <table className="spt-table" id="mid-range-prices-table">
          <thead>
            <tr>
              <th className="spt-th--park">Safari Package</th>
              <th className="spt-th--duration">Duration</th>
              <th className="spt-th--low">
                <FaLeaf style={{ color: "#4caf87" }} /> Low Season<br />
                <span className="spt-th-sub">Jan – Jun</span>
              </th>
              <th className="spt-th--peak">
                <FaCrown style={{ color: "#b89a63" }} /> Peak Season<br />
                <span className="spt-th-sub">Jul – Dec</span>
              </th>
              <th className="spt-th--action">Book Now</th>
            </tr>
          </thead>
          <tbody>
            {midRangePackages.map((pkg) => (
              <>
                <tr
                  key={pkg.id}
                  className={`spt-row${expandedRow === pkg.id ? " spt-row--open" : ""}`}
                  onClick={() => setExpandedRow(expandedRow === pkg.id ? null : pkg.id)}
                >
                  <td className="spt-td--park">
                    <div className="spt-park-name">
                      <BadgePill label={pkg.badge} />
                      <strong>{pkg.park}</strong>
                      <em className="spt-highlight">{pkg.highlight}</em>
                    </div>
                  </td>
                  <td className="spt-td--center">{pkg.duration}</td>
                  <td className="spt-td--price spt-price--low">
                    <span className="spt-price-num">${pkg.lowSeason.perPerson}</span>
                    <span className="spt-price-note">{pkg.lowSeason.groupNote}</span>
                  </td>
                  <td className="spt-td--price spt-price--peak">
                    <span className="spt-price-num">${pkg.peakSeason.perPerson}</span>
                    <span className="spt-price-note">{pkg.peakSeason.groupNote}</span>
                  </td>
                  <td className="spt-td--action" onClick={(e) => e.stopPropagation()}>
                    <ActionButtons waMsg={pkg.waMsg} emailSubject={pkg.emailSubject} compact />
                  </td>
                </tr>
                {expandedRow === pkg.id && (
                  <tr key={`${pkg.id}-expand`} className="spt-row--expanded">
                    <td colSpan={5}>
                      <div className="spt-expand-inner">
                        <h4>What's Included</h4>
                        <IncludesList items={pkg.includes} />
                        <ActionButtons waMsg={pkg.waMsg} emailSubject={pkg.emailSubject} />
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  TABLE 2 – Park Fees Per Season                             */
/* ─────────────────────────────────────────────────────────── */

function ParkFeesTable() {
  return (
    <div className="spt-table-wrap">
      <p className="spt-disclaimer">
        <FaInfoCircle /> Official 2026/2027 non-resident tariffs. <strong>Park fees are included</strong> in all VoyageMara packages. Rates shown for transparency. Child rates apply to ages 3–18.
      </p>
      <div className="spt-scroll-wrap">
        <table className="spt-table" id="park-fees-season-table">
          <thead>
            <tr>
              <th className="spt-th--park">
                <FaMapMarkerAlt /> Park / Reserve
              </th>
              <th className="spt-th--region">Region</th>
              <th className="spt-th--low">
                <FaLeaf style={{ color: "#4caf87" }} /> Low Season
                <br /><span className="spt-th-sub">Adult / Child</span>
              </th>
              <th className="spt-th--peak">
                <FaCrown style={{ color: "#b89a63" }} /> Peak Season
                <br /><span className="spt-th-sub">Adult / Child</span>
              </th>
              <th className="spt-th--action">Enquire</th>
            </tr>
          </thead>
          <tbody>
            {parkFees.map((pk) => (
              <tr key={pk.id} className="spt-row">
                <td className="spt-td--park">
                  <strong>{pk.park}</strong>
                  <span className="spt-park-note">{pk.notes}</span>
                </td>
                <td className="spt-td--center spt-td--region">{pk.region}</td>
                <td className="spt-td--price spt-price--low">
                  <span className="spt-price-num">
                    ${pk.lowSeason.adult} <span className="spt-price-slash">/</span> ${pk.lowSeason.child}
                  </span>
                  <span className="spt-price-note">{pk.lowSeason.months}</span>
                </td>
                <td className="spt-td--price spt-price--peak">
                  <span className="spt-price-num">
                    ${pk.peakSeason.adult} <span className="spt-price-slash">/</span> ${pk.peakSeason.child}
                  </span>
                  <span className="spt-price-note">{pk.peakSeason.months}</span>
                </td>
                <td className="spt-td--action">
                  <ActionButtons waMsg={pk.waMsg} emailSubject={pk.emailSubject} compact />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  MAIN EXPORT                                                 */
/* ─────────────────────────────────────────────────────────── */

const TABS = [
  { id: "packages", label: "Mid-Range Package Prices", icon: <FaCrown /> },
  { id: "fees", label: "Park Fees Per Season", icon: <FaMapMarkerAlt /> },
];

export default function SafariPricingTables() {
  const [activeTab, setActiveTab] = useState("packages");

  return (
    <section className="spt-section" id="safari-pricing-tables" aria-labelledby="spt-heading">
      <div className="spt-container">
        {/* Header */}
        <div className="spt-header">
          <span className="spt-eyebrow">2026 / 2027 Transparent Pricing</span>
          <h2 id="spt-heading" className="spt-title">
            Kenya Safari Costs &amp; Park Fees Explained
          </h2>
          <p className="spt-subtitle">
            No hidden costs, no surprises. Every price below is fully itemised — park entry, accommodation, guide, vehicle and transfers. Click any row to see exactly what's included, then book instantly via WhatsApp or send us a query.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="spt-tabs" role="tablist" aria-label="Pricing table tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`spt-panel-${tab.id}`}
              id={`spt-tab-${tab.id}`}
              className={`spt-tab${activeTab === tab.id ? " spt-tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div
          id="spt-panel-packages"
          role="tabpanel"
          aria-labelledby="spt-tab-packages"
          hidden={activeTab !== "packages"}
        >
          <MidRangeTable />
        </div>
        <div
          id="spt-panel-fees"
          role="tabpanel"
          aria-labelledby="spt-tab-fees"
          hidden={activeTab !== "fees"}
        >
          <ParkFeesTable />
        </div>

        {/* Bottom CTA */}
        <div className="spt-bottom-cta">
          <p>Need a <strong>custom group quote</strong> or private itinerary?</p>
          <div className="spt-actions">
            <a
              href={waLink("Hi! I need a custom group safari quote for my travel dates. Please help me plan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="spt-btn spt-btn--wa spt-btn--lg"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
            <a
              href={emailLink("Custom Group Safari Quote")}
              className="spt-btn spt-btn--email spt-btn--lg"
            >
              <FaEnvelope /> Email Your Query
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
