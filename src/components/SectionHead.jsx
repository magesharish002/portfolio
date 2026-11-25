import Reveal from "./Reveal";
import SplitLines from "./SplitLines";

export default function SectionHead({
  index,
  label,
  titleLines,
  text,
  align = "left",
}) {
  return (
    <div className={`section-head section-head--${align}`}>
      <div className="section-head__main">
        <Reveal className="section-head__kicker" y={14}>
          <span className="section-head__index">{index}</span>
          <span className="section-head__slash">/</span>
          <span>{label}</span>
        </Reveal>
        <SplitLines lines={titleLines} className="section-head__title" />
      </div>
      {text && (
        <Reveal className="section-head__text" y={18} delay={0.12}>
          <p>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
