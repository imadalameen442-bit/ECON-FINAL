import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { definitions, type Definition } from "../data/definitions";
import { vizMap } from "../components/charts/MiniFigures";
import { Section } from "../components/ui/Section";
import { Figure } from "../components/ui/Editorial";
import { cn } from "../lib/utils";

const ink = [0.16, 1, 0.3, 1] as const;

function Entry({ d }: { d: Definition }) {
  const Viz = d.viz ? vizMap[d.viz] : null;
  return (
    <motion.div
      key={d.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: ink }}
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-vermillion">
        {d.category}
      </div>
      <h3 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[0.95] tracking-tighter text-ink">
        {d.term}
      </h3>
      <p className="mt-3 font-display text-xl font-normal italic text-ink-600">{d.short}</p>

      <div className="rule-double my-6" />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <Block label="What it is" body={d.what} drop />
          <Block label="Why it matters" body={d.why} />
          <Block label="A real example" body={d.example} />
        </div>
        {Viz && (
          <div>
            <Figure num={`Fig.`} caption="interactive">
              <div className="bg-paper-100 p-5">
                <Viz />
              </div>
            </Figure>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Block({ label, body, drop }: { label: string; body: string; drop?: boolean }) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-500">
        {label}
      </div>
      <p className={cn("text-pretty text-[15px] leading-relaxed text-ink-800", drop && "dropcap")}>
        {body}
      </p>
    </div>
  );
}

export function Definitions() {
  const [selectedId, setSelectedId] = useState(definitions[0].id);
  const selected = definitions.find((d) => d.id === selectedId)!;

  return (
    <Section
      id="definitions"
      feature="Topic 3"
      kicker="The Vocabulary"
      title="The words that quietly run your money"
      emphasize={["quietly"]}
      lede="Fifteen terms every adult is assumed to know but rarely gets taught. Pick one from the index to read it in full, with a real example from my road to the operating room."
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        {/* index */}
        <div className="md:col-span-4">
          <div className="mb-3 flex items-center justify-between border-b-2 border-ink pb-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
              Index
            </span>
            <span className="font-mono text-[11px] text-ink-500">{definitions.length} entries</span>
          </div>
          <ul>
            {definitions.map((d, i) => {
              const on = d.id === selectedId;
              return (
                <li key={d.id}>
                  <button
                    onClick={() => setSelectedId(d.id)}
                    className={cn(
                      "group flex w-full items-baseline gap-3 border-b border-ink/12 py-2.5 text-left transition-colors",
                      on ? "text-vermillion" : "text-ink hover:text-ink-600"
                    )}
                  >
                    <span className="w-5 shrink-0 font-mono text-[11px] text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-lg leading-tight",
                        on ? "font-semibold italic" : "font-medium"
                      )}
                    >
                      {d.term}
                    </span>
                    {d.viz && (
                      <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-ink-400">
                        fig
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* entry */}
        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            <Entry d={selected} />
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
