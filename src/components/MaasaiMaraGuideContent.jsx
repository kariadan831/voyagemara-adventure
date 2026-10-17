import { useState } from "react";
import {
  FaCompass,
  FaCalendarAlt,
  FaDollarSign,
  FaPlane,
  FaCar,
  FaBinoculars,
  FaShieldAlt,
  FaChevronDown,
  FaInfoCircle,
} from "react-icons/fa";
import MaasaiMaraCampsDirectory from "./MaasaiMaraCampsDirectory";
import "./MaasaiMaraGuideContent.css";

export default function MaasaiMaraGuideContent({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState("3day");

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="mm-guide-root">
      {/* ── Table of Contents Bar ── */}
      <nav className="mm-toc-bar" aria-label="Maasai Mara Guide Table of Contents">
        <span className="mm-toc-title">Jump to section:</span>
        <div className="mm-toc-links">
          <button type="button" onClick={() => scrollToSection("costs")}>Trip Costs</button>
          <button type="button" onClick={() => scrollToSection("accommodation")}>Camps Directory</button>
          <button type="button" onClick={() => scrollToSection("best-time")}>Best Time &amp; Migration</button>
          <button type="button" onClick={() => scrollToSection("ecosystem")}>Reserve vs Conservancies</button>
          <button type="button" onClick={() => scrollToSection("transfers")}>Road vs Flight</button>
          <button type="button" onClick={() => scrollToSection("itinerary")}>Sample Itineraries</button>
        </div>
      </nav>

      {/* ── Section: What a Trip Actually Costs ── */}
      <section className="mm-guide-section" id="costs">
        <div className="mm-section-header">
          <span className="mm-badge">TRANSPARENT PRICING</span>
          <h2>What a Maasai Mara Safari Actually Costs (2026 / 2027)</h2>
          <p>
            The 2024–2026 park fee updates ($100–$200/day for non-residents) caught many travellers off guard.
            At VoyageMara, we believe in complete price transparency. Below is an authentic cost breakdown
            based on 2 people sharing a private 4×4 Land Cruiser, full board lodge/camp accommodation, all park fees,
            and professional native Maasai guide services.
          </p>
        </div>

        {/* Duration Tabs */}
        <div className="mm-duration-tabs">
          <button
            type="button"
            className={activeTab === "3day" ? "active" : ""}
            onClick={() => setActiveTab("3day")}
          >
            3-Day / 2-Night &ldquo;Quick Escape&rdquo;
          </button>
          <button
            type="button"
            className={activeTab === "4day" ? "active" : ""}
            onClick={() => setActiveTab("4day")}
          >
            4-Day / 3-Night &ldquo;The Classic&rdquo;
          </button>
          <button
            type="button"
            className={activeTab === "5day" ? "active" : ""}
            onClick={() => setActiveTab("5day")}
          >
            5-Day / 4-Night &ldquo;Deep Dive&rdquo;
          </button>
        </div>

        {/* Pricing Tables */}
        <div className="mm-pricing-table-wrap">
          {activeTab === "3day" && (
            <div className="mm-cost-table-card">
              <div className="mm-cost-intro">
                <h3>3-Day / 2-Night Safari Package</h3>
                <p>Two nights is tight. You&apos;ll get a taste, but you&apos;re rushing. Ideal for short stays or weekend getaways from Nairobi.</p>
              </div>
              <div className="mm-table-scroll">
                <table className="mm-cost-table">
                  <thead>
                    <tr>
                      <th>Safari Tier</th>
                      <th>Green Season<br /><small>(Apr – Jun)</small></th>
                      <th>Migration Peak<br /><small>(Jul – Oct)</small></th>
                      <th>Mid-Peak Season<br /><small>(Nov – Mar)</small></th>
                      <th>Typical Lodges / Camps</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Mid-Range Value</strong>
                        <span className="mm-table-sub">Comfortable tented camp</span>
                      </td>
                      <td className="mm-price-cell">$620 – $750</td>
                      <td className="mm-price-cell highlight">$880 – $1,050</td>
                      <td className="mm-price-cell">$720 – $850</td>
                      <td>AA Lodge, Sentrim, Enkorok, Mara Leisure</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Comfort Mid-Range</strong>
                        <span className="mm-table-sub">Riverfront camp / prime lodge</span>
                      </td>
                      <td className="mm-price-cell">$850 – $1,050</td>
                      <td className="mm-price-cell highlight">$1,250 – $1,550</td>
                      <td className="mm-price-cell">$950 – $1,200</td>
                      <td>Fig Tree Camp, Ashnil Mara, Keekorok, Sarova</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Premier Luxury</strong>
                        <span className="mm-table-sub">Five-star luxury safari</span>
                      </td>
                      <td className="mm-price-cell">$1,450 – $1,900</td>
                      <td className="mm-price-cell highlight">$2,200 – $3,100</td>
                      <td className="mm-price-cell">$1,750 – $2,400</td>
                      <td>Governors&apos;, Mara Serena, Entim, Angama Mara</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "4day" && (
            <div className="mm-cost-table-card">
              <div className="mm-cost-intro">
                <h3>4-Day / 3-Night Classic Safari Package</h3>
                <p>The recommended sweet spot. Three nights allows one full day drive with a picnic lunch out on the plains, an early-morning big cat hunt, and a river crossing watch without rushing.</p>
              </div>
              <div className="mm-table-scroll">
                <table className="mm-cost-table">
                  <thead>
                    <tr>
                      <th>Safari Tier</th>
                      <th>Green Season<br /><small>(Apr – Jun)</small></th>
                      <th>Migration Peak<br /><small>(Jul – Oct)</small></th>
                      <th>Mid-Peak Season<br /><small>(Nov – Mar)</small></th>
                      <th>Inclusions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Mid-Range Value</strong></td>
                      <td className="mm-price-cell">$890 – $1,080</td>
                      <td className="mm-price-cell highlight">$1,250 – $1,480</td>
                      <td className="mm-price-cell">$1,020 – $1,220</td>
                      <td>4x4 Land Cruiser, full board, park fees, transfers</td>
                    </tr>
                    <tr>
                      <td><strong>Comfort Mid-Range</strong></td>
                      <td className="mm-price-cell">$1,180 – $1,450</td>
                      <td className="mm-price-cell highlight">$1,750 – $2,150</td>
                      <td className="mm-price-cell">$1,350 – $1,680</td>
                      <td>All meals, Talek/Mara river camp, unlimited game drives</td>
                    </tr>
                    <tr>
                      <td><strong>Premier Luxury</strong></td>
                      <td className="mm-price-cell">$2,100 – $2,800</td>
                      <td className="mm-price-cell highlight">$3,200 – $4,400</td>
                      <td className="mm-price-cell">$2,500 – $3,400</td>
                      <td>Luxury canvas suite, fine dining, private guide</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "5day" && (
            <div className="mm-cost-table-card">
              <div className="mm-cost-intro">
                <h3>5-Day / 4-Night Deep Dive</h3>
                <p>Four nights is for photographers, repeat safari enthusiasts, and travellers who want to explore remote corners like the Sand River border, Mara Triangle, and Naboisho conservancies.</p>
              </div>
              <div className="mm-table-scroll">
                <table className="mm-cost-table">
                  <thead>
                    <tr>
                      <th>Safari Tier</th>
                      <th>Green Season<br /><small>(Apr – Jun)</small></th>
                      <th>Migration Peak<br /><small>(Jul – Oct)</small></th>
                      <th>Mid-Peak Season<br /><small>(Nov – Mar)</small></th>
                      <th>Inclusions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Mid-Range Value</strong></td>
                      <td className="mm-price-cell">$1,150 – $1,390</td>
                      <td className="mm-price-cell highlight">$1,620 – $1,950</td>
                      <td className="mm-price-cell">$1,320 – $1,580</td>
                      <td>4x4 transport, full board, park entry, Maasai guide</td>
                    </tr>
                    <tr>
                      <td><strong>Comfort Mid-Range</strong></td>
                      <td className="mm-price-cell">$1,520 – $1,890</td>
                      <td className="mm-price-cell highlight">$2,280 – $2,800</td>
                      <td className="mm-price-cell">$1,750 – $2,180</td>
                      <td>Riverfront camp, bush breakfasts, sundowners</td>
                    </tr>
                    <tr>
                      <td><strong>Premier Luxury</strong></td>
                      <td className="mm-price-cell">$2,750 – $3,650</td>
                      <td className="mm-price-cell highlight">$4,200 – $5,800</td>
                      <td className="mm-price-cell">$3,300 – $4,500</td>
                      <td>Ultra-luxury camp, conservancy fees, champagne bush meals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="mm-pricing-note">
          <FaInfoCircle />
          <span>
            <em>Festive Season Note</em>: Travels between December 20th and January 5th incur a holiday supplement
            ($50–$100 pps/night) depending on the lodge policy. Rates shown are per person based on 2 adults sharing.
          </span>
        </div>
      </section>

      {/* ── Section: Where to Stay (The Camps Directory) ── */}
      <MaasaiMaraCampsDirectory onOpenBooking={onOpenBooking} />

      {/* ── Section: What is the Maasai Mara? ── */}
      <section className="mm-guide-section" id="ecosystem">
        <div className="mm-section-header">
          <span className="mm-badge">ECOSYSTEM EXPLAINED</span>
          <h2>What is the Maasai Mara?</h2>
        </div>

        <div className="mm-eco-grid">
          <div className="mm-eco-card">
            <h3>The National Reserve (1,510 km²)</h3>
            <p>
              Managed by the Narok County Government and Mara Conservancy. This is the core public protected area
              where the famous Mara and Talek River crossings occur. Off-road driving and night drives are strictly
              prohibited here to protect animal habitats.
            </p>
            <span className="mm-eco-tag">Public Reserve · Highest Wildlife Density</span>
          </div>

          <div className="mm-eco-card">
            <h3>Private Conservancies (1,400+ km²)</h3>
            <p>
              Land owned by indigenous Maasai pastoralist communities leased to high-end eco-tourism partners
              (such as Mara North, Naboisho, Olare Motorogi, and Siana). Stricter vehicle limits, walking safaris,
              and thrilling night game drives with spotlights are permitted here.
            </p>
            <span className="mm-eco-tag">Private Concessions · Zero Crowds · Night Drives</span>
          </div>
        </div>
      </section>

      {/* ── Section: Best Time to Visit & Migration ── */}
      <section className="mm-guide-section" id="best-time">
        <div className="mm-section-header">
          <span className="mm-badge">WHEN TO TRAVEL</span>
          <h2>Best Time to Visit Maasai Mara</h2>
          <p>The Mara delivers world-class wildlife sightings 365 days a year, but each season has its own unique magic:</p>
        </div>

        <div className="mm-seasons-grid">
          <div className="mm-season-card">
            <div className="mm-season-badge peak">JULY – OCTOBER</div>
            <h3>Great Migration Season</h3>
            <p>
              1.5+ million wildebeest and zebras flood the Mara from the Serengeti. Expect dramatic, heart-stopping
              river crossings, high predator activity, dry weather, and crisp early mornings.
            </p>
            <ul className="mm-season-bullets">
              <li>✓ River crossings along Mara &amp; Talek rivers</li>
              <li>✓ Prime lion, leopard and cheetah hunting action</li>
              <li>⚠️ Book 6–9 months ahead for top camps</li>
            </ul>
          </div>

          <div className="mm-season-card">
            <div className="mm-season-badge warm">JANUARY – MARCH</div>
            <h3>Predators &amp; Calving Season</h3>
            <p>
              The short grass season. Warm, sunny days with clear skies. Resident big cats are on the prowl around
              birthing herbivore herds. Excellent visibility and fewer vehicles than peak migration.
            </p>
            <ul className="mm-season-bullets">
              <li>✓ Resident Big Five on open savannah</li>
              <li>✓ Lower park fees ($100/day vs $200 in peak)</li>
              <li>✓ Superb birdwatching with migratory species</li>
            </ul>
          </div>

          <div className="mm-season-card">
            <div className="mm-season-badge green">APRIL – JUNE</div>
            <h3>The Green Season</h3>
            <p>
              The rains turn the savannah into a vibrant green paradise with dramatic thundercloud skies. Newborn
              animals abound and lodges offer their lowest rates of the year.
            </p>
            <ul className="mm-season-bullets">
              <li>✓ Deep discounts on luxury lodges (save 30–50%)</li>
              <li>✓ Outstanding photography lighting &amp; flowers</li>
              <li>✓ Private safari feeling with almost zero other vehicles</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Section: Road vs Flight Transfers ── */}
      <section className="mm-guide-section" id="transfers">
        <div className="mm-section-header">
          <span className="mm-badge">GETTING THERE</span>
          <h2>Road Safari vs. Bush Flight: Which is Best?</h2>
          <p>VoyageMara arranges seamless transfers from Nairobi hotel/airport directly to your camp:</p>
        </div>

        <div className="mm-transfers-grid">
          <div className="mm-transfer-card">
            <div className="mm-transfer-icon"><FaCar /></div>
            <h3>4×4 Land Cruiser Road Safari</h3>
            <div className="mm-transfer-meta">⏱ 5 to 6 hours from Nairobi · Most Popular &amp; Cost Effective</div>
            <p>
              Travel in our custom pop-up roof 4×4 Toyota Land Cruiser with your dedicated native Maasai guide.
              Enjoy stops at the Great Rift Valley viewpoint and Narok town. You keep your vehicle and guide
              exclusively for your entire safari.
            </p>
            <div className="mm-transfer-pros">
              <span>✓ Private 4×4 vehicle for full trip</span>
              <span>✓ No strict luggage weight limits</span>
              <span>✓ Substantially more affordable for couples &amp; families</span>
            </div>
          </div>

          <div className="mm-transfer-card">
            <div className="mm-transfer-icon"><FaPlane /></div>
            <h3>Scheduled Safari Flight (Fly-In)</h3>
            <div className="mm-transfer-meta">⏱ 45 minutes flight from Nairobi Wilson Airport (WIL)</div>
            <p>
              Board a bush plane (SafariLink or AirKenya) and touch down directly at a Mara airstrip (Keekorok,
              Olkiombo, Musiara, or Serena). Your camp&apos;s open 4×4 vehicle meets you on the runway for your first game drive.
            </p>
            <div className="mm-transfer-pros">
              <span>✓ Maximum time on safari (skip the road journey)</span>
              <span>✓ Aerial views of Great Rift Valley &amp; wildlife</span>
              <span>⚠️ 15 kg luggage limit in soft-sided duffle bags</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
