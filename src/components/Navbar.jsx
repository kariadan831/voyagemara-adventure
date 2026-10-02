import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [activeSection, setActiveSection] = useState(() =>
    typeof window === "undefined" ? "home" : window.location.hash.slice(1) || "home"
  );
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    const savedTheme = localStorage.getItem("voyagemara-theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  useEffect(() => {
    if (pathname !== "/") return undefined;

    let frame = 0;
    const sectionIds = ["home", "about", "itineraries", "tours", "gallery", "faq", "contact"];

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = 220;
        let current = "home";

        for (const id of sectionIds) {
          const section = document.getElementById(id);
          const heading = section?.querySelector("h1, h2");
          const sectionTop = heading?.getBoundingClientRect().top ?? section?.getBoundingClientRect().top;
          if (section && sectionTop <= marker) {
            current = id;
          }
        }

        setActiveSection(current);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  const handleClick = () => setOpen(false);

  const isActive = (section) => pathname === "/" && activeSection === section;

  const toggleTheme = () => {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode);

    localStorage.setItem(
      "voyagemara-theme",
      newDarkMode ? "dark" : "light"
    );
  };

  return (
    <nav className="navbar">
      <Link className="logo" to="/#home" onClick={handleClick}>
        <img src="/logo.png" alt="VoyageMara Safaris Logo" />
      </Link>

      <div className={`nav-links ${open ? "active" : ""}`}>
        <Link to="/#home" onClick={handleClick} aria-current={isActive("home") ? "location" : undefined}>
          Home
        </Link>

        <Link to="/about" onClick={handleClick} aria-current={pathname === "/about" ? "page" : undefined}>
          About Us
        </Link>

        <Link to="/#itineraries" onClick={handleClick} aria-current={isActive("itineraries") ? "location" : undefined}>
          Itineraries
        </Link>

        <Link to="/#tours" onClick={handleClick} aria-current={isActive("tours") ? "location" : undefined}>
          Tours
        </Link>

        <Link to="/#gallery" onClick={handleClick} aria-current={isActive("gallery") ? "location" : undefined}>
          Gallery
        </Link>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          <span className="theme-icon">
            {darkMode ? "☀️" : "🌙"}
          </span>
        </button>

        <Link to="/#contact" className="btn" onClick={handleClick}>
          Booking
        </Link>
      </div>

      <button
        type="button"
        className={`hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={
          open ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}