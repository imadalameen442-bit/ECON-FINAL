import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

/**
 * The Double-Bezel container: an outer machined "tray" holding an inner core,
 * with concentric radii and an inner highlight. Used for every premium card.
 */
export function Bezel({
  children,
  className,
  coreClassName,
  glow,
}: {
  children: ReactNode;
  className?: string;
  coreClassName?: string;
  glow?: "emerald" | "gold" | "none";
}) {
  return (
    <div
      className={cn(
        "group relative rounded-4xl border border-white/10 bg-white/[0.035] p-1.5",
        "shadow-float ring-1 ring-inset ring-white/5",
        "transition-transform duration-700 ease-spring",
        className
      )}
    >
      {glow && glow !== "none" && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-px rounded-4xl opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100",
            glow === "emerald" ? "bg-emerald-500/20" : "bg-gold-500/20"
          )}
        />
      )}
      <div
        className={cn(
          "relative h-full rounded-[calc(2rem-0.375rem)] bg-ink-900/80 shadow-inner-hi",
          coreClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
