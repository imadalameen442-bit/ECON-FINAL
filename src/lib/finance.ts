/**
 * finance.ts
 * The single source of truth for every calculation on the site.
 * Every calculator, chart, and definition mini-viz pulls its math from here so
 * the numbers stay consistent and verifiable.
 *
 * All rates are passed as decimals (0.07 = 7%) unless a function name says otherwise.
 */

/* ------------------------------------------------------------------ */
/* Core time value of money                                            */
/* ------------------------------------------------------------------ */

/** Future value of a single lump sum left to compound. FV = PV(1+r)^n */
export function futureValue(present: number, rate: number, years: number): number {
  return present * Math.pow(1 + rate, years);
}

/** Present value needed today to reach a future goal. PV = FV / (1+r)^n */
export function presentValue(future: number, rate: number, years: number): number {
  return future / Math.pow(1 + rate, years);
}

/**
 * Future value of a recurring contribution (an annuity).
 * Assumes contributions made at the end of each period.
 * FV = PMT * [((1+r)^n - 1) / r]
 */
export function futureValueAnnuity(
  payment: number,
  ratePerPeriod: number,
  periods: number
): number {
  if (ratePerPeriod === 0) return payment * periods;
  return payment * ((Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod);
}

/** The Rule of 72: roughly how many years to double your money at a given rate. */
export function ruleOf72(annualRatePercent: number): number {
  if (annualRatePercent <= 0) return Infinity;
  return 72 / annualRatePercent;
}

/** Exact doubling time using logarithms, so we can show how close 72 really is. */
export function exactDoublingYears(annualRatePercent: number): number {
  const r = annualRatePercent / 100;
  if (r <= 0) return Infinity;
  return Math.log(2) / Math.log(1 + r);
}

/* ------------------------------------------------------------------ */
/* Retirement / investing projection                                   */
/* ------------------------------------------------------------------ */

export interface ProjectionPoint {
  age: number;
  /** Total balance at the end of this age. */
  balance: number;
  /** Cumulative dollars the person actually put in (contributions + starting amount). */
  contributed: number;
  /** Cumulative growth earned (balance - contributed). */
  growth: number;
}

export interface RetirementInput {
  currentAge: number;
  retireAge: number;
  startingBalance: number;
  /** Monthly contribution. Can be a fixed number, or a function of age for uneven careers. */
  monthlyContribution: number | ((age: number) => number);
  annualReturn: number; // decimal
}

/**
 * Projection that compounds monthly (how investing actually works) and emits
 * one point per age from currentAge to retireAge for clean charting.
 */
export function retirementProjection(input: RetirementInput): ProjectionPoint[] {
  const { currentAge, retireAge, startingBalance, monthlyContribution, annualReturn } = input;
  const points: ProjectionPoint[] = [];
  const monthlyRate = annualReturn / 12;

  let balance = startingBalance;
  let contributed = startingBalance;

  points.push({ age: currentAge, balance, contributed, growth: 0 });

  for (let age = currentAge + 1; age <= retireAge; age++) {
    const monthly =
      typeof monthlyContribution === "function"
        ? monthlyContribution(age)
        : monthlyContribution;

    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthly;
      contributed += monthly;
    }
    points.push({
      age,
      balance,
      contributed,
      growth: balance - contributed,
    });
  }

  return points;
}

/**
 * The 4% rule, in reverse: the nest egg you need to draw a target income.
 * nest egg = annual income / 0.04  (i.e. income * 25)
 */
export function nestEggForIncome(annualIncome: number, withdrawalRate = 0.04): number {
  return annualIncome / withdrawalRate;
}

/** Safe annual withdrawal from a given nest egg at a given rate. */
export function safeWithdrawal(nestEgg: number, withdrawalRate = 0.04): number {
  return nestEgg * withdrawalRate;
}

/* ------------------------------------------------------------------ */
/* Mortgages                                                           */
/* ------------------------------------------------------------------ */

