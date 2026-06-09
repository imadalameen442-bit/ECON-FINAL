import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { KineticTitle } from "../components/ui/KineticTitle";
import { Kicker } from "../components/ui/Editorial";
import { LinkButton } from "../components/ui/Editorial";
import { scrollToId } from "../lib/useSmoothScroll";
import { usd, usdCompact } from "../lib/utils";

const ink = [0.16, 1, 0.3, 1] as const;

/* Monthly-compounded annuity balance after investing `monthly` from startAge to age. */
function balanceAt(age: number, startAge: number, monthly: number, annualRate: number) {
  const months = Math.max(0, Math.round((age - startAge) * 12));
  const r = annualRate / 12;
  if (r === 0) return monthly * months;
  return monthly * ((Math.pow(1 + r, months) - 1) / r);
}

/* ---- The masthead / nameplate ---- */
function Masthead() {
  return (
    <div className="px-5 pt-8 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* dateline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between border-b border-ink/30 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-600 sm:text-[11px]"
        >
          <span>Vol. I · No. 1</span>
          <span className="hidden sm:inline">An Almanac of Money</span>
          <span>Spring 2026</span>
        </motion.div>

        {/* nameplate */}
        <KineticTitle
          text="The Long Game"
          emphasize={["Long"]}
          as="h1"
          delay={0.15}
          className="mt-6 justify-center text-center text-[clamp(3rem,15vw,11rem)] font-semibold leading-[0.86] tracking-tightest text-ink"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: ink, delay: 0.7 }}
          className="mx-auto mt-5 max-w-2xl text-center font-display text-lg font-normal italic text-ink-700 sm:text-2xl"
        >
          A future surgeon's almanac of money, and the quiet math of patience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6"
        >
          <div className="rule-double" />
          <div className="flex flex-col items-center justify-between gap-1 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-600 sm:flex-row sm:text-[11px]">
            <span>By Imad Al-Ameen</span>
            <span>SUPA ECN 305 · PFIN · Falcinelli</span>
          </div>
          <div className="rule" />
        </motion.div>
      </div>
    </div>
  );
}

/* ---- The lede + scroll cue ---- */
function Lede() {
  return (
    <div className="px-5 py-14 sm:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ink }}
          className="md:col-span-7"
        >
          <p className="dropcap text-pretty font-display text-2xl font-normal leading-[1.35] text-ink sm:text-[1.7rem]">
            The road I have chosen is long. Four years of college, four of medical school, then
            five or more of residency before I earn a real paycheck. By the time most people
            have been saving for a decade, I will just be starting. This project is how I made
            peace with that, by learning the one force that rewards patience more than anything
            else.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ink, delay: 0.15 }}
          className="flex flex-col justify-between gap-6 md:col-span-5"
        >
          <p className="border-l-2 border-vermillion pl-4 font-mono text-[12px] leading-relaxed text-ink-600">
            Inside: fifteen definitions, six working calculators, a tool face-off, four savings
            ideas graded, and eight money rules put on trial. Drag, tap, and scroll. Everything
            here actually runs.
          </p>
          <LinkButton onClick={() => scrollToId("definitions")}>Start reading</LinkButton>
        </motion.div>
      </div>
    </div>
  );
}

/* ---- The pinned compounding number ---- */
function CompoundingScrolly() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const startAge = 22;
  const endAge = 65;
  const monthly = 2500;
  const rate = 0.07;

  const [age, setAge] = useState(startAge);
  const [bal, setBal] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const a = startAge + p * (endAge - startAge);
    setAge(a);
    setBal(balanceAt(a, startAge, monthly, rate));
  });

  // opacity of milestone notes
  const note1 = useTransform(scrollYProgress, [0.18, 0.28, 0.42, 0.5], [0, 1, 1, 0]);
  const note2 = useTransform(scrollYProgress, [0.5, 0.6, 0.74, 0.82], [0, 1, 1, 0]);
  const punch = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  return (
    <div ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <Kicker num="Fig. 0">The whole idea, in one number</Kicker>
        <p className="mt-4 max-w-xl text-center font-display text-xl italic text-ink-700">
          Invest $2,500 a month at 7%, starting at age 22.
        </p>

        <div className="relative mt-6">
          <div className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-vermillion">
            Age {age.toFixed(0)}
          </div>
          <div className="text-center font-display text-[clamp(3rem,16vw,11rem)] font-semibold leading-none tracking-tightest text-ink tnum">
            {usd(bal)}
          </div>
        </div>

        {/* milestone notes */}
        <motion.div style={{ opacity: note1 }} className="absolute left-[8%] top-[26%] hidden max-w-[180px] border-l-2 border-ink pl-3 font-mono text-[12px] text-ink-600 lg:block">
          By 30, barely $250k. Slow, almost boring. This is the part people quit.
        </motion.div>
        <motion.div style={{ opacity: note2 }} className="absolute right-[8%] top-[30%] hidden max-w-[190px] border-l-2 border-vermillion pl-3 font-mono text-[12px] text-ink-600 lg:block">
          Then it bends upward. The last decade adds more than the first three combined.
        </motion.div>

        <motion.div style={{ opacity: punch }} className="mt-8 max-w-md text-center">
          <div className="rule mb-3" />
          <p className="font-mono text-[13px] leading-relaxed text-ink">
            Ends at about <span className="font-bold text-teal">{usdCompact(balanceAt(65, 22, 2500, 0.07))}</span>.
            Wait until 33 to start, and you retire with{" "}
            <span className="font-bold text-vermillion">{usdCompact(balanceAt(65, 33, 2500, 0.07))}</span>.
            Those 11 years cost millions.
          </p>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
          Keep scrolling
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative">
      <Masthead />
      <Lede />
      <CompoundingScrolly />
    </section>
  );
}
