export type TopicStatus = "covered" | "partial" | "planned";

export interface TopicMapItem {
  title: string;
  description: string;
  status: TopicStatus;
  href?: string;
}

export interface TopicMapSection {
  id: string;
  title: string;
  description: string;
  topics: TopicMapItem[];
}

export const topicMap: TopicMapSection[] = [
  {
    id: "foundations",
    title: "GenAI Foundations",
    description:
      "The core mental models every developer should understand before building agents or GenAI applications.",
    topics: [
      {
        title: "What Are AI Agents?",
        description: "Core definitions, the agent loop, and when an agent is the right abstraction.",
        status: "covered",
        href: "/concepts/what-are-ai-agents",
      },
      {
        title: "Tool Use & Function Calling",
        description: "How models invoke external tools safely and reliably.",
        status: "covered",
        href: "/concepts/tool-use",
      },
      {
        title: "Prompt Engineering",
        description: "System prompts, tool instructions, output shaping, and prompt anti-patterns.",
        status: "covered",
        href: "/guides/prompt-engineering",
      },
      {
        title: "Model Selection & Routing",
        description: "How to choose models by capability, latency, cost, and reliability, then route workloads between them.",
        status: "planned",
      },
      {
        title: "Structured Outputs",
        description: "Schema-first generation, validation, typed results, and constrained output patterns.",
        status: "planned",
      },
      {
        title: "Context Engineering",
        description: "How prompts, retrieved context, tool results, and memory should be assembled for each run.",
        status: "planned",
      },
      {
        title: "Multimodal GenAI",
        description: "Working with documents, images, audio, and mixed-modal pipelines.",
        status: "planned",
      },
    ],
  },
  {
    id: "application-engineering",
    title: "Application Engineering",
    description:
      "The application-layer patterns that turn model calls into useful products and internal systems.",
    topics: [
      {
        title: "Memory Systems",
        description: "Short-term, long-term, episodic, and working memory strategies.",
        status: "covered",
        href: "/concepts/memory-systems",
      },
      {
        title: "RAG & Agentic RAG",
        description: "Retrieval pipelines, corrective retrieval, and agent-driven document interaction.",
        status: "covered",
        href: "/concepts/rag",
      },
      {
        title: "Model Context Protocol",
        description: "Standardizing tools, resources, and prompts across applications and agents.",
        status: "covered",
        href: "/concepts/model-context-protocol",
      },
      {
        title: "Fine-Tuning vs RAG vs Tools vs Workflows",
        description: "A practical decision framework for choosing the right capability layer for a use case.",
        status: "planned",
      },
      {
        title: "Human-in-the-Loop Design",
        description: "Approval checkpoints, escalation patterns, and where to keep humans in the control loop.",
        status: "partial",
        href: "/guides/guardrails",
      },
      {
        title: "GenAI Product UX",
        description: "Streaming, partial results, confidence cues, and graceful failure handling in user-facing apps.",
        status: "planned",
      },
      {
        title: "Auth, Tenancy, and Data Boundaries",
        description: "RBAC, tenant isolation, secrets handling, and access control for enterprise GenAI systems.",
        status: "planned",
      },
    ],
  },
  {
    id: "agent-systems",
    title: "Agent Systems",
    description:
      "The patterns, reasoning strategies, and orchestration approaches used to build capable agentic workflows.",
    topics: [
      {
        title: "Planning & Reasoning",
        description: "Chain-of-thought, ReAct, plan-and-execute, reflection, and tree-based reasoning.",
        status: "covered",
        href: "/concepts/planning-and-reasoning",
      },
      {
        title: "Multi-Agent Systems",
        description: "Supervisor, peer collaboration, and agent-team architectures.",
        status: "covered",
        href: "/concepts/multi-agent-systems",
      },
      {
        title: "Design Patterns",
        description: "Battle-tested architectures for routing, delegation, collaboration, and tool use.",
        status: "covered",
        href: "/patterns",
      },
      {
        title: "Choosing Your Stack",
        description: "Framework and runtime tradeoffs across Python, TypeScript, single-agent, and multi-agent systems.",
        status: "covered",
        href: "/guides/choosing-your-stack",
      },
      {
        title: "Workflow Reliability",
        description: "Retries, fallback chains, idempotency, compensation logic, and bounded autonomy.",
        status: "partial",
        href: "/guides/production-deployment",
      },
      {
        title: "Computer Use & Browser Automation",
        description: "When agents should act through UIs, and the guardrails needed for those systems.",
        status: "planned",
      },
      {
        title: "Agent Evaluation Flywheel",
        description: "How agent behavior improves through datasets, regression tests, reviews, and operational feedback.",
        status: "partial",
        href: "/guides/evaluation",
      },
    ],
  },
  {
    id: "production-operations",
    title: "Production Operations",
    description:
      "The operational capabilities required to run GenAI and agent systems safely, reliably, and cost-effectively.",
    topics: [
      {
        title: "Guardrails & Safety",
        description: "Validation, filtering, approval gates, PII handling, and prompt-injection defenses.",
        status: "covered",
        href: "/guides/guardrails",
      },
      {
        title: "Observability & Monitoring",
        description: "Tracing, structured logs, operational metrics, and alerting for model-driven workflows.",
        status: "covered",
        href: "/guides/observability",
      },
      {
        title: "Evaluation & Testing",
        description: "Unit tests, integration tests, benchmark suites, and LLM-as-judge workflows.",
        status: "covered",
        href: "/guides/evaluation",
      },
      {
        title: "Production Deployment",
        description: "Scaling, deployment topology, graceful degradation, and runtime concerns.",
        status: "covered",
        href: "/guides/production-deployment",
      },
      {
        title: "Cost Engineering",
        description: "Caching, model routing, token budgets, attribution, and spend control.",
        status: "partial",
        href: "/guides/production-deployment",
      },
      {
        title: "Governance & Compliance",
        description: "Auditability, approvals, policy enforcement, and compliance-aware GenAI design.",
        status: "planned",
      },
      {
        title: "Dataset & Prompt Versioning",
        description: "Managing evaluation sets, prompt revisions, and reproducible rollout changes over time.",
        status: "partial",
        href: "/guides/evaluation",
      },
    ],
  },
];

export function countTopicsByStatus(status: TopicStatus): number {
  return topicMap.reduce(
    (count, section) =>
      count + section.topics.filter((topic) => topic.status === status).length,
    0
  );
}
