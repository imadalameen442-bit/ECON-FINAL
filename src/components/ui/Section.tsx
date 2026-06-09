import type { ReactNode } from "react";
import { KineticTitle } from "./KineticTitle";
import { Reveal } from "./Reveal";
import { cn } from "../../lib/utils";

/**
 * An editorial article section: left-aligned masthead-style header with a mono
 * kicker, a kinetic display headline, a lede column, and a double rule.
 */
export function Section({
  id,
  feature,
  kicker,
  title,
  emphasize,
  lede,
  children,
  className,
}: {
  id: string;
  feature: string;
  kicker: string;
  title: string;
  emphasize?: string[];
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-28 px-5 py-20 sm:px-8 md:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-12 md:mb-16">
          <KineticTitle
            text={title}
            emphasize={emphasize}
            as="h2"
            className="max-w-4xl text-[clamp(2.4rem,6.5vw,5.2rem)] font-semibold leading-[0.95] tracking-tightest text-ink"
          />
          {lede && (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-700 sm:text-xl">
                {lede}
              </p>
            </Reveal>
          )}
          <div className="rule-double mt-8" />
        </header>
        {children}
      </div>
    </section>
  );
}
