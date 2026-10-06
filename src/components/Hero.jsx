import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../styles/styles.css";

const slides = [
  {
    tag: "BOOK MAASAI MARA",
    title: "Book Maasai Mara Safari",
    subtitle: "Experience Kenya’s iconic Big Five savannah with expert local Maasai guides and luxury tented camps.",
    image: "/images/masai-mara.webp",
  },
  {
    tag: "DISCOVERY",
    title: "Cheetah Speed Chase",
    subtitle: "Watch Africa’s fastest predator in action.",
    image: "/images/cheetah.webp",
  },
  {
    tag: "SAFARI",
    title: "Elephant Herds",
    subtitle: "Majestic giants roaming across Amboseli plains.",
    image: "/images/elephant.webp",
  },
  {
    tag: "NATURE",
    title: "Hippo River Life",
    subtitle: "Hippos relaxing in Kenya’s rivers and lakes.",
    image: "/images/hippo.webp",
  },
  {
    tag: "LUXURY",
    title: "Luxury Safari Camp",
    subtitle: "Comfort meets wilderness in premium camps.",
    image: "/images/camp.webp",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const bgRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const current = slides[index];

  const changeSlide = useCallback((nextIndex) => {
    const tl = gsap.timeline();

    tl.to([cardRef.current, titleRef.current, textRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.25,
    })
      .to(bgRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.3,
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
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    gsap.fromTo(bgRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.7 }
    );

    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    );

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    gsap.fromTo(textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [index]);

  return (
    <section id="home" className="hero">

      {/* BACKGROUND */}
      <div
        ref={bgRef}
        className="hero-bg"
      >
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

      {/* CARD */}
      <div className="hero-center">
        <div ref={cardRef} className="hero-card landscape">
          <div className="hero-text">
            <div className="hero-tag">{current.tag}</div>

            <h1>Book Kenya Safaris &amp; Maasai Mara Tours</h1>
            <h2 ref={titleRef}>{current.title}</h2>

            <p ref={textRef}>{current.subtitle}</p>

            <div className="hero-actions">
              <Link
                to="/safaris/maasai-mara"
                className="hero-btn"
                aria-label="Book Maasai Mara Safari"
              >
                <span>Book Maasai Mara Safari</span>
                <i className="btn-ripple" />
              </Link>
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

      {/* ARROWS */}
      <button className="arrow arrow-left" onClick={prevSlide} aria-label="Previous safari highlight">‹</button>
      <button className="arrow arrow-right" onClick={nextSlide} aria-label="Next safari highlight">›</button>

      {/* THUMB STRIP */}
      <div className="thumb-strip">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
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