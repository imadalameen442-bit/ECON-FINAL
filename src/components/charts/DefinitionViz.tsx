import { useMemo, useState } from "react";
import { futureValue } from "../../lib/finance";
import { usd } from "../../lib/utils";
import { NumberTicker } from "../ui/NumberTicker";
import { Slider } from "../ui/Slider";

/* ---- Time Value of Money: live sparkline of $1,000 compounding ---- */
export function TvmMini() {
  const [years, setYears] = useState(40);
  const rate = 0.07;
  const principal = 1000;

  const { path, fv } = useMemo(() => {
    const pts: number[] = [];
    for (let y = 0; y <= years; y++) pts.push(futureValue(principal, rate, y));
    const max = pts[pts.length - 1] || 1;
    const w = 100;
    const h = 40;
    const path = pts
      .map((v, i) => {
        const x = (i / years) * w;
        const yy = h - (v / max) * h;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${yy.toFixed(2)}`;
      })
      .join(" ");
    return { path, fv: pts[pts.length - 1] };
  }, [years]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            $1,000 at 7%
          </div>
          <div className="font-display text-3xl font-semibold text-grad-emerald">
            <NumberTicker value={fv} format={(n) => usd(n)} startOnView={false} />
          </div>
        </div>
        <div className="text-right text-[11px] text-white/40">
          after <span className="font-mono text-white/70">{years}</span> years
        </div>
      </div>

      <div className="relative h-14 w-full overflow-hidden rounded-xl border border-white/10 bg-ink-950/60 p-2">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="tvmFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2ee6a8" stopOpacity="0.45" />
              <stop offset="1" stopColor="#2ee6a8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L100,40 L0,40 Z`} fill="url(#tvmFill)" />
          <path d={path} fill="none" stroke="#34f5c5" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <Slider label="Years invested" value={years} min={5} max={45} onChange={setYears} />
    </div>
  );
}

/* ---- Net Worth: assets up, liabilities down, net marker ---- */
export function NetWorthMini() {
  const rows = [
    { label: "Today (pre-med)", assets: 8, liabilities: 5 },
    { label: "Residency start", assets: 40, liabilities: 250 },
    { label: "Attending +5yr", assets: 520, liabilities: 120 },
  ];
  const scale = 560;

  return (
    <div className="space-y-3">
      {rows.map((r) => {
        const net = r.assets - r.liabilities;
        return (
          <div key={r.label} className="space-y-1">
            <div className="flex justify-between text-[11px] text-white/50">
              <span>{r.label}</span>
              <span className={net >= 0 ? "text-emerald-400" : "text-rose-400"}>
                net {net >= 0 ? "+" : "-"}${Math.abs(net)}k
              </span>
            </div>
            <div className="relative h-5 overflow-hidden rounded-md bg-ink-950/60">
              <div
                className="absolute left-0 top-0 h-full bg-emerald-500/35"
                style={{ width: `${(r.assets / scale) * 100}%` }}
              />
              <div
                className="absolute right-0 top-0 h-full bg-rose-500/30"
                style={{ width: `${(r.liabilities / scale) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
      <p className="pt-1 text-[11px] leading-relaxed text-white/40">
        Green is what I own, red is what I owe. The plan is to drag that net number
        from deep red into solid green.
      </p>
    </div>
  );
}

/* ---- Risk vs Return scatter map ---- */
export function RiskReturnMini() {
  const points = [
    { x: 8, y: 12, label: "Cash", c: "#8fd0ff" },
    { x: 24, y: 30, label: "Bonds", c: "#5bb0f0" },
    { x: 58, y: 64, label: "Index funds", c: "#2ee6a8" },
    { x: 88, y: 88, label: "Single stock", c: "#f5c45e" },
  ];
  return (
    <div className="space-y-2">
      <div className="relative aspect-[4/3] w-full rounded-xl border border-white/10 bg-ink-950/60 p-3">
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <line x1="6" y1="94" x2="98" y2="94" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <line x1="6" y1="2" x2="6" y2="94" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          {points.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={100 - p.y} r="3" fill={p.c} />
              <circle cx={p.x} cy={100 - p.y} r="6" fill={p.c} opacity="0.18" />
              <text
                x={p.x + 4}
                y={100 - p.y - 4}
                fontSize="4.5"
                fill="rgba(255,255,255,0.7)"
                className="font-sans"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
        <span className="absolute bottom-1 right-3 text-[9px] uppercase tracking-wider text-white/30">
          risk &rarr;
        </span>
        <span className="absolute left-1 top-2 text-[9px] uppercase tracking-wider text-white/30 [writing-mode:vertical-rl]">
          return &rarr;
        </span>
      </div>
    </div>
  );
}

/* ---- Fund types quick compare ---- */
export function FundsMini() {
  const cols = [
    { name: "Mutual Fund", fee: "0.5 - 1%", mgmt: "Active", trade: "Once daily" },
    { name: "ETF", fee: "~0.03 - 0.2%", mgmt: "Mostly passive", trade: "All day" },
    { name: "Index Fund", fee: "~0.03 - 0.1%", mgmt: "Passive", trade: "Once daily" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {cols.map((c) => (
        <div key={c.name} className="rounded-xl border border-white/10 bg-ink-950/50 p-3">
          <div className="text-[12px] font-semibold text-white">{c.name}</div>
          <dl className="mt-2 space-y-1 text-[10px] text-white/50">
            <div className="flex justify-between gap-1">
              <dt>Fees</dt>
              <dd className="text-right text-emerald-400">{c.fee}</dd>
            </div>
            <div className="flex justify-between gap-1">
              <dt>Style</dt>
              <dd className="text-right text-white/70">{c.mgmt}</dd>
            </div>
            <div className="flex justify-between gap-1">
              <dt>Trades</dt>
              <dd className="text-right text-white/70">{c.trade}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}

/* ---- Needs vs Wants split ---- */
export function NeedsWantsMini() {
  const needs = ["Rent & utilities", "Groceries", "Health insurance", "Transit to clinicals"];
  const wants = ["Dining out", "New gaming PC", "Luxury car lease", "Daily coffee runs"];
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] p-3">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
          Needs
        </div>
        <ul className="space-y-1 text-[11px] text-white/65">
          {needs.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-gold-500/25 bg-gold-500/[0.06] p-3">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gold-400">
          Wants
        </div>
        <ul className="space-y-1 text-[11px] text-white/65">
          {wants.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
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
