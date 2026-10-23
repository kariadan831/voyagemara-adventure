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

/* â”€â”€â”€ Menu Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const MEGA_MENUS = {
  "Maasai Mara": [
    { label: "Maasai Mara Overview", href: "/safaris/maasai-mara/overview" },
    { label: "3-Day Big Five Safari", href: "/safaris/maasai-mara/3-day-big-five-safari" },
    { label: "Great Wildebeest Migration", href: "/safaris/maasai-mara/great-wildebeest-migration" },
    { label: "Luxury Mara Camps", href: "/safaris/maasai-mara/luxury-mara-camps" },
    { label: "Maasai Culture Experience", href: "/safaris/maasai-mara/maasai-culture-experience" },
  ],
  "Itineraries": [
    { label: "1-Day Nairobi Safari", href: "/safaris/nairobi-national-park" },
    { label: "1-Day Lake Naivasha", href: "/safaris/lake-naivasha" },
    { label: "1-Day Lake Nakuru", href: "/safaris/lake-nakuru" },
    { label: "2-Day Amboseli Safari", href: "/safaris/amboseli" },
    { label: "3-Day Maasai Mara", href: "/safaris/maasai-mara" },
    { label: "3-Day Samburu Safari", href: "/safaris/samburu" },
    { label: "5-Day Kenya Classic", href: "/#safari-pricing-tables" },
    { label: "7-Day Ultimate Kenya", href: "/#safari-pricing-tables" },
    { label: "Custom Itinerary", href: "/#contact" },
  ],
  "Kenya Safaris": [
    { label: "Book a Safari (Instant Quote)", href: "/kenya-safaris/book-a-safari" },
    { label: "All Safari Packages", href: "/kenya-safaris/all-safari-packages" },
    { label: "Kenya Safari Pricing", href: "/kenya-safaris/pricing" },
    { label: "Park Fees Explained", href: "/kenya-safaris/park-fees-explained" },
    { label: "Family Safaris", href: "/kenya-safaris/family-safaris" },
    { label: "Honeymoon Safaris", href: "/kenya-safaris/honeymoon-safaris" },
    { label: "Group / Corporate Safaris", href: "/kenya-safaris/group-corporate-safaris" },
  ],
  "Destinations": [
    { label: "All Destinations", href: "/#destinations" },
    { label: "Maasai Mara Reserve", href: "/safaris/maasai-mara" },
    { label: "Amboseli National Park", href: "/safaris/amboseli" },
    { label: "Lake Nakuru Park", href: "/safaris/lake-nakuru" },
    { label: "Samburu Reserve", href: "/safaris/samburu" },
    { label: "Lake Naivasha", href: "/safaris/lake-naivasha" },
    { label: "Nairobi National Park", href: "/safaris/nairobi-national-park" },
  ],
};

/* â”€â”€â”€ Desktop Dropdown â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
        <ul>
          {items.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                role="menuitem"
                onClick={() => onToggle(null)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* â”€â”€â”€ Mobile Accordion Item â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function MobileAccordion({ label, items, isOpen, onToggle, onClose }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

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
        ref={contentRef}
        style={{ maxHeight: `${height}px` }}
        aria-hidden={!isOpen}
      >
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="drawer-accordion-link"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* â”€â”€â”€ Main Navbar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
              ðŸŒ Nairobi safari experts â€” 100% Maasai-guided
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
          <img src="/logo.webp" alt="VoyageMara Safaris Logo" width="140" height="48" />
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
            to="/gallery"
            className={`nav-link${pathname === "/gallery" ? " active" : ""}`}
          >
            Gallery
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
            <span>Get a Quote</span> <span className="nav-quote-arrow">â†’</span>
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

      {/* â”€â”€ Mobile Drawer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className={`nav-mobile-drawer${mobileOpen ? " open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="nav-drawer-header">
          <img src="/logo.webp" alt="VoyageMara Safaris" width="120" height="40" />
          <button type="button" className="nav-drawer-close" onClick={closeMobile} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        <div className="nav-drawer-inner">
          <Link to="/#home" className="nav-drawer-link" onClick={closeMobile}>Home</Link>

          {/* Accordion menus â€” same as desktop dropdowns */}
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
            ðŸ¦ Book a Safari (Instant Quote)
          </Link>
          <Link to="/gallery" className="nav-drawer-link" onClick={closeMobile}>Gallery</Link>
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
              Instant Quote & Booking Engine â†’
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

