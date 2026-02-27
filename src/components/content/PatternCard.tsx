import Link from "next/link";
import { ArrowRight, RefreshCw, GitBranch, MessageCircle, Layers, Wrench, Users } from "lucide-react";
import { DifficultyBadge } from "@/components/ui/Badge";
import type { Pattern } from "@/data/patterns";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "refresh-cw": RefreshCw,
  "git-branch": GitBranch,
  "message-circle": MessageCircle,
  layers: Layers,
  tool: Wrench,
  users: Users,
};

export function PatternCard({ pattern }: { pattern: Pattern }) {
  const Icon = iconMap[pattern.icon] || RefreshCw;

  return (
    <Link
      href={`/patterns/${pattern.id}`}
      className="group flex flex-col gap-3 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10"
        >
          <Icon size={20} className="text-accent" />
        </div>
        <DifficultyBadge level={pattern.difficulty} />
      </div>

      <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
        {pattern.title}
      </h3>

      <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {pattern.description}
      </p>

      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2">
        Explore pattern <ArrowRight size={14} />
      </span>
    </Link>
  );
}
