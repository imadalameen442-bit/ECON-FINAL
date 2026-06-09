import { useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { chapters } from "../../data/sections";
import { scrollToId } from "../../lib/useSmoothScroll";
import { cn } from "../../lib/utils";

/**
 * Editorial running header: a hairline reading-progress rule pinned to the very
 * top, plus a slim masthead bar that slides in once you scroll past the front page.
 */
export function StickyNav({ active }: { active: string }) {
  const { scrollYProgress } = useScroll();
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const links = chapters.filter((c) => c.id !== "hero");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShown(v > 0.06);
    if (v <= 0.06) setOpen(false);
  });

  function go(id: string) {
    setOpen(false);
    requestAnimationFrame(() => scrollToId(id));
  }

  return (
    <>
      {/* reading-progress rule */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-vermillion"
      />

      <AnimatePresence>
        {shown && (
          <motion.div
            initial={{ y: -64 }}
            animate={{ y: 0 }}
            exit={{ y: -64 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-40 border-b border-ink/15 bg-paper/95 backdrop-blur-sm"
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 sm:px-8">
              <button
                onClick={() => go("hero")}
                className="font-display text-lg font-semibold tracking-tight text-ink"
              >
                The Long Game
                <span className="ml-2 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 sm:inline">
                  Vol. I
                </span>
              </button>

              <nav className="hidden items-center gap-5 md:flex">
                {links.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => go(c.id)}
                    className={cn(
                      "font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200",
                      active === c.id
                        ? "text-vermillion"
                        : "text-ink-600 hover:text-ink"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </nav>

              <button
                onClick={() => setOpen((v) => !v)}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink md:hidden"
              >
                {open ? "Close" : "Index"}
              </button>
            </div>

            {/* mobile index */}
            <AnimatePresence>
              {open && (
                <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden border-t border-ink/15 md:hidden"
                >
                  <div className="flex flex-col px-5 py-2">
                    {links.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => go(c.id)}
                        className="flex items-center justify-between border-b border-ink/10 py-3 text-left font-display text-xl text-ink last:border-0"
                      >
                        {c.label}
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">
                          {c.topic ?? ""}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
