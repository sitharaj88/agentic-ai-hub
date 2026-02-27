"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";
import { searchIndex, type SearchItem } from "@/lib/search";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
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
      const found = fuseRef.current.search(value).slice(0, 8);
      setResults(found.map((r) => r.item));
    },
    []
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
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
            placeholder="Search frameworks, concepts, guides..."
            className="flex-1 bg-transparent text-base outline-none"
            style={{ color: "var(--text-primary)" }}
          />
          <button
            onClick={onClose}
            className="rounded-md p-1"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {query && results.length === 0 && (
            <div
              className="px-4 py-8 text-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {results.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                i === selectedIndex ? "bg-accent/10" : ""
              }`}
              style={{
                borderBottom: i < results.length - 1 ? "1px solid var(--border)" : undefined,
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </div>
                <div className="truncate text-xs" style={{ color: "var(--text-muted)" }}>
                  {item.type} · {item.description}
                </div>
              </div>
              <ArrowRight size={14} style={{ color: "var(--text-muted)" }} />
            </Link>
          ))}

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
