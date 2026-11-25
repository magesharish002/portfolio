import { useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "../lib/gsap";

export default function Magnetic({
  children,
  className = "",
  strength = 0.3,
  as: Tag = "span",
}) {
  const ref = useRef(null);

  const handleMove = (event) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!isFinePointer()) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <Tag
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </Tag>
  );
}
