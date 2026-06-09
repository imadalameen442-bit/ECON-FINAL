import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * Counts up to `value` when scrolled into view, and re-animates smoothly
 * whenever `value` changes (so it works live inside calculators too).
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
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 22, mass: 0.8 });
  const [display, setDisplay] = useState(0);
  const armed = startOnView ? inView : true;

  useEffect(() => {
    if (armed) motionValue.set(value);
  }, [armed, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(v));
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {format ? format(display) : Math.round(display).toLocaleString()}
    </span>
  );
}
