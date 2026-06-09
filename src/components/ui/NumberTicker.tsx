import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

/**
 * Counts up to `value` when scrolled into view, and re-animates smoothly
 * whenever `value` changes (so it works live inside calculators too).
 * Uses an imperative animation on a motion value for reliability.
 */
export function NumberTicker({
  value,
  format,
  className,
  startOnView = true,
}: {
  value: number;
  format?: (n: number) => string;
  className?: string;
  startOnView?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(startOnView ? 0 : value);
  const fmt = (n: number) => (format ? format(n) : Math.round(n).toLocaleString());
  const [text, setText] = useState(() => fmt(startOnView ? 0 : value));
  const armed = startOnView ? inView : true;

  // keep the displayed text in sync with the motion value every frame
  useEffect(() => mv.on("change", (v) => setText(fmt(v))), [mv]);

  useEffect(() => {
    if (!armed) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      mv.set(value);
      setText(fmt(value));
      return;
    }
    const controls = animate(mv, value, { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, value]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
