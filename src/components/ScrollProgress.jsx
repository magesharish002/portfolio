import { useEffect, useRef } from "react";
import { ScrollTrigger } from "../lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${self.progress})`;
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={barRef} />
    </div>
  );
}
