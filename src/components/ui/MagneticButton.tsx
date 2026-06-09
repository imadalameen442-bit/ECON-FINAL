import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Island pill button with a nested "button-in-button" trailing icon and
 * magnetic hover physics. Renders as <a> when href is given, else <button>.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  icon = true,
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  icon?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <span className="relative z-10 flex items-center gap-3 font-medium">
      {children}
      {icon && (
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-spring",
            "group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:scale-105",
            variant === "primary" ? "bg-ink-950/25" : "bg-white/10"
          )}
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
        </span>
      )}
    </span>
  );

  const classes = cn(
    "group relative inline-flex select-none items-center rounded-full py-2.5 pl-6 pr-2.5",
    "text-sm transition-all duration-500 ease-spring active:scale-[0.97]",
    variant === "primary"
      ? "bg-gradient-to-br from-emerald-glow to-emerald-500 text-ink-950 shadow-glow"
      : "border border-white/12 bg-white/[0.04] text-white/85 backdrop-blur hover:bg-white/[0.07]",
    className
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className={classes}
        >
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={classes}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
