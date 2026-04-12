import Link from "next/link";
import { ArrowRight, BookOpen, Rocket, Code, Shield, Eye, TestTube, Zap, Brain, Plug, Layers, Terminal, FileCode, DollarSign, Scale, GitBranch, PanelsTopLeft, MessageSquare, Search, FileText } from "lucide-react";
import type { Metadata } from "next";
import { guideContents } from "@/data/guide-content";

export const metadata: Metadata = {
  title: "Guides & Tutorials",
  description: "Step-by-step guides for building AI agents — from getting started to production deployment.",
};

const guideIcons = {
  "getting-started": BookOpen,
  "getting-started-python": Terminal,
  "getting-started-typescript": FileCode,
  "first-agent": Rocket,
  "choosing-your-stack": Layers,
  "multi-agent-architecture": Brain,
  "building-mcp-servers": Plug,
  "prompt-engineering": Code,
  "guardrails": Shield,
  "observability": Eye,
  "evaluation": TestTube,
  "production-deployment": Zap,
  "cost-engineering": DollarSign,
  "governance-compliance": Scale,
  "dataset-prompt-versioning": GitBranch,
  "genai-product-ux": PanelsTopLeft,
  "framework-cookbook-support-copilot": Layers,
  "case-study-support-agent": MessageSquare,
  "case-study-research-agent": Search,
  "case-study-coding-agent": FileCode,
  "case-study-document-workflows": FileText,
} as const;

const guides = guideContents.map((guide) => ({
  title: guide.title,
  description: guide.description,
  href: `/guides/${guide.slug}`,
  icon: guideIcons[guide.slug as keyof typeof guideIcons] ?? BookOpen,
  difficulty: guide.difficulty[0].toUpperCase() + guide.difficulty.slice(1),
  time: guide.time,
}));

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
