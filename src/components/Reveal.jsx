import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  y = 28,
  delay = 0,
  duration = 0.9,
  start = "top 88%",
  once = true,
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y,
        autoAlpha: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          once,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
