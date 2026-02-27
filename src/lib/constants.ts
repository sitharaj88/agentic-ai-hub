export const SITE_CONFIG = {
  name: "Agentic AI Hub",
  description:
    "The definitive open-source guide to every framework, pattern, and tool for AI agent development.",
  url: "https://sitharaj88.github.io/agentic-ai-hub",
  github: "https://github.com/sitharaj88/agentic-ai-hub",
  author: "Agentic AI Hub",
} as const;

export const NAV_LINKS = [
  { label: "Concepts", href: "/concepts" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Patterns", href: "/patterns" },
  { label: "Guides", href: "/guides" },
  { label: "Compare", href: "/compare" },
  { label: "Ecosystem", href: "/ecosystem" },
] as const;

export const CATEGORIES = {
  "big-tech": { label: "Big Tech", color: "cat-big-tech" },
  "open-source": { label: "Open Source", color: "cat-open-source" },
  typescript: { label: "TypeScript", color: "cat-typescript" },
  enterprise: { label: "Enterprise", color: "cat-enterprise" },
  protocol: { label: "Protocol", color: "cat-protocol" },
} as const;

export type Category = keyof typeof CATEGORIES;

export type Difficulty = "beginner" | "intermediate" | "advanced";
