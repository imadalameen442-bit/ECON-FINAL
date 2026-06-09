import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProjectionPoint, AmortYearPoint } from "../../lib/finance";
import { usd, usdCompact } from "../../lib/utils";

const axisStyle = { fill: "rgba(255,255,255,0.4)", fontSize: 11 };

function ChartTooltip({
  active,
  payload,
  label,
  labelPrefix = "",
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string | number;
  labelPrefix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/12 bg-ink-900/95 px-3 py-2 text-xs shadow-float backdrop-blur">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
        {labelPrefix}
        {label}
      </div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/60">{p.name}</span>
          <span className="ml-auto font-mono text-white">{usd(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- Retirement: balance area with a contributions line underneath ---- */
export function RetirementChart({ data }: { data: ProjectionPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
        <defs>
          <linearGradient id="balFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2ee6a8" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#2ee6a8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="age" tick={axisStyle} tickLine={false} axisLine={false} minTickGap={24} />
        <YAxis
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          width={48}
          tickFormatter={(v) => usdCompact(v)}
        />
        <Tooltip content={<ChartTooltip labelPrefix="Age " />} />
        <Area
          type="monotone"
          dataKey="balance"
          name="Balance"
          stroke="#34f5c5"
          strokeWidth={2}
          fill="url(#balFill)"
        />
        <Line
          type="monotone"
          dataKey="contributed"
          name="You put in"
          stroke="#f5c45e"
          strokeWidth={1.6}
          strokeDasharray="4 4"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ---- Amortization: cumulative principal vs interest stacked ---- */
export function AmortizationChart({ data }: { data: AmortYearPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
        <defs>
          <linearGradient id="princFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2ee6a8" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#2ee6a8" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="intFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb7185" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#fb7185" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={false} minTickGap={20} />
        <YAxis
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          width={48}
          tickFormatter={(v) => usdCompact(v)}
        />
        <Tooltip content={<ChartTooltip labelPrefix="Year " />} />
        <Area
          type="monotone"
          dataKey="cumulativePrincipal"
          name="Principal paid"
          stackId="1"
          stroke="#34f5c5"
          strokeWidth={1.6}
          fill="url(#princFill)"
        />
        <Area
          type="monotone"
          dataKey="cumulativeInterest"
          name="Interest paid"
          stackId="1"
          stroke="#fb7185"
          strokeWidth={1.6}
          fill="url(#intFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ---- Budget donut ---- */
export function BudgetDonut({
  needs,
  wants,
  savings,
}: {
  needs: number;
  wants: number;
  savings: number;
}) {
  const data = [
    { name: "Needs", value: needs, color: "#2ee6a8" },
    { name: "Wants", value: wants, color: "#f5c45e" },
    { name: "Savings", value: savings, color: "#5bb0f0" },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius="62%"
          outerRadius="92%"
          paddingAngle={3}
          stroke="none"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
