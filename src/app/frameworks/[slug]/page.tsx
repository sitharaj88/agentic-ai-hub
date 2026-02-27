import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, ArrowLeft, ArrowRight, Check, X, Building, Code } from "lucide-react";
import { frameworks, getFramework } from "@/data/frameworks";
import { CategoryBadge, LanguageBadge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { MobileToC } from "@/components/content/MobileToC";
import { RelatedContent } from "@/components/content/RelatedContent";
import { EditOnGithub } from "@/components/content/EditOnGithub";
import { LastUpdated } from "@/components/content/LastUpdated";
import { KeyboardNav } from "@/components/ui/KeyboardNav";
import { TechArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
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
    title: `${fw.name} — Agent Framework Deep Dive`,
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

  const idx = frameworks.findIndex((f) => f.id === slug);
  const prev = idx > 0 ? frameworks[idx - 1] : null;
  const next = idx < frameworks.length - 1 ? frameworks[idx + 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <TechArticleJsonLd
        title={fw.name}
        description={fw.description}
        slug={slug}
        developer={fw.developer}
        languages={fw.language}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Frameworks", href: "/frameworks/" },
          { name: fw.name, href: `/frameworks/${slug}/` },
        ]}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link href="/frameworks" className="hover:text-accent">Frameworks</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }} className="font-medium">{fw.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:gap-12">
        {/* ===== Main Content ===== */}
        <article className="prose max-w-none min-w-0">
          {/* Header */}
          <div className="not-prose mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <CategoryBadge category={fw.category} />
              {fw.language.map((l) => (
                <LanguageBadge key={l} language={l} />
              ))}
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              {fw.name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                by {fw.developer}
              </span>
              <LastUpdated type="framework" slug={slug} />
            </div>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {fw.description}
            </p>
          </div>

          <MobileToC
            items={[
              { id: "architecture-overview", title: "Architecture Overview" },
              { id: "when-to-use", title: "When to Use" },
              { id: "strengths-weaknesses", title: "Strengths & Weaknesses" },
              { id: "quick-start", title: "Quick Start" },
              { id: "features-at-a-glance", title: "Features at a Glance" },
              { id: "notable-users", title: "Notable Users" },
              { id: "resources", title: "Resources" },
            ]}
          />

          {/* Architecture Overview */}
          {"architecture" in fw && fw.architecture && (
            <>
              <h2>Architecture Overview</h2>
              <p>{fw.architecture}</p>
            </>
          )}

          {/* When to Use */}
          <h2>When to Use {fw.name}</h2>
          <ul>
            {fw.use_cases.map((uc) => (
              <li key={uc}>{uc}</li>
            ))}
          </ul>

          {/* Strengths & Weaknesses */}
          <h2>Strengths & Weaknesses</h2>
          <div className="not-prose grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-emerald-600">
                <Check size={16} /> Strengths
              </h4>
              <ul className="space-y-2">
                {fw.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <Check size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-500">
                <X size={16} /> Weaknesses
              </h4>
              <ul className="space-y-2">
                {fw.weaknesses.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <X size={14} className="mt-0.5 shrink-0 text-red-400" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Start Code Example */}
          {"code_example" in fw && fw.code_example && (
            <>
              <h2>Quick Start</h2>
              <div className="not-prose relative">
                <div className="code-block-wrapper" style={{ margin: 0 }}>
                  <div className="code-block-header">
                    <span className="code-block-lang">
                      <Code size={14} />
                      {"code_language" in fw ? fw.code_language : "python"}
                    </span>
                    <CopyButton text={fw.code_example} />
                  </div>
                  <pre className="code-block-pre">
                    <code>{fw.code_example}</code>
                  </pre>
                </div>
              </div>
            </>
          )}

          {/* Features Table */}
          <h2>Features at a Glance</h2>
          <div className="not-prose overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm" style={{ margin: 0 }}>
              <tbody>
                {[
                  { label: "Developer", value: fw.developer },
                  { label: "Language", value: fw.language.join(", ") },
                  { label: "License", value: fw.license },
                  { label: "GitHub Stars", value: fw.stars_approx },
                  { label: "MCP Support", value: fw.mcp_support ? "Yes" : "No", icon: fw.mcp_support },
                  { label: "Multi-Agent", value: fw.multi_agent ? "Yes" : "No", icon: fw.multi_agent },
                ].map((row, i) => (
                  <tr
                    key={row.label}
                    style={{
                      borderBottom: i < 5 ? "1px solid var(--border)" : undefined,
                      backgroundColor: i % 2 === 0 ? "var(--bg-secondary)" : "var(--bg-card)",
                    }}
                  >
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--text-primary)", width: "40%" }}>
                      {row.label}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                      {"icon" in row ? (
                        <span className="flex items-center gap-2">
                          {row.icon ? (
                            <Check size={16} className="text-emerald-500" />
                          ) : (
                            <X size={16} className="text-red-400 opacity-50" />
                          )}
                          {row.value}
                        </span>
                      ) : (
                        row.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notable Users */}
          {"notable_users" in fw && Array.isArray(fw.notable_users) && fw.notable_users.length > 0 && (
            <>
              <h2>Notable Users</h2>
              <div className="not-prose flex flex-wrap gap-3">
                {fw.notable_users.map((user: string) => (
                  <span
                    key={user}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium"
                    style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                  >
                    <Building size={14} style={{ color: "var(--text-muted)" }} />
                    {user}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Resources */}
          <h2>Resources</h2>
          <div className="not-prose grid gap-3 sm:grid-cols-2">
            <a
              href={fw.docs_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border p-4 transition-all hover:border-accent hover:shadow-sm"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
            >
              <ExternalLink size={18} className="shrink-0 text-accent" />
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Official Documentation</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{fw.docs_url}</div>
              </div>
            </a>
            <a
              href={fw.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border p-4 transition-all hover:border-accent hover:shadow-sm"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
            >
              <ExternalLink size={18} className="shrink-0 text-accent" />
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>GitHub Repository</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{fw.github_url}</div>
              </div>
            </a>
          </div>

          {/* Related Content (cross-section) */}
          <RelatedContent type="framework" slug={slug} />

          {/* Prev/Next Navigation */}
          <div className="not-prose mt-12 grid gap-4 border-t pt-6 sm:grid-cols-2" style={{ borderColor: "var(--border)" }}>
            {prev ? (
              <Link
                href={`/frameworks/${prev.id}`}
                className="flex flex-col rounded-xl border p-4 transition-all hover:border-accent"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  <ArrowLeft size={12} /> Previous
                </span>
                <span className="mt-1 font-semibold text-accent">{prev.name}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/frameworks/${next.id}`}
                className="flex flex-col items-end rounded-xl border p-4 text-right transition-all hover:border-accent"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  Next <ArrowRight size={12} />
                </span>
                <span className="mt-1 font-semibold text-accent">{next.name}</span>
              </Link>
            ) : <div />}
          </div>

          {/* Edit on GitHub */}
          <div className="not-prose mt-4 flex justify-end">
            <EditOnGithub filePath={`src/app/frameworks/[slug]/page.tsx`} />
          </div>
        </article>

        <KeyboardNav
          prevHref={prev ? `/frameworks/${prev.id}` : null}
          nextHref={next ? `/frameworks/${next.id}` : null}
        />

        {/* ===== Sidebar ===== */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            {/* Quick Facts */}
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Quick Facts
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Category", content: <CategoryBadge category={fw.category} /> },
                  { label: "Language", content: <div className="flex gap-1">{fw.language.map((l) => <LanguageBadge key={l} language={l} />)}</div> },
                  { label: "License", content: <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{fw.license}</span> },
                  { label: "Stars", content: <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{fw.stars_approx}</span> },
                  { label: "MCP", content: fw.mcp_support ? <Check size={16} className="text-emerald-500" /> : <X size={16} className="text-red-400 opacity-50" /> },
                  { label: "Multi-Agent", content: fw.multi_agent ? <Check size={16} className="text-emerald-500" /> : <X size={16} className="text-red-400 opacity-50" /> },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between"
                    style={i > 0 ? { borderTop: "1px solid var(--border)", paddingTop: "0.75rem" } : undefined}
                  >
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>{row.label}</span>
                    {row.content}
                  </div>
                ))}
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

            {/* On This Page */}
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                On This Page
              </h3>
              <ul className="space-y-1.5">
                {[
                  "Architecture Overview",
                  "When to Use",
                  "Strengths & Weaknesses",
                  "Quick Start",
                  "Features at a Glance",
                  "Notable Users",
                  "Resources",
                ].map((item) => (
                  <li key={item}>
                    <span
                      className="block cursor-pointer rounded px-2 py-1 text-sm transition-colors hover:bg-accent/10 hover:text-accent"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compare */}
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
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
