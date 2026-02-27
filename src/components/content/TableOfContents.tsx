"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    // Set first item as active by default
    if (items.length > 0 && !activeId) {
      setActiveId(items[0].id);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <nav className="space-y-1">
      <p
        className="mb-3 text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        On this page
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            setActiveId(item.id);
          }}
          className={`block border-l-2 py-1 pl-3 text-sm transition-colors duration-150 ${
            activeId === item.id
              ? "border-accent font-medium text-accent"
              : "hover:border-current"
          }`}
          style={{
            color: activeId === item.id ? undefined : "var(--text-muted)",
            borderColor: activeId === item.id ? undefined : "transparent",
          }}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
