import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {

  // IMPORTANT: reduce lag
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });

  // HERO PARALLAX (lighter)
  gsap.to(".hero-bg", {
    scale: 1.08,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8, // smoother + lighter
    },
  });

  // REVEAL ONLY IMPORTANT SECTIONS (NOT ALL CHILDREN)
  gsap.utils.toArray(".story-section").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
      },
    });
  });

}