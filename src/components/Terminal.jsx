import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function Terminal({ data }) {
  const rootRef = useRef(null);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTyped(data.live);
      return;
    }

    let index = 0;
    let timer;

    const type = () => {
      index += 1;
      setTyped(data.live.slice(0, index));

      if (index < data.live.length) {
        timer = window.setTimeout(type, 34 + Math.random() * 38);
      } else {
        timer = window.setTimeout(() => {
          index = 0;
          setTyped("");
          type();
        }, 4500);
      }
    };

    timer = window.setTimeout(type, 1400);

    return () => window.clearTimeout(timer);
  }, [data.live]);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".terminal__line", {
        x: -10,
        autoAlpha: 0,
        duration: 0.45,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 86%",
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="terminal" ref={rootRef}>
      <div className="terminal__bar">
        <span className="terminal__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="terminal__title">{data.title}</span>
        <span className="terminal__status">
          <span className="status-dot" />
          online
        </span>
      </div>

      <div className="terminal__body">
        {data.lines.map((line) => (
          <div className="terminal__line" key={`${line.t}-${line.text}`}>
            <span className="term__time">{line.t}</span>
            <span className={`term__kind term__kind--${line.kind}`}>
              {line.kind}
            </span>
            <span className="term__text">{line.text}</span>
          </div>
        ))}

        <div className="terminal__line terminal__line--prompt">
          <span className="term__prompt">{data.prompt}</span>
          <span className="term__typed">{typed}</span>
          <span className="term__caret" aria-hidden="true" />
        </div>
      </div>

      <div className="terminal__foot">
        <span>
          <i className="term__baud" /> 115200 baud
        </span>
        <span>UTF-8</span>
        <span>ESP32</span>
      </div>
    </div>
  );
}
