import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const scrollToSection = (hash) => {
  const target = document.querySelector(hash);
  if (!target) return;

  if (window.__lenis) {
    window.__lenis.start();
    // Lenis honours the root's scroll-padding-top (96px) for element
    // targets, which clears the fixed navbar without double offsetting.
    window.__lenis.scrollTo(target, { duration: 1.25 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
