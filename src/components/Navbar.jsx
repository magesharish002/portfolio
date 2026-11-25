import { useEffect, useRef, useState } from "react";
import { gsap, scrollToSection, prefersReducedMotion } from "../lib/gsap";
import { navLinks, profile } from "../data/portfolio";
import Magnetic from "./Magnetic";
import { ArrowUpRight } from "./Icons";

export default function Navbar({ ready, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["#home", ...navLinks.map((link) => link.href)]
      .map((href) => document.querySelector(href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -52% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".nav__inner", {
        y: -22,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    if (!menuOpen || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mobile-menu__item",
        { yPercent: 120, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.18,
        },
      );
      gsap.fromTo(
        ".mobile-menu__foot > *",
        { y: 14, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.45,
        },
      );
    }, menuRef);

    return () => ctx.revert();
  }, [menuOpen]);

  const go = (event, href) => {
    event.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
      window.__lenis?.start();
    }
    scrollToSection(href);
  };

  return (
    <>
      <header
        className={`nav ${scrolled ? "is-scrolled" : ""} ${
          menuOpen ? "is-open" : ""
        }`}
      >
        <div className="nav__inner container">
          <a
            href="#home"
            className="nav__logo"
            onClick={(event) => go(event, "#home")}
            aria-label="M. Harish — back to top"
          >
            <span className="nav__mark">{profile.initials}</span>
            <span className="nav__logo-text">
              {profile.name}
              <span className="nav__logo-sub"> / portfolio</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={active === link.href ? "is-active" : ""}
                onClick={(event) => go(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <Magnetic className="nav__cta-wrap">
              <a
                href="#contact"
                className="nav__cta"
                onClick={(event) => go(event, "#contact")}
              >
                <span className="status-dot" />
                Let&apos;s talk
                <ArrowUpRight size={13} />
              </a>
            </Magnetic>

            <button
              type="button"
              className={`nav__burger ${menuOpen ? "is-active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : true}
      >
        <div className="mobile-menu__grid" aria-hidden="true" />
        <div className="mobile-menu__inner container">
          <p className="mobile-menu__label">
            <span className="status-dot" /> Navigate
          </p>

          <nav className="mobile-menu__nav" aria-label="Mobile">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`mobile-menu__item ${
                  active === link.href ? "is-active" : ""
                }`}
                onClick={(event) => go(event, link.href)}
              >
                <span className="mobile-menu__num">
                  0{index + 1}
                </span>
                <span>{link.label}</span>
                <ArrowUpRight size={22} />
              </a>
            ))}
          </nav>

          <div className="mobile-menu__foot">
            <a href={`mailto:${profile.email}`} className="mobile-menu__email">
              {profile.email}
            </a>
            <div className="mobile-menu__socials">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
