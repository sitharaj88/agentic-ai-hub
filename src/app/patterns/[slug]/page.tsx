import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BookOpen,
  Code2,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { patterns } from "@/data/patterns";
import { patternContent, getPatternContent } from "@/data/pattern-content";
import { frameworks } from "@/data/frameworks";
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
  const content = getPatternContent(slug);
  if (!content) return { title: "Not Found" };
  return {
    title: `${content.title} — Design Pattern`,
    description: content.description,
  };
}

export default async function PatternPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getPatternContent(slug);
  const pattern = patterns.find((p) => p.id === slug);
  if (!content || !pattern) notFound();

  const idx = patternContent.findIndex((p) => p.id === slug);
  const prev = idx > 0 ? patternContent[idx - 1] : null;
  const next = idx < patternContent.length - 1 ? patternContent[idx + 1] : null;

  const implementedByFrameworks = content.implementedBy
    .map((id) => frameworks.find((f) => f.id === id))
    .filter(Boolean);

  const relatedPatterns = content.relatedPatterns
    .map((id) => patternContent.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav
        className="mb-6 flex items-center gap-2 text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span>/</span>
        <Link href="/patterns" className="hover:text-accent">
          Patterns
        </Link>
        <span>/</span>
        <span
          style={{ color: "var(--text-primary)" }}
          className="font-medium"
        >
          {content.title}
        </span>
      </nav>

      <article>
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <DifficultyBadge level={content.difficulty} />
          </div>
          <h1
            className="text-3xl font-extrabold sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            {content.title}
          </h1>
          <p
            className="mt-3 text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {content.description}
          </p>
        </div>

        {/* Pseudocode / Algorithm Box */}
        <div
          className="mb-10 overflow-hidden rounded-xl border"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-code)",
          }}
        >
          <div
            className="flex items-center gap-2 border-b px-4 py-3"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <Code2
              size={16}
              style={{ color: "var(--color-accent)" }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Algorithm / Pseudocode
            </span>
          </div>
          <pre
            className="overflow-x-auto p-5"
            style={{ margin: 0, border: "none", background: "none" }}
          >
            <code
              className="text-sm leading-relaxed"
              style={{
                fontFamily:
                  '"JetBrains Mono", "Fira Code", "Cascadia Code", "SF Mono", monospace',
                color: "var(--text-secondary)",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              {content.pseudocode}
            </code>
          </pre>
        </div>

        {/* When to Use / When NOT to Use — Side by Side */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {/* When to Use */}
          <div
            className="rounded-xl border p-5"
            style={{
              borderColor: "#16a34a33",
              backgroundColor: "var(--callout-tip-bg)",
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="shrink-0"
                style={{ color: "#16a34a" }}
              />
              <h3
                className="text-sm font-bold uppercase tracking-wide"
                style={{ color: "#16a34a" }}
              >
                When to Use
              </h3>
            </div>
            <ul className="space-y-2">
              {content.whenToUse.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: "#16a34a" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* When NOT to Use */}
          <div
            className="rounded-xl border p-5"
            style={{
              borderColor: "#dc262633",
              backgroundColor: "var(--callout-danger-bg)",
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <XCircle
                size={18}
                className="shrink-0"
                style={{ color: "#dc2626" }}
              />
              <h3
                className="text-sm font-bold uppercase tracking-wide"
                style={{ color: "#dc2626" }}
              >
                When NOT to Use
              </h3>
            </div>
            <ul className="space-y-2">
              {content.whenNotToUse.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: "#dc2626" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose mb-10">
          {content.sections.map((section, i) => (
            <section key={i}>
              <h2>{section.title}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}
        </div>

        {/* Implemented By — Framework Links */}
        {implementedByFrameworks.length > 0 && (
          <div
            className="mb-10 rounded-xl border p-6"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Layers
                size={18}
                style={{ color: "var(--color-accent)" }}
              />
              <h3
                className="text-base font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Implemented By
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {implementedByFrameworks.map((fw) =>
                fw ? (
                  <Link
                    key={fw.id}
                    href={`/frameworks/${fw.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--bg-card)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {fw.name}
                    <ArrowUpRight
                      size={12}
                      style={{ color: "var(--text-muted)" }}
                    />
                  </Link>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Related Patterns */}
        {relatedPatterns.length > 0 && (
          <div
            className="mb-10 rounded-xl border p-6"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <div className="mb-4 flex items-center gap-2">
              <BookOpen
                size={18}
                style={{ color: "var(--color-accent)" }}
              />
              <h3
                className="text-base font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Related Patterns
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPatterns.map((rp) =>
                rp ? (
                  <Link
                    key={rp.id}
                    href={`/patterns/${rp.id}`}
                    className="group rounded-lg border p-4 transition-colors hover:border-accent"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--bg-card)",
                    }}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {rp.title}
                      </span>
                      <DifficultyBadge level={rp.difficulty} />
                    </div>
                    <p
                      className="line-clamp-2 text-xs leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {rp.description}
                    </p>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Previous / Next Navigation */}
        <div
          className="mt-12 flex items-center justify-between border-t pt-6"
          style={{ borderColor: "var(--border)" }}
        >
          {prev ? (
            <Link
              href={`/patterns/${prev.id}`}
              className="group flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors hover:border-accent"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <ArrowLeft
                size={16}
                style={{ color: "var(--text-muted)" }}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              <div>
                <div
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  Previous
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {prev.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/patterns/${next.id}`}
              className="group flex items-center gap-3 rounded-lg border px-4 py-3 text-right transition-colors hover:border-accent"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <div>
                <div
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  Next
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {next.title}
                </div>
              </div>
              <ArrowRight
                size={16}
                style={{ color: "var(--text-muted)" }}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>
    </div>
  );
}
