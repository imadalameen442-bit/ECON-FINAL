import { useState } from "react";
import { motion } from "framer-motion";

/* Timeline vs Intensity: toggle between two paths to the same $60k goal. */
export function TimelineViz() {
  const [mode, setMode] = useState<"timeline" | "intensity">("timeline");
  const isTimeline = mode === "timeline";
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["timeline", "intensity"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={
              "flex-1 rounded-full px-3 py-2 text-[12px] font-medium capitalize transition-colors duration-300 " +
              (mode === m
                ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40"
                : "bg-white/[0.04] text-white/50 hover:text-white")
            }
          >
            {m === "timeline" ? "Stretch the timeline" : "Crank the intensity"}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-ink-950/50 p-4">
        <div className="flex items-baseline justify-between text-[12px]">
          <span className="text-white/50">Goal</span>
          <span className="font-mono text-emerald-400">$60,000</span>
        </div>
        <div className="mt-3 flex items-end gap-1.5" style={{ height: 90 }}>
          {Array.from({ length: isTimeline ? 20 : 6 }).map((_, i) => (
            <motion.div
              key={`${mode}-${i}`}
              initial={{ height: 0 }}
              animate={{ height: isTimeline ? 18 : 70 }}
              transition={{ delay: i * 0.03, type: "spring", stiffness: 200, damping: 18 }}
              className="flex-1 rounded-t bg-gradient-to-t from-emerald-600/40 to-emerald-glow/70"
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-white/40">
          <span>{isTimeline ? "$250 / month" : "$830 / month"}</span>
          <span>{isTimeline ? "20 years" : "6 years"}</span>
        </div>
      </div>
      <p className="text-[12px] leading-relaxed text-white/45">
        Same destination. Small and slow, or big and fast. The math agrees either way.
      </p>
    </div>
  );
}

/* Money Jar: fills on view. */
export function JarViz() {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 120 140" className="h-44 w-auto">
        <defs>
          <linearGradient id="coinFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd98a" />
            <stop offset="1" stopColor="#e0a73b" />
          </linearGradient>
          <clipPath id="jarClip">
            <path d="M30 40 Q30 36 34 36 L86 36 Q90 36 90 40 L90 122 Q90 130 82 130 L38 130 Q30 130 30 122 Z" />
          </clipPath>
        </defs>
        {/* jar body */}
        <path
          d="M30 40 Q30 36 34 36 L86 36 Q90 36 90 40 L90 122 Q90 130 82 130 L38 130 Q30 130 30 122 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        {/* lid */}
        <rect x="36" y="26" width="48" height="12" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        {/* fill */}
        <motion.rect
          x="30"
          width="60"
          clipPath="url(#jarClip)"
          fill="url(#coinFill)"
          initial={{ y: 130, height: 0 }}
          whileInView={{ y: 70, height: 60 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <text x="60" y="105" textAnchor="middle" fontSize="9" fill="#3a2c10" fontWeight="700">
          SAVE
        </text>
      </svg>
      <p className="text-center text-[12px] leading-relaxed text-white/45">
        A little excess at a time. Great for the habit, too small for the whole plan.
      </p>
    </div>
  );
}

/* Grow the Gap: income line vs spending line with a widening shaded gap. */
export function GapViz() {
  return (
    <div className="space-y-2">
      <div className="rounded-xl border border-white/10 bg-ink-950/50 p-3">
        <svg viewBox="0 0 100 60" className="h-40 w-full overflow-visible">
          <defs>
            <linearGradient id="gapFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2ee6a8" stopOpacity="0.35" />
              <stop offset="1" stopColor="#2ee6a8" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* the gap area */}
          <motion.path
            d="M2,40 C30,30 60,16 98,6 L98,34 C60,40 30,42 2,44 Z"
            fill="url(#gapFill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          {/* income line */}
          <motion.path
            d="M2,40 C30,30 60,16 98,6"
            fill="none"
            stroke="#34f5c5"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
          {/* spending line */}
          <motion.path
            d="M2,44 C30,42 60,40 98,34"
            fill="none"
            stroke="#f5c45e"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
        </svg>
      </div>
      <div className="flex justify-between text-[11px]">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="h-1.5 w-3 rounded-full bg-emerald-glow" /> Income
        </span>
        <span className="flex items-center gap-1.5 text-gold-400">
          <span className="h-1.5 w-3 rounded-full bg-gold-400" /> Spending
        </span>
      </div>
      <p className="text-[12px] leading-relaxed text-white/45">
        The shaded space is everything you keep. Push either line to widen it.
      </p>
    </div>
  );
}

/* Saving is Sexy: a reframe dial. */
export function SexyViz() {
  const reframes = [
    { from: "I can't afford that", to: "I'm choosing freedom instead" },
    { from: "Saving is boring", to: "Saving is buying options" },
    { from: "Less spending now", to: "More choices later" },
  ];
  return (
    <div className="space-y-3">
      {reframes.map((r, i) => (
        <motion.div
          key={r.from}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.6 }}
          className="rounded-xl border border-white/10 bg-ink-950/50 p-3"
        >
          <div className="text-[12px] text-white/40 line-through">{r.from}</div>
          <div className="mt-1 text-[13px] font-medium text-emerald-300">{r.to}</div>
        </motion.div>
      ))}
    </div>
  );
}

export const savingsVizMap = {
  timeline: TimelineViz,
  jar: JarViz,
  gap: GapViz,
  sexy: SexyViz,
} as const;
