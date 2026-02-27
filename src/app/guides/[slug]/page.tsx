import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  ListChecks,
} from "lucide-react";
import { DifficultyBadge } from "@/components/ui/Badge";
import { guideContents, type GuideContent } from "@/data/guide-content";
import type { Metadata } from "next";

/* ────────────────────────────────────────────
   Static generation helpers
   ──────────────────────────────────────────── */

export function generateStaticParams() {
  return guideContents.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideContents.find((g) => g.slug === slug);
  if (!guide) return { title: "Not Found" };
  return {
    title: `${guide.title} — Guide`,
    description: guide.description,
  };
}

/* ────────────────────────────────────────────
   Helper: generate heading id from title
   ──────────────────────────────────────────── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ────────────────────────────────────────────
   Sub-components
   ──────────────────────────────────────────── */

function TableOfContents({ guide }: { guide: GuideContent }) {
  return (
    <nav
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      aria-label="Table of contents"
    >
      <div
        className="rounded-xl border p-5"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <h4
          className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          <ListChecks size={14} />
          On this page
        </h4>
        <ul className="space-y-1.5 text-sm">
          {guide.sections.map((section) => (
            <li key={slugify(section.title)}>
              <a
                href={`#${slugify(section.title)}`}
                className="block rounded-md px-2 py-1 transition-colors hover:text-accent"
                style={{ color: "var(--text-secondary)" }}
              >
                {section.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#common-mistakes"
              className="block rounded-md px-2 py-1 transition-colors hover:text-accent"
              style={{ color: "var(--text-secondary)" }}
            >
              Common Mistakes
            </a>
          </li>
          <li>
            <a
              href="#next-steps"
              className="block rounded-md px-2 py-1 transition-colors hover:text-accent"
              style={{ color: "var(--text-secondary)" }}
            >
              Next Steps
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function PrerequisitesBox({ items }: { items: string[] }) {
  return (
    <div
      className="not-prose rounded-xl border p-5 mb-8"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h3
        className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        <CheckCircle2 size={16} className="text-emerald-500" />
        Prerequisites
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-bold"
              style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-muted)" }}
            >
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WhatYoullLearnBox({ items }: { items: string[] }) {
  return (
    <div
      className="not-prose rounded-xl border-l-4 p-5 mb-8"
      style={{
        backgroundColor: "var(--callout-info-bg)",
        borderColor: "var(--callout-info-border)",
      }}
    >
      <h3
        className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
        style={{ color: "var(--callout-info-border)" }}
      >
        <Lightbulb size={16} />
        What you will learn
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
            <ChevronRight size={14} className="mt-0.5 shrink-0 text-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CommonMistakesBox({ items }: { items: string[] }) {
  return (
    <div
      id="common-mistakes"
      className="not-prose rounded-xl border-l-4 p-5 mt-10 mb-8 scroll-mt-20"
      style={{
        backgroundColor: "var(--callout-warning-bg)",
        borderColor: "var(--callout-warning-border)",
      }}
    >
      <h3
        className="mb-3 flex items-center gap-2 font-bold"
        style={{ color: "var(--text-primary)" }}
      >
        <AlertTriangle size={18} className="text-amber-500" />
        Common Mistakes to Avoid
      </h3>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
            <span className="mt-0.5 shrink-0 text-amber-500 font-bold text-xs">!</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NextStepsBox({ items }: { items: { title: string; href: string }[] }) {
  return (
    <div
      id="next-steps"
      className="not-prose rounded-xl border p-5 mt-8 mb-8 scroll-mt-20"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h3
        className="mb-3 flex items-center gap-2 font-bold"
        style={{ color: "var(--text-primary)" }}
      >
        <BookOpen size={18} className="text-accent" />
        Recommended Next Steps
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between rounded-lg px-4 py-3 transition-all hover:shadow-sm group"
            style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}
          >
            <span className="text-sm font-medium">{item.title}</span>
            <ArrowRight
              size={14}
              className="text-accent opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function PrevNextNavigation({
  prev,
  next,
}: {
  prev: GuideContent | null;
  next: GuideContent | null;
}) {
  return (
    <div
      className="not-prose mt-12 grid grid-cols-2 gap-4 border-t pt-6"
      style={{ borderColor: "var(--border)" }}
    >
      {prev ? (
        <Link
          href={`/guides/${prev.slug}`}
          className="group flex flex-col rounded-xl border p-4 transition-all hover:border-accent hover:shadow-md"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <span className="mb-1 flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
            <ArrowLeft size={12} />
            Previous
          </span>
          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/guides/${next.slug}`}
          className="group flex flex-col items-end rounded-xl border p-4 text-right transition-all hover:border-accent hover:shadow-md"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <span className="mb-1 flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
            Next
            <ArrowRight size={12} />
          </span>
          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Page Component
   ──────────────────────────────────────────── */

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guideContents.find((g) => g.slug === slug);
  if (!guide) notFound();

  const idx = guideContents.findIndex((g) => g.slug === slug);
  const prev = idx > 0 ? guideContents[idx - 1] : null;
  const next = idx < guideContents.length - 1 ? guideContents[idx + 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav
        className="mb-6 flex items-center gap-2 text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-accent">
          Guides
        </Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }} className="font-medium">
          {guide.title}
        </span>
      </nav>

      {/* Layout: Content + Sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px] lg:gap-12">
        {/* Main Content */}
        <article className="prose max-w-none min-w-0">
          {/* Guide header */}
          <div className="not-prose mb-6">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <DifficultyBadge level={guide.difficulty} />
              <span
                className="flex items-center gap-1 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <Clock size={14} />
                {guide.time} read
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Guide {idx + 1} of {guideContents.length}
              </span>
            </div>
          </div>

          <h1>{guide.title}</h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {guide.description}
          </p>

          {/* Prerequisites */}
          <PrerequisitesBox items={guide.prerequisites} />

          {/* What You'll Learn */}
          <WhatYoullLearnBox items={guide.whatYoullLearn} />

          {/* Sections */}
          {guide.sections.map((section) => (
            <section key={slugify(section.title)} id={slugify(section.title)} className="scroll-mt-20">
              <h2>
                <a href={`#${slugify(section.title)}`}>{section.title}</a>
              </h2>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </section>
          ))}

          {/* Common Mistakes */}
          <CommonMistakesBox items={guide.commonMistakes} />

          {/* Next Steps */}
          <NextStepsBox items={guide.nextSteps} />

          {/* Prev/Next Navigation */}
          <PrevNextNavigation prev={prev} next={next} />
        </article>

        {/* Sidebar: Table of Contents */}
        <aside className="hidden lg:block">
          <TableOfContents guide={guide} />
        </aside>
      </div>
    </div>
  );
}
