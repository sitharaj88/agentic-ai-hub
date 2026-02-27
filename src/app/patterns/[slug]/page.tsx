import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { patterns } from "@/data/patterns";
import { DifficultyBadge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pattern = patterns.find((p) => p.id === slug);
  if (!pattern) return { title: "Not Found" };
  return {
    title: `${pattern.title} — Design Pattern`,
    description: pattern.description,
  };
}

export default async function PatternPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pattern = patterns.find((p) => p.id === slug);
  if (!pattern) notFound();

  const idx = patterns.findIndex((p) => p.id === slug);
  const prev = idx > 0 ? patterns[idx - 1] : null;
  const next = idx < patterns.length - 1 ? patterns[idx + 1] : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link href="/patterns" className="hover:text-accent">Patterns</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }} className="font-medium">{pattern.title}</span>
      </nav>

      <article className="prose">
        <div className="not-prose mb-6 flex items-center gap-3">
          <DifficultyBadge level={pattern.difficulty} />
        </div>

        <h1>{pattern.title}</h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {pattern.description}
        </p>

        <h2>How It Works</h2>
        <p>
          This design pattern provides a proven architecture for building agent systems.
          It defines how agents reason, act, and coordinate to accomplish complex tasks.
        </p>
        <p>
          Detailed content including architecture diagrams, implementation examples across multiple
          frameworks, and trade-off analysis is being developed. Check back soon.
        </p>

        <h2>When to Use This Pattern</h2>
        <ul>
          <li>When you need structured agent reasoning and action cycles</li>
          <li>For building reliable, predictable agent behaviors</li>
          <li>In production systems requiring observability and debugging</li>
        </ul>

        <h2>Related Content</h2>
        <ul>
          <li>See <Link href="/concepts">core concepts</Link> for foundational knowledge</li>
          <li>Explore <Link href="/frameworks">frameworks</Link> that implement this pattern</li>
          <li>Read our <Link href="/guides">practical guides</Link> for hands-on tutorials</li>
        </ul>

        <div className="not-prose mt-12 flex items-center justify-between border-t pt-6" style={{ borderColor: "var(--border)" }}>
          {prev ? (
            <Link href={`/patterns/${prev.id}`} className="flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              <ArrowLeft size={14} /> {prev.title}
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/patterns/${next.id}`} className="flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              {next.title} <ArrowRight size={14} />
            </Link>
          ) : <div />}
        </div>
      </article>
    </div>
  );
}
