import Link from "next/link";
import { Compass, BookOpen, Layers, Boxes, GraduationCap } from "lucide-react";
import {
  getRelatedContent,
  type ContentType,
  type RelatedItem,
} from "@/lib/related-content";

const typeConfig: Record<
  ContentType,
  { label: string; icon: React.ReactNode; color: string }
> = {
  concept: {
    label: "Concept",
    icon: <BookOpen size={12} />,
    color: "var(--callout-info-border)",
  },
  pattern: {
    label: "Pattern",
    icon: <Layers size={12} />,
    color: "var(--callout-tip-border)",
  },
  framework: {
    label: "Framework",
    icon: <Boxes size={12} />,
    color: "var(--color-accent)",
  },
  guide: {
    label: "Guide",
    icon: <GraduationCap size={12} />,
    color: "var(--callout-warning-border)",
  },
};

function RelatedCard({ item }: { item: RelatedItem }) {
  const config = typeConfig[item.type];

  return (
    <Link
      href={item.href}
      className="group flex flex-col rounded-xl border p-5 transition-all hover:shadow-md"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-card)",
      }}
    >
      {/* Type Badge */}
      <span
        className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
        style={{
          backgroundColor: `color-mix(in srgb, ${config.color} 15%, transparent)`,
          color: config.color,
        }}
      >
        {config.icon}
        {config.label}
      </span>

      {/* Title */}
      <h4
        className="mb-1.5 text-sm font-bold leading-snug group-hover:text-accent"
        style={{ color: "var(--text-primary)" }}
      >
        {item.title}
      </h4>

      {/* Description */}
      <p
        className="line-clamp-2 text-xs leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {item.description}
      </p>
    </Link>
  );
}

interface RelatedContentProps {
  type: ContentType;
  slug: string;
}

export function RelatedContent({ type, slug }: RelatedContentProps) {
  const items = getRelatedContent(type, slug);

  if (items.length === 0) return null;

  return (
    <section className="not-prose mt-12">
      <div className="mb-5 flex items-center gap-2">
        <Compass size={20} style={{ color: "var(--text-muted)" }} />
        <h2
          className="text-lg font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Explore Related Content
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <RelatedCard key={`${item.type}-${item.slug}`} item={item} />
        ))}
      </div>
    </section>
  );
}
