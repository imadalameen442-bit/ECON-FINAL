import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { StampVerdict } from "../components/ui/StampVerdict";
import { myths } from "../data/myths";

export function Myths() {
  return (
    <Section
      id="myths"
      feature="Topic 5"
      kicker="Fact Check"
      title="Eight money rules, put on trial"
      emphasize={["trial"]}
      lede="Some classic financial advice is gospel, some is half true, and some is just a sticky phrase. Here is the verdict on each, plus how much I actually believe it."
    >
      <div className="gap-6 [column-fill:_balance] sm:columns-2 sm:gap-6">
        {myths.map((m, i) => {
          const rot = (i % 2 === 0 ? -0.7 : 0.7) + (i % 3 === 0 ? 0.4 : 0);
          return (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ rotate: `${rot}deg` }}
              className="relative mb-6 inline-block w-full break-inside-avoid border border-ink/25 bg-paper-50 p-5 shadow-paper sm:p-6"
            >
              {/* tape */}
              <span className="absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 -rotate-2 bg-ink/10" />

              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                <span>Rule {String(i + 1).padStart(2, "0")}</span>
                <span>{m.confidence}% sure</span>
              </div>

              <h3 className="mt-2 font-display text-2xl font-semibold leading-[1.05] text-ink">
                {m.claim}
              </h3>

              <div className="my-4 flex items-center gap-4">
                <StampVerdict verdict={m.verdict} />
                <div className="h-1.5 flex-1 border border-ink/25 bg-paper-200">
                  <div className="h-full bg-ink" style={{ width: `${m.confidence}%` }} />
                </div>
              </div>

              <p className="text-pretty text-[13.5px] leading-relaxed text-ink-700">{m.take}</p>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
