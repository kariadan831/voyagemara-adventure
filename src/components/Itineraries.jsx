import { Helmet } from "react-helmet-async";
import "../styles/Itineraries.css";

const itineraries = [
  {
    title: "Amboseli Luxury Safari",
    guests: "Adults: 2 | Children: 1",
    duration: "8 Days / 7 Nights",
    price: "6390",
    location: "Amboseli National Park",
    featured: true,
  },
  {
    title: "Diani Beach + Maasai Mara Combo",
    guests: "Adults: 6 | Children: 0",
    duration: "10 Days / 9 Nights",
    price: "13890",
    location: "Coast + Safari",
  },
  {
    title: "Joining Safari - Amboseli",
    guests: "Adults: 4 | Children: 0",
    duration: "7 Days / 6 Nights",
    price: "7040",
    location: "Amboseli",
  },
  {
    title: "Maasai Mara Group Safari",
    guests: "Adults: 6 | Children: 0",
    duration: "6 Days / 5 Nights",
    price: "7380",
    location: "Maasai Mara",
  },
];

export default function Itineraries() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": itineraries.map((trip) => ({
              "@type": "TouristTrip",
              name: trip.title,
              description: `${trip.duration} safari package to ${trip.location}.`,
              touristType: "Wildlife Safari",
              itinerary: {
                "@type": "ItemList",
                numberOfItems: parseInt(trip.duration),
              },
              offers: {
                "@type": "Offer",
                price: trip.price,
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              provider: {
                "@type": "TravelAgency",
                name: "VoyageMara Safaris",
                url: "https://voyagemara-adventure.vercel.app/",
              },
            })),
          })}
        </script>
      </Helmet>

      <section className="itinerary-section" id="itineraries">
        {/* HEADER */}
        <div className="itinerary-header">
          <h2>Luxury Kenya Safari Itineraries</h2>
          <p>Curated travel experiences across Kenya's top destinations</p>
        </div>

        {/* GRID */}
        <div className="itinerary-grid">
          {itineraries.map((item, i) => (
            <div
              key={i}
              className={`itinerary-card ${
                item.featured ? "featured" : ""
              }`}
            >
              <div className="card-top">
                <span className="location">📍 {item.location}</span>

                {item.featured && (
                  <span className="featured-badge">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <h3>{item.title}</h3>

              <div className="info">
                <p>👥 {item.guests}</p>
                <p>📅 {item.duration}</p>
              </div>

              <div className="bottom">
                <h4>${Number(item.price).toLocaleString()}</h4>

                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/254705814181?text=${encodeURIComponent(
                        `Hello VoyageMara, I would like to book the ${item.title} package.`
                      )}`,
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
    </>
  );
}