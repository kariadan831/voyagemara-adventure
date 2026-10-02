export default function MapEmbed() {
  return (
    <section className="map-section" id="map">
      
      <h2>📍 Maasai Mara Location</h2>

      <div
        style={{
          width: "100%",
          height: "450px",
          borderRadius: "14px",
          overflow: "hidden",
          marginTop: "15px",
        }}
      >
        <iframe
          title="Maasai Mara Map"
          src="https://maps.google.com/maps?q=Maasai%20Mara%20National%20Reserve%2C%20Kenya&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="map-actions">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Maasai+Mara+Kenya"
          target="_blank"
          rel="noopener noreferrer"
          className="map-btn secondary"
        >
          🧭 Get Directions
        </a>

        <a
          href="https://wa.me/254705814181"
          target="_blank"
          rel="noopener noreferrer"
          className="map-btn"
        >
          💬 WhatsApp Us
        </a>
      </div>

    </section>
  );
}