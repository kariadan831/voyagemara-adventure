import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAppleScroll() {
  gsap.to(".hero-bg", {
    scale: 1.2,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.from(".about-text", {
    opacity: 0,
    y: 60,
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
    },
  });
}