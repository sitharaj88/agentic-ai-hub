import { concepts } from "@/data/concepts";
import { patterns } from "@/data/patterns";
import { frameworks } from "@/data/frameworks";
import { guideContents } from "@/data/guide-content";

export type ContentType = "concept" | "pattern" | "framework" | "guide";

export interface RelatedItem {
  type: ContentType;
  slug: string;
  title: string;
  description: string;
  href: string;
}

/**
 * Relationship map: for each content piece, define manually curated
 * cross-section related items. Keys are `type:slug`.
 * Values are arrays of `type:slug` references.
 */
const relationshipMap: Record<string, string[]> = {
  // ── Concepts ──
  "concept:what-are-ai-agents": [
    "guide:getting-started",
    "pattern:react",
    "framework:claude-agent-sdk",
  ],
  "concept:tool-use": [
    "guide:building-mcp-servers",
    "pattern:tool-augmented",
    "framework:mcp",
  ],
  "concept:model-selection-routing": [
    "guide:choosing-your-stack",
    "guide:production-deployment",
    "framework:vercel-ai-sdk",
  ],
  "concept:structured-outputs": [
    "guide:prompt-engineering",
    "guide:guardrails",
    "framework:pydantic-ai",
  ],
  "concept:multimodal-genai": [
    "guide:genai-product-ux",
    "pattern:tool-augmented",
    "framework:vercel-ai-sdk",
  ],
  "concept:fine-tuning-vs-rag-tools-workflows": [
    "guide:choosing-your-stack",
    "pattern:tool-augmented",
    "framework:llamaindex",
  ],
  "concept:human-in-the-loop-design": [
    "guide:guardrails",
    "pattern:supervisor",
    "framework:openai-agents-sdk",
  ],
  "concept:auth-tenancy-data-boundaries": [
    "guide:production-deployment",
    "pattern:tool-augmented",
    "framework:mcp",
  ],
  "concept:memory-systems": [
    "guide:choosing-your-stack",
    "pattern:react",
    "framework:langgraph",
  ],
  "concept:planning-and-reasoning": [
    "guide:prompt-engineering",
    "pattern:hierarchical",
    "framework:openai-agents-sdk",
  ],
  "concept:workflow-reliability": [
    "guide:production-deployment",
    "guide:evaluation",
    "framework:langgraph",
  ],
  "concept:computer-use-browser-automation": [
    "guide:guardrails",
    "pattern:tool-augmented",
    "framework:claude-agent-sdk",
  ],
  "concept:context-engineering": [
    "guide:prompt-engineering",
    "guide:evaluation",
    "framework:langgraph",
  ],
  "concept:multi-agent-systems": [
    "guide:multi-agent-architecture",
    "pattern:supervisor",
    "framework:crewai",
  ],
  "concept:model-context-protocol": [
    "guide:building-mcp-servers",
    "pattern:tool-augmented",
    "framework:mcp",
  ],
  "concept:rag": [
    "guide:choosing-your-stack",
    "pattern:tool-augmented",
    "framework:llamaindex",
  ],

  // ── Patterns ──
  "pattern:react": [
    "concept:planning-and-reasoning",
    "guide:first-agent",
    "framework:langgraph",
  ],
  "pattern:supervisor": [
    "concept:multi-agent-systems",
    "guide:multi-agent-architecture",
    "framework:crewai",
  ],
  "pattern:peer-collaboration": [
    "concept:multi-agent-systems",
    "guide:multi-agent-architecture",
    "framework:ag2",
  ],
  "pattern:hierarchical": [
    "concept:planning-and-reasoning",
    "guide:multi-agent-architecture",
    "framework:langgraph",
  ],
  "pattern:tool-augmented": [
    "concept:tool-use",
    "guide:building-mcp-servers",
    "framework:claude-agent-sdk",
  ],
  "pattern:agent-teams": [
    "concept:multi-agent-systems",
    "guide:multi-agent-architecture",
    "framework:crewai",
  ],

  // ── Guides ──
  "guide:getting-started": [
    "concept:what-are-ai-agents",
    "pattern:react",
    "framework:claude-agent-sdk",
  ],
  "guide:first-agent": [
    "concept:tool-use",
    "pattern:react",
    "framework:openai-agents-sdk",
  ],
  "guide:choosing-your-stack": [
    "concept:fine-tuning-vs-rag-tools-workflows",
    "pattern:supervisor",
    "framework:langgraph",
  ],
  "guide:multi-agent-architecture": [
    "concept:multi-agent-systems",
    "pattern:supervisor",
    "framework:crewai",
  ],
  "guide:building-mcp-servers": [
    "concept:model-context-protocol",
    "pattern:tool-augmented",
    "framework:mcp",
  ],
  "guide:prompt-engineering": [
    "concept:structured-outputs",
    "pattern:react",
    "framework:claude-agent-sdk",
  ],
  "guide:guardrails": [
    "concept:computer-use-browser-automation",
    "pattern:supervisor",
    "framework:pydantic-ai",
  ],
  "guide:observability": [
    "concept:memory-systems",
    "pattern:react",
    "framework:langgraph",
  ],
  "guide:evaluation": [
    "guide:dataset-prompt-versioning",
    "concept:workflow-reliability",
    "framework:openai-agents-sdk",
  ],
  "guide:production-deployment": [
    "guide:cost-engineering",
    "concept:workflow-reliability",
    "framework:langgraph",
  ],
  "guide:cost-engineering": [
    "concept:model-selection-routing",
    "guide:production-deployment",
    "framework:vercel-ai-sdk",
  ],
  "guide:governance-compliance": [
    "concept:human-in-the-loop-design",
    "concept:auth-tenancy-data-boundaries",
    "framework:mcp",
  ],
  "guide:dataset-prompt-versioning": [
    "concept:context-engineering",
    "guide:evaluation",
    "framework:langgraph",
  ],
  "guide:genai-product-ux": [
    "concept:multimodal-genai",
    "concept:human-in-the-loop-design",
    "framework:copilotkit",
  ],
  "guide:framework-cookbook-support-copilot": [
    "guide:choosing-your-stack",
    "guide:case-study-support-agent",
    "framework:openai-agents-sdk",
  ],
  "guide:case-study-support-agent": [
    "guide:framework-cookbook-support-copilot",
    "guide:guardrails",
    "concept:human-in-the-loop-design",
  ],
  "guide:case-study-research-agent": [
    "concept:rag",
    "guide:evaluation",
    "concept:multimodal-genai",
  ],
  "guide:case-study-coding-agent": [
    "concept:tool-use",
    "concept:workflow-reliability",
    "guide:production-deployment",
  ],
  "guide:case-study-document-workflows": [
    "concept:multimodal-genai",
    "concept:structured-outputs",
    "guide:genai-product-ux",
  ],

  // ── Frameworks ──
  "framework:claude-agent-sdk": [
    "concept:tool-use",
    "guide:getting-started",
    "pattern:react",
  ],
  "framework:openai-agents-sdk": [
    "concept:human-in-the-loop-design",
    "guide:first-agent",
    "pattern:react",
  ],
  "framework:google-adk": [
    "concept:multi-agent-systems",
    "guide:choosing-your-stack",
    "pattern:supervisor",
  ],
  "framework:microsoft-agent-framework": [
    "concept:multi-agent-systems",
    "guide:multi-agent-architecture",
    "pattern:agent-teams",
  ],
  "framework:aws-strands": [
    "concept:tool-use",
    "guide:production-deployment",
    "pattern:tool-augmented",
  ],
  "framework:langgraph": [
    "concept:planning-and-reasoning",
    "guide:choosing-your-stack",
    "pattern:react",
  ],
  "framework:crewai": [
    "concept:multi-agent-systems",
    "guide:multi-agent-architecture",
    "pattern:agent-teams",
  ],
  "framework:ag2": [
    "concept:multi-agent-systems",
    "guide:multi-agent-architecture",
    "pattern:peer-collaboration",
  ],
  "framework:llamaindex": [
    "concept:fine-tuning-vs-rag-tools-workflows",
    "guide:choosing-your-stack",
    "pattern:tool-augmented",
  ],
  "framework:smolagents": [
    "concept:tool-use",
    "guide:first-agent",
    "pattern:react",
  ],
  "framework:pydantic-ai": [
    "concept:structured-outputs",
    "guide:guardrails",
    "concept:human-in-the-loop-design",
  ],
  "framework:agno": [
    "concept:multi-agent-systems",
    "guide:choosing-your-stack",
    "pattern:agent-teams",
  ],
  "framework:haystack": [
    "concept:rag",
    "guide:choosing-your-stack",
    "pattern:tool-augmented",
  ],
  "framework:mastra": [
    "concept:tool-use",
    "guide:first-agent",
    "pattern:react",
  ],
  "framework:langchain": [
    "concept:context-engineering",
    "guide:choosing-your-stack",
    "pattern:react",
  ],
  "framework:vercel-ai-sdk": [
    "concept:tool-use",
    "guide:first-agent",
    "pattern:tool-augmented",
  ],
  "framework:copilotkit": [
    "concept:tool-use",
    "guide:getting-started",
    "pattern:react",
  ],
  "framework:dify": [
    "concept:what-are-ai-agents",
    "guide:getting-started",
    "pattern:tool-augmented",
  ],
  "framework:flowise": [
    "concept:what-are-ai-agents",
    "guide:getting-started",
    "pattern:tool-augmented",
  ],
  "framework:rivet": [
    "concept:planning-and-reasoning",
    "guide:getting-started",
    "pattern:react",
  ],
  "framework:mcp": [
    "concept:auth-tenancy-data-boundaries",
    "guide:building-mcp-servers",
    "pattern:tool-augmented",
  ],
  "framework:a2a": [
    "concept:multi-agent-systems",
    "guide:multi-agent-architecture",
    "pattern:peer-collaboration",
  ],
};

