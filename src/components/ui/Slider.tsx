import { useId } from "react";
import { cn } from "../../lib/utils";

/** Editorial range control: ink track, value shown in a mono tag. */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  className,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  className?: string;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-600">
          {label}
        </label>
        <span className="font-mono text-[13px] font-medium tabular-nums text-vermillion">
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
            background: `linear-gradient(to right, #17130e 0%, #17130e ${pct}%, rgba(23,19,14,0.18) ${pct}%, rgba(23,19,14,0.18) 100%)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
