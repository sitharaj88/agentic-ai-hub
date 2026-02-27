"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Search, X, ArrowRight, BookOpen, Cpu, Route, GraduationCap, Boxes } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";
import { searchIndex, type SearchItem } from "@/lib/search";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const TYPE_CONFIG: Record<
  SearchItem["type"],
  { label: string; bg: string; text: string }
> = {
  Framework: { label: "Framework", bg: "rgba(99,102,241,0.15)", text: "rgb(99,102,241)" },
  Concept: { label: "Concept", bg: "rgba(59,130,246,0.15)", text: "rgb(59,130,246)" },
  Pattern: { label: "Pattern", bg: "rgba(168,85,247,0.15)", text: "rgb(168,85,247)" },
  Guide: { label: "Guide", bg: "rgba(34,197,94,0.15)", text: "rgb(34,197,94)" },
  Tool: { label: "Tool", bg: "rgba(245,158,11,0.15)", text: "rgb(245,158,11)" },
  Glossary: { label: "Glossary", bg: "rgba(236,72,153,0.15)", text: "rgb(236,72,153)" },
  Ecosystem: { label: "Ecosystem", bg: "rgba(20,184,166,0.15)", text: "rgb(20,184,166)" },
  "Learning Path": { label: "Learning Path", bg: "rgba(251,146,60,0.15)", text: "rgb(251,146,60)" },
};

function TypeIcon({ type }: { type: SearchItem["type"] }) {
  const size = 14;
  const config = TYPE_CONFIG[type];
  const style = { color: config.text };

  switch (type) {
    case "Glossary":
      return <BookOpen size={size} style={style} />;
    case "Ecosystem":
      return <Boxes size={size} style={style} />;
    case "Learning Path":
      return <GraduationCap size={size} style={style} />;
    case "Framework":
      return <Cpu size={size} style={style} />;
    case "Pattern":
      return <Route size={size} style={style} />;
    default:
      return null;
  }
}

function TypeBadge({ type }: { type: SearchItem["type"] }) {
  const config = TYPE_CONFIG[type];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <TypeIcon type={type} />
      {config.label}
    </span>
  );
}

/** Group results by type, preserving score order within each group. */
function groupResults(items: SearchItem[]): { type: SearchItem["type"]; items: SearchItem[] }[] {
  const typeOrder: SearchItem["type"][] = [
    "Framework",
    "Concept",
    "Pattern",
    "Guide",
    "Ecosystem",
    "Learning Path",
    "Tool",
    "Glossary",
  ];
  const map = new Map<SearchItem["type"], SearchItem[]>();
  for (const item of items) {
    const list = map.get(item.type) ?? [];
    list.push(item);
    map.set(item.type, list);
  }
  return typeOrder
    .filter((t) => map.has(t))
    .map((t) => ({ type: t, items: map.get(t)! }));
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fuseRef = useRef<Fuse<SearchItem> | null>(null);

  useEffect(() => {
    fuseRef.current = new Fuse(searchIndex, {
      threshold: 0.3,
      keys: [
        { name: "title", weight: 0.4 },
        { name: "description", weight: 0.3 },
        { name: "category", weight: 0.15 },
        { name: "type", weight: 0.15 },
      ],
    });
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      setSelectedIndex(0);
      if (!value.trim() || !fuseRef.current) {
        setResults([]);
        return;
      }
      const found = fuseRef.current.search(value).slice(0, 12);
      setResults(found.map((r) => r.item));
    },
    []
  );

  // Flatten grouped results into an ordered list for keyboard navigation
  const grouped = useMemo(() => groupResults(results), [results]);
  const flatResults = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);
  const showGroupHeaders = results.length > 8 && grouped.length > 1;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatResults[selectedIndex]) {
      onClose();
    }
  };

  if (!open) return null;

  // Build the result items with group headers interspersed
  let flatIndex = 0;

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search">
      <div
        className="search-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div
          className="flex items-center gap-3 border-b px-4 py-3"
          style={{ borderColor: "var(--border)" }}
        >
          <Search size={20} style={{ color: "var(--text-muted)" }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search frameworks, concepts, glossary, guides..."
            className="flex-1 bg-transparent text-base outline-none"
            style={{ color: "var(--text-primary)" }}
          />
          {query && (
            <span
              className="shrink-0 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {results.length} result{results.length !== 1 ? "s" : ""}
            </span>
          )}
          <button
            onClick={onClose}
            className="rounded-md p-1"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query && results.length === 0 && (
            <div
              className="px-4 py-8 text-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {grouped.map((group) => {
            const groupItems = group.items.map((item) => {
              const currentFlatIndex = flatIndex++;
              const isSelected = currentFlatIndex === selectedIndex;

              return (
                <Link
                  key={`${item.type}-${item.href}-${item.title}`}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    isSelected ? "bg-accent/10" : "hover:bg-[var(--bg-secondary)]"
                  }`}
                  style={{
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-semibold truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </span>
                      <TypeBadge type={item.type} />
                    </div>
                    <div className="truncate text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {item.category && (
                        <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
                          {item.category} &middot;{" "}
                        </span>
                      )}
                      {item.description}
                    </div>
                  </div>
                  <ArrowRight size={14} className="shrink-0" style={{ color: "var(--text-muted)" }} />
                </Link>
              );
            });

            return (
              <div key={group.type}>
                {showGroupHeaders && (
                  <div
                    className="sticky top-0 z-10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      color: "var(--text-muted)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {group.type} ({group.items.length})
                  </div>
                )}
                {groupItems}
              </div>
            );
          })}

          {!query && (
            <div
              className="px-4 py-6 text-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Type to search across all content
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-4 border-t px-4 py-2 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <span><kbd className="rounded border px-1" style={{ borderColor: "var(--border)" }}>↑↓</kbd> Navigate</span>
          <span><kbd className="rounded border px-1" style={{ borderColor: "var(--border)" }}>↵</kbd> Open</span>
          <span><kbd className="rounded border px-1" style={{ borderColor: "var(--border)" }}>esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
