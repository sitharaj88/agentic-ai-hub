import type { Category, Difficulty } from "@/lib/constants";
import { CATEGORIES } from "@/lib/constants";

export function CategoryBadge({ category }: { category: Category }) {
  const config = CATEGORIES[category];
  return (
    <span className={`tag-${category} inline-block rounded-full px-2.5 py-0.5 text-xs font-medium`}>
      {config.label}
    </span>
  );
}

export function DifficultyBadge({ level }: { level: Difficulty }) {
  const cls = {
    beginner: "badge-beginner",
    intermediate: "badge-intermediate",
    advanced: "badge-advanced",
  };

  return (
    <span className={`${cls[level]} inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize`}>
      {level}
    </span>
  );
}

export function LanguageBadge({ language }: { language: string }) {
  return (
    <span className="badge-neutral inline-block rounded-full px-2.5 py-0.5 text-xs font-medium">
      {language}
    </span>
  );
}
