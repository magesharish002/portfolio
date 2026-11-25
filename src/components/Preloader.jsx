import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { profile } from "../data/portfolio";

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      tl.to(
        counter,
        {
          value: 100,
          duration: reduced ? 0.4 : 1.35,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(
                Math.round(counter.value),
              ).padStart(3, "0");
            }
          },
        },
        0,
      )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: reduced ? 0.4 : 1.35,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          ".preloader__center, .preloader__meta",
          {
            opacity: 0,
            y: -16,
            duration: 0.3,
            ease: "power2.in",
          },
          reduced ? 0.45 : 1.4,
        )
        .to(
          rootRef.current,
          {
            yPercent: -100,
            duration: reduced ? 0.4 : 0.8,
            ease: "power4.inOut",
          },
          reduced ? 0.55 : 1.6,
        )
        .set(rootRef.current, { display: "none" });
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader__grid" />
      <div className="preloader__corner preloader__corner--tl">
        <span className="preloader__dot" />
        {profile.name.toUpperCase()} — FRONTEND / EMBEDDED
      </div>
      <div className="preloader__corner preloader__corner--tr">2026</div>

      <div className="preloader__center">
        <div className="preloader__monogram">
          <span className="preloader__orbit" />
          {profile.initials}
        </div>
        <p className="preloader__name">{profile.name.toUpperCase()}</p>
        <p className="preloader__role">PORTFOLIO / LOADING</p>
      </div>

      <div className="preloader__meta">
        <span className="preloader__status">
          <i />
          Initialising interface
        </span>
        <span className="preloader__count" ref={countRef}>
          000
        </span>
      </div>
      <div className="preloader__bar">
        <span ref={barRef} />
      </div>
    </div>
  );
}
