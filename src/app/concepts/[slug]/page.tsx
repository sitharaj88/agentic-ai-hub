import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Layers, Boxes } from "lucide-react";
import { concepts } from "@/data/concepts";
import { getConceptContent } from "@/data/concept-content";
import { frameworks } from "@/data/frameworks";
import { patterns } from "@/data/patterns";
import { DifficultyBadge } from "@/components/ui/Badge";
import { TableOfContents } from "@/components/content/TableOfContents";
import { MobileToC } from "@/components/content/MobileToC";
import { ProseCodeBlocks } from "@/components/content/ProseCodeBlocks";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { RelatedContent } from "@/components/content/RelatedContent";
import { EditOnGithub } from "@/components/content/EditOnGithub";
import { LastUpdated } from "@/components/content/LastUpdated";
import { KeyboardNav } from "@/components/ui/KeyboardNav";
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

  const content = getConceptContent(slug);
  const idx = concepts.findIndex((c) => c.id === slug);
  const prev = idx > 0 ? concepts[idx - 1] : null;
  const next = idx < concepts.length - 1 ? concepts[idx + 1] : null;

  // Resolve related frameworks and patterns
  const relatedFrameworks = content
    ? content.relatedFrameworks
        .map((id) => frameworks.find((f) => f.id === id))
        .filter(Boolean)
    : [];
  const relatedPatterns = content
    ? content.relatedPatterns
        .map((id) => patterns.find((p) => p.id === id))
        .filter(Boolean)
    : [];

  // Build ToC items from sections + static sections
  const tocItems = content
    ? [
        ...content.sections.map((s) => ({ id: s.id, title: s.title })),
        { id: "key-takeaways", title: "Key Takeaways" },
        ...(relatedFrameworks.length > 0
          ? [{ id: "related-frameworks", title: "Related Frameworks" }]
          : []),
        ...(relatedPatterns.length > 0
          ? [{ id: "related-patterns", title: "Related Patterns" }]
          : []),
      ]
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <ArticleJsonLd
        title={concept.title}
        description={concept.description}
        slug={slug}
        section="concepts"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Concepts", href: "/concepts/" },
          { name: concept.title, href: `/concepts/${slug}/` },
        ]}
      />

      {/* Breadcrumb */}
      <nav
        className="mb-6 flex items-center gap-2 text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span>/</span>
        <Link href="/concepts" className="hover:text-accent">
          Concepts
        </Link>
        <span>/</span>
        <span
          style={{ color: "var(--text-primary)" }}
          className="font-medium"
        >
          {concept.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px] lg:gap-12">
        {/* Main content */}
        <ProseCodeBlocks>
        <article className="prose max-w-none min-w-0">
          <div className="not-prose mb-6 flex flex-wrap items-center gap-3">
            <DifficultyBadge level={concept.difficulty} />
            <span
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {content
                ? `${content.sections.length} sections`
                : ""}
            </span>
            <LastUpdated type="concept" slug={slug} />
          </div>

          <h1>{concept.title}</h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {concept.description}
          </p>

          {tocItems.length > 0 && <MobileToC items={tocItems} />}

          {content ? (
            <>
              {/* Render all sections */}
              {content.sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}

              {/* Key Takeaways */}
              <section id="key-takeaways" className="not-prose">
                <div
                  className="mt-10 rounded-xl border p-6"
                  style={{
                    borderColor: "var(--callout-tip-border)",
                    background: "var(--callout-tip-bg)",
                  }}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Lightbulb
                      size={20}
                      style={{ color: "var(--callout-tip-border)" }}
                    />
                    <h2
                      className="text-lg font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Key Takeaways
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {content.keyTakeaways.map((takeaway, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span
                          className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                          style={{
                            background: "var(--callout-tip-border)",
                            color: "#fff",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Related Frameworks */}
              {relatedFrameworks.length > 0 && (
                <section id="related-frameworks" className="not-prose">
                  <div className="mt-10">
                    <div className="mb-4 flex items-center gap-2">
                      <Boxes
                        size={20}
                        style={{ color: "var(--text-muted)" }}
                      />
                      <h2
                        className="text-lg font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Related Frameworks
                      </h2>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {relatedFrameworks.map((fw) =>
                        fw ? (
                          <Link
                            key={fw.id}
                            href={`/frameworks/${fw.id}`}
                            className="group rounded-lg border p-4 transition-all hover:shadow-md"
                            style={{
                              borderColor: "var(--border)",
                              background: "var(--bg-card)",
                            }}
                          >
                            <p
                              className="font-semibold group-hover:text-accent"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {fw.name}
                            </p>
                            <p
                              className="mt-1 text-sm"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {fw.tagline}
                            </p>
                          </Link>
                        ) : null
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* Related Patterns */}
              {relatedPatterns.length > 0 && (
                <section id="related-patterns" className="not-prose">
                  <div className="mt-10">
                    <div className="mb-4 flex items-center gap-2">
                      <Layers
                        size={20}
                        style={{ color: "var(--text-muted)" }}
                      />
                      <h2
                        className="text-lg font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Related Patterns
                      </h2>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {relatedPatterns.map((pt) =>
                        pt ? (
                          <Link
                            key={pt.id}
                            href={`/patterns/${pt.id}`}
                            className="group rounded-lg border p-4 transition-all hover:shadow-md"
                            style={{
                              borderColor: "var(--border)",
                              background: "var(--bg-card)",
                            }}
                          >
                            <p
                              className="font-semibold group-hover:text-accent"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {pt.title}
                            </p>
                            <p
                              className="mt-1 text-sm"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {pt.description}
                            </p>
                          </Link>
                        ) : null
                      )}
                    </div>
                  </div>
                </section>
              )}
            </>
          ) : (
            <>
              <h2>Overview</h2>
              <p>
                This concept is fundamental to understanding how AI agents
                work. Detailed content is being developed.
              </p>
            </>
          )}

          {/* Related Content (cross-section) */}
          <RelatedContent type="concept" slug={slug} />

          {/* Prev/Next Navigation */}
          <div
            className="not-prose mt-12 flex items-center justify-between border-t pt-6"
            style={{ borderColor: "var(--border)" }}
          >
            {prev ? (
              <Link
                href={`/concepts/${prev.id}`}
                className="group flex items-center gap-3 rounded-lg border px-4 py-3 transition-all hover:shadow-md"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-card)",
                }}
              >
                <ArrowLeft
                  size={16}
                  className="text-accent transition-transform group-hover:-translate-x-0.5"
                />
                <div>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Previous
                  </p>
                  <p
                    className="text-sm font-medium group-hover:text-accent"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/concepts/${next.id}`}
                className="group flex items-center gap-3 rounded-lg border px-4 py-3 text-right transition-all hover:shadow-md"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-card)",
                }}
              >
                <div>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Next
                  </p>
                  <p
                    className="text-sm font-medium group-hover:text-accent"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {next.title}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-accent transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Edit on GitHub */}
          <div className="not-prose mt-4 flex justify-end">
            <EditOnGithub filePath={`src/app/concepts/[slug]/page.tsx`} />
          </div>
        </article>
        </ProseCodeBlocks>

        <KeyboardNav
          prevHref={prev ? `/concepts/${prev.id}` : null}
          nextHref={next ? `/concepts/${next.id}` : null}
        />

        {/* Sticky Table of Contents sidebar */}
        {content && tocItems.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <TableOfContents items={tocItems} />

              {/* Back to all concepts link */}
              <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                <Link
                  href="/concepts"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-accent"
                  style={{ color: "var(--text-muted)" }}
                >
                  <BookOpen size={14} />
                  All Concepts
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
