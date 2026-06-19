import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import "../styles/styles.css";

const slides = [
  {
    tag: "ADVENTURE",
    title: "Maasai Mara Experience",
    subtitle: "Witness the Great Migration in Kenya’s iconic reserve.",
    image: "/images/masai mara.jpg",
  },
  {
    tag: "WILDLIFE",
    title: "Lion Encounters",
    subtitle: "Experience lions in their natural savannah habitat.",
    image: "/images/lions.jpg",
  },
  {
    tag: "DISCOVERY",
    title: "Cheetah Speed Chase",
    subtitle: "Watch Africa’s fastest predator in action.",
    image: "/images/cheetah.jpg",
  },
  {
    tag: "SAFARI",
    title: "Elephant Herds",
    subtitle: "Majestic giants roaming across Amboseli plains.",
    image: "/images/elephant.jpg",
  },
  {
    tag: "WILDLIFE",
    title: "Elephant Close View",
    subtitle: "Up close safari encounters with elephants.",
    image: "/images/eleph1.jpg",
  },
  {
    tag: "WILDLIFE",
    title: "Elephant Trails",
    subtitle: "Follow the movement of herds across savannah.",
    image: "/images/eleph2.jpg",
  },
  {
    tag: "NATURE",
    title: "Hippo River Life",
    subtitle: "Hippos relaxing in Kenya’s rivers and lakes.",
    image: "/images/hippo.jpg",
  },
  {
    tag: "FARM LIFE",
    title: "Kilimo Experience",
    subtitle: "Discover local farming culture in Kenya.",
    image: "/images/kilimo.jpg",
  },
  {
    tag: "NATURE",
    title: "Savannah Zebras",
    subtitle: "Beautiful zebra herds across open plains.",
    image: "/images/zebras.jpg",
  },
  {
    tag: "ROMANCE",
    title: "Hot Air Balloon Safari",
    subtitle: "Sunrise over Maasai Mara skies.",
    image: "/images/ballon.jpg",
  },
  {
    tag: "LUXURY",
    title: "Luxury Safari Camp",
    subtitle: "Comfort meets wilderness in premium camps.",
    image: "/images/camp.jpg",
  },
  {
    tag: "CULTURE",
    title: "Maasai Culture",
    subtitle: "Authentic traditions of the Maasai people.",
    image: "/images/maasai.jpg",
  },
  {
    tag: "CULTURE",
    title: "Maasai Warriors",
    subtitle: "Traditional Maasai life and heritage.",
    image: "/images/maasai 1.jpg",
  },
  {
    tag: "ICONIC",
    title: "Rhino Sanctuary",
    subtitle: "Rare rhino sightings in protected reserves.",
    image: "/images/rhino.jpg",
  },
  {
    tag: "WILDLIFE",
    title: "Wildebeest Migration",
    subtitle: "The great migration across Maasai Mara.",
    image: "/images/masai mara.jpg",
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
        style={{ backgroundImage: `url(${current.image})` }}
      />

      <div className="hero-overlay" />

      {/* CARD */}
      <div className="hero-center">
        <div ref={cardRef} className="hero-card landscape">

          <div className="hero-image">
            <img
              src={current.image}
              alt={current.title}
              onError={(e) => {
                e.target.src = "/images/camp.jpg";
              }}
            />
          </div>

          <div className="hero-text">
            <div className="hero-tag">{current.tag}</div>

            <h2 ref={titleRef}>{current.title}</h2>

            <p ref={textRef}>{current.subtitle}</p>

           <button
  className="hero-btn"
  onClick={() => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  <span>Explore Safari</span>
  <i className="btn-ripple" />
</button>
          </div>

        </div>
      </div>

      {/* ARROWS */}
      <button className="arrow arrow-left" onClick={prevSlide}>‹</button>
      <button className="arrow arrow-right" onClick={nextSlide}>›</button>

      {/* THUMB STRIP */}
      <div className="thumb-strip">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.image}
            alt={slide.title}
            className={i === index ? "active-thumb" : ""}
            onClick={() => changeSlide(i)}
          />
        ))}
      </div>

    </section>
  );
}