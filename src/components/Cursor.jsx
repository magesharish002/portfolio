import { useEffect, useRef, useState } from "react";
import { gsap, isFinePointer } from "../lib/gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!isFinePointer()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    document.documentElement.classList.add("has-custom-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const onMove = (event) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const reset = () => {
      setLabel("");
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(233, 239, 250, 0.35)",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onOver = (event) => {
      const target = event.target.closest("a, button, [data-cursor]");
      if (!target) {
        reset();
        return;
      }
      const nextLabel = target.dataset.cursorLabel || "";
      setLabel(nextLabel);
      gsap.to(ring, {
        scale: nextLabel ? 2.8 : 1.9,
        borderColor: "rgba(63, 240, 221, 0.85)",
        backgroundColor: nextLabel
          ? "rgba(63, 240, 221, 0.08)"
          : "rgba(63, 240, 221, 0.03)",
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1.6, duration: 0.3 });
    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__ring" ref={ringRef}>
        <span className={`cursor__label ${label ? "is-visible" : ""}`}>
          {label}
        </span>
      </div>
      <div className="cursor__dot" ref={dotRef} />
    </div>
  );
}
