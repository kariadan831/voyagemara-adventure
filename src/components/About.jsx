import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const safariMoments = [
    {
      image: "/images/masai-mara.webp",
      alt: "Open savannah landscape in the Maasai Mara at golden hour",
      place: "Maasai Mara",
      title: "A slower kind of wild",
      description: "Follow the rhythm of the Mara, from wide-open plains to unforgettable wildlife encounters.",
    },
    {
      image: "/images/lions.webp",
      alt: "Lion resting on a rock during a Kenya safari",
      place: "Maasai Mara",
      title: "Meet the icons of the savannah",
      description: "Spend time in the field with an experienced local guide and watch wildlife on its own terms.",
    },
    {
      image: "/images/elephant.webp",
      alt: "Elephant herd crossing the savannah at sunset",
      place: "Amboseli",
      title: "Giants beneath an open sky",
      description: "Discover Amboseli’s elephant country and wide views toward Mount Kilimanjaro.",
    },
    {
      image: "/images/maasai.webp",
      alt: "Maasai people in traditional dress in Kenya",
      place: "Kenya culture",
      title: "Travel with a sense of place",
      description: "Make room for meaningful cultural encounters, guided with care and respect.",
    },
    {
      image: "/images/camp.webp",
      alt: "Tented safari camp overlooking the Maasai Mara at sunrise",
      place: "Safari stays",
      title: "Comfort, close to the wild",
      description: "Unwind between game drives in thoughtfully chosen camps and lodges.",
    },
];

export default function About() {
  const swiperRef = useRef(null);
  const galleryRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeMoment = safariMoments[activeSlide];

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle("is-about-carousel-visible", entry.isIntersecting);
      document.querySelectorAll(".floating-map-btn").forEach((button) => {
        button.classList.toggle("carousel-obscured", entry.isIntersecting);
        button.classList.toggle("safari-map-button", true);
      });
    }, { threshold: 0.08 });

    observer.observe(gallery);
    return () => {
      observer.disconnect();
      document.body.classList.remove("is-about-carousel-visible");
      document.querySelectorAll(".floating-map-btn").forEach((button) => {
        button.classList.remove("carousel-obscured");
      });
    };
  }, []);

  return (
    <section className="about-luxury cinematic" id="about">

      {/* INTRO */}
      <div className="about-intro reveal">
        <span className="subtitle">VOYAGEMARA SAFARIS</span>

        <h2>Experience Africa Like a Living Documentary</h2>

        <p className="lead">
          Step into Kenya’s wild beauty through cinematic safari journeys where
          every sunrise and every roar becomes part of your story.
        </p>
      </div>

      {/* GRID */}
      <div className="about-container">

        {/* TEXT */}
        <div className="about-text reveal">
          <p>
            At VoyageMara, we design immersive safari experiences across Kenya’s top destinations.
          </p>

          <p>
            Maasai Mara, Amboseli, Nakuru and beyond — every journey is crafted for emotion and adventure.
          </p>

          <div className="about-highlights">
            <span>🦁 Big Five Encounters</span>
            <span>🌅 Sunrise Game Drives</span>
            <span>🏕️ Luxury Camps</span>
            <span>📸 Cinematic Routes</span>
          </div>
        </div>

        {/* SWIPER */}
        <div ref={galleryRef} className="about-gallery reveal zoom">
          <Swiper
            modules={[Autoplay, EffectFade, Keyboard]}
            autoplay={{ delay: 5600, disableOnInteraction: false, pauseOnMouseEnter: true }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            speed={650}
            keyboard={{ enabled: true }}
            className="about-swiper"
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          >
            {safariMoments.map((moment) => (
              <SwiperSlide key={moment.image}>
                <img src={moment.image} alt={moment.alt} loading="lazy" decoding="async" width="1200" height="750" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="about-gallery-shade" aria-hidden="true" />

          <div className="about-gallery-topline" aria-hidden="true">
            <span><i /> FIELD NOTES <b>·</b> KENYA</span>
            <span className="about-gallery-count">{String(activeSlide + 1).padStart(2, "0")} <b>/</b> {String(safariMoments.length).padStart(2, "0")}</span>
          </div>

          <div className="about-gallery-caption" aria-live="polite" aria-atomic="true">
            <div className="about-gallery-copy">
              <span className="about-gallery-place">{activeMoment.place}</span>
              <h3>{activeMoment.title}</h3>
              <p>{activeMoment.description}</p>
            </div>
            <div className="about-gallery-controls">
              <button type="button" onClick={() => swiperRef.current?.slidePrev()} aria-label="Previous safari photograph"><span aria-hidden="true">←</span><span className="about-gallery-control-label">Previous</span></button>
              <button type="button" onClick={() => swiperRef.current?.slideNext()} aria-label="Next safari photograph"><span className="about-gallery-control-label">Next</span><span aria-hidden="true">→</span></button>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section reveal">
        <Counter end={500} label="Happy Travelers" />
        <Counter end={60} label="Safari Packages" />
        <Counter end={12} label="Years Experience" />
        <Counter end={100} label="Local Guides %" />
      </div>

      {/* WHY */}
      <div className="why-section reveal">
        <h2>Why Travel With VoyageMara</h2>

        <div className="why-grid">
          <div className="why-card">🦁 Expert Safari Guides</div>
          <div className="why-card">🌍 Tailor-Made Luxury Safaris</div>
          <div className="why-card">🏕️ Premium Camps</div>
          <div className="why-card">🚙 Private Vehicles</div>
          <div className="why-card">📸 Cinematic Photography</div>
          <div className="why-card">🌱 Eco Travel</div>
        </div>
      </div>

      {/* TEAM */}
      <div className="team-section reveal">
        <h2>Meet Our Expert Team</h2>

        <div className="team-grid">

          <div className="team-card">
            <div className="team-icon">👨‍💼</div>
            <h4>Duncan Ronkorua</h4>
            <p>Founder & CEO — 20+ years safari experience in East Africa.</p>
          </div>

          <div className="team-card">
            <div className="team-icon">🧭</div>
            <h4>Professional Safari Guides</h4>
            <p>Wildlife experts trained in animal behavior & tracking.</p>
          </div>

          <div className="team-card">
            <div className="team-icon">📞</div>
            <h4>Customer Support Team</h4>
            <p>24/7 assistance for bookings, inquiries, and travel help.</p>
          </div>

          <div className="team-card">
            <div className="team-icon">🚗</div>
            <h4>Operations Team</h4>
            <p>Ensures safety, logistics, and smooth safari experiences.</p>
          </div>

        </div>
      </div>

    </section>
  );
}

/* COUNTER COMPONENT */
function Counter({ end, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="stat-box">
      <h3>{count}+</h3>
      <p>{label}</p>
    </div>
  );
}