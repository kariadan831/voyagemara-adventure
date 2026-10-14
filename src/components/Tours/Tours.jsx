import { useState, useMemo } from "react";
import tours from "../../data/tours";
import TourCard from "./TourCard";
import TourModal from "./TourModal";
import "./Tours.css";

const categories = ["All Safaris", "Popular", "Wildlife", "Day Trip", "Nature", "Adventure"];

export default function Tours({ onOpenBooking }) {
  const [selectedTour, setSelectedTour] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Safaris");

  const filteredTours = useMemo(() => {
    if (activeCategory === "All Safaris") return tours;
    return tours.filter((t) => t.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory]);

  return (
    <section className="tours-section" id="tours" aria-labelledby="tours-heading">
      <div className="tours-header">
        <span className="tours-eyebrow">HANDCRAFTED KENYA SAFARIS</span>
        <h2 id="tours-heading">Featured Tours &amp; Safari Experiences</h2>
        <p>
          Explore our handcrafted private and small-group wildlife journeys across Kenya. From thrilling Maasai Mara Big Five game drives to Amboseli elephant herds and scenic Great Rift Valley lakes.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="tours-filter-bar" role="tablist" aria-label="Tour categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={`tours-filter-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* LUXURY TOURS GRID (NON-SWIPER, INSTANT DISPLAY) */}
      <div className="tours-grid-container">
        <div className="tours-grid">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="tours-grid-item">
              <TourCard
                tour={tour}
                onOpen={() => setSelectedTour(tour)}
                onOpenBooking={onOpenBooking}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedTour && (
        <TourModal
          key={selectedTour.id}
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </section>
  );
}