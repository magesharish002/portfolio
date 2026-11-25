import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

const tokenize = (text) => {
  const chunks = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  const raw = [];

  chunks.forEach((chunk) => {
    const highlighted = chunk.startsWith("**");
    const clean = highlighted ? chunk.slice(2, -2) : chunk;
    clean
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => raw.push({ word, highlighted }));
  });

  // Attach standalone punctuation to the previous word so that
  // "**M. Harish**, a" renders as "Harish," not "Harish ,".
  return raw.reduce((tokens, token) => {
    if (/^[.,;:!?…)"]+$/.test(token.word) && tokens.length) {
      tokens[tokens.length - 1].word += token.word;
    } else {
      tokens.push(token);
    }
    return tokens;
  }, []);
};

export default function AnimatedText({ text, className = "", as: Tag = "p" }) {
  const ref = useRef(null);
  const tokens = useMemo(() => tokenize(text), [text]);
  const plain = useMemo(() => text.replace(/\*\*/g, ""), [text]);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll(".word__inner"), {
        yPercent: 118,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.018,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [text]);

  return (
    <Tag ref={ref} className={className} aria-label={plain}>
      {tokens.map((token, index) => (
        <span className="word" aria-hidden="true" key={`${token.word}-${index}`}>
          <span
            className={`word__inner ${token.highlighted ? "is-highlight" : ""}`}
          >
            {token.word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
