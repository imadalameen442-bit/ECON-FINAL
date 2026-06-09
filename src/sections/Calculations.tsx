import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Slider } from "../components/ui/Slider";
import { NumberTicker } from "../components/ui/NumberTicker";
import { Reveal } from "../components/ui/Reveal";
import { Kicker } from "../components/ui/Editorial";
import { CompoundCurve, AmortizationFigure, BudgetWheel, HBars } from "../components/charts/Figures";
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

const ink = [0.16, 1, 0.3, 1] as const;

function CalcCard({
  fig,
  content,
  controls,
  result,
  figure,
}: {
  fig: string;
  content: CalculatorContent;
  controls: ReactNode;
  result: ReactNode;
  figure: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal>
      <article className="border border-ink/25 bg-paper-100 shadow-paper-sm">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink px-6 py-4">
          <div>
            <Kicker num={fig}>{content.tag}</Kicker>
            <h3 className="mt-1.5 font-display text-2xl font-semibold text-ink sm:text-3xl">
              {content.name}
            </h3>
          </div>
          <p className="max-w-sm font-mono text-[12px] leading-relaxed text-ink-600">
            {content.blurb}
          </p>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="space-y-5">{controls}</div>
            <div className="mt-auto">{result}</div>
          </div>
          <div className="flex items-center justify-center border border-ink/15 bg-paper p-5">
            {figure}
          </div>
        </div>

        <div className="border-t border-ink/20 px-6 pb-2">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between py-3 text-left font-mono text-[12px] uppercase tracking-[0.14em] text-ink"
          >
            <span>Method, two examples & tools</span>
            <span className="text-vermillion">{open ? "−" : "+"}</span>
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: ink }}
                className="overflow-hidden"
              >
                <div className="space-y-6 pb-6 pt-2">
                  <div>
                    <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                      The method
                    </div>
                    <p className="text-pretty text-[14px] leading-relaxed text-ink-800">
                      {content.howTo}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {content.examples.map((ex) => (
                      <div key={ex.title} className="border-l-2 border-ink/30 pl-4">
                        <div className="mb-1 font-mono text-[12px] font-bold uppercase tracking-wide text-vermillion">
                          {ex.title}
                        </div>
                        <p className="text-[13px] leading-relaxed text-ink-700">{ex.body}</p>
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
                        title={t.note}
                        className="inline-flex items-center gap-1.5 border border-ink/30 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink transition-colors hover:border-vermillion hover:text-vermillion"
                      >
                        {t.name} &rarr;
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </Reveal>
  );
}

function ResultStat({
  label,
  value,
  sub,
  tone = "ink",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: "ink" | "verm" | "teal";
}) {
  const color = tone === "verm" ? "text-vermillion" : tone === "teal" ? "text-teal" : "text-ink";
  return (
    <div className="border-t-2 border-ink pt-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">{label}</div>
      <div className={cn("mt-1 font-display text-[clamp(2.4rem,6vw,3.6rem)] font-semibold leading-[0.95] tnum", color)}>
        {value}
      </div>
      {sub && <div className="mt-2 font-mono text-[12px] leading-relaxed text-ink-600">{sub}</div>}
    </div>
  );
}

/* 1. Retirement */
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
      fig="Fig. 1"
      content={calculatorContent.retirement}
      controls={
        <>
          <Slider label="Start saving at age" value={startAge} min={18} max={50} onChange={setStartAge} format={(v) => `${v}`} />
          <Slider label="Retire at age" value={retireAge} min={Math.min(startAge + 1, 55)} max={75} onChange={setRetireAge} format={(v) => `${v}`} />
          <Slider label="Monthly contribution" value={monthly} min={0} max={6000} step={50} onChange={setMonthly} format={(v) => usd(v)} />
          <Slider label="Average return" value={rate} min={3} max={10} step={0.5} onChange={setRate} format={(v) => `${v}%`} />
        </>
      }
      result={
        <ResultStat
          label={`Nest egg at ${retireAge}`}
          tone="teal"
          value={<NumberTicker value={final.balance} format={(n) => usd(n)} startOnView={false} />}
          sub={<>You put in {usd(final.contributed)}. Growth adds {usd(final.growth)}.</>}
        />
      }
      figure={<CompoundCurve data={data} />}
    />
  );
}

