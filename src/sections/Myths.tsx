import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { Section } from "../components/ui/Section";
import { FlipCard } from "../components/ui/FlipCard";
import { myths, type Verdict } from "../data/myths";
import { cn } from "../lib/utils";

const verdictStyle: Record<Verdict, { text: string; ring: string; bg: string; bar: string }> = {
  Fact: {
    text: "text-emerald-300",
    ring: "ring-emerald-400/40",
    bg: "from-emerald-500/[0.12]",
    bar: "bg-emerald-glow",
  },
  Myth: {
    text: "text-rose-300",
    ring: "ring-rose-400/40",
    bg: "from-rose-500/[0.12]",
    bar: "bg-rose-400",
  },
  "It Depends": {
    text: "text-gold-300",
    ring: "ring-gold-400/40",
    bg: "from-gold-500/[0.12]",
    bar: "bg-gold-400",
  },
};

export function Myths() {
  return (
    <Section
      id="myths"
      index="Topic 5"
      eyebrow="Rules or Myths?"
      accent="gold"
      title={
        <>
          Eight money rules, <span className="text-grad-gold italic font-serif font-normal">put on trial</span>
        </>
      }
      lede="Some classic financial advice is gospel, some is half true, and some is just a sticky phrase. Tap any card to flip it and see the verdict, plus how much I actually believe it."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myths.map((m, i) => {
          const s = verdictStyle[m.verdict];
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-72"
            >
              <FlipCard
                className="h-full"
                front={
                  <div className="flex h-full flex-col justify-between rounded-4xl border border-white/10 bg-white/[0.035] p-1.5 shadow-float ring-1 ring-inset ring-white/5">
                    <div className="flex h-full flex-col justify-between rounded-[calc(2rem-0.375rem)] bg-ink-900/80 p-6 shadow-inner-hi">
                      <span className="font-mono text-[12px] text-white/30">Rule 0{i + 1}</span>
                      <p className="font-display text-2xl font-semibold leading-snug text-white">
                        {m.claim}
                      </p>
                      <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-white/40">
                        <RotateCw className="h-3.5 w-3.5" /> Tap to judge
                      </span>
                    </div>
                  </div>
                }
                back={
                  <div className="h-full rounded-4xl border border-white/10 bg-white/[0.035] p-1.5 shadow-float ring-1 ring-inset ring-white/5">
                    <div
                      className={cn(
                        "flex h-full flex-col rounded-[calc(2rem-0.375rem)] bg-gradient-to-b to-ink-900/95 p-5 shadow-inner-hi",
                        s.bg
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "rounded-full bg-ink-950/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ring-1",
                            s.text,
                            s.ring
                          )}
                        >
                          {m.verdict}
                        </span>
                        <span className="font-mono text-[11px] text-white/40">{m.confidence}%</span>
                      </div>
                      {/* confidence meter */}
                      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div className={cn("h-full rounded-full", s.bar)} style={{ width: `${m.confidence}%` }} />
                      </div>
                      <p className="mt-3 overflow-y-auto text-pretty text-[12.5px] leading-relaxed text-white/75">
                        {m.take}
                      </p>
                    </div>
                  </div>
                }
              />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
