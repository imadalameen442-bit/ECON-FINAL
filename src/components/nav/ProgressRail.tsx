import { motion, useScroll, useSpring } from "framer-motion";
import { chapters } from "../../data/sections";
import { scrollToId } from "../../lib/useSmoothScroll";
import { cn } from "../../lib/utils";

/** Vertical chapter rail on the right edge with a live scroll-progress line. */
export function ProgressRail({ active }: { active: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <div className="relative flex flex-col items-end gap-4">
        {/* progress line */}
        <div className="absolute right-[5px] top-0 h-full w-px bg-white/10">
          <motion.div
            className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-emerald-glow to-gold-400"
            style={{ scaleY: progress, height: "100%" }}
          />
        </div>

        {chapters.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => scrollToId(c.id)}
              className="group pointer-events-auto flex items-center gap-3"
            >
              <span
                className={cn(
                  "whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300",
                  isActive
                    ? "text-white opacity-100"
                    : "text-white/40 opacity-0 group-hover:opacity-100"
                )}
              >
                {c.tag}
              </span>
              <span className="relative grid h-3 w-3 place-items-center">
                <span
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isActive
                      ? "h-3 w-3 bg-emerald-glow shadow-[0_0_12px_2px_rgba(52,245,197,0.6)]"
                      : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/60"
                  )}
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
