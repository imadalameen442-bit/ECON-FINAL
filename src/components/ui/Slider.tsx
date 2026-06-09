import { useId } from "react";
import { cn } from "../../lib/utils";

/**
 * Labeled range input styled for the calculators. Shows a formatted value pill.
 */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  accent = "emerald",
  className,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  accent?: "emerald" | "gold";
  className?: string;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  const accentColor = accent === "emerald" ? "#2ee6a8" : "#f5c45e";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-medium text-white/65">
          {label}
        </label>
        <span
          className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[13px] tabular-nums text-white"
          style={{ color: accentColor }}
        >
          {format ? format(value) : value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ui-range w-full"
        style={
          {
            background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${pct}%, rgba(255,255,255,0.10) ${pct}%, rgba(255,255,255,0.10) 100%)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
