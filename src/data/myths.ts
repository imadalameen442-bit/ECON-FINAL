/**
 * Topic 5 - Financial Rules (or Myths?).
 * Describe and critique eight common pieces of money advice. Each gets a verdict
 * and a confidence meter for how much I actually buy it.
 */

export type Verdict = "Fact" | "Myth" | "It Depends";

export interface Myth {
  id: string;
  claim: string;
  verdict: Verdict;
  confidence: number; // 0-100, how strongly the verdict holds
  take: string;
}

export const myths: Myth[] = [
  {
    id: "pay-yourself",
    claim: "Pay yourself first.",
    verdict: "Fact",
    confidence: 95,
    take: "Move money to savings the moment you get paid, before bills and definitely before fun. It works because it removes willpower from the equation. Whatever is left after spending is almost never what is left for saving. Automating this is the single highest-leverage money habit there is.",
  },
  {
    id: "emergency-fund",
    claim: "Keep 3 months of net income in an emergency fund.",
    verdict: "It Depends",
    confidence: 75,
    take: "The instinct is right, the number is personal. Three months is a floor for someone with stable, in-demand income. A surgeon has rock solid job security, so three to six months is plenty. Someone with shaky income should hold more. The point is a buffer that lets a bad month stay a bad month instead of becoming debt.",
  },
  {
    id: "budget",
    claim: "Make and follow a budget.",
    verdict: "Fact",
    confidence: 85,
    take: "You cannot manage what you do not measure. The catch is that a budget you abandon in week two is worthless. The best budget is the simplest one you will actually keep, even if that is just automating savings and spending the rest guilt free. The habit matters more than the spreadsheet.",
  },
  {
    id: "four-percent",
    claim: "The 4% rule guarantees a safe retirement.",
    verdict: "It Depends",
    confidence: 55,
    take: "The rule says you can withdraw 4% of your nest egg each year and likely not run out over 30 years. It is a useful starting estimate, not a guarantee. It was built on historical US markets, ignores big early downturns, and assumes a fixed retirement length. I treat it as a target to aim at, then adjust to real life.",
  },
  {
    id: "penny-saved",
    claim: "A penny saved is a penny earned.",
    verdict: "Myth",
    confidence: 70,
    take: "It actually undersells saving. A penny earned gets taxed before it reaches you, but a penny saved is kept in full. So a saved penny is worth more than an earned one. The old saying is directionally good advice but mathematically too modest. Saving quietly beats earning more than people give it credit for.",
  },
  {
    id: "mortgage-first",
    claim: "Pay off your mortgage before anything else.",
    verdict: "It Depends",
    confidence: 60,
    take: "Emotionally satisfying, mathematically often wrong. If your mortgage is 6% but your investments average 8%, every extra dollar thrown at the house is a dollar that could have grown faster elsewhere. There is real value in the peace of mind of owning your home outright, but it is a comfort choice, not the optimal money choice.",
  },
  {
    id: "money-happiness",
    claim: "Money doesn't buy happiness.",
    verdict: "Myth",
    confidence: 65,
    take: "Money absolutely buys happiness up to a point, mostly by removing the stress of not having enough. Research shows wellbeing climbs steadily with income and then the curve flattens once the basics and a cushion are covered. Money does not buy meaning, but pretending it has nothing to do with happiness is a comfortable lie.",
  },
  {
    id: "spend-not-earn",
    claim: "It's not what you earn, it's what you spend.",
    verdict: "It Depends",
    confidence: 70,
    take: "True for most people, incomplete for high earners. Plenty of big incomes vanish into big lifestyles, which is the warning here. But once spending is disciplined, income becomes the bigger lever by far. The honest version is this: spending discipline keeps you out of trouble, but income is what builds real wealth. You need both.",
  },
];
