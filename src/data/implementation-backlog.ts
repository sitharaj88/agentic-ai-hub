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
    title: "Agent Systems Reliability",
    priority: "next",
    whyNow:
      "The hub covers agent patterns well conceptually, but is still lighter on workflow robustness and UI-acting systems.",
    deliverables: [
      "Expand Workflow Reliability from partial to dedicated coverage.",
      "Add Computer Use & Browser Automation.",
      "Strengthen the agent evaluation flywheel story across guides and roadmap.",
    ],
    tasks: [
      {
        title: "Add Workflow Reliability",
        description:
          "Create focused guidance for retries, idempotency, bounded autonomy, compensation logic, and failure recovery.",
        fileTargets: [
          "src/data/concepts.ts or src/data/guide-content.ts",
          "src/data/concept-content.ts or src/data/guide-content.ts",
          "src/lib/search.ts",
          "src/lib/related-content.ts",
          "src/lib/last-updated.ts",
          "src/data/topic-map.ts",
        ],
      },
      {
        title: "Add Computer Use & Browser Automation",
        description:
          "Cover when to use UI-level agents, how they fail, and the guardrails needed for browser or desktop acting systems.",
        fileTargets: [
          "src/data/concepts.ts",
          "src/data/concept-content.ts",
          "src/lib/search.ts",
          "src/lib/related-content.ts",
          "src/lib/last-updated.ts",
          "src/data/topic-map.ts",
        ],
      },
      {
        title: "Strengthen Agent Evaluation Flywheel",
        description:
          "Add tighter cross-links and dedicated evaluation-loop guidance connecting dataset design, regression testing, and operational feedback.",
        fileTargets: [
          "src/data/guide-content.ts",
          "src/lib/related-content.ts",
          "src/data/topic-map.ts",
          "src/app/roadmap/page.tsx",
        ],
      },
    ],
  },
  {
    id: "chapter-2",
    title: "Multimodal and Product UX Coverage",
    priority: "soon",
    whyNow:
      "The hub still leans heavily text-first. Adding multimodal and UX guidance makes it more useful for broader GenAI application development.",
    deliverables: [
      "Add Multimodal GenAI coverage.",
      "Add GenAI Product UX coverage.",
    ],
    tasks: [
      {
        title: "Add Multimodal GenAI",
        description:
          "Document image, document, audio, and mixed-modal workflows, including model-selection and retrieval implications.",
        fileTargets: [
          "src/data/concepts.ts",
          "src/data/concept-content.ts",
          "src/lib/search.ts",
          "src/lib/related-content.ts",
          "src/lib/last-updated.ts",
          "src/data/topic-map.ts",
        ],
      },
      {
        title: "Add GenAI Product UX",
        description:
          "Cover streaming, partial results, uncertainty communication, failure handling, and human handoff patterns in user-facing products.",
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
  {
    id: "chapter-3",
    title: "Framework Cookbooks and Case Studies",
    priority: "later",
    whyNow:
      "Once the conceptual coverage is broader, the highest-value next step is showing how the same problems are implemented across frameworks and real workflows.",
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
