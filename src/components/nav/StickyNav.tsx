import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { chapters } from "../../data/sections";
import { scrollToId } from "../../lib/useSmoothScroll";
import { cn } from "../../lib/utils";

/** Floating glass-pill nav, detached from the top, with a mobile overlay menu. */
export function StickyNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const links = chapters.filter((c) => c.id !== "hero");

  function go(id: string) {
    setOpen(false);
    // let the overlay begin closing before scrolling
    requestAnimationFrame(() => scrollToId(id));
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center">
        <motion.nav
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
          className="pointer-events-auto mt-5 flex items-center gap-1 rounded-full border border-white/10 bg-ink-900/60 p-1.5 pl-4 shadow-float backdrop-blur-xl"
        >
          <button
            onClick={() => go("hero")}
            className="flex items-center gap-2 pr-2 text-sm font-semibold tracking-tight text-white"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-emerald-glow to-gold-400 text-[11px] font-bold text-ink-950">
              $
            </span>
            <span className="hidden sm:inline">The Long Game</span>
          </button>

          {/* desktop links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {links.map((c) => (
              <button
                key={c.id}
                onClick={() => go(c.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300",
                  active === c.id ? "text-ink-950" : "text-white/60 hover:text-white"
                )}
              >
                {active === c.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-gradient-to-br from-emerald-glow to-emerald-400"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </button>
            ))}
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.06] text-white md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </motion.nav>
      </div>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-ink-950/80 backdrop-blur-2xl md:hidden"
          >
            {links.map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => go(c.id)}
                className="font-display text-3xl font-medium text-white/80 hover:text-white"
              >
                {c.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
