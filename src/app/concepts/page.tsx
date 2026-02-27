import { ConceptCard } from "@/components/content/ConceptCard";
import { concepts } from "@/data/concepts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Concepts",
  description: "Learn the fundamental concepts of AI agent development — from tool use to multi-agent systems.",
};

export default function ConceptsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Core Concepts
        </h1>
        <p className="mt-3 max-w-2xl text-lg" style={{ color: "var(--text-secondary)" }}>
          Master the fundamental building blocks of AI agent development. Each concept builds on the last — start with the basics and work your way up.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {concepts.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>
    </div>
  );
}
