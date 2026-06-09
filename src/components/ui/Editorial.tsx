import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const ink = [0.16, 1, 0.3, 1] as const;

/** Mono kicker label, optionally with a leading figure/section number. */
export function Kicker({
  children,
  num,
  className,
}: {
  children: ReactNode;
  num?: string;
  className?: string;
}) {
  return (
    <span className={cn("kicker", className)}>
      {num && <span className="text-vermillion">{num}</span>}
      {num && <span className="h-3 w-px bg-ink/30" />}
      {children}
    </span>
  );
}

/** Big editorial pull quote with a vermillion rule. */
export function PullQuote({
  children,
  cite,
  className,
}: {
  children: ReactNode;
  cite?: string;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      <span className="absolute -left-1 top-0 h-full w-0.5 bg-vermillion" />
      <blockquote className="pl-6 font-display text-2xl font-normal italic leading-[1.25] text-ink sm:text-3xl">
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-3 pl-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
          {cite}
        </figcaption>
      )}
    </figure>
  );
}

/** A figure frame with a top rule and "Fig. N" caption. */
export function Figure({
  children,
  num,
  caption,
  className,
}: {
  children: ReactNode;
  num?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("flex flex-col", className)}>
      <div className="rule-double mb-3" />
      <div className="flex-1">{children}</div>
      {(num || caption) && (
        <figcaption className="mt-3 flex items-start gap-2 border-t border-ink/15 pt-2 font-mono text-[11px] leading-relaxed text-ink-500">
          {num && <span className="font-bold uppercase tracking-wider text-ink">{num}</span>}
          {caption && <span className="uppercase tracking-wider">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/** A margin note that slides in from the side; sits inline on small screens. */
export function Marginalia({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.8, ease: ink }}
      className={cn(
        "border-l-2 border-vermillion pl-3 font-mono text-[12px] leading-relaxed text-ink-600",
        className
      )}
    >
      {children}
    </motion.aside>
  );
}

/** Editorial button: solid ink, or underlined text with an arrow. */
export function LinkButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "underline";
  className?: string;
}) {
  const solid =
    "group inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-vermillion";
  const underline =
    "group inline-flex items-center gap-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink";

  const cls = cn(variant === "solid" ? solid : underline, className);
  const inner = (
    <>
      <span className={variant === "underline" ? "ink-link pb-0.5" : undefined}>{children}</span>
      <span className="transition-transform duration-300 ease-spring group-hover:translate-x-1">
        &rarr;
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className={cls}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
