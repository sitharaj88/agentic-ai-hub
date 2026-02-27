"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Check, X, ExternalLink } from "lucide-react";
import { frameworks } from "@/data/frameworks";
import { CategoryBadge } from "@/components/ui/Badge";

type SortKey = "name" | "developer" | "stars_approx" | "category";
type SortDir = "asc" | "desc";

export default function ComparePage() {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sorted = [...frameworks].sort((a, b) => {
    const aVal = a[sortKey] ?? "";
    const bVal = b[sortKey] ?? "";
    const compare = String(aVal).localeCompare(String(bVal));
    return sortDir === "asc" ? compare : -compare;
  });

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
            <span className="text-accent text-xs">{sortDir === "asc" ? "↑" : "↓"}</span>
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
    </div>
  );
}
