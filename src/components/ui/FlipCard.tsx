import { useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";

/**
 * A 3D flip card. Front shows the claim, back shows the verdict.
 * Flips on click and on keyboard (Enter/Space) for accessibility.
 */
export function FlipCard({
  front,
  back,
  className,
  flipped: controlled,
  onToggle,
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  flipped?: boolean;
  onToggle?: (v: boolean) => void;
}) {
  const [local, setLocal] = useState(false);
  const flipped = controlled ?? local;
  const toggle = () => {
    const next = !flipped;
    setLocal(next);
    onToggle?.(next);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className={cn("perspective group h-full cursor-pointer outline-none", className)}
    >
      <div
        className="preserve-3d relative h-full w-full transition-transform duration-700 ease-spring"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="backface-hidden absolute inset-0">{front}</div>
        <div
          className="backface-hidden absolute inset-0"
          style={{ transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