/* 2. Rule of 72 */
function Rule72Calc() {
  const [rate, setRate] = useState(8);
  const years = ruleOf72(rate);
  const exact = exactDoublingYears(rate);
  const milestones = useMemo(() => {
    const out: { label: string; value: number; format: string }[] = [];
    let v = 10000;
    let y = 0;
    for (let i = 0; i < 5; i++) {
      out.push({ label: `Year ${Math.round(y)}`, value: v, format: usdCompact(v) });
      v *= 2;
      y += years;
    }
    return out;
  }, [years]);
  return (
    <CalcCard
      fig="Fig. 2"
      content={calculatorContent.rule72}
      controls={
        <>
          <Slider label="Annual return" value={rate} min={1} max={15} step={0.5} onChange={setRate} format={(v) => `${v}%`} />
          <div className="border border-ink/25 bg-paper p-4 text-center font-mono text-[13px] text-ink">
            72 &divide; {rate} = <span className="text-vermillion">{years.toFixed(1)} years</span>
            <div className="mt-1 text-[11px] text-ink-500">Exact math says {exact.toFixed(1)}. The shortcut holds.</div>
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
      figure={
        <div className="w-full">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ink-500">
            $10,000 doubling at {rate}%
          </div>
          <HBars rows={milestones} />
        </div>
      }
    />
  );
}

/* 3. Mortgage true cost */
function TrueCostCalc() {
  const [loan, setLoan] = useState(250000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const { schedule, monthly, totalInterest, totalPaid } = useMemo(() => {
    const a = amortizationSchedule(loan, rate, years);
    const m = mortgageMonthlyPayment(loan, rate, years);
    return { schedule: a.points, monthly: m, totalInterest: a.totalInterest, totalPaid: m * years * 12 };
  }, [loan, rate, years]);
  return (
    <CalcCard
      fig="Fig. 3"
      content={calculatorContent.truecost}
      controls={
        <>
          <Slider label="Loan amount" value={loan} min={100000} max={800000} step={10000} onChange={setLoan} format={(v) => usdCompact(v)} />
          <Slider label="Interest rate" value={rate} min={3} max={9} step={0.1} onChange={setRate} format={(v) => `${v.toFixed(1)}%`} />
          <Slider label="Loan term" value={years} min={10} max={30} step={5} onChange={setYears} format={(v) => `${v} yr`} />
        </>
      }
      result={
        <ResultStat
          label="Total interest paid"
          tone="verm"
          value={<NumberTicker value={totalInterest} format={(n) => usd(n)} startOnView={false} />}
          sub={<>{usd(monthly)}/mo. The {usd(loan)} loan really costs {usd(totalPaid)}.</>}
        />
      }
      figure={<AmortizationFigure data={schedule} />}
    />
  );
}

/* 4. Mortgage affordability */
function AffordCalc() {
  const [income, setIncome] = useState(120000);
  const [down, setDown] = useState(40000);
  const [rate, setRate] = useState(6.5);
  const [debts, setDebts] = useState(500);
  const res = useMemo(
    () => affordableHome({ grossAnnualIncome: income, annualRatePercent: rate, years: 30, downPayment: down, monthlyDebts: debts }),
    [income, down, rate, debts]
  );
  const ref = 250000;
  return (
    <CalcCard
      fig="Fig. 4"
      content={calculatorContent.afford}
      controls={
        <>
          <Slider label="Gross annual income" value={income} min={40000} max={600000} step={5000} onChange={setIncome} format={(v) => usdCompact(v)} />
          <Slider label="Down payment" value={down} min={0} max={200000} step={5000} onChange={setDown} format={(v) => usdCompact(v)} />
          <Slider label="Interest rate" value={rate} min={3} max={9} step={0.1} onChange={setRate} format={(v) => `${v.toFixed(1)}%`} />
          <Slider label="Other monthly debts" value={debts} min={0} max={4000} step={100} onChange={setDebts} format={(v) => usd(v)} />
        </>
      }
      result={
        <ResultStat
          label="Home you can afford"
          value={<NumberTicker value={res.maxHomePrice} format={(n) => usd(n)} startOnView={false} />}
          sub={<>Housing budget {usd(res.monthlyHousingBudget)}/mo. Syracuse median is about {usd(ref)}.</>}
        />
      }
      figure={
        <div className="w-full">
          <HBars
            rows={[
              { label: "You can afford", value: res.maxHomePrice, color: "teal" },
              { label: "Syracuse median", value: ref, color: "ink" },
            ]}
            max={Math.max(res.maxHomePrice, ref) * 1.05}
          />
          <p className="mt-4 border-t border-ink/15 pt-3 font-mono text-[11px] leading-relaxed text-ink-600">
            The bank may approve more. The wise move is buying under the line so life keeps
            room to breathe.
          </p>
        </div>
      }
    />
  );
}

/* 5. Budget */
function BudgetCalc() {
  const [net, setNet] = useState(6000);
  const split = budget503020(net);
  return (
    <CalcCard
      fig="Fig. 5"
      content={calculatorContent.budget}
      controls={
        <>
          <Slider label="Monthly take-home pay" value={net} min={1500} max={20000} step={100} onChange={setNet} format={(v) => usd(v)} />
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { l: "Needs 50%", v: split.needs },
              { l: "Wants 30%", v: split.wants },
              { l: "Save 20%", v: split.savings },
            ].map((b) => (
              <div key={b.l} className="border border-ink/25 bg-paper p-2 text-center">
                <div className="font-mono text-[9px] uppercase tracking-wider text-ink-500">{b.l}</div>
                <div className="font-mono text-[12px] text-ink">{usd(b.v)}</div>
              </div>
            ))}
          </div>
        </>
      }
      result={
        <ResultStat
          label="Toward savings & debt"
          tone="teal"
          value={<NumberTicker value={split.savings} format={(n) => usd(n)} startOnView={false} />}
          sub={<>Every month, before lifestyle creep gets a vote.</>}
        />
      }
      figure={<BudgetWheel needs={split.needs} wants={split.wants} savings={split.savings} />}
    />
  );
}

