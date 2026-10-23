import { useState, useMemo } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCheck,
  FaWhatsapp,
  FaExternalLinkAlt,
  FaFilter,
  FaTimes,
  FaShieldAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaBed,
  FaUtensils,
} from "react-icons/fa";
import { MAASAI_MARA_CAMPS } from "../data/maasaiMaraCamps";
import "./MaasaiMaraCampsDirectory.css";

export default function MaasaiMaraCampsDirectory({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL"); // "ALL" | "Mid-Range" | "Luxury"
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("ALL"); // "ALL" | "inside" | "outside" | "conservancy"
  const [maxPrice, setMaxPrice] = useState(2500);
  const [selectedCampForDetails, setSelectedCampForDetails] = useState(null);

  // Filtered camps
  const filteredCamps = useMemo(() => {
    return MAASAI_MARA_CAMPS.filter((camp) => {
      // Category filter
      if (selectedCategory !== "ALL" && camp.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (
        searchQuery &&
        !camp.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !camp.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(camp.conservancy && camp.conservancy.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !(camp.description && camp.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      // Location filter
      if (locationFilter === "inside" && !camp.insideReserve) return false;
      if (locationFilter === "outside" && (camp.insideReserve || camp.conservancy)) return false;
      if (locationFilter === "conservancy" && !camp.conservancy) return false;

      // Price filter
      if (camp.priceUSD && camp.priceUSD > maxPrice) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, locationFilter, maxPrice]);

  const handleEnquire = (camp) => {
    if (onOpenBooking) {
      onOpenBooking({
        tour: `Maasai Mara Safari — ${camp.name} (${camp.category})`,
        details: `I am interested in staying at ${camp.name} (${camp.location}). Please provide rates and package options for our dates.`,
      });
    }
  };

  const handleWhatsApp = (camp) => {
    const text = encodeURIComponent(
      `Hello VoyageMara Safaris! I'm interested in booking ${camp.name} (${camp.category}) in Maasai Mara. Could you please share lodge availability and 4x4 safari package pricing?`
    );
    window.open(`https://wa.me/254705814181?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const resetFilters = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    setLocationFilter("ALL");
    setMaxPrice(2500);
  };

  return (
    <section className="mmc-directory-section" id="accommodation">
      {/* ── Section Header ── */}
      <div className="mmc-header">
        <span className="mmc-subheading">VERIFIED MAASAI MARA LODGING</span>
        <h2 className="mmc-title">Maasai Mara Camps &amp; Lodges Directory</h2>
        <p className="mmc-lead">
          Compare verified accommodation options across the national reserve and private conservancies.
          All rates are quoted in <strong>US Dollars (USD)</strong> on a full-board or all-inclusive safari basis.
        </p>
      </div>

      {/* ── The Two Primary Category Banners ── */}
      <div className="mmc-category-banners">
        <div
          className={`mmc-category-card mid-range ${selectedCategory === "Mid-Range" ? "active" : ""}`}
          onClick={() => setSelectedCategory(selectedCategory === "Mid-Range" ? "ALL" : "Mid-Range")}
          role="button"
          tabIndex={0}
        >
          <div className="mmc-cat-pill">Option 1</div>
          <h3>MID-RANGE CAMPS &amp; LODGES</h3>
          <p>
            Comfortable safari accommodation, authentic bush ambiance, quality guiding and unbeatable value for
            travellers wanting an exceptional wildlife experience without five-star prices.
          </p>
          <div className="mmc-cat-footer">
            <span className="mmc-rate-badge">Typical: $130 – $340 USD pps/night</span>
            <button type="button" className="mmc-filter-toggle">
              {selectedCategory === "Mid-Range" ? "Showing Mid-Range ✓" : "View Mid-Range"}
            </button>
          </div>
        </div>

        <div
          className={`mmc-category-card luxury ${selectedCategory === "Luxury" ? "active" : ""}`}
          onClick={() => setSelectedCategory(selectedCategory === "Luxury" ? "ALL" : "Luxury")}
          role="button"
          tabIndex={0}
        >
          <div className="mmc-cat-pill luxury">Option 2</div>
          <h3>LUXURY CAMPS &amp; LODGES</h3>
          <p>
            Premium canvas suites, bespoke butler service, prime riverfront crossing positions, gourmet dining, and
            exclusive private conservancies with night game drives and bush walks.
          </p>
          <div className="mmc-cat-footer">
            <span className="mmc-rate-badge luxury">Typical: $450 – $1,650+ USD pps/night</span>
            <button type="button" className="mmc-filter-toggle luxury">
              {selectedCategory === "Luxury" ? "Showing Luxury ✓" : "View Luxury"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="mmc-controls-bar">
        {/* Search */}
        <div className="mmc-search-box">
          <FaSearch className="mmc-search-icon" />
          <input
            type="text"
            placeholder="Search camp by name (e.g. Ashnil, Angama, Fig Tree)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search camps"
          />
          {searchQuery && (
            <button type="button" className="mmc-clear-search" onClick={() => setSearchQuery("")}>
              <FaTimes />
            </button>
          )}
        </div>

        {/* Location Filter */}
        <div className="mmc-filter-group">
          <label htmlFor="mmc-loc-select">
            <FaFilter /> Location:
          </label>
          <select
            id="mmc-loc-select"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="ALL">All Locations &amp; Conservancies</option>
            <option value="inside">Inside National Reserve</option>
            <option value="conservancy">Private Conservancies (Naboisho, Mara North, Olare)</option>
            <option value="outside">Reserve Boundary / Gates</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="mmc-pills">
          <button
            type="button"
            className={`mmc-pill ${selectedCategory === "ALL" ? "active" : ""}`}
            onClick={() => setSelectedCategory("ALL")}
          >
            All Camps ({MAASAI_MARA_CAMPS.length})
          </button>
          <button
            type="button"
            className={`mmc-pill ${selectedCategory === "Mid-Range" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Mid-Range")}
          >
            Mid-Range ({MAASAI_MARA_CAMPS.filter((c) => c.category === "Mid-Range").length})
          </button>
          <button
            type="button"
            className={`mmc-pill luxury ${selectedCategory === "Luxury" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Luxury")}
          >
            Luxury ({MAASAI_MARA_CAMPS.filter((c) => c.category === "Luxury").length})
          </button>
        </div>
      </div>

      {/* ── Results Count & Reset ── */}
      <div className="mmc-meta-bar">
        <span>
          Showing <strong>{filteredCamps.length}</strong> verified Maasai Mara properties
          {selectedCategory !== "ALL" && ` in ${selectedCategory}`}
        </span>
        {(selectedCategory !== "ALL" || searchQuery || locationFilter !== "ALL") && (
          <button type="button" className="mmc-reset-btn" onClick={resetFilters}>
            Reset filters ✕
          </button>
        )}
      </div>

      {/* ── Camps Cards Grid ── */}
      {filteredCamps.length > 0 ? (
        <div className="mmc-grid">
          {filteredCamps.map((camp) => (
            <article key={camp.id} className="mmc-card">
              {/* Card Image */}
              <div className="mmc-card-media">
                <img src={camp.image} alt={`${camp.name} — ${camp.location}`} loading="lazy" />
                <span className={`mmc-badge-cat ${camp.category.toLowerCase()}`}>
                  {camp.category}
                </span>
                <span className="mmc-badge-type">{camp.type.split("(")[0]}</span>
              </div>

              {/* Card Body */}
              <div className="mmc-card-body">
                <div className="mmc-card-location">
                  <FaMapMarkerAlt /> {camp.location}
                </div>

                <h3 className="mmc-card-title">{camp.name}</h3>

                {/* USD Pricing Box */}
                <div className="mmc-price-box">
                  <div className="mmc-price-main">
                    <span className="mmc-price-currency">USD</span>
                    <span className="mmc-price-amount">${camp.priceUSD}</span>
                    <span className="mmc-price-period">/ pps / night</span>
                  </div>
                  <div className="mmc-seasonal-rates">
                    <span title="April to June">Green season: <strong>{camp.greenSeasonRate}</strong></span>
                    <span title="July to October migration peak">Peak season: <strong>{camp.peakSeasonRate}</strong></span>
                  </div>
                </div>

                {/* Details Strip */}
                <div className="mmc-meta-tags">
                  <span className="mmc-meta-item">
                    <FaUtensils /> {camp.mealPlan}
                  </span>
                  <span className="mmc-meta-item">
                    <FaBed /> {camp.insideReserve ? "Inside Reserve" : camp.conservancy || "Near Park Gate"}
                  </span>
                  <span className="mmc-meta-item fees">
                    {camp.parkFeesIncluded ? "✓ Conservancy fees included" : "⚠️ Park fees excluded"}
                  </span>
                </div>

                <p className="mmc-card-desc">{camp.description}</p>

                {/* Facilities List */}
                <div className="mmc-facilities">
                  {camp.facilities.slice(0, 4).map((f) => (
                    <span key={f} className="mmc-facility-chip">
                      <FaCheck /> {f}
                    </span>
                  ))}
                  {camp.facilities.length > 4 && (
                    <span className="mmc-facility-more">+{camp.facilities.length - 4} more</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mmc-card-actions">
                  <button
                    type="button"
                    className="mmc-btn-enquire"
                    onClick={() => handleEnquire(camp)}
                  >
                    Enquire About This Camp →
                  </button>
                  <button
                    type="button"
                    className="mmc-btn-wa"
                    onClick={() => handleWhatsApp(camp)}
                    title="Quick chat about this camp on WhatsApp"
                    aria-label={`WhatsApp chat about ${camp.name}`}
                  >
                    <FaWhatsapp />
                  </button>
                  {camp.officialWebsite && (
                    <a
                      href={camp.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mmc-btn-link"
                      title="Visit official lodge website"
                      aria-label={`Official website for ${camp.name}`}
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mmc-empty">
          <p>No camps found matching your filter criteria.</p>
          <button type="button" className="mmc-reset-btn" onClick={resetFilters}>
            Clear all filters
          </button>
        </div>
      )}

      {/* ── Booking Advice Strip ── */}
      <div className="mmc-advice-strip">
        <div className="mmc-advice-icon">
          <FaShieldAlt />
        </div>
        <div className="mmc-advice-text">
          <h4>VoyageMara Safari Booking Guarantee</h4>
          <p>
            All accommodation bookings organized through VoyageMara Safaris include private round-trip 4×4 Toyota Land
            Cruiser transport, certified native Maasai guide, airport/hotel transfers in Nairobi, and guaranteed gate
            clearance. Park and conservancy tariffs are clearly itemized before booking.
          </p>
        </div>
      </div>
    </section>
  );
}
