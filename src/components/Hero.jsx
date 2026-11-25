import { useEffect, useLayoutEffect, useRef } from "react";
import photo from "../assets/photo1.jpeg";
import { heroMeta, profile } from "../data/portfolio";
import {
  gsap,
  isFinePointer,
  prefersReducedMotion,
  scrollToSection,
} from "../lib/gsap";
import Marquee from "./Marquee";
import Magnetic from "./Magnetic";
import { ArrowUpRight, Download } from "./Icons";

const heroMarquee = [
  "Frontend development",
  "React + GSAP",
  "Embedded systems",
  "AI experiments",
  "UI engineering",
  "Motion design",
];

export default function Hero({ ready }) {
  const rootRef = useRef(null);
  const visualRef = useRef(null);

  useLayoutEffect(() => {
    if (!ready) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.set(".role-word", { yPercent: 110 });
      gsap.set(".role-word:first-child", { yPercent: 0 });

      if (reduced) {
        gsap.set(".role-word", { yPercent: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.05,
      });

      tl.from(".hero__eyebrow", {
        y: 16,
        autoAlpha: 0,
        duration: 0.55,
      })
        .from(
          ".hero__char",
          {
            yPercent: 120,
            duration: 0.9,
            stagger: 0.035,
            ease: "power4.out",
          },
          "-=0.2",
        )
        .from(
          ".hero__initial",
          {
            yPercent: 120,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.75",
        )
        .from(
          ".hero__role, .hero__desc",
          {
            y: 22,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.06,
          },
          "-=0.55",
        )
        .from(
          ".hero__actions > *",
          {
            y: 18,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.06,
          },
          "-=0.5",
        )
        .from(".hero__meta", { autoAlpha: 0, duration: 0.5 }, "-=0.4")
        .from(
          ".portrait__frame",
          {
            scale: 0.92,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.9",
        )
        .from(
          ".portrait__ring, .portrait__badge",
          {
            scale: 0.82,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.07,
          },
          "-=0.55",
        )
        .from(
          ".hero__chip",
          {
            y: 16,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.07,
          },
          "-=0.45",
        )
        .from(
          ".hero__foot, .hero__marquee",
          { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.06 },
          "-=0.35",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const words = gsap.utils.toArray(".role-word");
    if (!words.length) return;

    if (prefersReducedMotion()) {
      gsap.set(words, { yPercent: 0 });
      return;
    }

    words.forEach((word, index) => {
      gsap.set(word, { yPercent: index === 0 ? 0 : 110 });
    });

    let current = 0;
    const timer = window.setInterval(() => {
      const next = (current + 1) % words.length;
      gsap.to(words[current], {
        yPercent: -110,
        duration: 0.5,
        ease: "power2.in",
      });
      gsap.fromTo(
        words[next],
        { yPercent: 110 },
        { yPercent: 0, duration: 0.65, ease: "power3.out" },
      );
      current = next;
    }, 2600);

    return () => {
      window.clearInterval(timer);
      gsap.killTweensOf(words);
    };
  }, [ready]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(".portrait__frame", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero__copy", {
        yPercent: -7,
        opacity: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;

    const visual = visualRef.current;
    if (!visual) return;

    const portrait = visual.querySelector(".portrait__frame");
    const chips = visual.querySelectorAll(".hero__chip");
    if (!portrait) return;

    const xTo = gsap.quickTo(portrait, "x", { duration: 0.9, ease: "power3" });
    const yTo = gsap.quickTo(portrait, "y", { duration: 0.9, ease: "power3" });

    const handleMove = (event) => {
      const rect = visual.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;

      xTo(nx * 16);
      yTo(ny * 16);
      gsap.to(chips, {
        x: nx * 26,
        y: ny * 26,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(chips, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    visual.addEventListener("mousemove", handleMove);
    visual.addEventListener("mouseleave", handleLeave);

    return () => {
      visual.removeEventListener("mousemove", handleMove);
      visual.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section className="hero" id="home" ref={rootRef}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__grid" />
        <span className="orb orb--cyan" />
        <span className="orb orb--violet" />
        <span className="hero__scanline" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="status-dot" />
            <span>{profile.availability}</span>
          </div>

          <h1 className="hero__title" aria-label={profile.name}>
            <span className="hero__line hero__line--initial">
              <span className="hero__initial" aria-hidden="true">
                {profile.initial}
              </span>
            </span>
            <span className="hero__line hero__line--name" aria-hidden="true">
              {profile.displayName.split("").map((letter, index) => (
                <span className="hero__char" key={`${letter}-${index}`}>
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          <div className="hero__role">
            <span className="hero__role-slash">/</span>
            <span className="role-window" aria-label={profile.roles.join(", ")}>
              {profile.roles.map((role) => (
                <span className="role-word" key={role} aria-hidden="true">
                  {role}
                </span>
              ))}
            </span>
          </div>

          <p className="hero__desc">{profile.heroCopy}</p>

          <div className="hero__actions">
            <Magnetic>
              <a
                href="#work"
                className="btn btn--primary"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#work");
                }}
              >
                View my work
                <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resumeUrl}
                className="btn btn--ghost"
                download="M-Harish-Resume.pdf"
              >
                Résumé
                <Download size={16} />
              </a>
            </Magnetic>
          </div>

          <div className="hero__meta">
            <span>
              <i className="hero__meta-dot" />
              Based in {profile.location}
            </span>
            <span className="hero__meta-divider" aria-hidden="true" />
            <span>{heroMeta.focus}</span>
            <span className="hero__meta-divider" aria-hidden="true" />
            <span>Class of {heroMeta.year}</span>
          </div>
        </div>

        <div className="hero__visual" ref={visualRef}>
          <div className="portrait">
            <span className="portrait__glow" aria-hidden="true" />
            <span className="portrait__ring" aria-hidden="true" />

            <div className="portrait__frame">
              <img
                src={photo}
                alt={`Portrait of ${profile.name}`}
                fetchPriority="high"
              />
              <span className="portrait__shade" aria-hidden="true" />
              <span className="portrait__corners" aria-hidden="true" />
              <span className="portrait__caption">
                <span className="status-dot" />
                M. HARISH · 2026
              </span>
            </div>

            <div className="portrait__badge" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path
                    id="badge-circle"
                    d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
                  />
                </defs>
                <text>
                  <textPath href="#badge-circle">
                    OPEN TO WORK · BUILD · SHIP · LEARN ·
                  </textPath>
                </text>
              </svg>
              <span className="portrait__badge-arrow">
                <ArrowUpRight size={20} />
              </span>
            </div>

            <span className="hero__chip hero__chip--react">
              <i className="hero__chip-dot hero__chip-dot--cyan" />
              React
            </span>
            <span className="hero__chip hero__chip--esp">
              <i className="hero__chip-dot hero__chip-dot--lime" />
              ESP32
            </span>
            <span className="hero__chip hero__chip--gsap">
              <i className="hero__chip-dot hero__chip-dot--violet" />
              GSAP
            </span>
          </div>
        </div>
      </div>

      <div className="container hero__foot">
        <button
          type="button"
          className="scroll-cue"
          onClick={() => scrollToSection("#about")}
        >
          <span className="scroll-cue__icon" aria-hidden="true">
            <span />
          </span>
          Scroll to explore
        </button>

        <div className="hero__coords">
          <span>FRONTEND × EMBEDDED</span>
          <span className="hero__coords-divider">/</span>
          <span>{heroMeta.year}</span>
        </div>
      </div>

      <div className="hero__marquee">
        <Marquee items={heroMarquee} duration={38} />
      </div>
    </section>
  );
}
