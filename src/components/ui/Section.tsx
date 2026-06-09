import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Reveal } from "./Reveal";

/**
 * A full chapter of the page: generous vertical rhythm, an eyebrow tag,
 * an editorial heading, and a lede. Anchored by id for the nav.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
  className,
  accent = "emerald",
}: {
  id: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  accent?: "emerald" | "gold";
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-36", className)}
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <Reveal>
            <span className="eyebrow">
              <span
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  accent === "emerald" ? "bg-emerald-glow" : "bg-gold-glow"
                )}
              />
              {index ? `${index} · ` : ""}
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
              {title}
            </h2>
          </Reveal>
          {lede && (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
                {lede}
              </p>
            </Reveal>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
