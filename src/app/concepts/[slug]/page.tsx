import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { concepts } from "@/data/concepts";
import { DifficultyBadge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export function generateStaticParams() {
  return concepts.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concept = concepts.find((c) => c.id === slug);
  if (!concept) return { title: "Not Found" };
  return {
    title: concept.title,
    description: concept.description,
  };
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = concepts.find((c) => c.id === slug);
  if (!concept) notFound();

  const idx = concepts.findIndex((c) => c.id === slug);
  const prev = idx > 0 ? concepts[idx - 1] : null;
  const next = idx < concepts.length - 1 ? concepts[idx + 1] : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link href="/concepts" className="hover:text-accent">Concepts</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }} className="font-medium">{concept.title}</span>
      </nav>

      <article className="prose">
        <div className="not-prose mb-6 flex items-center gap-3">
          <DifficultyBadge level={concept.difficulty} />
        </div>

        <h1>{concept.title}</h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {concept.description}
        </p>

        <h2>Overview</h2>
        <p>
          This concept is fundamental to understanding how AI agents work. It covers the theoretical
          foundations and practical implications for building effective agent systems.
        </p>
        <p>
          Detailed content for this concept page is being developed. Check back soon for comprehensive
          explanations, diagrams, code examples, and links to frameworks that implement this concept.
        </p>

        <h2>Related Frameworks</h2>
        <p>
          Many frameworks implement this concept in different ways. Visit the{" "}
          <Link href="/frameworks">frameworks page</Link> to explore how each one approaches{" "}
          {concept.title.toLowerCase()}.
        </p>

        <h2>Further Reading</h2>
        <ul>
          <li>Explore <Link href="/patterns">design patterns</Link> that leverage this concept</li>
          <li>Read our <Link href="/guides">practical guides</Link> to see it in action</li>
          <li>Check the <Link href="/glossary">glossary</Link> for related terminology</li>
        </ul>

        {/* Prev/Next */}
        <div className="not-prose mt-12 flex items-center justify-between border-t pt-6" style={{ borderColor: "var(--border)" }}>
          {prev ? (
            <Link href={`/concepts/${prev.id}`} className="flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              <ArrowLeft size={14} /> {prev.title}
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/concepts/${next.id}`} className="flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              {next.title} <ArrowRight size={14} />
            </Link>
          ) : <div />}
        </div>
      </article>
    </div>
  );
}
