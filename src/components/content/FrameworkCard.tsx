import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { CategoryBadge, LanguageBadge } from "@/components/ui/Badge";
import type { Framework } from "@/data/frameworks";

export function FrameworkCard({ framework }: { framework: Framework }) {
  return (
    <article
      className="group flex flex-col gap-4 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {framework.name}
          </h3>
          <span className="shrink-0 text-xs" style={{ color: "var(--text-muted)" }}>
            {framework.stars_approx}
          </span>
        </div>
        <p className="mt-0.5 text-sm" style={{ color: "var(--text-muted)" }}>
          {framework.developer}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {framework.language.map((lang) => (
          <LanguageBadge key={lang} language={lang} />
        ))}
        <CategoryBadge category={framework.category} />
      </div>

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {framework.description}
      </p>

      {/* Use cases */}
      <ul className="space-y-1">
        {framework.use_cases.slice(0, 2).map((uc) => (
          <li key={uc} className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <span style={{ color: "var(--text-muted)" }}>-</span> {uc}
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="mt-auto flex gap-2">
        <Link
          href={`/frameworks/${framework.id}`}
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Explore <ArrowRight size={14} />
        </Link>
        <a
          href={framework.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--bg-secondary)]"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
        >
          GitHub <ExternalLink size={12} />
        </a>
      </div>
    </article>
  );
}
