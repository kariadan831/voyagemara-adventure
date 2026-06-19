import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function About() {
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
        <div className="about-gallery reveal zoom">

          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            effect="fade"
            loop
            className="about-swiper"
          >

            <SwiperSlide>
              <img src="/images/masai mara.jpg" alt="Maasai Mara Safari" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="/images/lions.jpg" alt="Lion Safari" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="/images/elephant.jpg" alt="Elephant Safari" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="/images/maasai.jpg" alt="Maasai Culture" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="/images/camp.jpg" alt="Luxury Safari Camp" />
            </SwiperSlide>

          </Swiper>

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