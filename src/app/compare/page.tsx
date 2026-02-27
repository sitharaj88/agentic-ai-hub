"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpDown, Check, X, ExternalLink, Filter, XCircle } from "lucide-react";
import { frameworks } from "@/data/frameworks";
import { CATEGORIES, type Category } from "@/lib/constants";
import { CategoryBadge } from "@/components/ui/Badge";

type SortKey = "name" | "developer" | "stars_approx" | "category";
type SortDir = "asc" | "desc";

const ALL_CATEGORIES = Object.keys(CATEGORIES) as Category[];
const ALL_LANGUAGES = ["Python", "TypeScript", "C#"] as const;
type Language = (typeof ALL_LANGUAGES)[number];

export default function ComparePage() {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(new Set());
  const [selectedLanguages, setSelectedLanguages] = useState<Set<Language>>(new Set());
  const [mcpOnly, setMcpOnly] = useState(false);
  const [multiAgentOnly, setMultiAgentOnly] = useState(false);

  const hasFilters =
    selectedCategories.size > 0 ||
    selectedLanguages.size > 0 ||
    mcpOnly ||
    multiAgentOnly;

  function clearFilters() {
    setSelectedCategories(new Set());
    setSelectedLanguages(new Set());
    setMcpOnly(false);
    setMultiAgentOnly(false);
  }

  function toggleCategory(cat: Category) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }

  function toggleLanguage(lang: Language) {
    setSelectedLanguages((prev) => {
      const next = new Set(prev);
      if (next.has(lang)) {
        next.delete(lang);
      } else {
        next.add(lang);
      }
      return next;
    });
  }

  const filtered = useMemo(() => {
    return frameworks.filter((fw) => {
      if (selectedCategories.size > 0 && !selectedCategories.has(fw.category)) {
        return false;
      }
      if (
        selectedLanguages.size > 0 &&
        !fw.language.some((l) => selectedLanguages.has(l as Language))
      ) {
        return false;
      }
      if (mcpOnly && !fw.mcp_support) {
        return false;
      }
      if (multiAgentOnly && !fw.multi_agent) {
        return false;
      }
      return true;
    });
  }, [selectedCategories, selectedLanguages, mcpOnly, multiAgentOnly]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey] ?? "";
      const bVal = b[sortKey] ?? "";
      const compare = String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? compare : -compare;
    });
  }, [filtered, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    const isActive = sortKey === field;
    return (
      <th
        className="cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-[var(--bg-tertiary)]"
        style={{ color: "var(--text-primary)", borderBottom: "2px solid var(--border-strong)" }}
        onClick={() => toggleSort(field)}
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <ArrowUpDown size={12} className={isActive ? "text-accent" : "opacity-30"} />
          {isActive && (
            <span className="text-accent text-xs">{sortDir === "asc" ? "\u2191" : "\u2193"}</span>
          )}
        </span>
      </th>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Compare Frameworks
        </h1>
        <p className="mt-3 max-w-2xl text-lg" style={{ color: "var(--text-secondary)" }}>
          Side-by-side comparison of all {frameworks.length} AI agent frameworks. Click any column header to sort.
        </p>
      </div>

      {/* ── Filters ────────────────────────────────────────── */}
      <div
        className="mb-6 rounded-xl border p-5"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Filter size={16} style={{ color: "var(--text-muted)" }} />
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Filters
            </span>
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors hover:opacity-80"
              style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "rgb(239,68,68)" }}
            >
              <XCircle size={12} />
              Clear filters
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="mb-3">
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Category
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {ALL_CATEGORIES.map((cat) => {
              const isActive = selectedCategories.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive ? "ring-2 ring-accent" : ""
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: "var(--accent)", color: "#ffffff" }
                      : { backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }
                  }
                >
                  {CATEGORIES[cat].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Language filter */}
        <div className="mb-3">
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Language
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {ALL_LANGUAGES.map((lang) => {
              const isActive = selectedLanguages.has(lang);
              return (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive ? "ring-2 ring-accent" : ""
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: "var(--accent)", color: "#ffffff" }
                      : { backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }
                  }
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature toggles */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Features
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <button
              onClick={() => setMcpOnly(!mcpOnly)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                mcpOnly ? "ring-2 ring-accent" : ""
              }`}
              style={
                mcpOnly
                  ? { backgroundColor: "rgba(16,185,129,0.15)", color: "rgb(16,185,129)" }
                  : { backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }
              }
            >
              {mcpOnly && <Check size={10} className="inline mr-1" />}
              MCP Support
            </button>
            <button
              onClick={() => setMultiAgentOnly(!multiAgentOnly)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                multiAgentOnly ? "ring-2 ring-accent" : ""
              }`}
              style={
                multiAgentOnly
                  ? { backgroundColor: "rgba(16,185,129,0.15)", color: "rgb(16,185,129)" }
                  : { backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }
              }
            >
              {multiAgentOnly && <Check size={10} className="inline mr-1" />}
              Multi-Agent Support
            </button>
          </div>
        </div>
      </div>

      {/* ── Results count ──────────────────────────────────── */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          Showing{" "}
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>
            {sorted.length}
          </span>{" "}
          of{" "}
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>
            {frameworks.length}
          </span>{" "}
          frameworks
        </span>
        {hasFilters && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
            style={{ backgroundColor: "rgba(99,102,241,0.15)", color: "rgb(99,102,241)" }}
          >
            Filtered
          </span>
        )}
      </div>

      {/* ── Table ──────────────────────────────────────────── */}
      {sorted.length === 0 ? (
        <div
          className="rounded-xl border py-16 text-center"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <p className="text-lg font-medium" style={{ color: "var(--text-secondary)" }}>
            No frameworks match the current filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-3 text-sm font-medium text-accent hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div
          className="overflow-x-auto rounded-xl border"
          style={{ borderColor: "var(--border)" }}
        >
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "var(--bg-secondary)" }}>
              <tr>
                <SortHeader label="Framework" field="name" />
                <SortHeader label="Developer" field="developer" />
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: "var(--text-primary)", borderBottom: "2px solid var(--border-strong)" }}>
                  Language
                </th>
                <SortHeader label="Category" field="category" />
                <th className="px-4 py-3 text-center text-sm font-semibold" style={{ color: "var(--text-primary)", borderBottom: "2px solid var(--border-strong)" }}>
                  MCP
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold" style={{ color: "var(--text-primary)", borderBottom: "2px solid var(--border-strong)" }}>
                  Multi-Agent
                </th>
                <SortHeader label="Stars" field="stars_approx" />
                <th className="px-4 py-3 text-sm font-semibold" style={{ color: "var(--text-primary)", borderBottom: "2px solid var(--border-strong)" }}>
                  Links
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((fw) => (
                <tr
                  key={fw.id}
                  className="transition-colors hover:bg-[var(--bg-secondary)]"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/frameworks/${fw.id}`}
                      className="font-semibold text-accent hover:underline"
                    >
                      {fw.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                    {fw.developer}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {fw.language.map((l) => (
                        <span
                          key={l}
                          className="rounded-full px-2 py-0.5 text-xs"
                          style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <CategoryBadge category={fw.category} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    {fw.mcp_support ? (
                      <Check size={16} className="mx-auto text-emerald-500" />
                    ) : (
                      <X size={16} className="mx-auto text-red-400 opacity-40" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {fw.multi_agent ? (
                      <Check size={16} className="mx-auto text-emerald-500" />
                    ) : (
                      <X size={16} className="mx-auto text-red-400 opacity-40" />
                    )}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>
                    {fw.stars_approx}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={fw.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:underline"
                      >
                        GitHub
                      </a>
                      <a
                        href={fw.docs_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-xs hover:underline"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Docs <ExternalLink size={10} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
