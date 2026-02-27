import Link from "next/link";
import { ArrowRight, Eye, Database, Brain, TestTube, Rocket } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecosystem & Tools",
  description: "Supporting tools for AI agent development — observability, vector databases, memory providers, evaluation, and deployment.",
};

const categories = [
  {
    title: "Observability & Monitoring",
    description: "Debug, trace, and monitor your agents in production.",
    icon: Eye,
    href: "/ecosystem/observability",
    tools: ["LangSmith", "Langfuse", "Phoenix", "Helicone"],
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Vector Databases",
    description: "Store and retrieve embeddings for RAG and agent memory.",
    icon: Database,
    href: "/ecosystem/vector-databases",
    tools: ["Pinecone", "Weaviate", "Chroma", "Qdrant"],
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    title: "Memory Providers",
    description: "Long-term memory solutions for persistent agent knowledge.",
    icon: Brain,
    href: "/ecosystem/memory-providers",
    tools: ["Mem0", "Zep"],
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    title: "Evaluation Tools",
    description: "Test, evaluate, and benchmark your agent performance.",
    icon: TestTube,
    href: "/ecosystem/evaluation-tools",
    tools: ["DeepEval", "PromptFoo", "Ragas"],
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    title: "Deployment Platforms",
    description: "Deploy and scale your agents in the cloud.",
    icon: Rocket,
    href: "/ecosystem/deployment-platforms",
    tools: ["Modal", "Railway", "Fly.io"],
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
];

export default function EcosystemPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Ecosystem & Tools
        </h1>
        <p className="mt-3 max-w-2xl text-lg" style={{ color: "var(--text-secondary)" }}>
          The supporting tools, platforms, and services that make agent development production-ready.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex flex-col gap-4 rounded-xl border p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.bg}`}>
                <Icon size={24} className={cat.color} />
              </div>

              <div>
                <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {cat.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

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
