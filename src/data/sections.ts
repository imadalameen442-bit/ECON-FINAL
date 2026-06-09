/** Chapter registry: drives the running header nav and scrollspy. */
export interface ChapterMeta {
  id: string;
  label: string;
  /** Assignment topic number, for the teacher's reference. */
  topic?: string;
}

export const chapters: ChapterMeta[] = [
  { id: "hero", label: "Front Page" },
  { id: "definitions", label: "Definitions", topic: "Topic 3" },
  { id: "calculations", label: "Calculators", topic: "Topic 4" },
  { id: "compare", label: "Head to Head", topic: "Topic 7" },
  { id: "savings", label: "Savings", topic: "Topic 2" },
  { id: "myths", label: "Fact Check", topic: "Topic 5" },
  { id: "closing", label: "Reflection" },
];
