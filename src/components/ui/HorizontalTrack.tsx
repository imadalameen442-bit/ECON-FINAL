import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Pins a horizontal row of panels and translates it sideways as the user scrolls
 * down. The outer section is made tall enough to give the track room to travel.
 * Falls back to a normal horizontal scroll area when reduced motion is on.
 */
export function HorizontalTrack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        new URLSearchParams(window.location.search).has("still")
    );
    const measure = () => {
      if (trackRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    measure();
    // ResizeObserver catches late layout (fonts loading, images) reliably.
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    const t = setTimeout(measure, 600);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  if (reduced) {
    return (
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6">{children}</div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className={"flex gap-6 px-5 sm:px-8 " + (className ?? "")}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
