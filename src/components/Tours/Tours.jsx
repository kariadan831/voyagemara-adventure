import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import tours from "../../data/tours";
import TourCard from "./TourCard";
import TourModal from "./TourModal";
import "./Tours.css";

const categories = ["All Safaris", "Popular", "Wildlife", "Day Trip", "Nature", "Adventure"];

export default function Tours() {
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
          Swipe through our award-winning journeys across Kenya. From thrilling Maasai Mara Big Five
          game drives to Amboseli elephant herds and scenic Rift Valley lakes.
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

      {/* OWL CAROUSEL CONTAINER */}
      <div className="owl-carousel-wrapper owl-theme">
        <Swiper
          key={activeCategory}
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          loop={filteredTours.length > 2}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".owl-prev",
            nextEl: ".owl-next",
          }}
          pagination={{
            el: ".owl-dots",
            clickable: true,
            bulletClass: "owl-dot",
            bulletActiveClass: "active",
            renderBullet: (index, className) =>
              `<button type="button" class="${className}" aria-label="Go to slide ${index + 1}"><span></span></button>`,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 26,
            },
          }}
          className="owl-carousel owl-loaded"
        >
          {filteredTours.map((tour) => (
            <SwiperSlide key={tour.id} className="owl-item">
              <TourCard tour={tour} onOpen={() => setSelectedTour(tour)} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* OWL CONTROLS (NAV ARROWS & DOTS) */}
        <div className="owl-controls">
          <div className="owl-dots" aria-label="Carousel pagination dots" />

          <div className="owl-nav" aria-label="Carousel navigation">
            <button type="button" className="owl-prev" aria-label="Previous tour">
              ‹
            </button>
            <button type="button" className="owl-next" aria-label="Next tour">
              ›
            </button>
          </div>
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