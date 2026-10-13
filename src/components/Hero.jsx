import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { FaCalendarAlt, FaUsers, FaCompass, FaArrowRight } from "react-icons/fa";
import "../styles/styles.css";

const slides = [
  {
    tag: "MAASAI MARA NATIONAL RESERVE",
    title: "The Great Migration & Big Five",
    subtitle: "Experience Kenya’s premier savannah with native Maasai guides, private 4x4 Land Cruisers, and luxury tented camps.",
    image: "/images/masai-mara.webp",
    defaultTour: "3-Day Maasai Mara Big Five Safari",
  },
  {
    tag: "AMBOSELI NATIONAL PARK",
    title: "Elephant Herds Beneath Kilimanjaro",
    subtitle: "Witness iconic elephant families against Africa's highest snow-capped peak in breathtaking wide-open wetlands.",
    image: "/images/elephant.webp",
    defaultTour: "2-Day Amboseli Elephant & Kilimanjaro Safari",
  },
  {
    tag: "SAMBURU & THE NORTH",
    title: "Rare Northern Wildlife Safari",
    subtitle: "Track the unique Northern Special Five along the palm-lined Ewaso Nyiro River in rugged, untamed landscapes.",
    image: "/tours/samburu/cover.webp",
    defaultTour: "3-Day Samburu Northern Special Five Safari",
  },
  {
    tag: "GREAT RIFT VALLEY",
    title: "Rhinos, Flamingos & Boat Safaris",
    subtitle: "Explore Lake Nakuru’s rhino sanctuary and glide past wild hippos on Lake Naivasha before a Crescent Island walking safari.",
    image: "/images/hippo.webp",
    defaultTour: "1-Day Lake Nakuru Rhino & Flamingo Safari",
  },
  {
    tag: "LUXURY WILDERNESS STAYS",
    title: "Authentic Safari Lodges & Camps",
    subtitle: "Unwind under star-filled African skies in hand-selected luxury tented lodges where comfort meets the wilderness.",
    image: "/images/camp.webp",
    defaultTour: "Custom Multi-Park Kenya Itinerary",
  },
];

export default function Hero({ onOpenBooking }) {
  const [index, setIndex] = useState(0);

  // Quick search card form state
  const [searchDestination, setSearchDestination] = useState("3-Day Maasai Mara Big Five Safari");
  const [searchDate, setSearchDate] = useState("");
  const [searchGuests, setSearchGuests] = useState("2 Travellers (Couple / Friends)");

  const bgRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const current = slides[index];

  const changeSlide = useCallback((nextIndex) => {
    const tl = gsap.timeline();

    tl.to([cardRef.current, titleRef.current, textRef.current], {
      opacity: 0,
      y: -15,
      duration: 0.22,
    })
      .to(bgRef.current, {
        opacity: 0,
        scale: 1.08,
        duration: 0.28,
      }, "<")
      .call(() => setIndex(nextIndex));
  }, []);

  const nextSlide = useCallback(() => {
    changeSlide((index + 1) % slides.length);
  }, [index, changeSlide]);

  const prevSlide = useCallback(() => {
    changeSlide((index - 1 + slides.length) % slides.length);
  }, [index, changeSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    gsap.fromTo(bgRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.7 }
    );

    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55 }
    );

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45 }
    );

    gsap.fromTo(textRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.45 }
    );
  }, [index]);

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking({
        tour: searchDestination,
        travelDate: searchDate,
        guests: searchGuests,
      });
    }
  };

  return (
    <section id="home" className="hero">
      {/* BACKGROUND IMAGE */}
      <div ref={bgRef} className="hero-bg">
        <img
          src={current.image}
          alt={current.title}
          width="1920"
          height="1280"
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
          draggable="false"
        />
      </div>

      <div className="hero-overlay" />

      {/* HERO MAIN TEXT CARD */}
      <div className="hero-center">
        <div ref={cardRef} className="hero-card landscape">
          <div className="hero-text">
            <span className="hero-eyebrow">
              <FaCompass /> NAIROBI, KENYA · LICENSED LOCAL TOUR OPERATOR
            </span>

            <h1>Your Africa Story Starts Here.</h1>
            <h2 ref={titleRef}>{current.title}</h2>
            <p ref={textRef}>{current.subtitle}</p>

            <div className="hero-actions">
              <button
                type="button"
                className="hero-btn hero-btn-gold"
                onClick={() =>
                  onOpenBooking &&
                  onOpenBooking({
                    tour: current.defaultTour,
                  })
                }
              >
                <span>Plan My Safari</span>
                <FaArrowRight className="hero-btn-arrow" />
              </button>

              <button
                type="button"
                className="hero-btn hero-btn-outline"
                onClick={() => {
                  document.getElementById("tours")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <span>Explore All Safaris</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK TRIP-PLANNER CARD (BOARDING PASS QUICK-QUOTE) */}
      <div className="hero-quick-search-wrapper">
        <form className="hero-quick-search" onSubmit={handleQuickSearchSubmit}>
          <div className="search-field">
            <label htmlFor="hero-dest">
              <FaCompass /> Destination / Safari
            </label>
            <select
              id="hero-dest"
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
            >
              <option value="3-Day Maasai Mara Big Five Safari">Maasai Mara Big Five (3 Days)</option>
              <option value="2-Day Amboseli Elephant & Kilimanjaro Safari">Amboseli & Kilimanjaro (2 Days)</option>
              <option value="3-Day Samburu Northern Special Five Safari">Samburu Special Five (3 Days)</option>
              <option value="1-Day Lake Nakuru Rhino & Flamingo Safari">Lake Nakuru Rhino Safari (1 Day)</option>
              <option value="1-Day Lake Naivasha Boat & Crescent Island Tour">Lake Naivasha & Crescent Island (1 Day)</option>
              <option value="Custom Multi-Park Kenya Itinerary">Custom Multi-Park Route (2026/2027)</option>
            </select>
          </div>

          <div className="search-field">
            <label htmlFor="hero-date">
              <FaCalendarAlt /> Travel Date
            </label>
            <input
              type="date"
              id="hero-date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>

          <div className="search-field">
            <label htmlFor="hero-guests">
              <FaUsers /> Travellers
            </label>
            <select
              id="hero-guests"
              value={searchGuests}
              onChange={(e) => setSearchGuests(e.target.value)}
            >
              <option value="1 Solo Traveller">1 Solo Traveller</option>
              <option value="2 Travellers (Couple / Friends)">2 Travellers (Most Popular)</option>
              <option value="3-4 Travellers (Small Group)">3–4 Travellers</option>
              <option value="5+ Family / Private Group">5+ Family / Group</option>
            </select>
          </div>

          <button type="submit" className="search-submit-btn">
            Check Availability
          </button>
        </form>
      </div>

      {/* ARROWS */}
      <button className="arrow arrow-left" onClick={prevSlide} aria-label="Previous safari highlight">‹</button>
      <button className="arrow arrow-right" onClick={nextSlide} aria-label="Next safari highlight">›</button>

      {/* THUMB STRIP */}
      <div className="thumb-strip">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            className={i === index ? "active-thumb" : ""}
            onClick={() => changeSlide(i)}
            aria-label={`Show ${slide.title}`}
            aria-current={i === index ? "true" : undefined}
          >
            <img
              src={slide.image}
              alt=""
              loading="lazy"
              decoding="async"
              width="120"
              height="80"
              draggable="false"
            />
          </button>
        ))}
      </div>
    </section>
  );
}