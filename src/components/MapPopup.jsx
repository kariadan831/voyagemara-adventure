import { useState } from "react";

export default function MapPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="floating-map-btn" onClick={() => setOpen(true)}>
        🗺️ Map
      </button>

      {open && (
        <div className="map-modal">
          <div className="map-box">
            <button className="close-btn" onClick={() => setOpen(false)}>
              ✖
            </button>

            <iframe
              title="Map"
              src="https://www.google.com/maps?q=Sekenani+Gate+Maasai+Mara&output=embed"
              width="100%"
              height="400"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}