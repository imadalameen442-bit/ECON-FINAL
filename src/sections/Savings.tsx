import { Star } from "lucide-react";
import { Section } from "../components/ui/Section";
import { Reveal } from "../components/ui/Reveal";
import { savingIdeas } from "../data/savings";
import { savingsVizMap } from "../components/charts/SavingsViz";
import { cn } from "../lib/utils";

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < value ? "fill-gold-400 text-gold-400" : "text-white/15"
          )}
          strokeWidth={1.5}
        />
      ))}
      <span className="ml-1.5 font-mono text-[12px] text-white/40">{value}/5</span>
    </div>
  );
}

export function Savings() {
  return (
    <Section
      id="savings"
      index="Topic 2"
      eyebrow="The Strategies"
      accent="emerald"
      title={
        <>
          Four savings ideas, <span className="text-grad-emerald italic font-serif font-normal">honestly graded</span>
        </>
      }
      lede="Every one of these shows up in finance advice. Some are real systems, some are just nice slogans. Here is what each one actually does, where it breaks, and how I would use it."
    >
      <div className="flex flex-col gap-6">
        {savingIdeas.map((idea, i) => {
          const Viz = savingsVizMap[idea.visual];
          const flip = i % 2 === 1;
          return (
            <Reveal key={idea.id}>
              <div className="rounded-4xl border border-white/10 bg-white/[0.035] p-1.5 shadow-float ring-1 ring-inset ring-white/5">
                <div className="grid gap-6 rounded-[calc(2rem-0.375rem)] bg-ink-900/80 p-6 shadow-inner-hi sm:p-8 lg:grid-cols-[1.4fr_1fr]">
                  {/* text */}
                  <div className={cn("flex flex-col", flip && "lg:order-2")}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-[12px] text-white/30">
                          0{i + 1}
                        </span>
                        <h3 className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">
                          {idea.name}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-2 text-pretty text-[15px] font-medium italic text-emerald-200/80">
                      "{idea.hook}"
                    </p>

                    <div className="mt-5 space-y-4">
                      <Block label="What it is" body={idea.what} />
                      <Block label="The critique" body={idea.critique} accent="gold" />
                      <Block label="My verdict" body={idea.verdict} accent="emerald" />
                    </div>

                    <div className="mt-5 border-t border-white/8 pt-4">
                      <Rating value={idea.rating} />
                    </div>
                  </div>

                  {/* visual */}
                  <div className={cn("flex items-center", flip && "lg:order-1")}>
                    <div className="w-full rounded-2xl border border-white/10 bg-ink-950/40 p-5">
                      <Viz />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Block({
  label,
  body,
  accent = "plain",
}: {
  label: string;
  body: string;
  accent?: "plain" | "emerald" | "gold";
}) {
  const dot =
    accent === "emerald" ? "bg-emerald-glow" : accent === "gold" ? "bg-gold-glow" : "bg-white/40";
  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <span className={cn("inline-block h-1.5 w-1.5 rounded-full", dot)} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          {label}
        </span>
      </div>
      <p className="text-pretty text-[14px] leading-relaxed text-white/70">{body}</p>
    </div>
  );
}
