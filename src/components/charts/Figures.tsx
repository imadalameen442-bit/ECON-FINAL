import type { ProjectionPoint, AmortYearPoint } from "../../lib/finance";
import { usdCompact } from "../../lib/utils";

/* Shared print-style hatch + ink palette */
const INK = "#17130E";
const VERM = "#E0341E";
const TEAL = "#1F6F5C";

function Defs() {
  return (
    <defs>
      <pattern id="hatchTeal" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="6" height="6" fill="none" />
        <line x1="0" y1="0" x2="0" y2="6" stroke={TEAL} strokeWidth="1.2" opacity="0.55" />
      </pattern>
      <pattern id="hatchVerm" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke={VERM} strokeWidth="1" opacity="0.5" />
      </pattern>
    </defs>
  );
}

function linePath(pts: [number, number][]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
}

/* ------- Retirement: stacked contributions + growth, ink balance line ------- */
export function CompoundCurve({ data }: { data: ProjectionPoint[] }) {
  const W = 380;
  const H = 230;
  const padL = 6;
  const padR = 6;
  const padT = 22;
  const padB = 26;
  const ages = data.map((d) => d.age);
  const minAge = ages[0];
  const maxAge = ages[ages.length - 1];
  const maxBal = Math.max(...data.map((d) => d.balance), 1);

  const xOf = (age: number) => padL + ((age - minAge) / Math.max(1, maxAge - minAge)) * (W - padL - padR);
  const yOf = (v: number) => H - padB - (v / maxBal) * (H - padT - padB);

  const balPts = data.map((d) => [xOf(d.age), yOf(d.balance)] as [number, number]);
  const conPts = data.map((d) => [xOf(d.age), yOf(d.contributed)] as [number, number]);
  const baseY = yOf(0);

  const growthArea =
    linePath(conPts) +
    " " +
    balPts
      .slice()
      .reverse()
      .map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`)
      .join(" ") +
    " Z";
  const contribArea =
    linePath(conPts) + ` L${xOf(maxAge)},${baseY} L${xOf(minAge)},${baseY} Z`;

  const last = data[data.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Compound growth over time">
      <Defs />
      {/* baseline */}
      <line x1={padL} y1={baseY} x2={W - padR} y2={baseY} stroke={INK} strokeWidth="1" />
      {/* contributions */}
      <path d={contribArea} fill={TEAL} opacity="0.12" />
      <path d={linePath(conPts)} fill="none" stroke={TEAL} strokeWidth="1.4" strokeDasharray="4 3" />
      {/* growth */}
      <path d={growthArea} fill="url(#hatchVerm)" />
      {/* balance line */}
      <path d={linePath(balPts)} fill="none" stroke={INK} strokeWidth="2.2" />
      {/* final marker */}
      <circle cx={xOf(maxAge)} cy={yOf(last.balance)} r="3.2" fill={INK} />
      <line x1={xOf(maxAge)} y1={yOf(last.balance)} x2={xOf(maxAge)} y2={padT - 10} stroke={INK} strokeWidth="0.6" strokeDasharray="2 2" />
      <text x={xOf(maxAge)} y={padT - 13} textAnchor="end" fontSize="13" fontFamily="Fraunces, serif" fontWeight="600" fill={INK}>
        {usdCompact(last.balance)}
      </text>
      {/* axis labels */}
      <text x={padL} y={H - 8} fontSize="9" fontFamily="JetBrains Mono, monospace" fill={INK} opacity="0.6">
        age {minAge}
      </text>
      <text x={W - padR} y={H - 8} textAnchor="end" fontSize="9" fontFamily="JetBrains Mono, monospace" fill={INK} opacity="0.6">
        age {maxAge}
      </text>
    </svg>
  );
}

/* ------- Mortgage amortization: principal vs interest stacked ------- */
export function AmortizationFigure({ data }: { data: AmortYearPoint[] }) {
  const W = 380;
  const H = 230;
  const padL = 6;
  const padR = 6;
  const padT = 22;
  const padB = 26;
  const maxYear = data.length;
  const total = Math.max(
    ...data.map((d) => d.cumulativePrincipal + d.cumulativeInterest),
    1
  );
  const xOf = (yr: number) => padL + ((yr - 1) / Math.max(1, maxYear - 1)) * (W - padL - padR);
  const yOf = (v: number) => H - padB - (v / total) * (H - padT - padB);
  const baseY = yOf(0);

  const princPts = data.map((d) => [xOf(d.year), yOf(d.cumulativePrincipal)] as [number, number]);
  const totalPts = data.map((d) => [xOf(d.year), yOf(d.cumulativePrincipal + d.cumulativeInterest)] as [number, number]);

  const princArea = linePath(princPts) + ` L${xOf(maxYear)},${baseY} L${xOf(1)},${baseY} Z`;
  const interestArea =
    linePath(princPts) +
    " " +
    totalPts.slice().reverse().map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") +
    " Z";

  const last = data[data.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Mortgage principal versus interest">
      <Defs />
      <line x1={padL} y1={baseY} x2={W - padR} y2={baseY} stroke={INK} strokeWidth="1" />
      <path d={princArea} fill={TEAL} opacity="0.14" />
      <path d={interestArea} fill="url(#hatchVerm)" />
      <path d={linePath(totalPts)} fill="none" stroke={INK} strokeWidth="2" />
      <path d={linePath(princPts)} fill="none" stroke={TEAL} strokeWidth="1.4" />
      {/* labels */}
      <text x={padL + 4} y={baseY - 6} fontSize="9" fontFamily="JetBrains Mono, monospace" fill={TEAL}>
        principal
      </text>
      <text x={W - padR - 4} y={padT + 4} textAnchor="end" fontSize="9" fontFamily="JetBrains Mono, monospace" fill={VERM}>
        + interest
      </text>
      <text x={W - padR} y={H - 8} textAnchor="end" fontSize="9" fontFamily="JetBrains Mono, monospace" fill={INK} opacity="0.6">
        {maxYear} yrs · {usdCompact(last.cumulativePrincipal + last.cumulativeInterest)} paid
      </text>
    </svg>
  );
}

/* ------- Budget: 50/30/20 ring ------- */
export function BudgetWheel({
  needs,
  wants,
  savings,
}: {
  needs: number;
  wants: number;
  savings: number;
}) {
  const total = needs + wants + savings || 1;
  const segs = [
    { v: needs, color: INK, label: "Needs" },
    { v: wants, color: VERM, label: "Wants" },
    { v: savings, color: TEAL, label: "Savings" },
  ];
  const R = 64;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <svg viewBox="0 0 220 180" className="w-full">
      <g transform="translate(90,90) rotate(-90)">
        {segs.map((s) => {
          const frac = s.v / total;
          const dash = frac * C;
          const el = (
            <circle
              key={s.label}
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="22"
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return el;
        })}
      </g>
      {/* legend */}
      {segs.map((s, i) => (
        <g key={s.label} transform={`translate(170, ${44 + i * 30})`}>
          <rect width="12" height="12" y="-9" fill={s.color} />
          <text x="18" y="0" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={INK}>
            {s.label}
          </text>
          <text x="18" y="12" fontSize="9" fontFamily="JetBrains Mono, monospace" fill={INK} opacity="0.6">
            {usdCompact(s.v)}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------- Generic labelled horizontal bars ------- */
export function HBars({
  rows,
  max,
}: {
  rows: { label: string; value: number; color?: string; format?: string }[];
  max?: number;
}) {
  const m = max ?? Math.max(...rows.map((r) => Math.abs(r.value)), 1);
  return (
    <div className="space-y-4">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="mb-1 flex items-baseline justify-between font-mono text-[11px]">
            <span className="uppercase tracking-wider text-ink-600">{r.label}</span>
            <span className="tabular-nums text-ink">{r.format ?? usdCompact(r.value)}</span>
          </div>
          <div className="h-3 w-full border border-ink/25 bg-paper-200">
            <div
              className="h-full"
              style={{
                width: `${Math.min(100, (Math.abs(r.value) / m) * 100)}%`,
                background:
                  r.color === "verm" ? VERM : r.color === "teal" ? TEAL : INK,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
