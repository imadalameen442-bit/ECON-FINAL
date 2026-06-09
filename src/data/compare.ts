/**
 * Topic 7 - Calculators.
 * Compare two versions (online and mobile app) of a calculator type, head to head.
 * I picked the two types most relevant to me: a mortgage calculator and an
 * investment / time value of money calculator. Bank of America shows up because
 * it is the bank I actually use.
 */

export type Mark = "yes" | "no" | "partial";

export interface CompareTool {
  name: string;
  kind: string; // "Online" | "Mobile app" | "Online + app"
  url: string;
  tagline: string;
}

export interface FeatureRow {
  feature: string;
  a: Mark;
  b: Mark;
}

export interface Comparison {
  id: string;
  type: string;
  intro: string;
  toolA: CompareTool;
  toolB: CompareTool;
  features: FeatureRow[];
  verdict: string;
  winner: "a" | "b" | "tie";
}

export const comparisons: Comparison[] = [
  {
    id: "mortgage",
    type: "Mortgage calculator",
    intro:
      "Both turn a loan into a monthly payment, but how much they show beyond that number is where they split.",
    toolA: {
      name: "Bank of America",
      kind: "Online",
      url: "https://www.bankofamerica.com/mortgage/mortgage-calculator/",
      tagline: "My own bank's calculator, built to flow into a real preapproval.",
    },
    toolB: {
      name: "NerdWallet",
      kind: "Online + app",
      url: "https://www.nerdwallet.com/mortgages/mortgage-calculator",
      tagline: "An independent tool that leans into detail and comparison.",
    },
    features: [
      { feature: "Monthly payment estimate", a: "yes", b: "yes" },
      { feature: "Full amortization schedule", a: "partial", b: "yes" },
      { feature: "Includes taxes, insurance, PMI", a: "yes", b: "yes" },
      { feature: "Affordability mode", a: "partial", b: "yes" },
      { feature: "Works without an account", a: "yes", b: "yes" },
      { feature: "Ties into real preapproval", a: "yes", b: "no" },
      { feature: "Clean and ad free", a: "yes", b: "partial" },
    ],
    verdict:
      "For learning, NerdWallet wins. The amortization detail and affordability mode show you the whole picture, not just one number. Bank of America is the better stop once I am actually ready to buy, because the math flows straight into a preapproval with the bank I already use. So I would learn on NerdWallet and transact on Bank of America.",
    winner: "b",
  },
  {
    id: "investment",
    type: "Investment / TVM calculator",
    intro:
      "These project growth over time. One is a no-nonsense government tool, the other is built for quick comparisons.",
    toolA: {
      name: "Investor.gov",
      kind: "Online",
      url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
      tagline: "Run by the SEC, no ads, no upsell, just honest compounding.",
    },
    toolB: {
      name: "Bankrate Investment Calc",
      kind: "Online + app",
      url: "https://www.bankrate.com/investing/investment-calculator/",
      tagline: "More inputs and side by side scenarios, with some ads.",
    },
    features: [
      { feature: "Compound interest over time", a: "yes", b: "yes" },
      { feature: "Add monthly contributions", a: "yes", b: "yes" },
      { feature: "Adjust compounding frequency", a: "yes", b: "yes" },
      { feature: "Factors in inflation", a: "no", b: "yes" },
      { feature: "Visual growth chart", a: "partial", b: "yes" },
      { feature: "Totally ad free and unbiased", a: "yes", b: "no" },
      { feature: "Trustworthy source", a: "yes", b: "yes" },
    ],
    verdict:
      "Investor.gov wins on trust. It is run by the people who regulate the market, so there is no product being sold to me between the lines. Bankrate has nicer charts and an inflation toggle, which genuinely matter over a 40 year horizon, but the ads and the steady push toward financial products cost it the edge. I would do my serious projections on Investor.gov and use Bankrate for a quick second look.",
    winner: "a",
  },
];
