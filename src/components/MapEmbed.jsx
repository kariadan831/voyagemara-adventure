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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127631.4!2d35.0081!3d-1.4061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182c4b2b5a5a5a5a%3A0x0!2sMaasai%20Mara!5e0!3m2!1sen!2ske!4v0000000000000"
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