import { navLinks, profile } from "../data/portfolio";
import { scrollToSection } from "../lib/gsap";
import { ArrowDown } from "./Icons";

export default function Footer() {
  const go = (event, href) => {
    event.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a
          href="#home"
          className="footer__brand"
          onClick={(event) => go(event, "#home")}
          aria-label="Back to top"
        >
          <span className="nav__mark">{profile.initials}</span>
          <span className="footer__brand-text">
            <strong>{profile.name}</strong>
            <span>Frontend × Embedded</span>
          </span>
        </a>

        <nav className="footer__nav" aria-label="Footer">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => go(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__meta">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="footer__built">Built with React + GSAP</span>
          <button
            type="button"
            className="footer__top"
            onClick={() => scrollToSection("#home")}
          >
            Top
            <ArrowDown size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
