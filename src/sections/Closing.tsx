import { ArrowUp, ExternalLink, Hourglass } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { MagneticButton } from "../components/ui/MagneticButton";
import { sources } from "../data/sources";
import { scrollToId } from "../lib/useSmoothScroll";

const takeaways = [
  {
    k: "Time beats timing",
    v: "Starting early is worth more than starting big. My late start just means my contributions have to work harder.",
  },
  {
    k: "Guard the gap",
    v: "A surgeon's income is only an advantage if my spending stays closer to a resident's life than a TV doctor's.",
  },
  {
    k: "Automate the boring",
    v: "Pay myself first, on autopilot. Willpower fails. A standing transfer does not.",
  },
  {
    k: "Debt is a tool, not a verdict",
    v: "Med school loans will make my net worth negative for years. That is an investment, not a failure.",
  },
];

export function Closing() {
  return (
    <section id="closing" className="relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <span className="eyebrow">
            <Hourglass className="h-3 w-3 text-emerald-glow" />
            The Long Game
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            Becoming a surgeon is a <span className="text-grad-emerald italic font-serif font-normal">long game</span>. So is the money.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 max-w-2xl space-y-5 text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            <p>
              Most of this project comes back to one idea. The road I have chosen is long.
              Four years of undergrad, four of medical school, then five or more of residency
              and fellowship before I ever earn a real paycheck. That timeline scared me at
              first. Working through these calculators changed how I see it.
            </p>
            <p>
              Yes, I start saving late and I start deep in debt. But a doctor's career is the
              definition of delayed payoff, and the same patience that gets someone through a
              decade of training is exactly what compounding rewards. I cannot out-time the
              people who started at 22. I can out-earn, out-save, and out-last the gap between
              what I make and what I spend. That is the whole game.
            </p>
          </div>
        </Reveal>

        {/* takeaways */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {takeaways.map((t, i) => (
            <Reveal key={t.k} delay={i * 0.06}>
              <div className="h-full rounded-4xl border border-white/10 bg-white/[0.035] p-1.5 shadow-float ring-1 ring-inset ring-white/5">
                <div className="h-full rounded-[calc(2rem-0.375rem)] bg-ink-900/80 p-6 shadow-inner-hi">
                  <div className="font-display text-lg font-semibold text-grad-emerald">{t.k}</div>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/60">{t.v}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* sources */}
        <Reveal>
          <div className="mt-16">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Sources & tools referenced
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {sources.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  title={s.note}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-white/65 transition-colors hover:border-emerald-400/40 hover:text-white"
                >
                  <ExternalLink className="h-3 w-3 text-emerald-400" strokeWidth={1.6} />
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* footer */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/8 pt-8 sm:flex-row sm:items-center">
          <div>
            <div className="font-display text-lg font-semibold text-white">Imad Al-Ameen</div>
            <p className="mt-1 text-[13px] text-white/45">
              SUPA ECN 305 · Personal Finance Final · Spring 2026 · Mr/Ms Falcinelli
            </p>
            <p className="mt-1 text-[12px] text-white/30">
              Built as an interactive site with React, Three.js, and a lot of compound interest.
            </p>
          </div>
          <MagneticButton variant="ghost" icon={false} onClick={() => scrollToId("hero")}>
            <ArrowUp className="mr-1 h-4 w-4" /> Back to the top
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
