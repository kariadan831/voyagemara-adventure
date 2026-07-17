import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(false);
  };

  const scrollToHome = () => {
    document.getElementById("home")?.scrollIntoView({
      behavior: "smooth",
    });
    setOpen(false);
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo" onClick={scrollToHome}>
        <img src="/logo.png" alt="VoyageMara Safaris Logo" />
      </div>

      {/* NAV LINKS */}
      <div className={`nav-links ${open ? "active" : ""}`}>
        <a href="#home" onClick={handleClick}>Home</a>
        <a href="/about" onClick={handleClick}>About</a>
        <a href="#itineraries" onClick={handleClick}>Itineraries</a>
        <a href="#tours" onClick={handleClick}>Tours</a>
        <a href="#gallery" onClick={handleClick}>Gallery</a>

        <a href="#contact" className="btn" onClick={handleClick}>
          Booking
        </a>
      </div>

      {/* HAMBURGER */}
      <button
        className={`hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>
  );
}