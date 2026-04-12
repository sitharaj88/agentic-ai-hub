import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { DifficultyBadge } from "@/components/ui/Badge";
import type { Metadata } from "next";

interface LearningPath {
  slug: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  steps: { title: string; href: string; time: string; description: string }[];
}

const paths: LearningPath[] = [
  {
    slug: "beginner",
    title: "Start Here — Foundations Path",
    description: "New to GenAI and agents? This path takes you from core concepts to a working first agent.",
    difficulty: "beginner",
    estimatedTime: "3.5 hours",
    steps: [
      { title: "What Are AI Agents?", href: "/concepts/what-are-ai-agents", time: "10 min", description: "Understand what agents are and how they differ from simple chatbots." },
      { title: "Tool Use & Function Calling", href: "/concepts/tool-use", time: "15 min", description: "Learn how models use tools to interact with the outside world." },
      { title: "Model Selection & Routing", href: "/concepts/model-selection-routing", time: "12 min", description: "Learn how to choose the right model for each step and control cost and latency." },
      { title: "Structured Outputs", href: "/concepts/structured-outputs", time: "12 min", description: "See how schema-constrained outputs make GenAI systems safer and easier to automate." },
      { title: "Multimodal GenAI", href: "/concepts/multimodal-genai", time: "12 min", description: "Understand how GenAI systems extend beyond text into documents, images, audio, and mixed-modal flows." },
      { title: "Memory Systems", href: "/concepts/memory-systems", time: "15 min", description: "See how agents retain context and persistent knowledge across steps." },
      { title: "Planning & Reasoning", href: "/concepts/planning-and-reasoning", time: "15 min", description: "Discover how agents plan, deliberate, and solve multi-step tasks." },
      { title: "Context Engineering", href: "/concepts/context-engineering", time: "12 min", description: "Understand how prompts, memory, retrieval, and tool results should be assembled." },
      { title: "Fine-Tuning vs RAG vs Tools vs Workflows", href: "/concepts/fine-tuning-vs-rag-tools-workflows", time: "12 min", description: "Learn how to choose the right system pattern instead of defaulting to a single technique." },
      { title: "Getting Started with Agents", href: "/guides/getting-started", time: "15 min", description: "Tie the fundamentals together before you begin implementing." },
      { title: "Your First Agent in 5 Minutes", href: "/guides/first-agent", time: "20 min", description: "Build a working agent from scratch." },
      { title: "Choosing Your Stack", href: "/guides/choosing-your-stack", time: "10 min", description: "Pick the right framework and runtime for your first project." },
    ],
  },
  {
    slug: "python",
    title: "Python Developer Path",
    description: "Build powerful agents with Python frameworks like LangGraph, CrewAI, and PydanticAI.",
    difficulty: "intermediate",
    estimatedTime: "2.5 hours",
    steps: [
      { title: "Getting Started (Python)", href: "/guides/getting-started-python", time: "15 min", description: "Agent fundamentals, Python setup, and your first hello-world agent." },
      { title: "LangGraph Deep Dive", href: "/frameworks/langgraph", time: "20 min", description: "Master graph-based stateful agents." },
      { title: "CrewAI Deep Dive", href: "/frameworks/crewai", time: "20 min", description: "Build role-based agent teams." },
      { title: "PydanticAI Deep Dive", href: "/frameworks/pydantic-ai", time: "15 min", description: "Type-safe agents with Pydantic." },
      { title: "Multi-Agent Architecture", href: "/guides/multi-agent-architecture", time: "20 min", description: "Design multi-agent systems." },
      { title: "Building MCP Servers", href: "/guides/building-mcp-servers", time: "25 min", description: "Create tool integrations with MCP." },
      { title: "Production Deployment", href: "/guides/production-deployment", time: "25 min", description: "Ship your Python agents." },
    ],
  },
  {
    slug: "typescript",
    title: "TypeScript Developer Path",
    description: "Agent development in the TypeScript ecosystem with Vercel AI SDK, Mastra, and CopilotKit.",
    difficulty: "intermediate",
    estimatedTime: "2.5 hours",
    steps: [
      { title: "Getting Started (TypeScript)", href: "/guides/getting-started-typescript", time: "15 min", description: "Agent fundamentals, TypeScript setup with Vercel AI SDK, and your first agent." },
      { title: "Vercel AI SDK Deep Dive", href: "/frameworks/vercel-ai-sdk", time: "20 min", description: "Build AI-powered web apps with TypeScript." },
      { title: "Mastra Deep Dive", href: "/frameworks/mastra", time: "15 min", description: "TypeScript-first agent framework." },
      { title: "CopilotKit Deep Dive", href: "/frameworks/copilotkit", time: "15 min", description: "React components for AI copilots." },
      { title: "GenAI Product UX", href: "/guides/genai-product-ux", time: "18 min", description: "Design streaming, evidence-rich, user-facing GenAI experiences that feel trustworthy." },
      { title: "Prompt Engineering", href: "/guides/prompt-engineering", time: "15 min", description: "Craft effective agent prompts." },
      { title: "Production Deployment", href: "/guides/production-deployment", time: "25 min", description: "Deploy your TypeScript agents." },
    ],
  },
  {
    slug: "production",
    title: "Production Engineer Path",
    description: "Ship, monitor, and scale AI agents in production environments.",
    difficulty: "advanced",
    estimatedTime: "4 hours",
    steps: [
      { title: "Human-in-the-Loop Design", href: "/concepts/human-in-the-loop-design", time: "12 min", description: "Design approval gates and escalation paths before increasing system autonomy." },
      { title: "Auth, Tenancy & Data Boundaries", href: "/concepts/auth-tenancy-data-boundaries", time: "12 min", description: "Understand the access-control and isolation constraints that matter in real deployments." },
      { title: "Workflow Reliability", href: "/concepts/workflow-reliability", time: "12 min", description: "Add retries, idempotency, and bounded autonomy before trusting multi-step workflows." },
      { title: "Guardrails & Safety", href: "/guides/guardrails", time: "20 min", description: "Implement safety measures and validation." },
      { title: "Computer Use & Browser Automation", href: "/concepts/computer-use-browser-automation", time: "12 min", description: "Learn when UI-acting agents are justified and what additional controls they need." },
      { title: "Observability & Monitoring", href: "/guides/observability", time: "20 min", description: "Monitor agent behavior in production." },
      { title: "Evaluation & Testing", href: "/guides/evaluation", time: "20 min", description: "Test and benchmark agent performance." },
      { title: "Dataset & Prompt Versioning", href: "/guides/dataset-prompt-versioning", time: "18 min", description: "Keep prompt, dataset, and retrieval changes reproducible and reviewable." },
      { title: "Cost Engineering", href: "/guides/cost-engineering", time: "20 min", description: "Control spend with routing, caching, quotas, and cost-aware runtime limits." },
      { title: "Governance & Compliance", href: "/guides/governance-compliance", time: "20 min", description: "Add auditability, policy controls, and approval workflows to production systems." },
      { title: "Observability Tools", href: "/ecosystem/observability", time: "15 min", description: "Explore LangSmith, Langfuse, and more." },
      { title: "Evaluation Tools", href: "/ecosystem/evaluation-tools", time: "15 min", description: "Explore DeepEval, PromptFoo, and more." },
      { title: "Production Deployment", href: "/guides/production-deployment", time: "25 min", description: "Scale and deploy with confidence." },
      { title: "Deployment Platforms", href: "/ecosystem/deployment-platforms", time: "15 min", description: "Modal, Railway, Fly.io, and more." },
    ],
  },
];

export function generateStaticParams() {
  return paths.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = paths.find((p) => p.slug === slug);
  if (!path) return { title: "Not Found" };
  return { title: path.title, description: path.description };
}

export default async function LearningPathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = paths.find((p) => p.slug === slug);
  if (!path) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }} className="font-medium">Learning Path</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge level={path.difficulty} />
          <span className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
            <Clock size={14} /> {path.estimatedTime}
          </span>
          <span className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
            <BookOpen size={14} /> {path.steps.length} lessons
          </span>
        </div>
        <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          {path.title}
        </h1>
        <p className="mt-3 text-lg" style={{ color: "var(--text-secondary)" }}>
          {path.description}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {path.steps.map((step, i) => (
          <Link
            key={step.href}
            href={step.href}
            className="group flex items-center gap-4 rounded-xl border p-5 transition-all hover:border-accent hover:shadow-md"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-muted)" }}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
                {step.title}
              </h3>
              <p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                {step.description}
              </p>
            </div>
            <span className="hidden shrink-0 text-xs sm:block" style={{ color: "var(--text-muted)" }}>
              {step.time}
            </span>
            <ArrowRight size={16} className="shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}
