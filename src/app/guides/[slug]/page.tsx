import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DifficultyBadge } from "@/components/ui/Badge";
import type { Metadata } from "next";

interface Guide {
  slug: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  time: string;
}

const guides: Guide[] = [
  { slug: "getting-started", title: "Getting Started with Agents", description: "Your first steps into the world of AI agent development.", difficulty: "beginner", time: "15 min" },
  { slug: "first-agent", title: "Your First Agent in 5 Minutes", description: "Build a working AI agent from scratch in under 5 minutes.", difficulty: "beginner", time: "5 min" },
  { slug: "choosing-your-stack", title: "Choosing Your Stack", description: "Pick the right framework and tools for your specific use case.", difficulty: "beginner", time: "10 min" },
  { slug: "multi-agent-architecture", title: "Multi-Agent Architecture", description: "Design and build systems with multiple collaborating agents.", difficulty: "intermediate", time: "20 min" },
  { slug: "building-mcp-servers", title: "Building MCP Servers", description: "Create Model Context Protocol servers for your tools and data.", difficulty: "intermediate", time: "25 min" },
  { slug: "prompt-engineering", title: "Prompt Engineering for Agents", description: "Craft prompts that make your agents more reliable and capable.", difficulty: "intermediate", time: "15 min" },
  { slug: "guardrails", title: "Guardrails & Safety", description: "Implement safety measures, input validation, and output filters.", difficulty: "advanced", time: "20 min" },
  { slug: "observability", title: "Observability & Monitoring", description: "Monitor agent behavior, trace execution, and debug issues in production.", difficulty: "advanced", time: "20 min" },
  { slug: "evaluation", title: "Evaluation & Testing", description: "Test agent performance with benchmarks and regression suites.", difficulty: "advanced", time: "20 min" },
  { slug: "production-deployment", title: "Production Deployment", description: "Ship agents to production with scaling, reliability, and cost control.", difficulty: "advanced", time: "25 min" },
];

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return { title: "Not Found" };
  return {
    title: `${guide.title} — Guide`,
    description: guide.description,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const idx = guides.findIndex((g) => g.slug === slug);
  const prev = idx > 0 ? guides[idx - 1] : null;
  const next = idx < guides.length - 1 ? guides[idx + 1] : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-accent">Guides</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }} className="font-medium">{guide.title}</span>
      </nav>

      <article className="prose">
        <div className="not-prose mb-4 flex items-center gap-3">
          <DifficultyBadge level={guide.difficulty} />
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>{guide.time} read</span>
        </div>

        <h1>{guide.title}</h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {guide.description}
        </p>

        <h2>What You&apos;ll Learn</h2>
        <p>
          This guide walks you through the key concepts and practical steps needed
          to {guide.title.toLowerCase()}. By the end, you&apos;ll have hands-on
          experience and be ready to apply these techniques in your own projects.
        </p>

        <h2>Prerequisites</h2>
        <ul>
          <li>Basic understanding of Python or TypeScript</li>
          <li>Familiarity with LLM APIs (OpenAI, Anthropic, etc.)</li>
          {guide.difficulty !== "beginner" && (
            <li>Completion of the <Link href="/guides/getting-started">Getting Started guide</Link></li>
          )}
        </ul>

        <h2>Step-by-Step Guide</h2>
        <p>
          Full guide content is being developed with detailed code examples, explanations,
          and best practices. Check back soon for the complete tutorial.
        </p>

        <h2>Next Steps</h2>
        <ul>
          <li>Explore the <Link href="/frameworks">frameworks</Link> mentioned in this guide</li>
          <li>Review related <Link href="/patterns">design patterns</Link></li>
          <li>Check the <Link href="/glossary">glossary</Link> for unfamiliar terms</li>
        </ul>

        <div className="not-prose mt-12 flex items-center justify-between border-t pt-6" style={{ borderColor: "var(--border)" }}>
          {prev ? (
            <Link href={`/guides/${prev.slug}`} className="flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              <ArrowLeft size={14} /> {prev.title}
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/guides/${next.slug}`} className="flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              {next.title} <ArrowRight size={14} />
            </Link>
          ) : <div />}
        </div>
      </article>
    </div>
  );
}
