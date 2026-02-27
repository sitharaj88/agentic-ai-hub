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
  const colors = {
    beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span className={`${colors[level]} inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize`}>
      {level}
    </span>
  );
}

export function LanguageBadge({ language }: { language: string }) {
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)" }}
    >
      {language}
    </span>
  );
}
