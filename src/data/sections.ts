/** Chapter registry: drives the nav, the progress rail, and scrollspy. */
export interface ChapterMeta {
  id: string;
  label: string;
  /** Short tag shown in the progress rail. */
  tag: string;
  /** Assignment topic number, for the teacher's reference. */
  topic?: string;
}

export const chapters: ChapterMeta[] = [
  { id: "hero", label: "Start", tag: "Intro" },
  { id: "definitions", label: "Definitions", tag: "The Vocabulary", topic: "Topic 3" },
  { id: "calculations", label: "Calculators", tag: "The Math", topic: "Topic 4" },
  { id: "compare", label: "Tool Test", tag: "Head to Head", topic: "Topic 7" },
  { id: "savings", label: "Savings", tag: "The Strategies", topic: "Topic 2" },
  { id: "myths", label: "Myths", tag: "Rules or Myths", topic: "Topic 5" },
  { id: "closing", label: "Reflection", tag: "The Long Game" },
];
