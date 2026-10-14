import { useState, useRef, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaCompass,
  FaArrowRight,
  FaChevronDown,
  FaCheck,
  FaSearch,
} from "react-icons/fa";
import "../styles/styles.css";

const destinationsList = [
  {
    id: "mara",
    title: "Maasai Mara Big Five Safari",
    duration: "3 Days / 2 Nights",
    highlights: "Big Five & Great Migration",
    badge: "Most Popular",
    icon: "🦁",
    fullValue: "3-Day Maasai Mara Big Five Safari",
  },
  {
    id: "amboseli",
    title: "Amboseli Elephant & Kilimanjaro",
    duration: "2 Days / 1 Night",
    highlights: "Mt. Kilimanjaro Views & Elephant Herds",
    badge: "Scenic",
    icon: "🐘",
    fullValue: "2-Day Amboseli Elephant & Kilimanjaro Safari",
  },
  {
    id: "samburu",
    title: "Samburu Northern Special Five",
    duration: "3 Days / 2 Nights",
    highlights: "Rare Northern Wildlife & Culture",
    badge: "Adventure",
    icon: "🦒",
    fullValue: "3-Day Samburu Northern Special Five Safari",
  },
  {
    id: "nakuru",
    title: "Lake Nakuru Rhino & Flamingo",
    duration: "1 Day Safari",
    highlights: "Rhino Sanctuary & Seasonal Flamingos",
    badge: "Day Trip",
    icon: "🦏",
    fullValue: "1-Day Lake Nakuru Rhino & Flamingo Safari",
  },
  {
    id: "naivasha",
    title: "Lake Naivasha & Crescent Island",
    duration: "1 Day Safari",
    highlights: "Boat Safari & Walking with Giraffes",
    badge: "Relax",
    icon: "🚤",
    fullValue: "1-Day Lake Naivasha Boat & Crescent Island Tour",
  },
  {
    id: "custom",
    title: "Custom Multi-Park Itinerary",
    duration: "Flexible (3–10 Days)",
    highlights: "Tailor-made private Kenyan circuit",
    badge: "2026/2027",
    icon: "🧭",
    fullValue: "Custom Multi-Park Kenya Itinerary",
  },
];

const guestsList = [
  {
    id: "solo",
    label: "1 Solo Traveller",
    desc: "Single room & private guide option",
    icon: "👤",
    fullValue: "1 Solo Traveller",
  },
  {
    id: "couple",
    label: "2 Travellers (Couple / Friends)",
    desc: "Most requested safari group size",
    badge: "Popular",
    icon: "👥",
    fullValue: "2 Travellers (Couple / Friends)",
  },
  {
    id: "small-group",
    label: "3–4 Travellers (Small Group)",
    desc: "Great for families or friends sharing",
    icon: "👨‍👩‍👧",
    fullValue: "3-4 Travellers (Small Group)",
  },
  {
    id: "large-group",
    label: "5+ Family / Private Group",
    desc: "Dedicated private 4x4 Land Cruiser",
    badge: "Private Cruiser",
    icon: "🚐",
    fullValue: "5+ Family / Private Group",
  },
];

