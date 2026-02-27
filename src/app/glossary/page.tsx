import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary",
  description: "A-Z glossary of AI agent development terminology.",
};

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

const glossary: GlossaryTerm[] = [
  { term: "Agent", definition: "An AI system that can perceive its environment, make decisions, and take autonomous actions to achieve specific goals.", category: "Core" },
  { term: "Agent Loop", definition: "The iterative cycle where an agent observes, reasons, acts, and processes feedback until a task is complete.", category: "Core" },
  { term: "Agentic RAG", definition: "RAG systems where the retrieval process itself is managed by an agent that can decide what, when, and how to retrieve.", category: "RAG" },
  { term: "Chain of Thought (CoT)", definition: "A prompting technique where the model reasons step-by-step before providing an answer.", category: "Reasoning" },
  { term: "Computer Use", definition: "An agent's ability to interact with a computer's GUI — clicking, typing, scrolling, and reading the screen.", category: "Tools" },
  { term: "Context Window", definition: "The maximum amount of text (tokens) an LLM can process in a single request.", category: "LLM" },
  { term: "Embedding", definition: "A numerical vector representation of text that captures semantic meaning, used for similarity search.", category: "RAG" },
  { term: "Function Calling", definition: "The LLM's ability to output structured JSON payloads that trigger external function execution.", category: "Tools" },
  { term: "Guardrails", definition: "Safety mechanisms that validate agent inputs and outputs against policies, formats, and safety criteria.", category: "Safety" },
  { term: "Hallucination", definition: "When an LLM generates information that is factually incorrect or not grounded in provided context.", category: "LLM" },
  { term: "Human-in-the-Loop", definition: "A design pattern where human review or approval is required at certain steps of an agent workflow.", category: "Patterns" },
  { term: "LLM (Large Language Model)", definition: "A neural network trained on vast amounts of text data that can generate, understand, and reason about natural language.", category: "LLM" },
  { term: "MCP (Model Context Protocol)", definition: "An open protocol by Anthropic that standardizes how LLM applications connect to external tools and data sources.", category: "Protocols" },
  { term: "Memory (Agent)", definition: "Mechanisms that allow agents to retain and recall information across interactions — short-term, long-term, or episodic.", category: "Core" },
  { term: "Multi-Agent System", definition: "An architecture where multiple specialized agents collaborate, communicate, and delegate tasks to achieve complex goals.", category: "Patterns" },
  { term: "Observability", definition: "The ability to understand an agent's internal state through logging, tracing, metrics, and debugging tools.", category: "Production" },
  { term: "Orchestration", definition: "The coordination and management of multiple agents or workflow steps to accomplish a larger task.", category: "Patterns" },
  { term: "Prompt Engineering", definition: "The practice of designing and optimizing prompts to get desired behavior from language models.", category: "Core" },
  { term: "RAG (Retrieval-Augmented Generation)", definition: "A technique that enhances LLM responses by retrieving relevant documents from an external knowledge base.", category: "RAG" },
  { term: "ReAct", definition: "A reasoning pattern where the agent alternates between Thought (reasoning), Action (tool use), and Observation (feedback).", category: "Reasoning" },
  { term: "Structured Output", definition: "LLM responses formatted as structured data (JSON, XML) rather than free-form text, enabling programmatic parsing.", category: "Tools" },
  { term: "Supervisor Pattern", definition: "An architecture where a central agent decomposes tasks and coordinates specialized worker agents.", category: "Patterns" },
  { term: "Temperature", definition: "A parameter controlling the randomness of LLM outputs — lower values are more deterministic, higher values more creative.", category: "LLM" },
  { term: "Token", definition: "The basic unit of text processing for LLMs — roughly 4 characters or 3/4 of a word in English.", category: "LLM" },
  { term: "Tool Use", definition: "An agent's ability to invoke external tools (APIs, databases, code execution) to accomplish tasks beyond text generation.", category: "Tools" },
  { term: "Tree of Thought (ToT)", definition: "A reasoning strategy where the model explores multiple solution branches simultaneously before selecting the best path.", category: "Reasoning" },
  { term: "Vector Database", definition: "A database optimized for storing and querying high-dimensional vector embeddings for similarity search.", category: "RAG" },
  { term: "Workflow", definition: "A defined sequence of steps and decision points that an agent follows to complete a task.", category: "Core" },
];

// Group by first letter
function groupByLetter(terms: GlossaryTerm[]) {
  const groups: Record<string, GlossaryTerm[]> = {};
  for (const term of terms) {
    const letter = term.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(term);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default function GlossaryPage() {
  const grouped = groupByLetter(glossary);
  const letters = grouped.map(([letter]) => letter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Glossary
        </h1>
        <p className="mt-3 text-lg" style={{ color: "var(--text-secondary)" }}>
          Key terminology for AI agent development — {glossary.length} terms and growing.
        </p>
      </div>

      {/* A-Z Nav */}
      <div
        className="mb-8 flex flex-wrap gap-1.5 rounded-xl p-3"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold transition-colors hover:bg-accent hover:text-white"
            style={{ color: "var(--text-secondary)" }}
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Terms */}
      <div className="space-y-10">
        {grouped.map(([letter, terms]) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2
              className="mb-4 border-b-2 pb-2 text-2xl font-extrabold text-accent"
              style={{ borderColor: "var(--border)" }}
            >
              {letter}
            </h2>
            <div className="space-y-4">
              {terms.map((t) => (
                <div key={t.term} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
                      {t.term}
                    </h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-xs"
                      style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-muted)" }}
                    >
                      {t.category}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {t.definition}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
