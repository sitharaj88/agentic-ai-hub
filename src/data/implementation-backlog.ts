export type BacklogPriority = "next" | "soon" | "later";

export interface BacklogTask {
  title: string;
  description: string;
  fileTargets: string[];
}

export interface BacklogChapter {
  id: string;
  title: string;
  priority: BacklogPriority;
  whyNow: string;
  deliverables: string[];
  tasks: BacklogTask[];
}

export const implementationBacklog: BacklogChapter[] = [
  {
    id: "chapter-1",
    title: "Framework Cookbooks and Case Studies",
    priority: "next",
    whyNow:
      "The conceptual coverage is now broad enough that the highest-value remaining step is showing how the same problems are implemented across frameworks and real workflows.",
    deliverables: [
      "Add side-by-side framework cookbooks.",
      "Add production case studies for support, research, coding, and document workflows.",
    ],
    tasks: [
      {
        title: "Create framework cookbook guides",
        description:
          "Implement one reference workflow across multiple frameworks so readers can compare architecture and ergonomics directly.",
        fileTargets: [
          "src/data/guide-content.ts",
          "src/lib/search.ts",
          "src/lib/related-content.ts",
          "src/lib/last-updated.ts",
        ],
      },
      {
        title: "Add case-study pages",
        description:
          "Document realistic system designs for customer support, research, coding, and internal copilots.",
        fileTargets: [
          "src/data/guide-content.ts or src/data/concept-content.ts",
          "src/lib/search.ts",
          "src/lib/related-content.ts",
          "src/lib/last-updated.ts",
          "src/data/topic-map.ts",
        ],
      },
    ],
  },
];
