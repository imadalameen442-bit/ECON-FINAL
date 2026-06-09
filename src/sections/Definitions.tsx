import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { definitions, type Definition } from "../data/definitions";
import { vizMap } from "../components/charts/DefinitionViz";
import { Section } from "../components/ui/Section";
import { cn } from "../lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const categoryColor: Record<Definition["category"], string> = {
  Concepts: "text-emerald-400",
  Investing: "text-sky-glow",
  "Income & Debt": "text-gold-400",
  Everyday: "text-white/70",
};

function spanClass(span?: Definition["span"]) {
  if (span === "wide") return "sm:col-span-2";
  if (span === "tall") return "sm:row-span-2";
  return "";
}

export function Definitions() {
  const [selected, setSelected] = useState<Definition | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Section
      id="definitions"
      index="Topic 3"
      eyebrow="The Vocabulary"
      title={
        <>
          The words that quietly <span className="text-grad-emerald italic font-serif font-normal">run your money</span>
        </>
      }
      lede="Fifteen terms every adult is assumed to know but rarely gets taught. Tap any card to open the full definition, why it matters, and a real example from my road to the OR."
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ staggerChildren: 0.04 }}
        className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {definitions.map((d) => (
          <motion.button
            key={d.id}
            layoutId={`def-${d.id}`}
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.6, ease }}
            onClick={() => setSelected(d)}
            className={cn(
              "group relative flex flex-col items-start overflow-hidden rounded-4xl border border-white/10 bg-white/[0.035] p-1.5 text-left shadow-float ring-1 ring-inset ring-white/5",
              "transition-colors duration-500 hover:border-white/20",
              spanClass(d.span)
            )}
          >
            <div className="flex h-full w-full flex-col rounded-[calc(2rem-0.375rem)] bg-ink-900/70 p-5 shadow-inner-hi">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-[0.18em]",
                    categoryColor[d.category]
                  )}
                >
                  {d.category}
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.06] text-white/50 transition-all duration-500 ease-spring group-hover:bg-white/[0.12] group-hover:text-white">
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.6} />
                </span>
              </div>
              <motion.h3
                layoutId={`def-title-${d.id}`}
                className="mt-3 font-display text-xl font-semibold leading-tight text-white"
              >
                {d.term}
              </motion.h3>
              <p className="mt-2 text-pretty text-[13px] leading-relaxed text-white/50">
                {d.short}
              </p>
              {d.viz && (
                <span className="mt-auto pt-3 text-[10px] font-medium uppercase tracking-wider text-emerald-400/70">
                  Interactive ·
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Expanded modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-ink-950/70 backdrop-blur-xl"
            />
            <motion.div
              layoutId={`def-${selected.id}`}
              className="relative z-10 w-full max-w-xl overflow-hidden rounded-4xl border border-white/12 bg-white/[0.04] p-1.5 shadow-float ring-1 ring-inset ring-white/10"
            >
              <div className="max-h-[82vh] overflow-y-auto rounded-[calc(2rem-0.375rem)] bg-ink-900/95 p-6 shadow-inner-hi sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-[0.2em]",
                        categoryColor[selected.category]
                      )}
                    >
                      {selected.category}
                    </span>
                    <motion.h3
                      layoutId={`def-title-${selected.id}`}
                      className="mt-2 font-display text-3xl font-semibold leading-tight text-white"
                    >
                      {selected.term}
                    </motion.h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.06] text-white/60 transition-colors hover:bg-white/[0.12] hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.5, ease }}
                  className="mt-6 space-y-5"
                >
                  {selected.viz && (
                    <div className="rounded-2xl border border-white/10 bg-ink-950/40 p-4">
                      {(() => {
                        const Viz = vizMap[selected.viz];
                        return <Viz />;
                      })()}
                    </div>
                  )}

                  <Field label="What it is" body={selected.what} />
                  <Field label="Why it matters" body={selected.why} accent="gold" />
                  <Field label="A real example" body={selected.example} accent="emerald" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function Field({
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
      <div className="mb-1.5 flex items-center gap-2">
        <span className={cn("inline-block h-1.5 w-1.5 rounded-full", dot)} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          {label}
        </span>
      </div>
      <p className="text-pretty text-[15px] leading-relaxed text-white/75">{body}</p>
    </div>
  );
}
