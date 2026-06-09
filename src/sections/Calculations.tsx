import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Section } from "../components/ui/Section";
import { Slider } from "../components/ui/Slider";
import { NumberTicker } from "../components/ui/NumberTicker";
import { Reveal } from "../components/ui/Reveal";
import {
  RetirementChart,
  AmortizationChart,
  BudgetDonut,
} from "../components/charts/CalcCharts";
import {
  retirementProjection,
  amortizationSchedule,
  mortgageMonthlyPayment,
  affordableHome,
  budget503020,
  netWorth,
  ruleOf72,
  exactDoublingYears,
} from "../lib/finance";
import { calculatorContent, type CalculatorContent } from "../data/calculators";
import { usd, usdCompact, cn } from "../lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Shared calculator shell                                             */
/* ------------------------------------------------------------------ */

function CalcCard({
  content,
  controls,
  result,
  visual,
}: {
  content: CalculatorContent;
  controls: ReactNode;
  result: ReactNode;
  visual: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal className="w-full">
      <div className="group relative rounded-4xl border border-white/10 bg-white/[0.035] p-1.5 shadow-float ring-1 ring-inset ring-white/5">
        <div className="rounded-[calc(2rem-0.375rem)] bg-ink-900/80 p-6 shadow-inner-hi sm:p-8">
          {/* header */}
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
                {content.tag}
              </span>
              <h3 className="mt-1.5 font-display text-2xl font-semibold text-white sm:text-3xl">
                {content.name}
              </h3>
            </div>
            <p className="max-w-sm text-pretty text-[13px] leading-relaxed text-white/45">
              {content.blurb}
            </p>
          </div>

          {/* body: controls + result | visual */}
          <div className="grid gap-7 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="space-y-5">{controls}</div>
              <div className="mt-auto">{result}</div>
            </div>
            <div className="min-h-[260px] rounded-2xl border border-white/10 bg-ink-950/40 p-4">
              {visual}
            </div>
          </div>

          {/* accordion: how to, examples, tools */}
          <div className="mt-7 border-t border-white/8 pt-4">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-[13px] font-medium text-white/70">
                How to do it by hand, two examples, and tools that help
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/50 transition-transform duration-500 ease-spring",
                  open && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 pt-5">
                    <div>
                      <h4 className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        The method
                      </h4>
                      <p className="text-pretty text-[14px] leading-relaxed text-white/70">
                        {content.howTo}
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {content.examples.map((ex) => (
                        <div
                          key={ex.title}
                          className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                        >
                          <div className="mb-1 text-[13px] font-semibold text-emerald-400">
                            {ex.title}
                          </div>
                          <p className="text-[13px] leading-relaxed text-white/65">{ex.body}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.tools.map((t) => (
                        <a
                          key={t.name}
                          href={t.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group/tool inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[12px] text-white/75 transition-colors hover:border-emerald-400/40 hover:bg-emerald-500/[0.08]"
                          title={t.note}
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-emerald-400" strokeWidth={1.6} />
                          {t.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Big highlighted result number. */
function ResultStat({
  label,
  value,
  sub,
  tone = "emerald",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: "emerald" | "gold" | "rose";
}) {
  const toneClass =
    tone === "gold" ? "text-grad-gold" : tone === "rose" ? "text-rose-400" : "text-grad-emerald";
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {label}
      </div>
      <div className={cn("mt-1 font-display text-4xl font-semibold sm:text-5xl", toneClass)}>
        {value}
      </div>
      {sub && <div className="mt-2 text-[13px] text-white/50">{sub}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Retirement                                                       */
/* ------------------------------------------------------------------ */

function RetirementCalc() {
  const [startAge, setStartAge] = useState(33);
  const [retireAge, setRetireAge] = useState(65);
  const [monthly, setMonthly] = useState(2500);
  const [rate, setRate] = useState(7);

  const data = useMemo(
    () =>
      retirementProjection({
        currentAge: startAge,
        retireAge: Math.max(retireAge, startAge + 1),
        startingBalance: 0,
        monthlyContribution: monthly,
        annualReturn: rate / 100,
      }),
    [startAge, retireAge, monthly, rate]
  );
  const final = data[data.length - 1];

  return (
    <CalcCard
      content={calculatorContent.retirement}
      controls={
        <>
          <Slider label="Start saving at age" value={startAge} min={18} max={50} onChange={setStartAge} format={(v) => `${v}`} />
          <Slider label="Retire at age" value={retireAge} min={Math.min(startAge + 1, 55)} max={75} onChange={setRetireAge} format={(v) => `${v}`} />
          <Slider label="Monthly contribution" value={monthly} min={0} max={6000} step={50} onChange={setMonthly} format={(v) => usd(v)} />
          <Slider label="Average return" value={rate} min={3} max={10} step={0.5} onChange={setRate} format={(v) => `${v}%`} accent="gold" />
        </>
      }
      result={
        <ResultStat
          label={`Nest egg at ${retireAge}`}
          value={<NumberTicker value={final.balance} format={(n) => usd(n)} startOnView={false} />}
          sub={
            <>
              You contribute <span className="text-gold-400">{usd(final.contributed)}</span>, growth adds{" "}
              <span className="text-emerald-400">{usd(final.growth)}</span>.
            </>
          }
        />
      }
      visual={<RetirementChart data={data} />}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 2. Net Worth                                                        */
/* ------------------------------------------------------------------ */

function NetWorthCalc() {
  const [cash, setCash] = useState(15000);
  const [investments, setInvestments] = useState(25000);
  const [property, setProperty] = useState(20000);
  const [loans, setLoans] = useState(250000);
  const [cards, setCards] = useState(4000);
  const [carLoan, setCarLoan] = useState(12000);

  const assets = cash + investments + property;
  const liabilities = loans + cards + carLoan;
  const net = netWorth(assets, liabilities);
  const max = Math.max(assets, liabilities, 1);

  return (
    <CalcCard
      content={calculatorContent.networth}
      controls={
        <>
          <Slider label="Cash & savings" value={cash} min={0} max={100000} step={1000} onChange={setCash} format={(v) => usdCompact(v)} />
          <Slider label="Investments" value={investments} min={0} max={500000} step={5000} onChange={setInvestments} format={(v) => usdCompact(v)} />
          <Slider label="Car & property" value={property} min={0} max={500000} step={5000} onChange={setProperty} format={(v) => usdCompact(v)} />
          <Slider label="Student loans" value={loans} min={0} max={400000} step={5000} onChange={setLoans} format={(v) => usdCompact(v)} accent="gold" />
          <Slider label="Credit cards" value={cards} min={0} max={30000} step={500} onChange={setCards} format={(v) => usdCompact(v)} accent="gold" />
          <Slider label="Car loan" value={carLoan} min={0} max={80000} step={1000} onChange={setCarLoan} format={(v) => usdCompact(v)} accent="gold" />
        </>
      }
      result={
        <ResultStat
          label="Net worth"
          tone={net >= 0 ? "emerald" : "rose"}
          value={
            <>
              {net < 0 && "-"}
              <NumberTicker value={Math.abs(net)} format={(n) => usd(n)} startOnView={false} />
            </>
          }
          sub={
            <>
              {usd(assets)} owned, {usd(liabilities)} owed.{" "}
              {net < 0 ? "Negative is normal early on." : "Solidly in the green."}
            </>
          }
        />
      }
      visual={
        <div className="flex h-full flex-col justify-center gap-5">
          <BarRow label="Assets (own)" value={assets} max={max} color="#2ee6a8" />
          <BarRow label="Liabilities (owe)" value={liabilities} max={max} color="#fb7185" />
          <div className="rounded-xl border border-white/10 bg-ink-950/50 p-4 text-center">
            <div className="text-[11px] uppercase tracking-wider text-white/40">The difference is your net worth</div>
            <div className={cn("mt-1 font-display text-2xl font-semibold", net >= 0 ? "text-emerald-400" : "text-rose-400")}>
              {net < 0 ? "-" : ""}{usd(Math.abs(net))}
            </div>
          </div>
        </div>
      }
    />
  );
}

function BarRow({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-[12px]">
        <span className="text-white/55">{label}</span>
        <span className="font-mono text-white">{usd(value)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-ink-950/70">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={false}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Mortgage affordability                                           */
/* ------------------------------------------------------------------ */

function AffordCalc() {
  const [income, setIncome] = useState(120000);
  const [down, setDown] = useState(40000);
  const [rate, setRate] = useState(6.5);
  const [debts, setDebts] = useState(500);

  const res = useMemo(
    () =>
      affordableHome({
        grossAnnualIncome: income,
        annualRatePercent: rate,
        years: 30,
        downPayment: down,
        monthlyDebts: debts,
      }),
    [income, down, rate, debts]
  );

  const ref = 250000; // Syracuse-area median
  const scaleMax = Math.max(res.maxHomePrice, ref) * 1.1;

  return (
    <CalcCard
      content={calculatorContent.afford}
      controls={
        <>
          <Slider label="Gross annual income" value={income} min={40000} max={600000} step={5000} onChange={setIncome} format={(v) => usdCompact(v)} />
          <Slider label="Down payment" value={down} min={0} max={200000} step={5000} onChange={setDown} format={(v) => usdCompact(v)} />
          <Slider label="Interest rate" value={rate} min={3} max={9} step={0.1} onChange={setRate} format={(v) => `${v.toFixed(1)}%`} accent="gold" />
          <Slider label="Other monthly debts" value={debts} min={0} max={4000} step={100} onChange={setDebts} format={(v) => usd(v)} accent="gold" />
        </>
      }
      result={
        <ResultStat
          label="Home you can afford"
          value={<NumberTicker value={res.maxHomePrice} format={(n) => usd(n)} startOnView={false} />}
          sub={
            <>
              Housing budget <span className="text-emerald-400">{usd(res.monthlyHousingBudget)}</span>/mo.{" "}
              Syracuse median is about {usd(ref)}.
            </>
          }
        />
      }
      visual={
        <div className="flex h-full flex-col justify-center gap-6">
          <div className="relative">
            <div className="mb-2 flex justify-between text-[12px]">
              <span className="text-white/55">What you can afford</span>
              <span className="font-mono text-emerald-400">{usd(res.maxHomePrice)}</span>
            </div>
            <div className="relative h-4 overflow-hidden rounded-full bg-ink-950/70">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-glow"
                animate={{ width: `${Math.min((res.maxHomePrice / scaleMax) * 100, 100)}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
              {/* Syracuse marker */}
              <div
                className="absolute top-0 h-full w-0.5 bg-gold-400"
                style={{ left: `${(ref / scaleMax) * 100}%` }}
              />
            </div>
            <div
              className="absolute mt-1 -translate-x-1/2 text-[10px] text-gold-400"
              style={{ left: `${(ref / scaleMax) * 100}%` }}
            >
              Syracuse {usdCompact(ref)}
            </div>
          </div>
          <p className="rounded-xl border border-white/10 bg-ink-950/50 p-4 text-[13px] leading-relaxed text-white/55">
            The bank may approve more than this. The wise move is buying under the line so
            life still has room to breathe.
          </p>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* 4. Mortgage true cost                                               */
/* ------------------------------------------------------------------ */

function TrueCostCalc() {
  const [loan, setLoan] = useState(250000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const { schedule, monthly, totalInterest, totalPaid } = useMemo(() => {
    const a = amortizationSchedule(loan, rate, years);
    const m = mortgageMonthlyPayment(loan, rate, years);
    return {
      schedule: a.points,
      monthly: m,
      totalInterest: a.totalInterest,
      totalPaid: m * years * 12,
    };
  }, [loan, rate, years]);

  return (
    <CalcCard
      content={calculatorContent.truecost}
      controls={
        <>
          <Slider label="Loan amount" value={loan} min={100000} max={800000} step={10000} onChange={setLoan} format={(v) => usdCompact(v)} />
          <Slider label="Interest rate" value={rate} min={3} max={9} step={0.1} onChange={setRate} format={(v) => `${v.toFixed(1)}%`} accent="gold" />
          <Slider label="Loan term (years)" value={years} min={10} max={30} step={5} onChange={setYears} format={(v) => `${v} yr`} />
        </>
      }
      result={
        <div className="space-y-3">
          <ResultStat
            label="Total interest paid"
            tone="rose"
            value={<NumberTicker value={totalInterest} format={(n) => usd(n)} startOnView={false} />}
            sub={
              <>
                {usd(monthly)}/mo. The {usd(loan)} loan really costs{" "}
                <span className="text-white">{usd(totalPaid)}</span>.
              </>
            }
          />
        </div>
      }
      visual={<AmortizationChart data={schedule} />}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 5. Budget 50/30/20                                                  */
/* ------------------------------------------------------------------ */

function BudgetCalc() {
  const [net, setNet] = useState(6000);
  const split = budget503020(net);

  return (
    <CalcCard
      content={calculatorContent.budget}
      controls={
        <>
          <Slider label="Monthly take home pay" value={net} min={1500} max={20000} step={100} onChange={setNet} format={(v) => usd(v)} />
          <div className="grid grid-cols-3 gap-2 pt-2">
            <BudgetPill label="Needs 50%" value={split.needs} color="#2ee6a8" />
            <BudgetPill label="Wants 30%" value={split.wants} color="#f5c45e" />
            <BudgetPill label="Savings 20%" value={split.savings} color="#5bb0f0" />
          </div>
        </>
      }
      result={
        <ResultStat
          label="Toward savings & debt"
          tone="emerald"
          value={<NumberTicker value={split.savings} format={(n) => usd(n)} startOnView={false} />}
          sub={<>Every month, before lifestyle creep gets a vote.</>}
        />
      }
      visual={
        <div className="flex h-full items-center justify-center">
          <div className="relative h-full max-h-[230px] w-full">
            <BudgetDonut needs={split.needs} wants={split.wants} savings={split.savings} />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[11px] uppercase tracking-wider text-white/40">Monthly</span>
              <span className="font-display text-2xl font-semibold text-white">{usd(net)}</span>
            </div>
          </div>
        </div>
      }
    />
  );
}

function BudgetPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-ink-950/50 p-3 text-center">
      <span className="mx-auto mb-1 block h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
      <div className="mt-0.5 font-mono text-[13px] text-white">{usd(value)}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Rule of 72                                                       */
/* ------------------------------------------------------------------ */

function Rule72Calc() {
  const [rate, setRate] = useState(8);
  const years = ruleOf72(rate);
  const exact = exactDoublingYears(rate);

  // doubling milestones from $10k
  const milestones = useMemo(() => {
    const out: { year: number; value: number }[] = [];
    let v = 10000;
    let y = 0;
    for (let i = 0; i < 5; i++) {
      out.push({ year: Math.round(y), value: v });
      v *= 2;
      y += years;
    }
    return out;
  }, [years]);

  return (
    <CalcCard
      content={calculatorContent.rule72}
      controls={
        <>
          <Slider label="Annual return" value={rate} min={1} max={15} step={0.5} onChange={setRate} format={(v) => `${v}%`} accent="gold" />
          <div className="rounded-2xl border border-white/10 bg-ink-950/40 p-4 text-center">
            <div className="font-mono text-[13px] text-white/50">
              72 &divide; {rate} ={" "}
              <span className="text-emerald-400">{years.toFixed(1)} years</span>
            </div>
            <div className="mt-1 text-[11px] text-white/35">
              Exact math says {exact.toFixed(1)} years. The shortcut is close.
            </div>
          </div>
        </>
      }
      result={
        <ResultStat
          label="Years to double"
          value={<NumberTicker value={years} format={(n) => n.toFixed(1)} startOnView={false} />}
          sub={<>Every doubling at this rate takes about this long.</>}
        />
      }
      visual={
        <div className="flex h-full flex-col justify-center gap-2">
          <div className="mb-1 text-[11px] uppercase tracking-wider text-white/40">
            $10,000 left alone, doubling at {rate}%
          </div>
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <span className="w-16 shrink-0 font-mono text-[11px] text-white/40">yr {m.year}</span>
              <div className="h-7 flex-1 overflow-hidden rounded-lg bg-ink-950/60">
                <div
                  className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-emerald-600/40 to-emerald-glow/60 pr-2"
                  style={{ width: `${((i + 1) / milestones.length) * 100}%` }}
                >
                  <span className="font-mono text-[11px] font-medium text-white">{usdCompact(m.value)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ */

export function Calculations() {
  return (
    <Section
      id="calculations"
      index="Topic 4"
      eyebrow="The Math"
      accent="emerald"
      title={
        <>
          Six calculators that <span className="text-grad-emerald italic font-serif font-normal">actually run</span>
        </>
      }
      lede="Not screenshots. Drag the sliders and the numbers and charts move with you. Each one opens to show how to do it by hand, two worked examples, and tools that do the heavy lifting."
    >
      <div className="flex flex-col gap-6">
        <RetirementCalc />
        <Rule72Calc />
        <TrueCostCalc />
        <AffordCalc />
        <BudgetCalc />
        <NetWorthCalc />
      </div>
    </Section>
  );
}
