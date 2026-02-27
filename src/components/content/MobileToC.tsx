"use client";

import { useState } from "react";
import { ChevronDown, List } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
}

export function MobileToC({ items }: { items: TocItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    // Small delay so the collapse animation doesn't interfere with scroll
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div
      className="not-prose mb-6 rounded-lg border lg:hidden"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-card)",
      }}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold"
        style={{ color: "var(--text-primary)" }}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <List size={16} style={{ color: "var(--text-muted)" }} />
          On this page
        </span>
        <ChevronDown
          size={16}
          className="transition-transform duration-200"
          style={{
            color: "var(--text-muted)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {isOpen && (
        <ul
          className="border-t px-4 py-3 space-y-1"
          style={{ borderColor: "var(--border)" }}
        >
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className="block rounded-md px-2 py-1.5 text-sm transition-colors hover:text-accent"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
