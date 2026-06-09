import { Kicker, LinkButton } from "../components/ui/Editorial";
import { KineticTitle } from "../components/ui/KineticTitle";
import { Reveal } from "../components/ui/Reveal";
import { sources } from "../data/sources";
import { scrollToId } from "../lib/useSmoothScroll";

const takeaways = [
  { k: "Time beats timing", v: "Starting early is worth more than starting big. My late start just means my dollars have to work harder." },
  { k: "Guard the gap", v: "A surgeon's income only helps if my spending stays closer to a resident's life than a TV doctor's." },
  { k: "Automate the boring", v: "Pay myself first, on autopilot. Willpower fails. A standing transfer does not." },
  { k: "Debt is a tool", v: "Med school loans make my net worth negative for years. That is an investment, not a failure." },
];

export function Closing() {
  return (
    <section id="closing" className="relative scroll-mt-28 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-5">
          <Kicker>The Last Word · An Editorial</Kicker>
        </div>
        <KineticTitle
          text="It is a long game. So is the money."
          emphasize={["long"]}
          as="h2"
          className="max-w-4xl text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[0.95] tracking-tightest text-ink"
        />
        <div className="rule-double my-8" />

        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="space-y-5">
              <p className="dropcap text-pretty font-display text-xl font-normal leading-[1.4] text-ink sm:text-2xl">
                Most of this project comes back to one idea. The road I have chosen is long, and
                for years it will look like I am falling behind. Working through these calculators
                changed how I see that. A doctor's career is the definition of delayed payoff, and
                the same patience that gets someone through a decade of training is exactly what
                compounding rewards.
              </p>
              <p className="text-pretty text-[15px] leading-relaxed text-ink-700">
                I cannot out-time the people who started saving at 22. But I can out-earn them, out-save
                them, and out-last the gap between what I make and what I spend. I start late and I start
                deep in debt, and neither of those is the end of the story. They are just the first
                chapters of a long one. That is the whole game, and now I know how to play it.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.1}>
            <div className="border-t-2 border-ink pt-4">
              <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
                Four things I am keeping
              </div>
              <ol className="space-y-4">
                {takeaways.map((t, i) => (
                  <li key={t.k} className="flex gap-3">
                    <span className="font-display text-xl font-semibold text-vermillion">{i + 1}</span>
                    <div>
                      <div className="font-display text-lg font-semibold text-ink">{t.k}</div>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-ink-600">{t.v}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* references */}
        <Reveal>
          <div className="mt-16">
            <div className="mb-4 border-b-2 border-ink pb-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
              References & Tools
            </div>
            <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {sources.map((s, i) => (
                <li key={s.name} className="flex gap-2 border-b border-ink/12 py-1.5 font-mono text-[12px] text-ink-700">
                  <span className="text-ink-400">{String(i + 1).padStart(2, "0")}</span>
                  <a href={s.url} target="_blank" rel="noreferrer" className="ink-link">
                    {s.name}
                  </a>
                  <span className="text-ink-400">— {s.note}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* colophon */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t-2 border-ink pt-6 sm:flex-row sm:items-center">
          <div>
            <div className="font-display text-2xl font-semibold text-ink">The Long Game</div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-600">
              By Imad Al-Ameen · SUPA ECN 305 · Spring 2026
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-wide text-ink-400">
              Set in Fraunces & Hanken Grotesk. Built with React. No stock photos were harmed.
            </p>
          </div>
          <LinkButton variant="underline" onClick={() => scrollToId("hero")}>
            Back to the front page
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
