import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(false);

  return (
    <nav className="navbar">
      <Link className="logo" to="/" onClick={handleClick}>
        <img src="/logo.png" alt="VoyageMara Safaris Logo" />
      </Link>

      <div className={`nav-links ${open ? "active" : ""}`}>
        <Link to="/" onClick={handleClick}>Home</Link>

        <Link to="/about" onClick={handleClick}>
          About Us
        </Link>

        <a href="/#itineraries" onClick={handleClick}>
          Itineraries
        </a>

        <a href="/#tours" onClick={handleClick}>
          Tours
        </a>

        <a href="/#gallery" onClick={handleClick}>
          Gallery
        </a>

        <a href="/#contact" className="btn" onClick={handleClick}>
          Booking
        </a>
      </div>

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