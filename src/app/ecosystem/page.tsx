import Link from "next/link";
import { ArrowRight, Eye, Database, Brain, TestTube, Rocket } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecosystem & Tools",
  description:
    "Supporting tools for AI agent development — observability, vector databases, memory providers, evaluation, and deployment.",
};

const categories = [
  {
    title: "Observability & Monitoring",
    description:
      "Debug, trace, and monitor your agents in production. These tools provide end-to-end visibility into every LLM call, tool invocation, and reasoning step, helping you optimize performance, reduce costs, and diagnose failures.",
    icon: Eye,
    href: "/ecosystem/observability",
    tools: ["LangSmith", "Langfuse", "Phoenix", "Helicone"],
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    highlights: ["Tracing", "Cost analytics", "Prompt management"],
  },
  {
    title: "Vector Databases",
    description:
      "Store and retrieve embeddings for RAG and agent memory systems. Vector databases power similarity search over millions of documents, enabling agents to find relevant context in milliseconds using approximate nearest neighbor algorithms.",
    icon: Database,
    href: "/ecosystem/vector-databases",
    tools: ["Pinecone", "Weaviate", "Chroma", "Qdrant"],
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    highlights: ["Similarity search", "Hybrid retrieval", "Metadata filtering"],
  },
  {
    title: "Memory Providers",
    description:
      "Long-term memory solutions for persistent agent knowledge. These services allow agents to remember user preferences, facts, and past interactions across sessions, enabling personalized and context-aware experiences.",
    icon: Brain,
    href: "/ecosystem/memory-providers",
    tools: ["Mem0", "Zep"],
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    highlights: ["Cross-session persistence", "Auto-extraction", "Semantic recall"],
  },
  {
    title: "Evaluation & Testing",
    description:
      "Test, evaluate, and benchmark your agent performance with automated metrics. These tools measure faithfulness, relevancy, hallucination rates, and more, integrating into CI/CD pipelines to catch regressions before production.",
    icon: TestTube,
    href: "/ecosystem/evaluation-tools",
    tools: ["DeepEval", "PromptFoo", "Ragas"],
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    highlights: ["Automated metrics", "CI/CD integration", "Red-teaming"],
  },
  {
    title: "Deployment Platforms",
    description:
      "Deploy and scale your agents in the cloud with minimal DevOps overhead. From serverless GPU functions for model inference to globally distributed edge deployments, these platforms handle infrastructure so you can focus on agent logic.",
    icon: Rocket,
    href: "/ecosystem/deployment-platforms",
    tools: ["Modal", "Railway", "Fly.io"],
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    highlights: ["GPU access", "Auto-scaling", "Global regions"],
  },
];

const totalTools = categories.reduce((sum, cat) => sum + cat.tools.length, 0);

export default function EcosystemPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-3xl font-extrabold sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          Ecosystem & Tools
        </h1>
        <p
          className="mt-3 max-w-3xl text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          The supporting tools, platforms, and services that make agent
          development production-ready. Explore {totalTools} curated tools
          across {categories.length} categories.
        </p>

        {/* Stats bar */}
        <div className="mt-5 flex flex-wrap gap-4">
          <div
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--text-secondary)",
            }}
          >
            {totalTools} Tools
          </div>
          <div
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--text-secondary)",
            }}
          >
            {categories.length} Categories
          </div>
          <div
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--text-secondary)",
            }}
          >
            Comparison tables included
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex flex-col gap-4 rounded-xl border p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              {/* Icon + Tool Count */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.bg}`}
                >
                  <Icon size={24} className={cat.color} />
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    color: "var(--text-muted)",
                  }}
                >
                  {cat.tools.length} tool{cat.tools.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Title + Description */}
              <div>
                <h2
                  className="text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {cat.title}
                </h2>
                <p
                  className="mt-1.5 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {cat.description}
                </p>
              </div>

              {/* Highlight tags */}
              <div className="flex flex-wrap gap-1.5">
                {cat.highlights.map((hl) => (
                  <span
                    key={hl}
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {hl}
                  </span>
                ))}
              </div>

              {/* Tool names */}
              <div className="flex flex-wrap gap-1.5">
                {cat.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2">
                Explore tools <ArrowRight size={14} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
