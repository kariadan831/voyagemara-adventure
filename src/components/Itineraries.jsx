import "../styles/Itineraries.css";

const itineraries = [
  {
    title: "Amboseli Luxury Safari",
    guests: "Adults: 2 | Children: 1",
    duration: "8 Days / 7 Nights",
    price: "$6,390",
    location: "Amboseli National Park",
    featured: true,
  },
  {
    title: "Diani Beach + Maasai Mara Combo",
    guests: "Adults: 6 | Children: 0",
    duration: "10 Days / 9 Nights",
    price: "$13,890",
    location: "Coast + Safari",
  },
  {
    title: "Joining Safari - Amboseli",
    guests: "Adults: 4 | Children: 0",
    duration: "7 Days / 6 Nights",
    price: "$7,040",
    location: "Amboseli",
  },
  {
    title: "Maasai Mara Group Safari",
    guests: "Adults: 6 | Children: 0",
    duration: "6 Days / 5 Nights",
    price: "$7,380",
    location: "Maasai Mara",
  },
];

export default function Itineraries() {
  return (
    <section className="itinerary-section">
      
      {/* HEADER */}
      <div className="itinerary-header">
        <h2>Luxury Kenya Safari Itineraries</h2>
        <p>Curated travel experiences across Kenya’s top destinations</p>
      </div>

      {/* GRID */}
      <div className="itinerary-grid">
        {itineraries.map((item, i) => (
          <div
            key={i}
            className={`itinerary-card ${item.featured ? "featured" : ""}`}
          >
            <div className="card-top">
              <span className="location">📍 {item.location}</span>
              {item.featured && <span className="featured-badge">⭐ Featured</span>}
            </div>

            <h3>{item.title}</h3>

            <div className="info">
              <p>👥 {item.guests}</p>
              <p>📅 {item.duration}</p>
            </div>

            <div className="bottom">
              <h4>{item.price}</h4>

              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/254705814181?text=I want to book: ${item.title}`,
                    "_blank"
                  )
                }
              >
                Book Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}