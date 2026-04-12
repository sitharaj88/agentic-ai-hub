import { ConceptCard } from "@/components/content/ConceptCard";
import { concepts } from "@/data/concepts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GenAI & Agent Foundations",
  description: "Learn the GenAI and agent foundations that lead from basic concepts to production-grade agent systems.",
};

const conceptGroups = [
  {
    key: "genai-foundations",
    title: "1. GenAI Foundations",
    description: "Start with the core mental models: how models, tools, structure, and context fit together in GenAI systems.",
  },
  {
    key: "application-engineering",
    title: "2. Application Engineering",
    description: "Move into the decision frameworks and system components that turn model calls into useful, production-ready applications.",
  },
  {
    key: "agent-systems",
    title: "3. Agent Systems",
    description: "Finish with reasoning and orchestration patterns for multi-step and multi-agent workflows.",
  },
] as const;

export default function ConceptsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          GenAI & Agent Foundations
        </h1>
        <p className="mt-3 max-w-2xl text-lg" style={{ color: "var(--text-secondary)" }}>
          Learn this hub in order: start with GenAI fundamentals, move into application engineering, then finish with agent-system design.
        </p>
      </div>

      <div
        className="mb-10 rounded-2xl border p-5"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {conceptGroups.map((group) => (
            <div key={group.key}>
              <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
                {group.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {group.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        {conceptGroups.map((group) => (
          <section key={group.key}>
            <div className="mb-4">
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {group.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm" style={{ color: "var(--text-secondary)" }}>
                {group.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {concepts
                .filter((concept) => concept.group === group.key)
                .map((concept) => (
                  <ConceptCard key={concept.id} concept={concept} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
