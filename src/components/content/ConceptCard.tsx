import Link from "next/link";
import { ArrowRight, Cpu, Wrench, Brain, Route, Users, Plug, Database } from "lucide-react";
import { DifficultyBadge } from "@/components/ui/Badge";
import type { Concept } from "@/data/concepts";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  cpu: Cpu,
  wrench: Wrench,
  brain: Brain,
  route: Route,
  users: Users,
  plug: Plug,
  database: Database,
};

export function ConceptCard({ concept }: { concept: Concept }) {
  const Icon = iconMap[concept.icon] || Cpu;

  return (
    <Link
      href={`/concepts/${concept.id}`}
      className="group flex flex-col gap-3 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: "var(--bg-tertiary)" }}
        >
          <Icon size={20} className="text-accent" />
        </div>
        <DifficultyBadge level={concept.difficulty} />
      </div>

      <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
        {concept.title}
      </h3>

      <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {concept.description}
      </p>

      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2">
        Learn more <ArrowRight size={14} />
      </span>
    </Link>
  );
}
