# The Long Game

An interactive personal finance final project for **SUPA ECN 305 (PFIN)**, Spring 2026, by **Imad Al-Ameen**.

It covers five of the assignment topics, framed around one personal story: the long road to becoming an orthopedic surgeon, and how patience plus compound interest win that race.

- **Topic 3 — Definitions:** an expandable glossary of 15 key terms with live mini-visuals
- **Topic 4 — Calculations:** six calculators that actually run (retirement, net worth, mortgage affordability, mortgage true cost, 50/30/20 budget, Rule of 72)
- **Topic 7 — Calculators:** two real tools compared head to head for mortgages and investing
- **Topic 2 — Savings Ideas:** four savings strategies critiqued and graded
- **Topic 5 — Rules or Myths:** eight pieces of money advice flipped and judged

## Tech

React + TypeScript + Vite, Tailwind CSS, Framer Motion, Three.js (react-three-fiber) for the 3D hero, and Recharts for the calculator charts. All financial math lives in [`src/lib/finance.ts`](src/lib/finance.ts) and all written content lives in [`src/data`](src/data) so it is easy to edit.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL.

To build the production version:

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages (one-time setup)

This repo includes a GitHub Actions workflow that builds and publishes the site automatically on every push to `main`.

1. Create a new repository on GitHub (for example `the-long-game`). Leave it empty.
2. From this project folder, run:

   ```bash
   git init
   git add .
   git commit -m "The Long Game: ECON 305 final project"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. On GitHub, go to **Settings → Pages**, and under **Build and deployment → Source**, choose **GitHub Actions**.
4. Wait about a minute for the **Deploy to GitHub Pages** action to finish (the Actions tab shows progress).
5. Your live link will be:

   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

Send that link to your teacher. Every future `git push` updates the live site automatically.

## Editing your own details

Open these files to change wording or numbers without touching the layout:

- [`src/data/definitions.ts`](src/data/definitions.ts) — glossary terms
- [`src/data/calculators.ts`](src/data/calculators.ts) — calculator explanations, examples, tool links
- [`src/data/compare.ts`](src/data/compare.ts) — the tool comparisons
- [`src/data/savings.ts`](src/data/savings.ts) — savings idea critiques
- [`src/data/myths.ts`](src/data/myths.ts) — the money myths and verdicts
- [`src/sections/Closing.tsx`](src/sections/Closing.tsx) — the closing reflection and footer