/** Standard fixed-rate monthly payment (principal + interest only). */
export function mortgageMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  years: number
): number {
  const r = annualRatePercent / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

export interface AmortYearPoint {
  year: number;
  balance: number;
  principalPaidThisYear: number;
  interestPaidThisYear: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

/** Year-by-year amortization so we can chart how much really goes to interest. */
export function amortizationSchedule(
  principal: number,
  annualRatePercent: number,
  years: number
): { points: AmortYearPoint[]; totalInterest: number; monthlyPayment: number } {
  const r = annualRatePercent / 100 / 12;
  const monthly = mortgageMonthlyPayment(principal, annualRatePercent, years);
  const points: AmortYearPoint[] = [];

  let balance = principal;
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;

  for (let year = 1; year <= years; year++) {
    let interestThisYear = 0;
    let principalThisYear = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * r;
      const principalPart = Math.min(monthly - interest, balance);
      balance -= principalPart;
      interestThisYear += interest;
      principalThisYear += principalPart;
    }
    cumulativeInterest += interestThisYear;
    cumulativePrincipal += principalThisYear;
    points.push({
      year,
      balance: Math.max(balance, 0),
      principalPaidThisYear: principalThisYear,
      interestPaidThisYear: interestThisYear,
      cumulativeInterest,
      cumulativePrincipal,
    });
  }

  return {
    points,
    totalInterest: cumulativeInterest,
    monthlyPayment: monthly,
  };
}

/**
 * How much house you can afford using the classic 28% front-end rule.
 * Max monthly housing payment = 28% of gross monthly income.
 * We then strip out taxes/insurance and back into the supportable loan.
 */
export function affordableHome(opts: {
  grossAnnualIncome: number;
  annualRatePercent: number;
  years: number;
  downPayment: number;
  monthlyDebts?: number; // car loans, student loans, etc. (back-end 36% rule)
  taxInsuranceRate?: number; // annual % of home value for property tax + insurance
}): {
  maxHomePrice: number;
  maxLoan: number;
  monthlyHousingBudget: number;
  monthlyPI: number;
} {
  const {
    grossAnnualIncome,
    annualRatePercent,
    years,
    downPayment,
    monthlyDebts = 0,
    taxInsuranceRate = 0.018,
  } = opts;

  const grossMonthly = grossAnnualIncome / 12;
  // Front-end 28% and back-end 36%; use the more conservative of the two.
  const frontEnd = grossMonthly * 0.28;
  const backEnd = grossMonthly * 0.36 - monthlyDebts;
  const monthlyHousingBudget = Math.max(0, Math.min(frontEnd, backEnd));

  // Reserve part of the budget for property tax + insurance, leaving P&I.
  // monthlyTaxIns ~= homeValue * taxInsuranceRate / 12, and homeValue ~= loan + down.
  // Solve iteratively for stability.
  const r = annualRatePercent / 100 / 12;
  const n = years * 12;
  const loanFactor = r === 0 ? n : (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));

  let homePrice = downPayment + monthlyHousingBudget * loanFactor; // first guess
  for (let i = 0; i < 25; i++) {
    const monthlyTaxIns = (homePrice * taxInsuranceRate) / 12;
    const monthlyPI = Math.max(0, monthlyHousingBudget - monthlyTaxIns);
    const loan = monthlyPI * loanFactor;
    homePrice = loan + downPayment;
  }

  const monthlyTaxIns = (homePrice * taxInsuranceRate) / 12;
  const monthlyPI = Math.max(0, monthlyHousingBudget - monthlyTaxIns);
  const maxLoan = monthlyPI * loanFactor;

  return {
    maxHomePrice: maxLoan + downPayment,
    maxLoan,
    monthlyHousingBudget,
    monthlyPI,
  };
}

/* ------------------------------------------------------------------ */
/* Budgeting + net worth                                               */
/* ------------------------------------------------------------------ */

/** The 50/30/20 split on take-home (net) monthly pay. */
export function budget503020(monthlyNetIncome: number) {
  return {
    needs: monthlyNetIncome * 0.5,
    wants: monthlyNetIncome * 0.3,
    savings: monthlyNetIncome * 0.2,
  };
}

export function netWorth(assets: number, liabilities: number): number {
  return assets - liabilities;
}

/** Rough effective tax wedge to turn gross salary into take-home pay (illustrative). */
export function estimateNetFromGross(gross: number, effectiveRate = 0.25): number {
  return gross * (1 - effectiveRate);
}
