import { MotionConfig } from "framer-motion";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import { useActiveSection } from "./lib/useActiveSection";
import { isStill } from "./lib/utils";
import { chapters } from "./data/sections";
import { MeshBackground } from "./components/ui/MeshBackground";
import { SectionBoundary } from "./components/ui/ErrorBoundary";
import { StickyNav } from "./components/nav/StickyNav";
import { ProgressRail } from "./components/nav/ProgressRail";
import { Hero } from "./sections/Hero";
import { Definitions } from "./sections/Definitions";
import { Calculations } from "./sections/Calculations";
import { CalculatorsCompare } from "./sections/CalculatorsCompare";
import { Savings } from "./sections/Savings";
import { Myths } from "./sections/Myths";
import { Closing } from "./sections/Closing";

const ids = chapters.map((c) => c.id);

export default function App() {
  useSmoothScroll();
  const active = useActiveSection(ids);
  const still = isStill();

  return (
    <MotionConfig reducedMotion={still ? "always" : "never"}>
      <div className="grain relative">
        <MeshBackground />
        <StickyNav active={active} />
        <ProgressRail active={active} />

        <main>
          <SectionBoundary name="hero"><Hero /></SectionBoundary>
          <SectionBoundary name="definitions"><Definitions /></SectionBoundary>
          <SectionBoundary name="calculations"><Calculations /></SectionBoundary>
          <SectionBoundary name="compare"><CalculatorsCompare /></SectionBoundary>
          <SectionBoundary name="savings"><Savings /></SectionBoundary>
          <SectionBoundary name="myths"><Myths /></SectionBoundary>
          <SectionBoundary name="closing"><Closing /></SectionBoundary>
        </main>
      </div>
    </MotionConfig>
  );
}
