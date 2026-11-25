import { useLayoutEffect, useRef } from "react";
import { skills } from "../data/portfolio";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import Marquee from "./Marquee";

export default function Skills() {
  const barsRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".skill-bar__fill", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.25,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: barsRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".skill-bar", {
        y: 18,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: barsRef.current,
          start: "top 82%",
          once: true,
        },
      });
    }, barsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHead
          index="02"
          label="Toolkit"
          titleLines={[
            "The tools behind",
            <>
              the <span className="grad">motion.</span>
            </>,
          ]}
          text={skills.intro}
        />

        <div className="skills__grid">
          <div className="skills__intro">
            <Reveal className="skills__note panel" y={28}>
              <span className="mono skills__note-label">CURRENTLY LEARNING</span>
              <ul className="skills__learning">
                {skills.learning.map((item) => (
                  <li key={item}>
                    <span className="status-dot status-dot--violet" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                I learn by shipping small things — a component, a circuit, a
                script — then making the next one a little harder.
              </p>
              <span className="skills__note-line" aria-hidden="true" />
              <ul className="skills__principles">
                <li>
                  <span>01</span>
                  Ship the small version first.
                </li>
                <li>
                  <span>02</span>
                  Read the datasheet twice.
                </li>
                <li>
                  <span>03</span>
                  Motion should explain, not decorate.
                </li>
              </ul>
            </Reveal>
          </div>

          <div className="skill-bars panel" ref={barsRef}>
            <div className="skill-bars__head">
              <span className="mono">COMFORT LEVEL</span>
              <span className="mono skill-bars__hint">self-assessed</span>
            </div>

            {skills.core.map((skill) => (
              <div className="skill-bar" key={skill.name}>
                <div className="skill-bar__top">
                  <span className="skill-bar__name">{skill.name}</span>
                  <span className="skill-bar__note">{skill.note}</span>
                  <span className="skill-bar__percent">{skill.level}%</span>
                </div>
                <div className="skill-bar__track">
                  <span
                    className="skill-bar__fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="toolbox">
          {skills.toolbox.map((group, index) => (
            <Reveal
              className="toolbox__group panel"
              key={group.label}
              delay={index * 0.06}
              y={26}
            >
              <div className="toolbox__head">
                <span className="mono">0{index + 1}</span>
                <h3>{group.label}</h3>
              </div>
              <ul className="toolbox__chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="section-marquee">
        <Marquee items={skills.marquee} duration={42} reverse />
      </div>
    </section>
  );
}
