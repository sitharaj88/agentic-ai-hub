import type { Difficulty } from "@/lib/constants";

export interface Concept {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: Difficulty;
  group: "genai-foundations" | "application-engineering" | "agent-systems";
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
    id: "context-engineering",
    title: "Context Engineering",
    description: "How prompts, retrieved documents, tool results, memory, and instructions are assembled into the model context.",
    icon: "layers",
    difficulty: "intermediate",
    group: "genai-foundations",
  },
  {
    id: "memory-systems",
    title: "Memory Systems",
    description: "Short-term, long-term, and episodic memory architectures that give agents persistent knowledge.",
    icon: "brain",
    difficulty: "intermediate",
    group: "application-engineering",
  },
  {
    id: "fine-tuning-vs-rag-tools-workflows",
    title: "Fine-Tuning vs RAG vs Tools vs Workflows",
    description: "A practical framework for choosing whether to adapt the model, retrieve knowledge, call tools, or design a workflow.",
    icon: "layers",
    difficulty: "intermediate",
    group: "application-engineering",
  },
  {
    id: "human-in-the-loop-design",
    title: "Human-in-the-Loop Design",
    description: "How to place approvals, escalation points, and review loops into GenAI and agent workflows.",
    icon: "users",
    difficulty: "intermediate",
    group: "application-engineering",
  },
  {
    id: "auth-tenancy-data-boundaries",
    title: "Auth, Tenancy & Data Boundaries",
    description: "How to design access control, tenant isolation, and data boundaries for production GenAI systems.",
    icon: "shield",
    difficulty: "intermediate",
    group: "application-engineering",
  },
  {
    id: "model-context-protocol",
    title: "Model Context Protocol",
    description: "The open standard that lets LLM applications seamlessly connect to any external data source or tool.",
    icon: "plug",
    difficulty: "intermediate",
    group: "application-engineering",
  },
  {
    id: "rag",
    title: "RAG & Agentic RAG",
    description: "Retrieval-augmented generation and its evolution into agentic systems with hierarchical retrieval.",
    icon: "database",
    difficulty: "intermediate",
    group: "application-engineering",
  },
  {
    id: "planning-and-reasoning",
    title: "Planning & Reasoning",
    description: "Chain of Thought, ReAct, Tree of Thought, and other reasoning strategies agents use to solve problems.",
    icon: "route",
    difficulty: "intermediate",
    group: "agent-systems",
  },
  {
    id: "multi-agent-systems",
    title: "Multi-Agent Systems",
    description: "Coordinating multiple AI agents to collaborate, delegate, and solve complex problems together.",
    icon: "users",
    difficulty: "advanced",
    group: "agent-systems",
  },
];
