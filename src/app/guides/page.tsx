import Link from "next/link";
import { ArrowRight, BookOpen, Rocket, Code, Shield, Eye, TestTube, Zap, Brain, Plug, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides & Tutorials",
  description: "Step-by-step guides for building AI agents — from getting started to production deployment.",
};

const guides = [
  { title: "Getting Started with Agents", description: "Your first steps into the world of AI agent development.", href: "/guides/getting-started", icon: BookOpen, difficulty: "Beginner", time: "15 min" },
  { title: "Your First Agent in 5 Minutes", description: "Build a working AI agent from scratch in under 5 minutes.", href: "/guides/first-agent", icon: Rocket, difficulty: "Beginner", time: "5 min" },
  { title: "Choosing Your Stack", description: "Pick the right framework and tools for your specific use case.", href: "/guides/choosing-your-stack", icon: Layers, difficulty: "Beginner", time: "10 min" },
  { title: "Multi-Agent Architecture", description: "Design and build systems with multiple collaborating agents.", href: "/guides/multi-agent-architecture", icon: Brain, difficulty: "Intermediate", time: "20 min" },
  { title: "Building MCP Servers", description: "Create Model Context Protocol servers for your tools and data.", href: "/guides/building-mcp-servers", icon: Plug, difficulty: "Intermediate", time: "25 min" },
  { title: "Prompt Engineering for Agents", description: "Craft prompts that make your agents more reliable and capable.", href: "/guides/prompt-engineering", icon: Code, difficulty: "Intermediate", time: "15 min" },
  { title: "Guardrails & Safety", description: "Implement safety measures, input validation, and output filters.", href: "/guides/guardrails", icon: Shield, difficulty: "Advanced", time: "20 min" },
  { title: "Observability & Monitoring", description: "Monitor agent behavior, trace execution, and debug issues.", href: "/guides/observability", icon: Eye, difficulty: "Advanced", time: "20 min" },
  { title: "Evaluation & Testing", description: "Test agent performance with benchmarks and regression suites.", href: "/guides/evaluation", icon: TestTube, difficulty: "Advanced", time: "20 min" },
  { title: "Production Deployment", description: "Ship agents to production with scaling, reliability, and cost control.", href: "/guides/production-deployment", icon: Zap, difficulty: "Advanced", time: "25 min" },
];

const difficultyColors: Record<string, string> = {
  Beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Guides & Tutorials
        </h1>
        <p className="mt-3 max-w-2xl text-lg" style={{ color: "var(--text-secondary)" }}>
          Practical, step-by-step tutorials that take you from beginner to production-ready. Follow the recommended order or jump to what you need.
        </p>
      </div>

      <div className="space-y-3">
        {guides.map((guide, i) => {
          const Icon = guide.icon;
          return (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex items-center gap-4 rounded-xl border p-5 transition-all hover:border-accent hover:shadow-md"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-muted)" }}
              >
                {i + 1}
              </span>
              <Icon size={20} className="shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
                  {guide.title}
                </h3>
                <p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                  {guide.description}
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-3 sm:flex">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColors[guide.difficulty]}`}>
                  {guide.difficulty}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {guide.time}
                </span>
              </div>
              <ArrowRight size={16} className="shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
