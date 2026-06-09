import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type Verdict = "Fact" | "Myth" | "It Depends";

const styles: Record<Verdict, string> = {
  Fact: "text-teal border-teal",
  Myth: "text-vermillion border-vermillion",
  "It Depends": "text-ochre border-ochre",
};

/** A rubber-stamp verdict that "thunks" down into place when scrolled into view. */
export function StampVerdict({
  verdict,
  rotate = -7,
  className,
}: {
  verdict: Verdict;
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ scale: 1.7, opacity: 0, rotate: rotate - 14 }}
      whileInView={{ scale: 1, opacity: 0.92, rotate }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ type: "spring", stiffness: 420, damping: 14, mass: 0.7 }}
      className={cn(
        "stamp select-none px-3 py-1.5 text-[15px]",
        styles[verdict],
        className
      )}
    >
      {verdict}
    </motion.span>
  );
}
