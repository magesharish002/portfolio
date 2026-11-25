import { useLayoutEffect, useRef } from "react";
import { about, profile } from "../data/portfolio";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import SectionHead from "./SectionHead";
import AnimatedText from "./AnimatedText";
import Reveal from "./Reveal";

function Counter({ value, suffix }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      if (ref.current) ref.current.textContent = String(value);
      return;
    }

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value,
        duration: 1.6,
        ease: "power2.out",
        snap: { value: 1 },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = String(Math.round(counter.value));
          }
        },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <>
      <span ref={ref}>0</span>
      <span className="stat__suffix">{suffix}</span>
    </>
  );
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHead
          index="01"
          label="About"
          titleLines={[
            "Frontend by choice,",
            <>
              embedded by <span className="grad">curiosity.</span>
            </>,
          ]}
          text="Two disciplines, one habit: taking things apart to understand how they work — then building something better."
        />

        <div className="about__grid">
          <div className="about__statement">
            <AnimatedText text={about.statement} className="about__text" />

            <Reveal className="about__signature" y={16} delay={0.3}>
              <span className="about__signature-mark">—</span>
              <span className="about__signature-name">{profile.name}</span>
              <span className="about__signature-role">
                BE CSE · Final year
              </span>
            </Reveal>
          </div>

          <Reveal className="about__card panel" y={36} delay={0.1}>
            <div className="about__card-head">
              <span className="mono">CURRENTLY</span>
              <span className="status-dot" />
            </div>

            <ul className="about__list">
              {about.currently.map((item) => (
                <li key={item.label}>
                  <span className="about__list-label">{item.label}</span>
                  <span className="about__list-value">{item.value}</span>
                </li>
              ))}
            </ul>

            <div className="about__card-foot">
              <span className="mono">ON THE DESK</span>
              <span className="about__card-note">
                React docs, a breadboard and too many tabs.
              </span>
            </div>
          </Reveal>
        </div>

        <div className="stats">
          {about.stats.map((stat, index) => (
            <Reveal
              className="stat"
              key={stat.label}
              delay={index * 0.06}
              y={22}
            >
              <span className="stat__value">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="stat__label">{stat.label}</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="education panel" y={30}>
          <div className="education__main">
            <span className="mono education__label">
              {about.education.type}
            </span>
            <h3>{about.education.title}</h3>
            <p>
              {about.education.org}
              <span className="education__dot"> · </span>
              {about.education.period}
            </p>
          </div>
          <div className="education__side">
            <p>{about.education.description}</p>
            <ul className="tags">
              {about.education.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
