export default function Marquee({
  items,
  reverse = false,
  duration = 34,
  className = "",
}) {
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div
        className={`marquee__track ${reverse ? "marquee__track--reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((group) => (
          <div className="marquee__group" key={group}>
            {items.map((item) => (
              <span className="marquee__item" key={`${group}-${item}`}>
                <i />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
