/**
 * Topic 2 - Savings Ideas.
 * Describe and critique four popular savings ideas, with an honest rating and a
 * personal verdict tied to my own long, debt-heavy road into medicine.
 */

export interface SavingIdea {
  id: string;
  name: string;
  hook: string;
  what: string;
  critique: string;
  verdict: string;
  rating: number; // out of 5
  visual: "timeline" | "jar" | "gap" | "sexy";
}

export const savingIdeas: SavingIdea[] = [
  {
    id: "timeline",
    name: "Timeline vs Intensity",
    hook: "You can afford almost anything, just not on every timeline.",
    what: "Made famous by the Afford Anything idea, this says any goal can be reached two ways. You either stretch the timeline and save a small amount for a long time, or crank the intensity and save aggressively for a short time. Both paths arrive at the same place.",
    critique:
      "It is genuinely freeing because it kills the excuse that a goal is impossible. The weakness is that it can quietly justify procrastination. Choosing the long, gentle timeline feels responsible while letting compounding pass you by. Intensity early almost always beats intensity later.",
    verdict:
      "This one fits my life perfectly. Med school steals my early high-intensity years, so I am forced onto a stretched timeline at first, then a high-intensity sprint once attending pay hits. The trick is to not let the slow start become a habit I keep after the money arrives.",
    rating: 4,
    visual: "timeline",
  },
  {
    id: "jar",
    name: "The Money Jar",
    hook: "Drop the excess in a jar and let small amounts pile up.",
    what: "Every time you have a little extra, spare change, a small windfall, the $7 you did not spend on lunch, you put it in a jar. Today the jar is usually a separate savings account or a round-up app, but the psychology is the same: out of sight, slowly growing.",
    critique:
      "The strength is friction and visibility. Money you have to consciously move is money you are less likely to blow, and watching it grow is motivating. The weakness is scale. A jar of spare change will never fund a retirement or a down payment. It is a habit builder, not a wealth builder.",
    verdict:
      "I like it as training wheels. During residency, automatic round-ups into a high yield savings account would keep me in the habit without thinking. But I will not fool myself into thinking the jar is the plan. It is the warm up.",
    rating: 3,
    visual: "jar",
  },
  {
    id: "gap",
    name: "Grow the Gap",
    hook: "Wealth lives in the space between what you earn and what you spend.",
    what: "Your savings rate is the gap between income and spending. You can widen it from either side: earn more, or spend less. The bigger the gap, the faster wealth builds, and the math does not care which side you push on.",
    critique:
      "This is the most honest idea on the list because it captures the whole game in one sentence. The catch is lifestyle creep. As income climbs, spending quietly climbs with it, so the gap never actually widens. High earners who feel broke are almost always victims of a gap that closed on them.",
    verdict:
      "This is the one I am betting my financial life on. A surgeon's income gives me a huge potential gap, but only if I keep my spending closer to a resident's life than a TV doctor's. Earning more is coming whether I plan it or not. Guarding the spending side is the real work.",
    rating: 5,
    visual: "gap",
  },
  {
    id: "sexy",
    name: "Saving is Sexy?",
    hook: "Reframing saving as power instead of punishment.",
    what: "The idea is to flip saving from something that feels like deprivation into something that feels attractive and powerful. Instead of saving meaning you cannot have things, it means you are buying freedom, options, and the ability to walk away from a bad situation.",
    critique:
      "As a mindset shift it is legitimately useful, because money behavior is mostly emotional and a positive frame beats a guilt frame. The weakness is that a slogan is not a system. Calling saving sexy does nothing if there is no automation and no plan behind it. Vibes do not compound, dollars do.",
    verdict:
      "I will take the reframe and leave the slogan. Seeing a growing investment account as future freedom, the freedom to choose where I practice or to take a year for research, is real motivation. But I trust an automatic transfer far more than I trust feeling inspired on payday.",
    rating: 3,
    visual: "sexy",
  },
];