export default function Hero({ onOpenBooking }) {
  const [selectedDest, setSelectedDest] = useState(destinationsList[0]);
  const [selectedGuest, setSelectedGuest] = useState(guestsList[1]);
  const [searchDate, setSearchDate] = useState("");

  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [destSearchQuery, setDestSearchQuery] = useState("");

  const destRef = useRef(null);
  const guestRef = useRef(null);
  const destSearchInputRef = useRef(null);

  // Today date formatted for HTML min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (destRef.current && !destRef.current.contains(event.target)) {
        setIsDestOpen(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setIsGuestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when destination select opens
  useEffect(() => {
    if (isDestOpen && destSearchInputRef.current) {
      setTimeout(() => destSearchInputRef.current?.focus(), 80);
    } else {
      setDestSearchQuery("");
    }
  }, [isDestOpen]);

  // Filter destinations based on search query (Select2 search feature)
  const filteredDestinations = destinationsList.filter(
    (item) =>
      item.title.toLowerCase().includes(destSearchQuery.toLowerCase()) ||
      item.highlights.toLowerCase().includes(destSearchQuery.toLowerCase()) ||
      item.duration.toLowerCase().includes(destSearchQuery.toLowerCase())
  );

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking({
        tour: selectedDest.fullValue,
        travelDate: searchDate,
        guests: selectedGuest.fullValue,
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
                  tour: selectedDest.fullValue,
                  travelDate: searchDate,
                  guests: selectedGuest.fullValue,
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

        {/* LUXURY SEARCH / AVAILABILITY BAR (SELECT2 EQUIVALENT) */}
        <div className="hero-search-bar-wrap">
          <form className="hero-search-bar" onSubmit={handleQuickSearchSubmit}>
            {/* 1. CUSTOM LUXURY DESTINATION SELECT */}
            <div className="hero-select-field" ref={destRef}>
              <span className="hero-field-label">
                <FaCompass /> Destination / Safari
              </span>

              <button
                type="button"
                className={`hero-select-trigger ${isDestOpen ? "active" : ""}`}
                onClick={() => {
                  setIsDestOpen(!isDestOpen);
                  setIsGuestOpen(false);
                }}
                aria-haspopup="listbox"
                aria-expanded={isDestOpen}
              >
                <div className="trigger-main">
                  <span className="trigger-icon">{selectedDest.icon}</span>
                  <div className="trigger-text">
                    <strong className="trigger-title">{selectedDest.title}</strong>
                    <span className="trigger-sub">{selectedDest.duration}</span>
                  </div>
                </div>
                <FaChevronDown
                  className={`trigger-chevron ${isDestOpen ? "open" : ""}`}
                />
              </button>

              {/* SELECT2 LUXURY POPUP MENU */}
              {isDestOpen && (
                <div className="hero-dropdown-menu dest-menu" role="listbox">
                  {/* SEARCH FILTER BOX (SELECT2 FEATURE) */}
                  <div className="dropdown-search-box">
                    <FaSearch className="search-box-icon" />
                    <input
                      ref={destSearchInputRef}
                      type="text"
                      className="dropdown-search-input"
                      placeholder="Search safari or park (e.g. Mara, Amboseli)..."
                      value={destSearchQuery}
                      onChange={(e) => setDestSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="dropdown-options-list">
                    {filteredDestinations.length > 0 ? (
                      filteredDestinations.map((item) => {
                        const isSelected = item.id === selectedDest.id;
                        return (
                          <div
                            key={item.id}
                            className={`dropdown-option-item ${isSelected ? "selected" : ""}`}
                            onClick={() => {
                              setSelectedDest(item);
                              setIsDestOpen(false);
                            }}
                            role="option"
                            aria-selected={isSelected}
                          >
                            <span className="option-icon">{item.icon}</span>
                            <div className="option-details">
                              <div className="option-header">
                                <strong className="option-title">{item.title}</strong>
                                {item.badge && (
                                  <span className="option-badge">{item.badge}</span>
                                )}
                              </div>
                              <span className="option-sub">
                                {item.duration} · {item.highlights}
                              </span>
                            </div>
                            {isSelected && <FaCheck className="option-check" />}
                          </div>
                        );
                      })
                    ) : (
                      <div className="dropdown-empty">
                        No safari matches "{destSearchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 2. TRAVEL DATE (SMART MIN-DATE VALIDATION) */}
            <div className="hero-select-field">
              <label htmlFor="hero-travel-date" className="hero-field-label">
                <FaCalendarAlt /> Travel Date
              </label>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  id="hero-travel-date"
                  className="hero-date-control"
                  min={todayStr}
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
            </div>

            {/* 3. CUSTOM LUXURY TRAVELLERS SELECT */}
            <div className="hero-select-field" ref={guestRef}>
              <span className="hero-field-label">
                <FaUsers /> Travellers
              </span>

              <button
                type="button"
                className={`hero-select-trigger ${isGuestOpen ? "active" : ""}`}
                onClick={() => {
                  setIsGuestOpen(!isGuestOpen);
                  setIsDestOpen(false);
                }}
                aria-haspopup="listbox"
                aria-expanded={isGuestOpen}
              >
                <div className="trigger-main">
                  <span className="trigger-icon">{selectedGuest.icon}</span>
                  <div className="trigger-text">
                    <strong className="trigger-title">{selectedGuest.label}</strong>
                    <span className="trigger-sub">{selectedGuest.desc}</span>
                  </div>
                </div>
                <FaChevronDown
                  className={`trigger-chevron ${isGuestOpen ? "open" : ""}`}
                />
              </button>

              {/* TRAVELLERS POPUP MENU */}
              {isGuestOpen && (
                <div className="hero-dropdown-menu guest-menu" role="listbox">
                  <div className="dropdown-options-list">
                    {guestsList.map((item) => {
                      const isSelected = item.id === selectedGuest.id;
                      return (
                        <div
                          key={item.id}
                          className={`dropdown-option-item ${isSelected ? "selected" : ""}`}
                          onClick={() => {
                            setSelectedGuest(item);
                            setIsGuestOpen(false);
                          }}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <span className="option-icon">{item.icon}</span>
                          <div className="option-details">
                            <div className="option-header">
                              <strong className="option-title">{item.label}</strong>
                              {item.badge && (
                                <span className="option-badge">{item.badge}</span>
                              )}
                            </div>
                            <span className="option-sub">{item.desc}</span>
                          </div>
                          {isSelected && <FaCheck className="option-check" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 4. CHECK AVAILABILITY BUTTON */}
            <button type="submit" className="hero-search-submit">
              Check Availability
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}