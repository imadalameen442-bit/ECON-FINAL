/** Consolidated sources used across the project, for the teacher's reference. */
export interface Source {
  name: string;
  url: string;
  note: string;
}

export const sources: Source[] = [
  {
    name: "Investor.gov (U.S. SEC)",
    url: "https://www.investor.gov",
    note: "Compound interest tool and unbiased definitions.",
  },
  {
    name: "NerdWallet",
    url: "https://www.nerdwallet.com",
    note: "Retirement, net worth, mortgage, and budget calculators.",
  },
  {
    name: "Bankrate",
    url: "https://www.bankrate.com",
    note: "Mortgage amortization and investment calculators.",
  },
  {
    name: "Investopedia",
    url: "https://www.investopedia.com",
    note: "Definitions for stocks, bonds, ETFs, and index funds.",
  },
  {
    name: "Bank of America",
    url: "https://www.bankofamerica.com",
    note: "My own bank's mortgage tools and rates.",
  },
  {
    name: "AAMC",
    url: "https://www.aamc.org",
    note: "Average medical school debt figures.",
  },
  {
    name: "Afford Anything (Paula Pant)",
    url: "https://affordanything.com",
    note: "The timeline vs intensity savings idea.",
  },
  {
    name: "IRS",
    url: "https://www.irs.gov",
    note: "Retirement account rules and tax basics.",
  },
];
