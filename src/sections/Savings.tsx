import { Kicker } from "../components/ui/Editorial";
import { KineticTitle } from "../components/ui/KineticTitle";
import { Reveal } from "../components/ui/Reveal";
import { HorizontalTrack } from "../components/ui/HorizontalTrack";
import { savingIdeas, type SavingIdea } from "../data/savings";
import { savingsVizMap } from "../components/charts/MiniFigures";

function Stars({ value }: { value: number }) {
  return (
    <span className="font-mono text-[15px] tracking-[0.1em] text-vermillion" aria-label={`${value} out of 5`}>
      {"★".repeat(value)}
      <span className="text-ink-300">{"★".repeat(5 - value)}</span>
      <span className="ml-2 text-[11px] text-ink-500">{value}/5</span>
    </span>
  );
}

function Plate({ idea, index }: { idea: SavingIdea; index: number }) {
  const Viz = savingsVizMap[idea.visual];
  return (
    <article className="flex w-[88vw] max-w-[600px] shrink-0 flex-col border border-ink/25 bg-paper-100 p-6 shadow-paper-sm sm:p-8">
      <div className="flex items-start justify-between">
        <span className="font-display text-5xl font-semibold leading-none text-ink/15">
          0{index + 1}
        </span>
        <Stars value={idea.rating} />
      </div>
      <h3 className="mt-3 font-display text-3xl font-semibold leading-[0.95] text-ink">{idea.name}</h3>
      <p className="mt-2 border-l-2 border-vermillion pl-3 font-display text-lg font-normal italic text-ink-700">
        "{idea.hook}"
      </p>

      <div className="my-5 bg-paper p-4">
        <Viz />
      </div>

      <div className="space-y-3 text-[13px] leading-relaxed">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-500">The idea · </span>
          <span className="text-ink-700">{idea.what}</span>
        </div>
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-vermillion">The catch · </span>
          <span className="text-ink-700">{idea.critique}</span>
        </div>
        <div className="border-t border-ink/15 pt-3">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-teal">My verdict · </span>
          <span className="text-ink-800">{idea.verdict}</span>
        </div>
      </div>
    </article>
  );
}

export function Savings() {
  return (
    <section id="savings" className="relative scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto mb-12 w-full max-w-6xl px-5 sm:px-8 md:mb-16">
        <div className="mb-5 flex items-center justify-between">
          <Kicker num="Topic 2">The Strategies</Kicker>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400 sm:inline">
            Scroll sideways &rarr;
          </span>
        </div>
        <KineticTitle
          text="Four savings ideas, honestly graded"
          emphasize={["honestly"]}
          as="h2"
          className="max-w-4xl text-[clamp(2.4rem,6.5vw,5.2rem)] font-semibold leading-[0.95] tracking-tightest text-ink"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-700 sm:text-xl">
            Every one of these shows up in finance advice. Some are real systems, some are just
            nice slogans. Here is what each does, where it breaks, and how I would use it. Keep
            scrolling and they slide past like a filmstrip.
          </p>
        </Reveal>
        <div className="rule-double mt-8" />
      </div>

      <HorizontalTrack>
        {savingIdeas.map((idea, i) => (
          <Plate key={idea.id} idea={idea} index={i} />
        ))}
        <div className="flex w-[40vw] max-w-[280px] shrink-0 items-center justify-center">
          <span className="font-display text-2xl italic text-ink-400">fin.</span>
        </div>
      </HorizontalTrack>
    </section>
  );
}
