import { motion } from "framer-motion";
import { Check, Minus, X, ArrowUpRight, Trophy } from "lucide-react";
import { Section } from "../components/ui/Section";
import { Reveal } from "../components/ui/Reveal";
import { comparisons, type Mark, type CompareTool } from "../data/compare";
import { cn } from "../lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "yes")
    return (
      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
        <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
      </span>
    );
  if (mark === "partial")
    return (
      <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-500/15 text-gold-400">
        <Minus className="h-3.5 w-3.5" strokeWidth={2.4} />
      </span>
    );
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/[0.06] text-white/30">
      <X className="h-3.5 w-3.5" strokeWidth={2.4} />
    </span>
  );
}

function ToolHead({ tool, winner }: { tool: CompareTool; winner: boolean }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group block rounded-2xl border p-4 transition-colors duration-500",
        winner
          ? "border-emerald-400/40 bg-emerald-500/[0.07]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
          {tool.kind}
        </span>
        {winner && (
          <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
            <Trophy className="h-3 w-3" /> My pick
          </span>
        )}
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <h4 className="font-display text-lg font-semibold text-white">{tool.name}</h4>
        <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" strokeWidth={1.6} />
      </div>
      <p className="mt-1 text-[12px] leading-relaxed text-white/50">{tool.tagline}</p>
    </a>
  );
}

export function CalculatorsCompare() {
  return (
    <Section
      id="compare"
      index="Topic 7"
      eyebrow="Head to Head"
      accent="gold"
      title={
        <>
          Same job, two tools, <span className="text-grad-gold italic font-serif font-normal">one winner</span>
        </>
      }
      lede="A calculator is only as good as what it shows you. I put two versions of each calculator type against each other on the features that actually matter to a beginner."
    >
      <div className="flex flex-col gap-6">
        {comparisons.map((c) => (
          <Reveal key={c.id}>
            <div className="rounded-4xl border border-white/10 bg-white/[0.035] p-1.5 shadow-float ring-1 ring-inset ring-white/5">
              <div className="rounded-[calc(2rem-0.375rem)] bg-ink-900/80 p-6 shadow-inner-hi sm:p-8">
                <div className="mb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400/80">
                    {c.type}
                  </span>
                  <p className="mt-2 max-w-2xl text-pretty text-[14px] leading-relaxed text-white/55">
                    {c.intro}
                  </p>
                </div>

                {/* tool heads */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <ToolHead tool={c.toolA} winner={c.winner === "a"} />
                  <ToolHead tool={c.toolB} winner={c.winner === "b"} />
                </div>

                {/* feature matrix */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  {/* header row */}
                  <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-white/[0.03] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white/40 sm:px-5">
                    <span>Feature</span>
                    <span className="w-16 text-center sm:w-24">{c.toolA.name}</span>
                    <span className="w-16 text-center sm:w-24">{c.toolB.name}</span>
                  </div>
                  {c.features.map((f, i) => (
                    <motion.div
                      key={f.feature}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5, ease }}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-white/6 px-4 py-2.5 text-[13px] text-white/70 sm:px-5"
                    >
                      <span>{f.feature}</span>
                      <span className="flex w-16 justify-center sm:w-24">
                        <MarkIcon mark={f.a} />
                      </span>
                      <span className="flex w-16 justify-center sm:w-24">
                        <MarkIcon mark={f.b} />
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* verdict */}
                <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/[0.08] to-transparent p-5">
                  <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                    <Trophy className="h-3.5 w-3.5" /> My verdict
                  </div>
                  <p className="text-pretty text-[14px] leading-relaxed text-white/75">{c.verdict}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
