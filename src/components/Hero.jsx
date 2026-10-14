import { useState } from "react";
import { FaCalendarAlt, FaUsers, FaCompass, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import "../styles/styles.css";

export default function Hero({ onOpenBooking }) {
  const [searchDestination, setSearchDestination] = useState("3-Day Maasai Mara Big Five Safari");
  const [searchDate, setSearchDate] = useState("");
  const [searchGuests, setSearchGuests] = useState("2 Travellers (Couple / Friends)");

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking({
        tour: searchDestination,
        travelDate: searchDate,
        guests: searchGuests,
      });
    }
  };

  return (
    <section id="home" className="hero hero-pro">
      {/* CINEMATIC HIGH-RES BACKGROUND */}
      <div className="hero-bg hero-pro-bg">
        <picture>
          <source
            type="image/webp"
            srcSet="/images/camp-768.webp 768w, /images/camp-1200.webp 1200w, /images/camp-1920.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/images/camp.webp"
            alt="Authentic safari luxury tented camp overlooking wildlife river at sunset in Kenya"
            width="1920"
            height="1080"
            fetchPriority="high"
            decoding="async"
            draggable="false"
          />
        </picture>
        <div className="hero-pro-overlay" />
      </div>

      {/* CENTERED HERO CONTENT */}
      <div className="hero-pro-container">
        <div className="hero-pro-content">
          <div className="hero-pro-badge">
            <FaCompass className="hero-badge-icon" />
            <span>NAIROBI, KENYA · LICENSED LOCAL TOUR OPERATOR</span>
          </div>

          <h1 className="hero-pro-title">
            Kenya Safari Packages &amp; Maasai Mara Tours
          </h1>

          <p className="hero-pro-lead">
            Your Africa story starts here. Handcrafted wildlife journeys guided by certified native Maasai specialists, private 4x4 Land Cruisers, and hand-selected luxury tented camps.
          </p>

          <div className="hero-pro-actions">
            <button
              type="button"
              className="hero-pro-btn hero-pro-btn-gold"
              onClick={() =>
                onOpenBooking &&
                onOpenBooking({
                  tour: searchDestination,
                  travelDate: searchDate,
                  guests: searchGuests,
                })
              }
            >
              <span>Plan My Safari</span>
              <FaArrowRight className="hero-btn-arrow" />
            </button>

            <button
              type="button"
              className="hero-pro-btn hero-pro-btn-outline"
              onClick={() => {
                document.getElementById("tours")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <span>Explore All Safaris</span>
            </button>
          </div>
        </div>

        {/* QUICK AVAILABILITY / BOOKING SEARCH BAR */}
        <div className="hero-search-bar-wrap">
          <form className="hero-search-bar" onSubmit={handleQuickSearchSubmit}>
            <div className="hero-search-field">
              <label htmlFor="hero-dest">
                <FaCompass /> Destination / Safari
              </label>
              <select
                id="hero-dest"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
              >
                <option value="3-Day Maasai Mara Big Five Safari">Maasai Mara Big Five (3 Days)</option>
                <option value="2-Day Amboseli Elephant & Kilimanjaro Safari">Amboseli & Kilimanjaro (2 Days)</option>
                <option value="3-Day Samburu Northern Special Five Safari">Samburu Special Five (3 Days)</option>
                <option value="1-Day Lake Nakuru Rhino & Flamingo Safari">Lake Nakuru Rhino Safari (1 Day)</option>
                <option value="1-Day Lake Naivasha Boat & Crescent Island Tour">Lake Naivasha & Crescent Island (1 Day)</option>
                <option value="Custom Multi-Park Kenya Itinerary">Custom Multi-Park Route (2026/2027)</option>
              </select>
            </div>

            <div className="hero-search-field">
              <label htmlFor="hero-date">
                <FaCalendarAlt /> Travel Date
              </label>
              <input
                type="date"
                id="hero-date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>

            <div className="hero-search-field">
              <label htmlFor="hero-guests">
                <FaUsers /> Travellers
              </label>
              <select
                id="hero-guests"
                value={searchGuests}
                onChange={(e) => setSearchGuests(e.target.value)}
              >
                <option value="1 Solo Traveller">1 Solo Traveller</option>
                <option value="2 Travellers (Couple / Friends)">2 Travellers (Most Popular)</option>
                <option value="3-4 Travellers (Small Group)">3–4 Travellers</option>
                <option value="5+ Family / Private Group">5+ Family / Group</option>
              </select>
            </div>

            <button type="submit" className="hero-search-submit">
              Check Availability
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}