/* 6. Net worth */
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
  return (
    <CalcCard
      fig="Fig. 6"
      content={calculatorContent.networth}
      controls={
        <>
          <Slider label="Cash & savings" value={cash} min={0} max={100000} step={1000} onChange={setCash} format={(v) => usdCompact(v)} />
          <Slider label="Investments" value={investments} min={0} max={500000} step={5000} onChange={setInvestments} format={(v) => usdCompact(v)} />
          <Slider label="Car & property" value={property} min={0} max={500000} step={5000} onChange={setProperty} format={(v) => usdCompact(v)} />
          <Slider label="Student loans" value={loans} min={0} max={400000} step={5000} onChange={setLoans} format={(v) => usdCompact(v)} />
          <Slider label="Credit cards" value={cards} min={0} max={30000} step={500} onChange={setCards} format={(v) => usdCompact(v)} />
          <Slider label="Car loan" value={carLoan} min={0} max={80000} step={1000} onChange={setCarLoan} format={(v) => usdCompact(v)} />
        </>
      }
      result={
        <ResultStat
          label="Net worth"
          tone={net >= 0 ? "teal" : "verm"}
          value={
            <>
              {net < 0 && "−"}
              <NumberTicker value={Math.abs(net)} format={(n) => usd(n)} startOnView={false} />
            </>
          }
          sub={<>{usd(assets)} owned, {usd(liabilities)} owed. {net < 0 ? "Negative is normal early on." : "Solidly in the green."}</>}
        />
      }
      figure={
        <div className="w-full">
          <HBars
            rows={[
              { label: "Assets (own)", value: assets, color: "teal" },
              { label: "Liabilities (owe)", value: liabilities, color: "verm" },
            ]}
            max={Math.max(assets, liabilities, 1)}
          />
          <div className="mt-4 border-t-2 border-ink pt-3 text-center">
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500">The difference</div>
            <div className={cn("font-display text-2xl font-semibold", net >= 0 ? "text-teal" : "text-vermillion")}>
              {net < 0 ? "−" : ""}{usd(Math.abs(net))}
            </div>
          </div>
        </div>
      }
    />
  );
}

export function Calculations() {
  return (
    <Section
      id="calculations"
      feature="Topic 4"
      kicker="The Math"
      title="Six calculators that actually run"
      emphasize={["actually"]}
      lede="Not screenshots. Drag the sliders and every number and figure moves with you. Each one opens to show how to do it by hand, two worked examples, and the tools that help."
    >
      <div className="flex flex-col gap-8">
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