/**
 * Resolve a `type:slug` key into a RelatedItem by looking up actual data.
 */
function resolveItem(key: string): RelatedItem | null {
  const [type, slug] = key.split(":") as [ContentType, string];

  switch (type) {
    case "concept": {
      const item = concepts.find((c) => c.id === slug);
      if (!item) return null;
      return {
        type: "concept",
        slug: item.id,
        title: item.title,
        description: item.description,
        href: `/concepts/${item.id}`,
      };
    }
    case "pattern": {
      const item = patterns.find((p) => p.id === slug);
      if (!item) return null;
      return {
        type: "pattern",
        slug: item.id,
        title: item.title,
        description: item.description,
        href: `/patterns/${item.id}`,
      };
    }
    case "framework": {
      const item = frameworks.find((f) => f.id === slug);
      if (!item) return null;
      return {
        type: "framework",
        slug: item.id,
        title: item.name,
        description: item.tagline,
        href: `/frameworks/${item.id}`,
      };
    }
    case "guide": {
      const item = guideContents.find((g) => g.slug === slug);
      if (!item) return null;
      return {
        type: "guide",
        slug: item.slug,
        title: item.title,
        description: item.description,
        href: `/guides/${item.slug}`,
      };
    }
    default:
      return null;
  }
}

/**
 * Get 3 related content items for a given page type and slug.
 * Uses the hardcoded relationship map, falling back to keyword-based matching.
 */
