import { embedded } from "../data/portfolio";
import { scrollToSection } from "../lib/gsap";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import Terminal from "./Terminal";
import CircuitSvg from "./CircuitSvg";
import Marquee from "./Marquee";
import { ArrowUpRight } from "./Icons";

export default function EmbeddedLab() {
  const showEmbedded = () => {
    window.dispatchEvent(
      new CustomEvent("portfolio:filter", { detail: "Embedded" }),
    );
    scrollToSection("#work");
  };

  return (
    <section id="lab" className="section section--lab">
      <div className="lab__glow" aria-hidden="true" />
      <div className="container">
        <SectionHead
          index="03"
          label="Embedded Lab"
          titleLines={[
            "Where code",
            <>
              meets <span className="grad grad--lime">copper.</span>
            </>,
          ]}
          text={embedded.intro}
        />

        <div className="lab__grid">
          <Reveal className="lab__panel panel" y={34}>
            <div className="lab__panel-head">
              <span className="mono">LAB / STATUS</span>
              <span className="lab__online">
                <span className="status-dot status-dot--lime" />
                system online
              </span>
            </div>

            <h3>Sense. Process. Transmit.</h3>
            <p>
              Most of my embedded work follows the same arc: read the physical
              world, make a decision, send it somewhere useful.
            </p>

            <ol className="signal-chain">
              {embedded.signalChain.map((step, index) => (
                <li key={step}>
                  <span className="signal-chain__num">0{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="lab__stack">
              <span className="mono lab__stack-label">FIRMWARE TOOLBOX</span>
              <ul className="lab__stack-list">
                {embedded.stack.map((item) => (
                  <li
                    key={item.name}
                    className={item.learning ? "is-learning" : ""}
                    title={item.learning ? "Currently learning" : undefined}
                  >
                    {item.name}
                    {item.learning && <i className="status-dot status-dot--violet" />}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lab__circuit-wrap">
              <CircuitSvg />
            </div>
          </Reveal>

          <Reveal className="lab__terminal-wrap" y={34} delay={0.12}>
            <Terminal data={embedded.terminal} />
            <div className="lab__caption">
              <span className="mono">LIVE SERIAL MONITOR</span>
              <span className="lab__caption-note">
                A representative boot log — the debugging behind it was real.
              </span>
            </div>
          </Reveal>
        </div>

        <div className="boards__head">
          <Reveal className="boards__title" y={18}>
            <span className="mono">ON THE BENCH</span>
            <h3>{embedded.boards.length} boards, one multimeter</h3>
          </Reveal>
          <Reveal className="boards__note" y={18} delay={0.08}>
            <p>
              Progress, not a spec sheet: comfortable means I can build without
              hand-holding; exploring means I still keep the datasheet open.
            </p>
          </Reveal>
        </div>

        <div className="boards">
          {embedded.boards.map((board, index) => (
            <Reveal
              className="board panel"
              key={board.name}
              delay={index * 0.05}
              y={26}
            >
              <div className="board__top">
                <span className="board__chip">{board.chip}</span>
                <span
                  className="board__status"
                  data-status={board.status.toLowerCase()}
                >
                  {board.status}
                </span>
              </div>

              <h4>{board.name}</h4>
              <p>{board.blurb}</p>

              <div className="board__leds" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((led) => (
                  <i
                    key={led}
                    className={led <= board.level ? "is-on" : ""}
                    style={{ animationDelay: `${led * 0.13}s` }}
                  />
                ))}
              </div>

              <ul className="tags">
                {board.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="lab__cta panel" y={28}>
          <div className="lab__cta-copy">
            <span className="mono">FROM BENCH TO BROWSER</span>
            <h3>Two embedded builds made it into the work grid.</h3>
          </div>
          <button type="button" className="btn btn--ghost" onClick={showEmbedded}>
            See embedded builds
            <ArrowUpRight size={15} />
          </button>
        </Reveal>
      </div>

      <div className="section-marquee">
        <Marquee items={embedded.marquee} duration={44} reverse />
      </div>
    </section>
  );
}
