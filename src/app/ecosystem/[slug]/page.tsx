import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

interface EcosystemCategory {
  slug: string;
  title: string;
  description: string;
  tools: { name: string; description: string; url: string; pricing: string }[];
}

const categories: EcosystemCategory[] = [
  {
    slug: "observability",
    title: "Observability & Monitoring Tools",
    description: "Debug, trace, and monitor your AI agents in production.",
    tools: [
      { name: "LangSmith", description: "Full-stack observability platform by LangChain for debugging, testing, and monitoring LLM apps.", url: "https://www.langchain.com/langsmith", pricing: "Free tier + paid" },
      { name: "Langfuse", description: "Open-source LLM observability with tracing, analytics, and prompt management.", url: "https://langfuse.com/", pricing: "Free / Self-hosted" },
      { name: "Phoenix (Arize)", description: "Open-source AI observability for evaluating, troubleshooting, and fine-tuning LLM applications.", url: "https://phoenix.arize.com/", pricing: "Free / Open source" },
      { name: "Helicone", description: "Proxy-based LLM observability with caching, rate limiting, and cost tracking.", url: "https://www.helicone.ai/", pricing: "Free tier + paid" },
    ],
  },
  {
    slug: "vector-databases",
    title: "Vector Databases",
    description: "Store and retrieve embeddings for RAG and agent memory systems.",
    tools: [
      { name: "Pinecone", description: "Fully managed vector database built for similarity search at scale.", url: "https://www.pinecone.io/", pricing: "Free tier + paid" },
      { name: "Weaviate", description: "Open-source vector database with built-in ML models and hybrid search.", url: "https://weaviate.io/", pricing: "Free / Cloud paid" },
      { name: "Chroma", description: "Open-source embedding database designed for AI applications.", url: "https://www.trychroma.com/", pricing: "Free / Open source" },
      { name: "Qdrant", description: "High-performance vector search engine with advanced filtering.", url: "https://qdrant.tech/", pricing: "Free / Cloud paid" },
    ],
  },
  {
    slug: "memory-providers",
    title: "Memory Providers",
    description: "Long-term memory solutions for persistent agent knowledge.",
    tools: [
      { name: "Mem0", description: "Memory layer for AI agents providing personalized interactions across sessions.", url: "https://mem0.ai/", pricing: "Free tier + paid" },
      { name: "Zep", description: "Long-term memory for AI assistants with automatic summarization and enrichment.", url: "https://www.getzep.com/", pricing: "Free / Cloud paid" },
    ],
  },
  {
    slug: "evaluation-tools",
    title: "Evaluation & Testing Tools",
    description: "Test, evaluate, and benchmark your agent performance.",
    tools: [
      { name: "DeepEval", description: "Open-source LLM evaluation framework with 14+ metrics and CI/CD integration.", url: "https://docs.confident-ai.com/", pricing: "Free / Open source" },
      { name: "PromptFoo", description: "Open-source tool for testing, evaluating, and red-teaming LLM applications.", url: "https://promptfoo.dev/", pricing: "Free / Open source" },
      { name: "Ragas", description: "Framework for evaluating RAG pipelines with automated metrics.", url: "https://ragas.io/", pricing: "Free / Open source" },
    ],
  },
  {
    slug: "deployment-platforms",
    title: "Deployment Platforms",
    description: "Deploy and scale your AI agents in the cloud.",
    tools: [
      { name: "Modal", description: "Serverless cloud for running AI/ML workloads with GPU support.", url: "https://modal.com/", pricing: "Pay per use" },
      { name: "Railway", description: "Instant deployments for full-stack apps and services.", url: "https://railway.app/", pricing: "Free tier + paid" },
      { name: "Fly.io", description: "Run full-stack apps and databases close to users worldwide.", url: "https://fly.io/", pricing: "Free tier + paid" },
    ],
  },
];

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Not Found" };
  return {
    title: cat.title,
    description: cat.description,
  };
}

export default async function EcosystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link href="/ecosystem" className="hover:text-accent">Ecosystem</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }} className="font-medium">{cat.title}</span>
      </nav>

      <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
        {cat.title}
      </h1>
      <p className="mt-3 text-lg" style={{ color: "var(--text-secondary)" }}>
        {cat.description}
      </p>

      <div className="mt-10 space-y-4">
        {cat.tools.map((tool) => (
          <div
            key={tool.name}
            className="rounded-xl border p-6 transition-all hover:border-accent"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {tool.name}
                </h2>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {tool.description}
                </p>
              </div>
              <span
                className="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-muted)" }}
              >
                {tool.pricing}
              </span>
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Visit {tool.name} <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
