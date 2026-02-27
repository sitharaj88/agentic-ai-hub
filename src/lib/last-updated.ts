/**
 * Centralized last-updated dates for all content pages.
 * Format: "YYYY-MM-DD"
 * Update the date for a page whenever its content is meaningfully changed.
 */

const lastUpdatedMap: Record<string, string> = {
  // ── Concepts ──────────────────────────────────────────
  "concept:what-are-ai-agents": "2025-06-15",
  "concept:tool-use": "2025-06-15",
  "concept:memory-systems": "2025-06-15",
  "concept:planning-and-reasoning": "2025-06-15",
  "concept:multi-agent-systems": "2025-06-15",
  "concept:model-context-protocol": "2025-06-15",
  "concept:rag": "2025-06-15",

  // ── Patterns ──────────────────────────────────────────
  "pattern:react": "2025-06-15",
  "pattern:supervisor": "2025-06-15",
  "pattern:peer-collaboration": "2025-06-15",
  "pattern:hierarchical": "2025-06-15",
  "pattern:tool-augmented": "2025-06-15",
  "pattern:agent-teams": "2025-06-15",

  // ── Guides ────────────────────────────────────────────
  "guide:getting-started": "2025-06-15",
  "guide:first-agent": "2025-06-15",
  "guide:choosing-your-stack": "2025-06-15",
  "guide:multi-agent-architecture": "2025-06-15",
  "guide:building-mcp-servers": "2025-06-15",
  "guide:prompt-engineering": "2025-06-15",
  "guide:guardrails": "2025-06-15",
  "guide:observability": "2025-06-15",
  "guide:evaluation": "2025-06-15",
  "guide:production-deployment": "2025-06-15",

  // ── Frameworks ────────────────────────────────────────
  "framework:claude-agent-sdk": "2025-06-15",
  "framework:openai-agents-sdk": "2025-06-15",
  "framework:google-adk": "2025-06-15",
  "framework:microsoft-agent-framework": "2025-06-15",
  "framework:aws-strands": "2025-06-15",
  "framework:langgraph": "2025-06-15",
  "framework:crewai": "2025-06-15",
  "framework:ag2": "2025-06-15",
  "framework:llamaindex": "2025-06-15",
  "framework:smolagents": "2025-06-15",
  "framework:pydantic-ai": "2025-06-15",
  "framework:agno": "2025-06-15",
  "framework:haystack": "2025-06-15",
  "framework:mastra": "2025-06-15",
  "framework:langchain": "2025-06-15",
  "framework:vercel-ai-sdk": "2025-06-15",
  "framework:copilotkit": "2025-06-15",
  "framework:dify": "2025-06-15",
  "framework:flowise": "2025-06-15",
  "framework:rivet": "2025-06-15",
  "framework:mcp": "2025-06-15",
  "framework:a2a": "2025-06-15",
};

export type ContentType = "concept" | "pattern" | "guide" | "framework";

/**
 * Get the last-updated date string for a content page.
 * Returns undefined if no date is registered.
 */
export function getLastUpdated(
  type: ContentType,
  slug: string
): string | undefined {
  return lastUpdatedMap[`${type}:${slug}`];
}

/**
 * Format a date string (YYYY-MM-DD) into a human-readable form.
 * e.g. "2025-06-15" → "Jun 15, 2025"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
