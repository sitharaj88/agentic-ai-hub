"use client";

import { useState } from "react";
import { FrameworkCard } from "@/components/content/FrameworkCard";
import { frameworks } from "@/data/frameworks";
import { CATEGORIES, type Category } from "@/lib/constants";

const allCategories: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All" },
  ...Object.entries(CATEGORIES).map(([key, val]) => ({
    key: key as Category,
    label: val.label,
  })),
];

export default function FrameworksPage() {
  const [active, setActive] = useState<"all" | Category>("all");
  const filtered = active === "all" ? frameworks : frameworks.filter((f) => f.category === active);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Agent Frameworks & SDKs
        </h1>
        <p className="mt-3 text-lg" style={{ color: "var(--text-secondary)" }}>
          Explore {frameworks.length}+ frameworks for building AI agents — from Big Tech SDKs to open-source tools and visual platforms.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-8 flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active === cat.key
                ? "border-accent bg-accent text-white"
                : "hover:bg-[var(--bg-secondary)]"
            }`}
            style={
              active !== cat.key
                ? { borderColor: "var(--border)", color: "var(--text-secondary)" }
                : undefined
            }
          >
            {cat.label}
            {cat.key !== "all" && (
              <span className="ml-1.5 opacity-60">
                ({frameworks.filter((f) => f.category === cat.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((fw) => (
          <FrameworkCard key={fw.id} framework={fw} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-lg" style={{ color: "var(--text-muted)" }}>
          No frameworks in this category yet.
        </p>
      )}
    </div>
  );
}
