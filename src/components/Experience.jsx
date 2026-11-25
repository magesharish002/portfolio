import { useLayoutEffect, useRef } from "react";
import { experience } from "../data/portfolio";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Experience() {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  const items = experience.filter((item) => item.type !== "Education");

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 72%",
            end: "bottom 62%",
            scrub: true,
          },
        },
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="section journey">
      <div className="container">
        <SectionHead
          index="05"
          label="Journey"
          titleLines={[
            "Internships &",
            <>
              what they <span className="grad">taught me.</span>
            </>,
          ]}
          text="Not a list of logos — a list of things I can now do because someone let me try."
        />

        <div className="timeline" ref={timelineRef}>
          <span className="timeline__line" ref={lineRef} aria-hidden="true" />

          {items.map((item, index) => (
            <Reveal
              className="timeline__item"
              key={`${item.title}-${index}`}
              y={30}
              delay={index * 0.05}
            >
              <span className="timeline__dot" aria-hidden="true">
                <span />
              </span>

              <div className="timeline__card panel">
                <div className="timeline__top">
                  <span className="timeline__period mono">{item.period}</span>
                  <span className="timeline__type">{item.type}</span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <ul className="tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                <span className="timeline__index" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