export function getRelatedContent(
  type: ContentType,
  slug: string
): RelatedItem[] {
  const key = `${type}:${slug}`;
  const mappedKeys = relationshipMap[key];

  if (mappedKeys) {
    const resolved = mappedKeys
      .map(resolveItem)
      .filter((item): item is RelatedItem => item !== null);
    if (resolved.length > 0) return resolved.slice(0, 3);
  }

  // Fallback: pick one from each other section
  const otherTypes: ContentType[] = (
    ["concept", "pattern", "framework", "guide"] as ContentType[]
  ).filter((t) => t !== type);

  const fallback: RelatedItem[] = [];

  for (const ot of otherTypes) {
    if (fallback.length >= 3) break;
    let item: RelatedItem | null = null;
    switch (ot) {
      case "concept":
        if (concepts[0])
          item = resolveItem(`concept:${concepts[0].id}`);
        break;
      case "pattern":
        if (patterns[0])
          item = resolveItem(`pattern:${patterns[0].id}`);
        break;
      case "framework":
        if (frameworks[0])
          item = resolveItem(`framework:${frameworks[0].id}`);
        break;
      case "guide":
        if (guideContents[0])
          item = resolveItem(`guide:${guideContents[0].slug}`);
        break;
    }
    if (item) fallback.push(item);
  }

  return fallback.slice(0, 3);
}
