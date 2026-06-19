import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import maraHero from "../assets/images/maasai-mara-hero.jpg";
import lion from "../assets/images/lion-safari.jpg";
import elephant from "../assets/images/elephant-herd.jpg";
import balloon from "../assets/images/hot-air-balloon.jpg";

export default function SafariCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="hero-swiper"
    >
      <SwiperSlide>
        <div className="hero-slide-bg">
          <img src={maraHero} alt="Maasai Mara" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hero-slide-bg">
          <img src={lion} alt="Lion Safari" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hero-slide-bg">
          <img src={elephant} alt="Elephant Herd" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hero-slide-bg">
          <img src={balloon} alt="Hot Air Balloon" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}