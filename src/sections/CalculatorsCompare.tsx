import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Reveal } from "../components/ui/Reveal";
import { StampVerdict } from "../components/ui/StampVerdict";
import { comparisons, type Mark, type CompareTool } from "../data/compare";
import { cn } from "../lib/utils";

const ink = [0.16, 1, 0.3, 1] as const;

function MarkGlyph({ mark }: { mark: Mark }) {
  if (mark === "yes") return <span className="font-bold text-teal">✓</span>;
  if (mark === "partial") return <span className="font-bold text-ochre">~</span>;
  return <span className="text-ink-400">✕</span>;
}

function ToolHead({ tool, winner }: { tool: CompareTool; winner: boolean }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group block border p-4 transition-colors",
        winner ? "border-vermillion bg-vermillion/[0.06]" : "border-ink/25 bg-paper hover:border-ink"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">{tool.kind}</span>
        {winner && <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-vermillion">My pick</span>}
      </div>
      <div className="mt-1 font-display text-xl font-semibold text-ink">
        <span className="ink-link pb-0.5">{tool.name}</span> &rarr;
      </div>
      <p className="mt-1 font-mono text-[11px] leading-relaxed text-ink-600">{tool.tagline}</p>
    </a>
  );
}

export function CalculatorsCompare() {
  return (
    <Section
      id="compare"
      feature="Topic 7"
      kicker="Head to Head"
      title="Same job, two tools, one winner"
      emphasize={["one"]}
      lede="A calculator is only as good as what it shows you. I put two versions of each calculator type against each other on the features that actually matter to a beginner."
    >
      <div className="flex flex-col gap-12">
        {comparisons.map((c, ci) => (
          <Reveal key={c.id}>
            <article>
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-vermillion">
                  Match {ci + 1}
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink">{c.type}</h3>
              </div>
              <p className="mb-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-700">{c.intro}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <ToolHead tool={c.toolA} winner={c.winner === "a"} />
                <ToolHead tool={c.toolB} winner={c.winner === "b"} />
              </div>

              {/* scorecard */}
              <table className="mt-6 w-full border-collapse">
                <thead>
                  <tr className="border-y-2 border-ink">
                    <th className="py-2.5 text-left font-mono text-[10px] font-bold uppercase tracking-wider text-ink">Feature</th>
                    <th className="w-20 py-2.5 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-ink sm:w-28">{c.toolA.name}</th>
                    <th className="w-20 py-2.5 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-ink sm:w-28">{c.toolB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.features.map((f, i) => (
                    <motion.tr
                      key={f.feature}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.4, ease: ink }}
                      className="border-b border-ink/15"
                    >
                      <td className="py-2.5 text-[14px] text-ink-800">{f.feature}</td>
                      <td className="py-2.5 text-center text-lg"><MarkGlyph mark={f.a} /></td>
                      <td className="py-2.5 text-center text-lg"><MarkGlyph mark={f.b} /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {/* verdict */}
              <div className="mt-6 flex flex-col gap-4 border-t-2 border-ink pt-5 sm:flex-row sm:items-start">
                <div className="shrink-0">
                  <StampVerdict verdict="Fact" />
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-500">My verdict</div>
                </div>
                <p className="text-pretty text-[15px] leading-relaxed text-ink-800">{c.verdict}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
