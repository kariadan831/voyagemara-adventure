import { useState } from "react";
import tours from "../../data/tours";
import TourCard from "./TourCard";
import TourModal from "./TourModal";
import "./Tours.css";

export default function Tours() {
  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <section className="tours-section" id="tours">
      <div className="tours-header">
        <h2>Featured Tours & Safari Experiences</h2>

        <p>
          Handcrafted luxury safari packages across Kenya's most iconic
          destinations.
        </p>
      </div>

      <div className="tours-grid">
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            onOpen={() => setSelectedTour(tour)}
          />
        ))}
      </div>

      {selectedTour && (
        <TourModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </section>
  );
}