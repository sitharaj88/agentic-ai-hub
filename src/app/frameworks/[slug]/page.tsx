import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { frameworks, getFramework } from "@/data/frameworks";
import { CategoryBadge, LanguageBadge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export function generateStaticParams() {
  return frameworks.map((fw) => ({ slug: fw.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fw = getFramework(slug);
  if (!fw) return { title: "Not Found" };
  return {
    title: `${fw.name} — Agent Framework Guide`,
    description: fw.description,
  };
}

export default async function FrameworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fw = getFramework(slug);
  if (!fw) notFound();

  // Find prev/next for navigation
  const idx = frameworks.findIndex((f) => f.id === slug);
  const prev = idx > 0 ? frameworks[idx - 1] : null;
  const next = idx < frameworks.length - 1 ? frameworks[idx + 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link href="/frameworks" className="hover:text-accent">Frameworks</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }} className="font-medium">{fw.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Main Content */}
        <article className="prose min-w-0">
          <h1>{fw.name}</h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {fw.description}
          </p>

          <h2>When to Use {fw.name}</h2>
          <ul>
            {fw.use_cases.map((uc) => (
              <li key={uc}>{uc}</li>
            ))}
          </ul>

          <h2>Key Strengths</h2>
          <div className="not-prose grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-emerald-600">
                Strengths
              </h4>
              <ul className="space-y-2">
                {fw.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-red-500">
                Weaknesses
              </h4>
              <ul className="space-y-2">
                {fw.weaknesses.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <X size={16} className="mt-0.5 shrink-0 text-red-400" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2>Quick Start</h2>
          <p>Get started with {fw.name} by visiting the official documentation:</p>
          <div className="not-prose flex gap-3">
            <a
              href={fw.docs_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
            >
              Official Docs <ExternalLink size={14} />
            </a>
            <a
              href={fw.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--bg-secondary)]"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              GitHub Repository <ExternalLink size={14} />
            </a>
          </div>

          <h2>Features at a Glance</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>MCP Support</strong></td>
                <td>{fw.mcp_support ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td><strong>Multi-Agent</strong></td>
                <td>{fw.multi_agent ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td><strong>Language</strong></td>
                <td>{fw.language.join(", ")}</td>
              </tr>
              <tr>
                <td><strong>License</strong></td>
                <td>{fw.license}</td>
              </tr>
              <tr>
                <td><strong>GitHub Stars</strong></td>
                <td>{fw.stars_approx}</td>
              </tr>
            </tbody>
          </table>

          {/* Prev/Next */}
          <div className="not-prose mt-12 flex items-center justify-between border-t pt-6" style={{ borderColor: "var(--border)" }}>
            {prev ? (
              <Link
                href={`/frameworks/${prev.id}`}
                className="flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              >
                <ArrowLeft size={14} /> {prev.name}
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/frameworks/${next.id}`}
                className="flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              >
                {next.name} <ArrowRight size={14} />
              </Link>
            ) : <div />}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div
            className="sticky top-24 space-y-4"
          >
            {/* Quick Facts */}
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <h3
                className="mb-4 text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Quick Facts
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>Category</span>
                  <CategoryBadge category={fw.category} />
                </div>
                <div className="flex items-center justify-between" style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>Language</span>
                  <div className="flex gap-1">
                    {fw.language.map((l) => (
                      <LanguageBadge key={l} language={l} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between" style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>License</span>
                  <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{fw.license}</span>
                </div>
                <div className="flex items-center justify-between" style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>Stars</span>
                  <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{fw.stars_approx}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={fw.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
                >
                  View on GitHub
                </a>
                <a
                  href={fw.docs_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors hover:bg-[var(--bg-secondary)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                >
                  Official Docs
                </a>
              </div>
            </div>

            {/* Compare */}
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <h3
                className="mb-3 text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Compare
              </h3>
              <Link
                href="/compare"
                className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors hover:bg-[var(--bg-secondary)]"
                style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
              >
                View Comparison Table <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
