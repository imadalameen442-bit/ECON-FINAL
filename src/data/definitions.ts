/**
 * Topic 3 - Definitions.
 * Each term: what it is, why it matters, and a real example (many tied to my
 * path toward becoming an orthopedic surgeon). Written in plain language.
 */

export type Span = "wide" | "tall" | "normal";

export interface Definition {
  id: string;
  term: string;
  short: string; // one-line gist shown on the card face
  what: string;
  why: string;
  example: string;
  category: "Concepts" | "Investing" | "Income & Debt" | "Everyday";
  /** Optional interactive mini-viz key handled by the section. */
  viz?: "tvm" | "networth" | "riskreturn" | "funds" | "needswants";
  span?: Span;
}

export const definitions: Definition[] = [
  {
    id: "tvm",
    term: "Time Value of Money",
    short: "A dollar today is worth more than a dollar later.",
    what: "The idea that money you have now is worth more than the same amount in the future, because you can invest it and let it grow. Every dollar has a clock running on it.",
    why: "This is the single most important idea in personal finance. It is the reason starting early beats starting big, and it is exactly the problem I face. As a future surgeon I start saving late, so I have to respect this clock more than most.",
    example:
      "If I invest $1,000 at 7% and leave it alone for 40 years, it grows to about $14,974. The same $1,000 invested for only 20 years grows to about $3,870. Same money, half the time, roughly a quarter of the result.",
    category: "Concepts",
    viz: "tvm",
    span: "wide",
  },
  {
    id: "passive-income",
    term: "Passive Income",
    short: "Money that shows up without trading hours for it.",
    what: "Earnings that do not require you to actively work for each dollar. Think dividends, interest, rental income, or royalties. You set it up once, then it keeps paying.",
    why: "Surgeons trade time for money at a very high rate, but there are only so many hours in a week and a body can only operate for so many years. Passive income keeps working when I am not in the OR.",
    example:
      "If I build a portfolio that pays a 3% dividend on $1,000,000, that is $30,000 a year landing in my account whether I work that year or not.",
    category: "Income & Debt",
  },
  {
    id: "networth",
    term: "Net Worth",
    short: "Everything you own minus everything you owe.",
    what: "Your total assets (cash, investments, property, the car) minus your total liabilities (loans, credit card balances, the mortgage). It is the truest single snapshot of where you stand.",
    why: "Income tells you what flows in. Net worth tells you what you have actually kept. A surgeon earning $500k can still have a negative net worth if the student loans are big enough, which is exactly where I will start.",
    example:
      "Fresh out of residency I might own $40k in assets but owe $250k in med school loans, so my net worth is negative $210k. The goal of the next decade is to flip that number and keep it climbing.",
    category: "Concepts",
    viz: "networth",
    span: "wide",
  },
  {
    id: "credit-score",
    term: "Credit Score / Credit Rating",
    short: "A number that tells lenders how risky you are.",
    what: "A three digit score (usually 300 to 850 in the US) built from your payment history, how much debt you carry, the length of your credit history, and more. A rating is the same idea applied to companies and governments.",
    why: "It quietly decides what interest rate you get on a mortgage or a car loan, and a better rate can save tens of thousands of dollars. With six figures of student loans, my credit score is not a side detail, it is leverage.",
    example:
      "On a $250,000 mortgage, a 760 score might get me 6.3% while a 640 score gets 7.3%. That one point gap costs roughly $170 a month, or about $61,000 over 30 years.",
    category: "Everyday",
  },
  {
    id: "risk",
    term: "Risk Evaluation",
    short: "Weighing how much you could lose against what you could gain.",
    what: "In investing, this means judging how likely an investment is to lose value and how much it could swing, then deciding if the potential return is worth it. Higher expected returns almost always come with higher risk.",
    why: "Risk is personal and it changes with time. At 17 I can take big swings because I have decades to recover. Closer to retirement I will protect what I have. Knowing where I sit on that line keeps me from panic selling.",
    example:
      "A government bond barely moves but pays little. A single tech stock might double or get cut in half. Most of my long horizon money belongs in broad, diversified funds that sit comfortably in the middle.",
    category: "Investing",
    viz: "riskreturn",
    span: "tall",
  },
  {
    id: "stocks",
    term: "Stocks",
    short: "A tiny ownership slice of a company.",
    what: "When you buy a stock you own a small piece of a real business. You make money two ways: the share price rises, or the company pays you part of its profits as dividends.",
    why: "Over long stretches, stocks have been the most reliable engine of growth available to a normal person. They are volatile year to year, but time smooths most of that out.",
    example:
      "One share of a company at $150 that grows to $300 doubles my money. If thousands of investors believe a business will earn more in the future, that belief pushes the price up today.",
    category: "Investing",
  },
  {
    id: "bonds",
    term: "Bonds",
    short: "A loan you make to a government or company.",
    what: "A bond is an IOU. You lend money for a set period, and in return you get regular interest payments plus your original amount back at the end. You are the lender, not the owner.",
    why: "Bonds are the calm counterweight to stocks. They will not make me rich, but they steady a portfolio and protect cash I will need soon, like a future down payment.",
    example:
      "I buy a $1,000 bond paying 4% for 10 years. I collect $40 each year, then get my $1,000 back at the end. Boring, predictable, and that is the point.",
    category: "Investing",
  },
  {
    id: "gross-net",
    term: "Gross Income vs Net Income",
    short: "What you earn versus what you actually keep.",
    what: "Gross income is your full pay before anything is taken out. Net income, or take home pay, is what is left after taxes, insurance, and retirement contributions are removed.",
    why: "People budget against the big gross number and then wonder why the math never works. Budgets have to run on net income, the money that actually hits the account.",
    example:
      "A $300,000 surgeon salary sounds enormous, but after federal and state taxes plus benefits, the take home might be closer to $200,000. I plan my life around the $200k, not the $300k.",
    category: "Income & Debt",
  },
  {
    id: "mutual-funds",
    term: "Mutual Funds",
    short: "A managed basket of many investments in one.",
    what: "A fund that pools money from lots of investors and a manager uses it to buy a mix of stocks or bonds. You own a slice of the whole basket instead of picking individual pieces.",
    why: "It is instant diversification without needing to research hundreds of companies. The catch is that actively managed funds often charge higher fees that quietly eat returns.",
    example:
      "I put $500 into one mutual fund and instantly own a sliver of 100+ companies. If one fails, it barely dents me. The manager picks the holdings, and I pay a yearly fee for that service.",
    category: "Investing",
    viz: "funds",
    span: "wide",
  },
  {
    id: "etfs",
    term: "ETFs",
    short: "A fund that trades like a stock, usually cheaper.",
    what: "An Exchange Traded Fund is a basket of investments, like a mutual fund, but it trades on the market all day at a live price. Most ETFs simply track an index, so fees tend to be very low.",
    why: "Low fees plus diversification plus easy trading is a hard combo to beat. For a hands off long term investor like I plan to be, ETFs are close to ideal.",
    example:
      "An S&P 500 ETF lets me buy all 500 of those companies in one click for a fee around 0.03%. On $100,000 that is about $30 a year, compared to hundreds for many mutual funds.",
    category: "Investing",
  },
  {
    id: "index-funds",
    term: "Index Funds",
    short: "A fund that quietly copies the whole market.",
    what: "A fund built to match a market index, like the S&P 500, instead of trying to beat it. No star manager picking winners, just owning everything in the index.",
    why: "Decades of data show that most active managers fail to beat the index over time, and they charge more to try. Index funds win by being cheap and patient, which fits a busy surgeon perfectly.",
    example:
      "Instead of betting on which company wins, I own a slice of all of them. When the overall US market grows, my index fund grows with it, no guessing required.",
    category: "Investing",
  },
  {
    id: "rrsp",
    term: "RRSP",
    short: "Canada's tax sheltered retirement account.",
    what: "A Registered Retirement Savings Plan is a Canadian account where contributions lower your taxable income now and the money grows tax free until you withdraw it in retirement.",
    why: "It matters because the US version is what I will actually use. The RRSP is essentially Canada's cousin of the 401(k) and IRA, and the lesson is the same: governments reward you for locking money away for later.",
    example:
      "A Canadian who puts $10,000 in an RRSP shaves $10,000 off their taxable income that year. My equivalent move will be maxing a 401(k) the moment a hospital offers one.",
    category: "Income & Debt",
  },
  {
    id: "consumer-debt",
    term: "Consumer Debt",
    short: "Debt for things that lose value.",
    what: "Money borrowed to buy things that do not earn or grow, like credit card balances, car loans, and financed gadgets. It usually carries high interest.",
    why: "This is the most dangerous kind of debt because it works the time value of money against you. Not all debt is equal though. A mortgage or a med school loan is an investment, a credit card balance for takeout is a leak.",
    example:
      "A $5,000 credit card balance at 24% that I only pay the minimum on can take over a decade to clear and more than double in total cost. That is compounding pointed in the wrong direction.",
    category: "Income & Debt",
  },
  {
    id: "osap",
    term: "OSAP",
    short: "Ontario's student aid program (my FAFSA cousin).",
    what: "The Ontario Student Assistance Program offers loans and grants to Canadian students based on financial need. In the US, the equivalent door is FAFSA and federal student loans.",
    why: "Medical school is expensive enough that almost no one pays cash. Understanding need based aid, what is a grant I keep versus a loan I repay, is step one of funding the long road to the OR.",
    example:
      "A student gets $12,000 through OSAP, part grant and part loan. My version will be federal aid plus loans that I knowingly take on, betting that a surgeon's salary makes them worth it.",
    category: "Income & Debt",
  },
  {
    id: "needs-wants",
    term: "Needs vs Wants",
    short: "Survival versus everything else.",
    what: "Needs are the things you genuinely require to live and function: housing, food, utilities, basic transport, insurance. Wants are everything that makes life nicer but is optional.",
    why: "Almost every budget problem is really a needs versus wants problem in disguise. The line is blurrier than people admit, and being honest about it is where real saving starts.",
    example:
      "A reliable used car to get to clinical rotations is a need. Financing a luxury car during residency on a $60k salary is a want wearing a need's costume. Naming it honestly is half the battle.",
    category: "Everyday",
    viz: "needswants",
    span: "wide",
  },
];
