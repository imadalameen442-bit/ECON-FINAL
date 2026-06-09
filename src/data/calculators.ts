/**
 * Topic 4 - Calculations.
 * Static teaching content for each live calculator: how to do it by hand,
 * two worked examples, and at least two real tools or spreadsheets that help.
 * The interactive math itself lives in src/lib/finance.ts.
 */

export interface ToolLink {
  name: string;
  url: string;
  note: string;
}

export interface WorkedExample {
  title: string;
  body: string;
}

export interface CalculatorContent {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  howTo: string;
  examples: WorkedExample[];
  tools: ToolLink[];
}

export const calculatorContent: Record<string, CalculatorContent> = {
  retirement: {
    id: "retirement",
    name: "Retirement",
    tag: "When can you stop?",
    blurb:
      "Project how a monthly contribution grows by your target retirement age, and watch what starting early really does.",
    howTo:
      "Take your starting balance and, for every month, multiply by (1 + monthly return) and then add your contribution. Repeat until retirement age. The monthly return is your annual rate divided by 12. Doing this by hand is brutal, which is exactly why we let a spreadsheet's future value function or a calculator do the looping.",
    examples: [
      {
        title: "The early starter",
        body: "Someone saves $500 a month from age 22 to 65 at a 7% average return. They contribute about $258,000 of their own money, but it grows to roughly $1,638,000. Time did most of the heavy lifting.",
      },
      {
        title: "My late start",
        body: "I likely cannot save real money until around 33, after med school and into attending pay. Even at $2,500 a month to 65 at 7%, I reach about $3,571,000. If I had started that same $2,500 at 22, it would be about $8,190,000. Starting 11 years earlier more than doubles the result.",
      },
    ],
    tools: [
      {
        name: "NerdWallet Retirement Calculator",
        url: "https://www.nerdwallet.com/calculator/retirement-calculator",
        note: "Clean inputs, factors in Social Security and inflation.",
      },
      {
        name: "Investor.gov Compound Interest Calculator",
        url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
        note: "Run by the SEC, great for seeing contributions grow.",
      },
    ],
  },

  networth: {
    id: "networth",
    name: "Net Worth",
    tag: "What you actually have",
    blurb:
      "Add up everything you own, subtract everything you owe. One honest number.",
    howTo:
      "List every asset with a dollar value: cash, checking and savings, investments, retirement accounts, the resale value of your car, and any property. Add them up. Then list every liability: student loans, credit cards, car loans, the mortgage. Add those. Net worth is assets minus liabilities. It can absolutely be negative, especially early on.",
    examples: [
      {
        title: "Negative on paper",
        body: "Right out of residency I might have $40,000 in savings and a car, but $250,000 in student loans. My net worth is negative $210,000. That is normal for a new doctor and not a reason to panic.",
      },
      {
        title: "The flip",
        body: "Five years into attending pay, suppose I have $520,000 in assets and have paid loans down to $120,000. Net worth is now positive $400,000. The number itself tells the whole story of the climb.",
      },
    ],
    tools: [
      {
        name: "NerdWallet Net Worth Calculator",
        url: "https://www.nerdwallet.com/article/finance/net-worth-calculator",
        note: "Quick browser tool to total assets and debts.",
      },
      {
        name: "Vertex42 Net Worth Spreadsheet",
        url: "https://www.vertex42.com/ExcelTemplates/net-worth-calculator.html",
        note: "Free Excel and Google Sheets template you can track over years.",
      },
    ],
  },

  afford: {
    id: "afford",
    name: "Mortgage: What Can I Afford?",
    tag: "How much house?",
    blurb:
      "Turn an income into a realistic home price using the classic 28% rule.",
    howTo:
      "Lenders usually want your total housing payment to stay under 28% of your gross monthly income, and all your debt under 36%. Take your gross monthly pay, multiply by 0.28, and that is your monthly housing budget. Carve out property tax and insurance, then work backward from the remaining payment to the loan it supports, and add your down payment to get the home price.",
    examples: [
      {
        title: "A resident in Syracuse",
        body: "On a $60,000 residency salary, 28% of gross monthly pay is about $1,400 a month for housing. After taxes and insurance, that supports a modest loan. In the Syracuse area, where homes hover around $250,000, a resident likely rents and waits.",
      },
      {
        title: "An attending surgeon",
        body: "On a $300,000 salary, 28% is about $7,000 a month. That comfortably covers a $250,000 Syracuse home with room to spare, which is why the smart move is buying less house than the bank will approve.",
      },
    ],
    tools: [
      {
        name: "Bankrate: How Much House Can I Afford",
        url: "https://www.bankrate.com/mortgages/new-house-calculator/",
        note: "Adjusts for debts, down payment, and taxes.",
      },
      {
        name: "Zillow Affordability Calculator",
        url: "https://www.zillow.com/mortgage-calculator/house-affordability/",
        note: "Ties affordability to real local listings.",
      },
    ],
  },

  truecost: {
    id: "truecost",
    name: "Mortgage: What It Really Costs",
    tag: "The price after interest",
    blurb:
      "See how much a house actually costs once 30 years of interest is added on.",
    howTo:
      "The monthly payment formula is P times r times (1+r)^n, divided by ((1+r)^n minus 1), where r is the monthly rate and n is the number of months. Multiply that monthly payment by the number of months to get everything you pay, then subtract the original loan to find total interest. An amortization schedule shows how early payments are almost all interest.",
    examples: [
      {
        title: "The 30 year truth",
        body: "A $250,000 loan at 6.5% over 30 years has a payment near $1,580 a month. Over 360 payments that is about $568,800, which means roughly $318,800 is pure interest. The house more than doubles in true cost.",
      },
      {
        title: "The 15 year shortcut",
        body: "Same loan at 6.5% over 15 years jumps to about $2,178 a month, but total interest drops to roughly $142,000. Paying about $600 more a month saves around $177,000 in interest.",
      },
    ],
    tools: [
      {
        name: "Bankrate Mortgage Calculator",
        url: "https://www.bankrate.com/mortgages/mortgage-calculator/",
        note: "Full amortization table you can expand year by year.",
      },
      {
        name: "Bank of America Mortgage Calculator",
        url: "https://www.bankofamerica.com/mortgage/mortgage-calculator/",
        note: "My own bank's tool, handy since I already use them.",
      },
    ],
  },

  budget: {
    id: "budget",
    name: "Budget (50/30/20)",
    tag: "Where the money goes",
    blurb:
      "Split take home pay into needs, wants, and savings without tracking every penny.",
    howTo:
      "Start with your monthly net income, the money that actually lands in your account after taxes. Put 50% toward needs, 30% toward wants, and 20% toward savings and debt payoff. It is a starting frame, not a law. The point is to give every dollar a job before the month starts.",
    examples: [
      {
        title: "Surgeon take home",
        body: "Say my take home is about $12,500 a month. The split is $6,250 for needs, $3,750 for wants, and $2,500 for savings. The trap at high income is letting wants quietly creep past 30%.",
      },
      {
        title: "Resident reality",
        body: "On a $60,000 salary, take home is closer to $3,800 a month. That is $1,900 for needs, $1,140 for wants, $760 for savings. When needs eat more than half, the honest fix is cheaper rent or roommates, not skipping savings.",
      },
    ],
    tools: [
      {
        name: "NerdWallet 50/30/20 Calculator",
        url: "https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator",
        note: "Drops your income straight into the three buckets.",
      },
      {
        name: "Google Sheets Budget Template",
        url: "https://docs.google.com/spreadsheets/u/0/?ftv=1&tgif=c",
        note: "The built in Monthly Budget template, free and editable.",
      },
    ],
  },

  rule72: {
    id: "rule72",
    name: "The Rule of 72",
    tag: "How fast money doubles",
    blurb:
      "A mental shortcut for how many years it takes your money to double.",
    howTo:
      "Divide 72 by your annual return written as a whole number. The answer is roughly how many years your money takes to double. It is an estimate, but it is close enough to do in your head and it makes compounding feel real.",
    examples: [
      {
        title: "At 8%",
        body: "72 divided by 8 is 9, so money doubles about every 9 years. The exact math says 9.01 years, so the shortcut is almost perfect. Invest $10,000 and ignore it, and you are looking at roughly $20,000 in 9 years, $40,000 in 18.",
      },
      {
        title: "At 6%",
        body: "72 divided by 6 is 12 years to double. The exact answer is about 11.9 years. A small change in rate, from 6% to 8%, shaves three full years off every doubling, which over a lifetime is enormous.",
      },
    ],
    tools: [
      {
        name: "Investor.gov Compound Interest Calculator",
        url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
        note: "Check the Rule of 72 estimate against the real curve.",
      },
      {
        name: "Google Sheets RATE and NPER",
        url: "https://support.google.com/docs/answer/3093577",
        note: "Use =NPER(rate,0,-1,2) to find exact doubling time.",
      },
    ],
  },
};
