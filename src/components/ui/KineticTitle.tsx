import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const ink = [0.16, 1, 0.3, 1] as const;

/**
 * Editorial headline that reveals word by word: each word rises out of a
 * masked row with a stagger. Words listed in `emphasize` render as italic
 * serif in the accent color.
 */
export function KineticTitle({
  text,
  emphasize = [],
  className,
  delay = 0,
  as = "h2",
  once = true,
}: {
  text: string;
  emphasize?: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
  once?: boolean;
}) {
  const Tag = motion[as];
  const words = text.split(" ");
  const emph = new Set(emphasize.map((w) => w.toLowerCase().replace(/[^\w]/g, "")));

  return (
    <Tag
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {words.map((word, i) => {
        const isEmph = emph.has(word.toLowerCase().replace(/[^\w]/g, ""));
        return (
          <span key={i} className="mask-row pb-[0.12em] pr-[0.26em]">
            <motion.span
              className={cn(
                "inline-block",
                isEmph && "font-normal italic text-vermillion"
              )}
              variants={{
                hidden: { y: "115%" },
                show: { y: "0%" },
              }}
              transition={{ duration: 0.85, ease: ink }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
