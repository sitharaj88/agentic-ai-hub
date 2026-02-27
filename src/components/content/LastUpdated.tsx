import { Calendar } from "lucide-react";
import { getLastUpdated, formatDate, type ContentType } from "@/lib/last-updated";

export function LastUpdated({
  type,
  slug,
}: {
  type: ContentType;
  slug: string;
}) {
  const dateStr = getLastUpdated(type, slug);
  if (!dateStr) return null;

  return (
    <span
      className="last-updated inline-flex items-center gap-1.5 text-xs"
      style={{ color: "var(--text-muted)" }}
    >
      <Calendar size={12} />
      Updated {formatDate(dateStr)}
    </span>
  );
}
