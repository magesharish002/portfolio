import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function CircuitSvg() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const svg = ref.current;
    if (!svg) return;

    const traces = svg.querySelectorAll(".circuit__trace");
    traces.forEach((trace) => {
      const length = trace.getTotalLength();
      gsap.set(trace, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    const ctx = gsap.context(() => {
      gsap.to(traces, {
        strokeDashoffset: 0,
        duration: 2.1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: svg,
          start: "top 86%",
          once: true,
        },
      });

      gsap.from(".circuit__node", {
        scale: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "back.out(2.4)",
        scrollTrigger: {
          trigger: svg,
          start: "top 86%",
          once: true,
        },
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      className="circuit"
      ref={ref}
      viewBox="0 0 640 420"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="circuit-line" x1="60" y1="60" x2="580" y2="360">
          <stop offset="0" stopColor="#3ff0dd" stopOpacity="0.75" />
          <stop offset="0.55" stopColor="#8b7bff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#3ff0dd" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="circuit-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#3ff0dd" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3ff0dd" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="320" cy="210" r="190" fill="url(#circuit-glow)" opacity="0.25" />
      <rect className="circuit__board" x="16" y="16" width="608" height="388" rx="28" />
      <rect
        className="circuit__board-inner"
        x="32"
        y="32"
        width="576"
        height="356"
        rx="20"
      />

      <g className="circuit__screws">
        {[
          [40, 40],
          [600, 40],
          [40, 380],
          [600, 380],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
        ))}
      </g>

      <g className="circuit__traces">
        <path
          className="circuit__trace"
          d="M60 340 H170 V250 H260 V290 H360 V190 H470 V120 H580"
        />
        <path
          className="circuit__trace"
          d="M60 100 H150 V170 H250 V90 H390 V140 H520 V90 H590"
        />
        <path className="circuit__trace" d="M60 210 H120 V130" />
        <path className="circuit__trace" d="M180 340 V300 H300 V330" />
        <path
          className="circuit__trace"
          d="M360 340 V250 H450 V290 H590"
        />
        <path className="circuit__trace" d="M260 290 V360 H410" />
        <path className="circuit__trace" d="M470 120 V190 H520" />
      </g>

      <g className="circuit__nodes">
        {[
          [60, 340],
          [170, 250],
          [260, 290],
          [360, 190],
          [470, 120],
          [580, 120],
          [60, 100],
          [150, 170],
          [250, 90],
          [390, 140],
          [520, 90],
          [60, 210],
          [120, 130],
          [180, 340],
          [300, 300],
          [360, 340],
          [450, 290],
          [590, 290],
          [410, 360],
          [520, 190],
        ].map(([cx, cy]) => (
          <circle
            className="circuit__node"
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3"
          />
        ))}
      </g>

      <g className="circuit__chips">
        <rect x="250" y="232" width="100" height="62" rx="10" />
        <text x="300" y="258" textAnchor="middle">
          ESP32
        </text>
        <text className="circuit__sub" x="300" y="274" textAnchor="middle">
          MCU
        </text>
        <rect x="478" y="152" width="86" height="44" rx="8" />
        <text x="521" y="171" textAnchor="middle">
          DHT22
        </text>
        <text className="circuit__sub" x="521" y="185" textAnchor="middle">
          SENSOR
        </text>
        <rect x="68" y="50" width="76" height="36" rx="8" />
        <text x="106" y="66" textAnchor="middle">
          3V3
        </text>
        <text className="circuit__sub" x="106" y="79" textAnchor="middle">
          POWER
        </text>
      </g>

      <g className="circuit__labels">
        <text x="60" y="362">GND</text>
        <text x="362" y="180">SDA</text>
        <text x="364" y="404">TX</text>
        <text x="560" y="74">3V3</text>
        <text x="182" y="296">I2C</text>
      </g>

      <g className="circuit__pulses">
        <circle className="circuit__pulse circuit__pulse--cyan" r="3.5">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M60 340 H170 V250 H260 V290 H360 V190 H470 V120 H580"
          />
        </circle>
        <circle className="circuit__pulse circuit__pulse--violet" r="3">
          <animateMotion
            dur="8.5s"
            repeatCount="indefinite"
            path="M60 100 H150 V170 H250 V90 H390 V140 H520 V90 H590"
          />
        </circle>
        <circle className="circuit__pulse circuit__pulse--lime" r="3">
          <animateMotion
            dur="6.5s"
            repeatCount="indefinite"
            path="M360 340 V250 H450 V290 H590"
          />
        </circle>
      </g>
    </svg>
  );
}
