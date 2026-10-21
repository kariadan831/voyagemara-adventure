import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaChevronDown,
  FaTimes,
  FaBars,
  FaSun,
  FaMoon,
  FaTripadvisor,
} from "react-icons/fa";
import "./Navbar.css";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g294207-d34744740-Reviews-VoyageMara_Safaris-Nairobi.html";

/* ─── Menu Data with Rich Professional Info ─────────────── */
const MEGA_MENUS = {
  "Kenya Safaris": [
    {
      label: "Book a Safari (Instant Quote)",
      desc: "Interactive pricing engine: customize dates, party size & vehicle options with zero hidden fees.",
      tag: "Live Calculator",
      icon: "⚡",
      href: "/booking",
    },
    {
      label: "All Safari Packages",
      desc: "1 to 7-day wildlife, migration & cultural expeditions across Kenya's iconic national parks.",
      tag: "From $180",
      icon: "🚙",
      href: "/#tours",
    },
    {
      label: "Kenya Safari Pricing",
      desc: "Transparent price tiers: Budget Bush Camps, Mid-Range Tented Lodges & 5-Star Luxury.",
      tag: "Best Rates",
      icon: "💰",
      href: "/#safari-pricing-tables",
    },
    {
      label: "Park Fees Explained",
      desc: "Official 2026/2027 KWS & Maasai Mara tariffs ($100–$200/day). All included in our package quotes.",
      tag: "2026/2027 Tariffs",
      icon: "🎟️",
      href: "/#safari-pricing-tables",
    },
    {
      label: "Family Safaris",
      desc: "Child-friendly lodges, dedicated private pop-up 4×4 Land Cruisers, and flexible savannah pacing.",
      tag: "Kids Welcome",
      icon: "👨‍👩‍👦",
      href: "/#tours",
    },
    {
      label: "Honeymoon Safaris",
      desc: "Romantic private luxury camps, sunrise champagne balloon safaris & candlelit bush dinners.",
      tag: "Romantic Escapes",
      icon: "💍",
      href: "/#contact",
    },
    {
      label: "Group / Corporate Safaris",
      desc: "Multi-vehicle safari fleets, team retreats, private Maasai guides & custom group discounts.",
      tag: "Special Rates",
      icon: "👥",
      href: "/#contact",
    },
  ],
  "Maasai Mara": [
    {
      label: "Maasai Mara Overview",
      desc: "Kenya's premier wildlife reserve: predator density, open savannah plains & community conservancies.",
      tag: "Reserve Guide",
      icon: "🌍",
      href: "/safaris/maasai-mara",
    },
    {
      label: "3-Day Big Five Safari",
      desc: "Our flagship tour: lions, leopards, cheetahs, and elephants in private custom 4×4 Land Cruisers.",
      tag: "Best Seller",
      icon: "🦁",
      href: "/safaris/maasai-mara#itinerary",
    },
    {
      label: "Great Wildebeest Migration",
      desc: "Over 1.5 million herds braving the Mara River crocodile crossings between July and October.",
      tag: "July – Oct Peak",
      icon: "🦓",
      href: "/#itineraries",
    },
    {
      label: "Luxury Mara Camps",
      desc: "Handpicked 5-star tented pavilions, en-suite bathrooms, swimming pools & gourmet dining.",
      tag: "5-Star Lodges",
      icon: "⛺",
      href: "/safaris/maasai-mara#accommodation",
    },
    {
      label: "Maasai Culture Experience",
      desc: "Authentic cultural visits to traditional Maasai bomas, fire-making, traditional dances & wisdom.",
      tag: "Cultural Heritage",
      icon: "🔥",
      href: "/safaris/maasai-mara#culture",
    },
  ],
  "Itineraries": [
    {
      label: "1-Day Nairobi Safari",
      desc: "Wildlife safari with Nairobi city skyline in the background. Lions, rhinos & buffaloes.",
      tag: "Quick Day Trip",
      icon: "🦒",
      href: "/safaris/nairobi-national-park",
    },
    {
      label: "1-Day Lake Naivasha",
      desc: "Scenic boat ride among hippos and walking safari on Crescent Island alongside giraffes & zebras.",
      tag: "Walking Safari",
      icon: "🦩",
      href: "/safaris/lake-naivasha",
    },
    {
      label: "1-Day Lake Nakuru",
      desc: "World-famous protected rhino sanctuary for endangered black & white rhinos, plus flamingos.",
      tag: "Rhino Sanctuary",
      icon: "🦏",
      href: "/safaris/lake-nakuru",
    },
    {
      label: "2-Day Amboseli Safari",
      desc: "Massive elephant herds roaming beneath the snow-capped peak of Mount Kilimanjaro.",
      tag: "Kilimanjaro Views",
      icon: "🐘",
      href: "/safaris/amboseli",
    },
    {
      label: "3-Day Maasai Mara",
      desc: "Complete Big Five savannah adventure with native Maasai guides and sunrise game drives.",
      tag: "Most Popular",
      icon: "🐆",
      href: "/safaris/maasai-mara",
    },
    {
      label: "3-Day Samburu Safari",
      desc: "Rugged northern arid wilderness with rare Grevy's zebras, gerenuks, Somali ostriches & leopards.",
      tag: "Northern Kenya",
      icon: "🦅",
      href: "/safaris/samburu",
    },
    {
      label: "5-Day Kenya Classic",
      desc: "The grand circuit: Maasai Mara Big Five, Lake Nakuru rhinos & Lake Naivasha boat adventures.",
      tag: "Comprehensive",
      icon: "⭐",
      href: "/#safari-pricing-tables",
    },
    {
      label: "7-Day Ultimate Kenya",
      desc: "Full Kenya immersion: Samburu, Lake Nakuru, Maasai Mara & Amboseli with top lodges.",
      tag: "Full Immersion",
      icon: "👑",
      href: "/#safari-pricing-tables",
    },
    {
      label: "Custom Itinerary",
      desc: "Build your dream custom Kenya route with Duncan Ronkorua and our local Nairobi team.",
      tag: "Tailor-Made",
      icon: "✨",
      href: "/#contact",
    },
  ],
  "Destinations": [
    {
      label: "All Destinations",
      desc: "Explore all premier national parks, private conservancies & wildlife ecosystems in Kenya.",
      tag: "Explore All",
      icon: "🗺️",
      href: "/#destinations",
    },
    {
      label: "Maasai Mara Reserve",
      desc: "World capital of lion prides, cheetahs & the dramatic Great Wildebeest Migration.",
      tag: "Iconic Mara",
      icon: "🦁",
      href: "/safaris/maasai-mara",
    },
    {
      label: "Amboseli National Park",
      desc: "Land of giants: large elephant herds against the snow-capped peak of Mount Kilimanjaro.",
      tag: "Mt Kilimanjaro",
      icon: "🐘",
      href: "/safaris/amboseli",
    },
    {
      label: "Lake Nakuru Park",
      desc: "Rift Valley flamingo haven & premier UNESCO World Heritage rhino sanctuary.",
      tag: "Rhino Sanctuary",
      icon: "🦏",
      href: "/safaris/lake-nakuru",
    },
    {
      label: "Samburu Reserve",
      desc: "Untamed northern savannah home to the rare Northern Special Five adapted to arid lands.",
      tag: "Northern Wilderness",
      icon: "🌿",
      href: "/safaris/samburu",
    },
    {
      label: "Lake Naivasha",
      desc: "Freshwater rift lake with boat cruises, walking safaris on Crescent Island & birdlife.",
      tag: "Boat & Walk",
      icon: "⛵",
      href: "/safaris/lake-naivasha",
    },
    {
      label: "Nairobi National Park",
      desc: "The world's only wildlife park bordering a capital city, just 15 minutes from downtown.",
      tag: "City Sanctuary",
      icon: "🏙️",
      href: "/safaris/nairobi-national-park",
    },
  ],
};

