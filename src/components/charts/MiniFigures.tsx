import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { futureValue } from "../../lib/finance";
import { usd } from "../../lib/utils";
import { NumberTicker } from "../ui/NumberTicker";
import { Slider } from "../ui/Slider";
import { HBars } from "./Figures";

const INK = "#17130E";
const VERM = "#E0341E";
const TEAL = "#1F6F5C";

/* ===================== Definitions ===================== */

function TvmMini() {
  const [years, setYears] = useState(40);
  const principal = 1000;
  const rate = 0.07;
  const { path, area, fv } = useMemo(() => {
    const pts: number[] = [];
    for (let y = 0; y <= years; y++) pts.push(futureValue(principal, rate, y));
    const max = pts[pts.length - 1] || 1;
    const W = 100, H = 38;
    const xy = pts.map((v, i) => [(i / years) * W, H - (v / max) * H]);
    const path = xy.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
    const area = path + ` L100,38 L0,38 Z`;
    return { path, area, fv: pts[pts.length - 1] };
  }, [years]);

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">$1,000 at 7%</div>
          <div className="font-display text-3xl font-semibold text-ink">
            <NumberTicker value={fv} format={(n) => usd(n)} startOnView={false} />
          </div>
        </div>
        <div className="font-mono text-[11px] text-ink-500">{years} yrs</div>
      </div>
      <svg viewBox="0 0 100 38" preserveAspectRatio="none" className="h-16 w-full border-b border-ink/20">
        <defs>
          <pattern id="tvmHatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke={VERM} strokeWidth="0.8" opacity="0.4" />
          </pattern>
        </defs>
        <path d={area} fill="url(#tvmHatch)" />
        <path d={path} fill="none" stroke={INK} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <Slider label="Years invested" value={years} min={5} max={45} onChange={setYears} />
    </div>
  );
}

function NetWorthMini() {
  return (
    <div className="space-y-4">
      <HBars
        rows={[
          { label: "What I own", value: 520, color: "teal", format: "$520k" },
          { label: "What I owe", value: 120, color: "verm", format: "$120k" },
        ]}
        max={560}
      />
      <div className="border-t border-ink/15 pt-3 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">Net worth, attending +5yr</div>
        <div className="font-display text-2xl font-semibold text-teal">+$400,000</div>
      </div>
    </div>
  );
}

function RiskReturnMini() {
  const pts = [
    { x: 12, y: 16, label: "Cash" },
    { x: 30, y: 34, label: "Bonds" },
    { x: 60, y: 66, label: "Index funds" },
    { x: 88, y: 90, label: "One stock" },
  ];
  return (
    <svg viewBox="0 0 100 80" className="w-full overflow-visible">
      <line x1="6" y1="74" x2="98" y2="74" stroke={INK} strokeWidth="0.6" />
      <line x1="6" y1="4" x2="6" y2="74" stroke={INK} strokeWidth="0.6" />
      {pts.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={74 - (p.y / 100) * 70} r="2.6" fill={p.label === "One stock" ? VERM : INK} />
          <text x={p.x + 3.5} y={74 - (p.y / 100) * 70 - 2} fontSize="4.6" fontFamily="JetBrains Mono, monospace" fill={INK}>
            {p.label}
          </text>
        </g>
      ))}
      <text x="98" y="79" textAnchor="end" fontSize="4.4" fontFamily="JetBrains Mono, monospace" fill={INK} opacity="0.6">risk &rarr;</text>
      <text x="2" y="6" fontSize="4.4" fontFamily="JetBrains Mono, monospace" fill={INK} opacity="0.6">return</text>
    </svg>
  );
}

