import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MagneticButton } from "../components/ui/MagneticButton";
import { scrollToId } from "../lib/useSmoothScroll";
import { isStill } from "../lib/utils";

const HeroScene = lazy(() =>
  import("../components/three/HeroScene").then((m) => ({ default: m.HeroScene }))
);

const ease = [0.22, 1, 0.36, 1] as const;

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const fn = () => setReduce(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduce;
}

const titleWords = ["The", "Long", "Game"];

export function Hero() {
  const reduce = usePrefersReducedMotion() || isStill();

  return (
    <section id="hero" className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      {/* 3D layer (skipped for reduced motion), decorative for screen readers */}
      <div className="absolute inset-0" aria-hidden="true">
        {!reduce && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
        {/* readability gradient over the scene */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_45%,transparent,rgba(5,6,8,0.7)_85%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      {/* content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="eyebrow"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-glow" />
          SUPA ECN 305 · Personal Finance Final · Spring 2026
        </motion.span>

        <h1 className="mt-7 flex flex-wrap justify-center gap-x-4 text-[clamp(3.2rem,13vw,11rem)] font-semibold leading-[0.92] tracking-tightest">
          {titleWords.map((word, i) => (
            <span key={word} className="overflow-hidden pb-2">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 0.25 + i * 0.12 }}
              >
                {word === "Long" ? (
                  <span className="text-grad-gold italic font-serif font-normal">{word}</span>
                ) : (
                  <span className="text-white">{word}</span>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
          className="mt-7 max-w-2xl text-pretty text-base text-white/60 sm:text-xl"
        >
          A future orthopedic surgeon's guide to money. Years of school, a mountain of
          loans, then a late start at saving. This is how patience and compound interest
          quietly win the race.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton onClick={() => scrollToId("definitions")}>
            Explore the project
          </MagneticButton>
          <MagneticButton variant="ghost" icon={false} onClick={() => scrollToId("calculations")}>
            Jump to the calculators
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-white/35"
        >
          By Imad Al-Ameen
        </motion.p>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollToId("definitions")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 mb-8 flex flex-col items-center gap-2 self-center text-white/40 transition-colors hover:text-white/80"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.button>
    </section>
  );
}
