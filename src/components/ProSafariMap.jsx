import { useEffect, useState } from "react";

export default function ProSafariMap() {
  const [open, setOpen] = useState(false);

  const locations = [
    {
      name: "Maasai Mara – Sekenani Gate",
      coords: "Sekenani+Gate+Maasai+Mara",
    },
    {
      name: "Maasai Mara – Aitong Area",
      coords: "Aitong+Maasai+Mara+Kenya",
    },
    {
      name: "Maasai Mara – Talek River",
      coords: "Talek+River+Maasai+Mara",
    },
  ];

  // FIX: prevent background scroll on mobile when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        className="floating-map-btn"
        onClick={() => setOpen(true)}
      >
        🗺️ Map
      </button>

      {/* MODAL */}
      {open && (
        <div
          className="map-modal"
          onClick={() => setOpen(false)}   // CLOSE WHEN CLICK OUTSIDE
        >
          <div
            className="map-box"
            onClick={(e) => e.stopPropagation()} // PREVENT CLOSE WHEN CLICK INSIDE
          >

            {/* CLOSE BUTTON */}
            <button
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>

            <h3>📍 Maasai Mara Explorer Map</h3>

            <iframe
              title="Maasai Mara Map"
              src="https://www.google.com/maps?q=Maasai+Mara&output=embed"
              width="100%"
              height="320"
              style={{
                border: 0,
                borderRadius: "12px",
              }}
              loading="lazy"
            />

            {/* LOCATIONS */}
            <div className="location-list">
              {locations.map((loc, i) => (
                <a
                  key={i}
                  href={`https://www.google.com/maps?q=${loc.coords}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 {loc.name}
                </a>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="map-actions">
              <a
                className="map-btn secondary"
                href="https://www.google.com/maps/dir/?api=1&destination=Maasai+Mara+Kenya"
                target="_blank"
                rel="noopener noreferrer"
              >
                🧭 Get Directions
              </a>

              <a
                className="map-btn"
                href="https://wa.me/254705814181"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp Guide
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}