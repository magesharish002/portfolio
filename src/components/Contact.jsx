import { useEffect, useRef, useState } from "react";
import { contact, profile } from "../data/portfolio";
import Reveal from "./Reveal";
import SplitLines from "./SplitLines";
import { ArrowUpRight, Check, Copy } from "./Icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section contact">
      <span className="contact__glow" aria-hidden="true" />
      <span className="contact__ring contact__ring--one" aria-hidden="true" />
      <span className="contact__ring contact__ring--two" aria-hidden="true" />

      <div className="container">
        <Reveal className="contact__kicker" y={16}>
          <span className="status-dot status-dot--lime" />
          {contact.kicker}
        </Reveal>

        <SplitLines
          className="contact__title"
          lines={[
            contact.titleLines[0],
            contact.titleLines[1],
            <span className="grad">{contact.titleAccent}</span>,
          ]}
        />

        <Reveal className="contact__copy" y={20} delay={0.1}>
          <p>{contact.copy}</p>
        </Reveal>

        <Reveal className="contact__email-row" y={24} delay={0.15}>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            <span>{profile.email}</span>
            <ArrowUpRight size={26} />
          </a>
          <button
            type="button"
            className={`copy-btn ${copied ? "is-copied" : ""}`}
            onClick={copyEmail}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__card panel" y={26} delay={0.05}>
            <span className="mono contact__card-label">ELSEWHERE</span>
            <div className="contact__links">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="contact__link"
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <span className="contact__link-name">{social.label}</span>
                  <span className="contact__link-handle mono">
                    {social.handle}
                  </span>
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="contact__card panel" y={26} delay={0.1}>
            <span className="mono contact__card-label">DETAILS</span>
            <ul className="contact__details">
              <li>
                <span>Status</span>
                <strong>
                  <span className="status-dot status-dot--lime" /> Available
                </strong>
              </li>
              <li>
                <span>Phone</span>
                <strong>
                  <a href={profile.phoneHref}>{profile.phone}</a>
                </strong>
              </li>
              <li>
                <span>Response</span>
                <strong>{contact.response}</strong>
              </li>
              <li>
                <span>Based in</span>
                <strong>{profile.location}</strong>
              </li>
            </ul>
            <a
              href={profile.resumeUrl}
              className="contact__resume"
              download="M-Harish-Resume.pdf"
            >
              Download résumé
              <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>
      </div>

      <div className={`toast ${copied ? "is-visible" : ""}`} role="status" aria-live="polite">
        Email copied to clipboard
      </div>
    </section>
  );
}
