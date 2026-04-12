import type { Difficulty } from "@/lib/constants";

export interface Concept {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: Difficulty;
  group: "genai-foundations" | "agent-building-blocks" | "advanced-systems";
}

export const concepts: Concept[] = [
  {
    id: "what-are-ai-agents",
    title: "What Are AI Agents?",
    description: "Understanding autonomous AI systems that perceive, reason, plan, and act to achieve goals.",
    icon: "cpu",
    difficulty: "beginner",
    group: "genai-foundations",
  },
  {
    id: "tool-use",
    title: "Tool Use & Function Calling",
    description: "How agents interact with external tools, APIs, and services to take action in the real world.",
    icon: "wrench",
    difficulty: "beginner",
    group: "genai-foundations",
  },
  {
    id: "model-selection-routing",
    title: "Model Selection & Routing",
    description: "How to choose the right model for each task and route workloads by capability, latency, and cost.",
    icon: "layers",
    difficulty: "beginner",
    group: "genai-foundations",
  },
  {
    id: "structured-outputs",
    title: "Structured Outputs",
    description: "Generating validated JSON, typed objects, and schema-constrained results instead of brittle free-form text.",
    icon: "boxes",
    difficulty: "beginner",
    group: "genai-foundations",
  },
  {
    id: "memory-systems",
    title: "Memory Systems",
    description: "Short-term, long-term, and episodic memory architectures that give agents persistent knowledge.",
    icon: "brain",
    difficulty: "intermediate",
    group: "agent-building-blocks",
  },
  {
    id: "planning-and-reasoning",
    title: "Planning & Reasoning",
    description: "Chain of Thought, ReAct, Tree of Thought, and other reasoning strategies agents use to solve problems.",
    icon: "route",
    difficulty: "intermediate",
    group: "agent-building-blocks",
  },
  {
    id: "context-engineering",
    title: "Context Engineering",
    description: "How prompts, retrieved documents, tool results, memory, and instructions are assembled into the model context.",
    icon: "layers",
    difficulty: "intermediate",
    group: "agent-building-blocks",
  },
  {
    id: "multi-agent-systems",
    title: "Multi-Agent Systems",
    description: "Coordinating multiple AI agents to collaborate, delegate, and solve complex problems together.",
    icon: "users",
    difficulty: "advanced",
    group: "advanced-systems",
  },
  {
    id: "model-context-protocol",
    title: "Model Context Protocol",
    description: "The open standard that lets LLM applications seamlessly connect to any external data source or tool.",
    icon: "plug",
    difficulty: "intermediate",
    group: "advanced-systems",
  },
  {
    id: "rag",
    title: "RAG & Agentic RAG",
    description: "Retrieval-augmented generation and its evolution into agentic systems with hierarchical retrieval.",
    icon: "database",
    difficulty: "intermediate",
    group: "advanced-systems",
  },
];