/* ─── Desktop Dropdown ──────────────────────────────────── */
function MegaDropdown({ label, items, isOpen, onToggle }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onToggle(null);
    }
    if (isOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, onToggle]);

  return (
    <div className={`nav-dropdown-wrap${isOpen ? " open" : ""}`} ref={ref}>
      <button
        className="nav-dropdown-trigger"
        onClick={() => onToggle(isOpen ? null : label)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        {label} <FaChevronDown className="nav-chevron" />
      </button>
      <div className="nav-mega-panel" role="menu" aria-label={label + " menu"}>
        <div className="nav-mega-grid">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="nav-mega-card"
              role="menuitem"
              onClick={() => onToggle(null)}
            >
              <div className="nav-mc-icon-wrap" aria-hidden="true">
                <span>{item.icon}</span>
              </div>
              <div className="nav-mc-body">
                <div className="nav-mc-head">
                  <strong className="nav-mc-title">{item.label}</strong>
                  {item.tag && <span className="nav-mc-tag">{item.tag}</span>}
                </div>
                {item.desc && <p className="nav-mc-desc">{item.desc}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Accordion Item with Rich Info Cards ─────────── */
function MobileAccordion({ label, items, isOpen, onToggle, onClose }) {
  return (
    <div className={`drawer-accordion${isOpen ? " open" : ""}`}>
      <button
        type="button"
        className="drawer-accordion-trigger"
        onClick={() => onToggle(isOpen ? null : label)}
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <FaChevronDown className="drawer-accordion-chevron" />
      </button>
      <div
        className="drawer-accordion-content"
        style={{
          maxHeight: isOpen ? "2500px" : "0px",
          transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        aria-hidden={!isOpen}
      >
        <div className="drawer-accordion-items">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="drawer-accordion-card"
              onClick={onClose}
            >
              <div className="drawer-ac-icon-wrap" aria-hidden="true">
                <span>{item.icon}</span>
              </div>
              <div className="drawer-ac-body">
                <div className="drawer-ac-head">
                  <strong className="drawer-ac-title">{item.label}</strong>
                  {item.tag && <span className="drawer-ac-tag">{item.tag}</span>}
                </div>
                {item.desc && <p className="drawer-ac-desc">{item.desc}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Navbar ─────────────────────────────────────────── */
export default function Navbar({ onOpenBooking }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("voyagemara-theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("voyagemara-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Scroll tracker for sticky style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["home", "destinations", "tours", "about", "itineraries", "safari-pricing-tables", "gallery", "faq", "contact"];
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = "home";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 200) current = id;
        }
        setActiveSection(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setMobileAccordion(null);
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleGetQuote = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
    navigate("/booking");
  };

  const closeMobile = () => setMobileOpen(false);

  const isActive = (sec) => pathname === "/" && activeSection === sec;

  return (
    <>
      {/* Top Bar */}
      <div className="navbar-topbar">
        <div className="navbar-topbar-inner">
          <div className="topbar-left">
            <span className="topbar-expert-text">
              🌍 Nairobi safari experts — 100% Maasai-guided
            </span>
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-ta-badge"
              title="VoyageMara Safaris on TripAdvisor"
            >
              <FaTripadvisor className="topbar-ta-icon" />
              <span>Listed on TripAdvisor #d34744740</span>
            </a>
          </div>
          <div className="topbar-right">
            <a href="tel:+254705814181" className="topbar-link">
              <FaPhoneAlt /> +254 705 814 181
            </a>
            <a
              href="https://wa.me/254705814181?text=Hello%20VoyageMara%20Safaris!%20I%20would%20like%20to%20enquire%20about%20a%20Kenya%20safari."
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-link topbar-wa"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="main-nav">
        <Link className="logo" to="/#home" onClick={closeMobile}>
          <img src="/logo.png" alt="VoyageMara Safaris Logo" width="140" height="48" />
        </Link>

        {/* Desktop nav */}
        <div className="nav-desktop">
          <Link
            to="/#home"
            className={`nav-link${isActive("home") ? " active" : ""}`}
          >
            Home
          </Link>

          {Object.entries(MEGA_MENUS).map(([label, items]) => (
            <MegaDropdown
              key={label}
              label={label}
              items={items}
              isOpen={openDropdown === label}
              onToggle={setOpenDropdown}
            />
          ))}

          <Link
            to="/about"
            className={`nav-link${pathname === "/about" ? " active" : ""}`}
          >
            About
          </Link>

          <Link
            to="/booking"
            className={`nav-link nav-link-booking${pathname === "/booking" ? " active" : ""}`}
          >
            Bookings
          </Link>

          <Link
            to="/#contact"
            className={`nav-link${isActive("contact") ? " active" : ""}`}
          >
            Contact
          </Link>
        </div>

        {/* Right actions */}
        <div className="nav-actions">
          <button
            type="button"
            className="nav-theme-btn"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <a href="tel:+254705814181" className="nav-phone-pill" aria-label="Call us">
            <FaPhoneAlt /> <span>Call</span>
          </a>

          <button
            type="button"
            className="nav-quote-btn"
            onClick={handleGetQuote}
            id="navbar-get-quote"
            aria-label="Get a Safari Quote"
          >
            <span>Get a Quote</span> <span className="nav-quote-arrow">→</span>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ─────────────────────────────────── */}
      <div className={`nav-mobile-drawer${mobileOpen ? " open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="nav-drawer-header">
          <img src="/logo.png" alt="VoyageMara Safaris" width="120" height="40" />
          <button type="button" className="nav-drawer-close" onClick={closeMobile} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        <div className="nav-drawer-inner">
          <Link to="/#home" className="nav-drawer-link" onClick={closeMobile}>Home</Link>

          {/* Accordion menus — same as desktop dropdowns */}
          {Object.entries(MEGA_MENUS).map(([label, items]) => (
            <MobileAccordion
              key={label}
              label={label}
              items={items}
              isOpen={mobileAccordion === label}
              onToggle={setMobileAccordion}
              onClose={closeMobile}
            />
          ))}

          <Link to="/about" className="nav-drawer-link" onClick={closeMobile}>About Us</Link>
          <Link to="/booking" className="nav-drawer-link nav-drawer-booking-highlight" onClick={closeMobile}>
            🦁 Book a Safari (Instant Quote)
          </Link>
          <Link to="/#gallery" className="nav-drawer-link" onClick={closeMobile}>Gallery</Link>
          <Link to="/#faq" className="nav-drawer-link" onClick={closeMobile}>FAQ</Link>
          <Link to="/#contact" className="nav-drawer-link" onClick={closeMobile}>Contact</Link>

          <div className="nav-drawer-ctas">
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-ta-btn"
            >
              <FaTripadvisor /> TripAdvisor Verified Operator
            </a>
            <a
              href="https://wa.me/254705814181?text=Hello%20VoyageMara%20Safaris!%20I%20would%20like%20to%20enquire%20about%20a%20Kenya%20safari."
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-wa-btn"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
            <button type="button" className="drawer-quote-btn" onClick={handleGetQuote}>
              Instant Quote & Booking Engine →
            </button>
          </div>

          <button
            type="button"
            className="nav-drawer-theme"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
      {mobileOpen && <div className="nav-drawer-overlay" onClick={closeMobile} />}
    </>
  );
}