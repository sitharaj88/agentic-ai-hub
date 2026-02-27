import { PatternCard } from "@/components/content/PatternCard";
import { patterns } from "@/data/patterns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Patterns",
  description: "Proven architectural patterns for building effective AI agents — ReAct, Supervisor, Agent Teams, and more.",
};

export default function PatternsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Design Patterns
        </h1>
        <p className="mt-3 max-w-2xl text-lg" style={{ color: "var(--text-secondary)" }}>
          Battle-tested architectural patterns for building agent systems. Each pattern includes when to use it, implementation examples, and trade-offs.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {patterns.map((pattern) => (
          <PatternCard key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
  );
}