function FundsMini() {
  const cols = [
    { name: "Mutual", fee: "0.5-1%", style: "Active" },
    { name: "ETF", fee: "0.03-0.2%", style: "Passive" },
    { name: "Index", fee: "0.03-0.1%", style: "Passive" },
  ];
  return (
    <table className="w-full border-collapse font-mono text-[11px]">
      <thead>
        <tr className="border-b-2 border-ink">
          <th className="py-1.5 text-left font-medium uppercase tracking-wider text-ink-600">Type</th>
          <th className="py-1.5 text-right font-medium uppercase tracking-wider text-ink-600">Fees</th>
          <th className="py-1.5 text-right font-medium uppercase tracking-wider text-ink-600">Style</th>
        </tr>
      </thead>
      <tbody>
        {cols.map((c) => (
          <tr key={c.name} className="border-b border-ink/15">
            <td className="py-1.5 font-semibold text-ink">{c.name}</td>
            <td className="py-1.5 text-right text-vermillion">{c.fee}</td>
            <td className="py-1.5 text-right text-ink-600">{c.style}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function NeedsWantsMini() {
  const needs = ["Rent & utilities", "Groceries", "Health insurance", "Transit to clinicals"];
  const wants = ["Dining out", "New gaming PC", "Luxury car lease", "Daily coffee runs"];
  return (
    <div className="grid grid-cols-2 gap-4 font-mono text-[11px]">
      <div>
        <div className="mb-2 border-b-2 border-teal pb-1 font-semibold uppercase tracking-wider text-teal">Needs</div>
        <ul className="space-y-1 text-ink-700">{needs.map((n) => <li key={n}>{n}</li>)}</ul>
      </div>
      <div>
        <div className="mb-2 border-b-2 border-vermillion pb-1 font-semibold uppercase tracking-wider text-vermillion">Wants</div>
        <ul className="space-y-1 text-ink-700">{wants.map((w) => <li key={w}>{w}</li>)}</ul>
      </div>
    </div>
  );
}

export const vizMap = {
  tvm: TvmMini,
  networth: NetWorthMini,
  riskreturn: RiskReturnMini,
  funds: FundsMini,
  needswants: NeedsWantsMini,
} as const;

/* ===================== Savings ===================== */

function TimelineViz() {
  const [mode, setMode] = useState<"timeline" | "intensity">("timeline");
  const isT = mode === "timeline";
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["timeline", "intensity"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={
              "flex-1 border px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors " +
              (mode === m ? "border-ink bg-ink text-paper" : "border-ink/30 text-ink-600 hover:border-ink")
            }
          >
            {m === "timeline" ? "Slow & long" : "Fast & hard"}
          </button>
        ))}
      </div>
      <div className="flex items-end gap-1" style={{ height: 84 }}>
        {Array.from({ length: isT ? 18 : 6 }).map((_, i) => (
          <motion.div
            key={`${mode}-${i}`}
            initial={{ height: 0 }}
            animate={{ height: isT ? 16 : 66 }}
            transition={{ delay: i * 0.03, type: "spring", stiffness: 200, damping: 18 }}
            className="flex-1 bg-ink"
          />
        ))}
      </div>
      <div className="flex justify-between font-mono text-[10px] text-ink-500">
        <span>{isT ? "$250 / mo" : "$830 / mo"}</span>
        <span>{isT ? "20 years" : "6 years"} &rarr; $60,000</span>
      </div>
    </div>
  );
}

function JarViz() {
  return (
    <svg viewBox="0 0 120 130" className="mx-auto h-40 w-auto">
      <defs>
        <pattern id="jarHatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={TEAL} strokeWidth="1.2" opacity="0.6" />
        </pattern>
        <clipPath id="jarBody">
          <path d="M32 38 Q32 34 36 34 L84 34 Q88 34 88 38 L88 116 Q88 124 80 124 L40 124 Q32 124 32 116 Z" />
        </clipPath>
      </defs>
      <rect x="38" y="24" width="44" height="11" rx="2" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M32 38 Q32 34 36 34 L84 34 Q88 34 88 38 L88 116 Q88 124 80 124 L40 124 Q32 124 32 116 Z" fill="none" stroke={INK} strokeWidth="2" />
      <motion.rect
        x="32" width="56" clipPath="url(#jarBody)" fill="url(#jarHatch)"
        initial={{ y: 124, height: 0 }}
        whileInView={{ y: 64, height: 60 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function GapViz() {
  return (
    <svg viewBox="0 0 100 60" className="w-full">
      <defs>
        <pattern id="gapHatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={TEAL} strokeWidth="0.8" opacity="0.5" />
        </pattern>
      </defs>
      <motion.path d="M2,40 C30,30 60,16 98,6 L98,34 C60,40 30,42 2,44 Z" fill="url(#gapHatch)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
      <motion.path d="M2,40 C30,30 60,16 98,6" fill="none" stroke={INK} strokeWidth="1.6" vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
      <motion.path d="M2,44 C30,42 60,40 98,34" fill="none" stroke={VERM} strokeWidth="1.6" strokeDasharray="3 2" vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }} />
      <text x="2" y="4" fontSize="4.4" fontFamily="JetBrains Mono, monospace" fill={INK}>income</text>
      <text x="2" y="52" fontSize="4.4" fontFamily="JetBrains Mono, monospace" fill={VERM}>spending</text>
    </svg>
  );
}

function SexyViz() {
  const rows = [
    { a: "I can't afford that", b: "I'm choosing freedom instead" },
    { a: "Saving is boring", b: "Saving is buying options" },
    { a: "Less now", b: "More choices later" },
  ];
  return (
    <div className="space-y-3 font-mono text-[12px]">
      {rows.map((r, i) => (
        <motion.div key={r.a} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
          <div className="text-ink-400 line-through">{r.a}</div>
          <div className="font-semibold text-vermillion">{r.b}</div>
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
