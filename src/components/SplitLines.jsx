import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function SplitLines({
  lines,
  className = "",
  as: Tag = "h2",
  start = "top 85%",
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll(".line__inner"), {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, index) => (
        <span className="line" key={index}>
          <span className="line__inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
