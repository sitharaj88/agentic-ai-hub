import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Check, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

/* ============================================================
   Types
   ============================================================ */

interface EcosystemTool {
  name: string;
  description: string;
  features: string[];
  pricing: string;
  integrations: string[];
  url: string;
}

interface ComparisonRow {
  feature: string;
  values: Record<string, string>;
}

interface EcosystemCategory {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tools: EcosystemTool[];
  comparison: {
    description: string;
    rows: ComparisonRow[];
  };
}

/* ============================================================
   Data — Rich tool descriptions, features, and comparisons
   ============================================================ */

const categories: EcosystemCategory[] = [
  {
    slug: "observability",
    title: "Observability & Monitoring Tools",
    description: "Debug, trace, and monitor your AI agents in production.",
    longDescription:
      "Observability tools give you visibility into every LLM call, tool invocation, and reasoning step your agents take. They are essential for debugging failures, optimizing latency and cost, and ensuring production reliability. Most tools in this category provide tracing, prompt management, evaluation, and cost analytics.",
    tools: [
      {
        name: "LangSmith",
        description:
          "A full-stack observability and developer platform by LangChain for debugging, testing, evaluating, and monitoring LLM applications. LangSmith provides detailed trace visualization, dataset management, and automated evaluation pipelines. It integrates natively with LangChain but also supports any LLM application through its SDK.",
        features: [
          "End-to-end trace visualization with nested spans for multi-step agent runs",
          "Dataset and annotation queues for building evaluation test suites",
          "Online evaluation with custom scoring functions and human feedback",
          "Prompt versioning and playground for rapid iteration",
        ],
        pricing: "Free tier (5K traces/month) | Plus $39/seat/month | Enterprise custom",
        integrations: ["LangChain", "LangGraph", "OpenAI SDK", "Any Python/JS app"],
        url: "https://www.langchain.com/langsmith",
      },
      {
        name: "Langfuse",
        description:
          "An open-source LLM engineering platform that provides tracing, prompt management, evaluations, and analytics. Langfuse can be self-hosted for complete data control or used as a managed cloud service. Its decorator-based Python SDK makes instrumentation simple.",
        features: [
          "Open-source with self-hosting option for full data sovereignty",
          "Decorator-based SDK for zero-friction tracing in Python",
          "Prompt management with versioning and A/B testing support",
          "Cost and latency analytics dashboard with filtering and grouping",
        ],
        pricing: "Free (self-hosted, unlimited) | Cloud free tier | Pro $59/month",
        integrations: ["LangChain", "LlamaIndex", "OpenAI SDK", "Vercel AI SDK", "LiteLLM"],
        url: "https://langfuse.com/",
      },
      {
        name: "Phoenix (Arize)",
        description:
          "An open-source AI observability platform by Arize AI, purpose-built for evaluating, troubleshooting, and optimizing LLM applications. Phoenix provides local-first tracing, automatic span evaluation, and embedding visualizations for retrieval debugging.",
        features: [
          "Local-first notebook experience — runs as a Python process, no cloud required",
          "Automatic evaluation of LLM spans using built-in or custom evaluators",
          "Embedding drift visualization for debugging retrieval quality over time",
          "Export traces to OpenTelemetry-compatible backends for enterprise integration",
        ],
        pricing: "Free / Open source | Arize Cloud for production monitoring",
        integrations: ["LlamaIndex", "LangChain", "OpenAI SDK", "DSPy", "OpenTelemetry"],
        url: "https://phoenix.arize.com/",
      },
      {
        name: "Helicone",
        description:
          "A proxy-based LLM observability platform that requires just a one-line integration to start logging all your LLM calls. Helicone provides caching, rate limiting, cost tracking, and request analytics without any SDK changes to your existing code.",
        features: [
          "One-line proxy integration — change the base URL, everything else stays the same",
          "Built-in response caching to reduce latency and API costs",
          "Rate limiting and retry logic to prevent quota exhaustion",
          "User-level cost tracking and usage analytics with custom properties",
        ],
        pricing: "Free tier (100K requests/month) | Pro $80/month | Enterprise custom",
        integrations: ["OpenAI", "Anthropic", "Azure OpenAI", "Any OpenAI-compatible API"],
        url: "https://www.helicone.ai/",
      },
    ],
    comparison: {
      description:
        "How the observability tools compare across key dimensions for agent development teams.",
      rows: [
        {
          feature: "Open Source",
          values: { LangSmith: "No", Langfuse: "Yes (MIT)", "Phoenix (Arize)": "Yes (Apache 2.0)", Helicone: "Yes (Apache 2.0)" },
        },
        {
          feature: "Self-Hosting",
          values: { LangSmith: "Enterprise only", Langfuse: "Yes (Docker)", "Phoenix (Arize)": "Yes (pip install)", Helicone: "Yes (Docker)" },
        },
        {
          feature: "Integration Approach",
          values: { LangSmith: "SDK / Callbacks", Langfuse: "SDK / Decorators", "Phoenix (Arize)": "SDK / OTEL", Helicone: "Proxy (URL swap)" },
        },
        {
          feature: "Prompt Management",
          values: { LangSmith: "Yes", Langfuse: "Yes", "Phoenix (Arize)": "No", Helicone: "Yes" },
        },
        {
          feature: "Built-in Evaluation",
          values: { LangSmith: "Yes (extensive)", Langfuse: "Yes (basic)", "Phoenix (Arize)": "Yes (extensive)", Helicone: "No" },
        },
        {
          feature: "Best For",
          values: {
            LangSmith: "LangChain/LangGraph teams",
            Langfuse: "Teams wanting open-source + cloud option",
            "Phoenix (Arize)": "Data scientists & notebook workflows",
            Helicone: "Quick setup with minimal code changes",
          },
        },
      ],
    },
  },
  {
    slug: "vector-databases",
    title: "Vector Databases",
    description: "Store and retrieve embeddings for RAG and agent memory systems.",
    longDescription:
      "Vector databases are the backbone of RAG (Retrieval-Augmented Generation) and agent memory systems. They store high-dimensional embedding vectors and enable fast approximate nearest neighbor (ANN) search, allowing agents to find semantically similar documents in milliseconds across millions of records.",
    tools: [
      {
        name: "Pinecone",
        description:
          "A fully managed, cloud-native vector database built for production-scale similarity search. Pinecone handles infrastructure, scaling, and index optimization automatically, letting teams focus on their application logic. It excels at low-latency queries across very large datasets.",
        features: [
          "Fully managed — no infrastructure to provision, tune, or maintain",
          "Serverless architecture with automatic scaling and pay-per-query pricing",
          "Metadata filtering for combining vector similarity with structured constraints",
          "Hybrid search combining dense vectors with sparse (BM25) retrieval",
        ],
        pricing: "Free tier (100K vectors) | Serverless from $0.033/1M reads | Enterprise custom",
        integrations: ["LangChain", "LlamaIndex", "Haystack", "OpenAI", "Cohere"],
        url: "https://www.pinecone.io/",
      },
      {
        name: "Weaviate",
        description:
          "An open-source vector database with built-in vectorization modules, hybrid search, and a GraphQL API. Weaviate can generate embeddings automatically using integrated ML models, eliminating the need for a separate embedding pipeline. It supports multi-tenancy for SaaS applications.",
        features: [
          "Built-in vectorizers — automatically embed text using OpenAI, Cohere, or HuggingFace models",
          "Hybrid search combining BM25 keyword matching with vector similarity",
          "GraphQL and REST APIs with rich filtering and aggregation support",
          "Multi-tenancy for isolating data across customers in SaaS applications",
        ],
        pricing: "Free (self-hosted, open source) | Weaviate Cloud from $25/month | Enterprise custom",
        integrations: ["LangChain", "LlamaIndex", "Haystack", "OpenAI", "HuggingFace"],
        url: "https://weaviate.io/",
      },
      {
        name: "Chroma",
        description:
          "An open-source, developer-friendly embedding database designed for rapid prototyping and AI application development. Chroma emphasizes simplicity — it can run entirely in-memory or as a persistent local store with just a few lines of code, making it the fastest path from idea to working RAG system.",
        features: [
          "In-memory and persistent modes — start prototyping with zero infrastructure",
          "Simple Python and JavaScript SDKs with intuitive collection-based API",
          "Built-in document storage alongside embeddings for self-contained collections",
          "Automatic embedding generation via pluggable embedding functions",
        ],
        pricing: "Free / Open source | Chroma Cloud (hosted) in preview",
        integrations: ["LangChain", "LlamaIndex", "OpenAI", "HuggingFace", "Ollama"],
        url: "https://www.trychroma.com/",
      },
      {
        name: "Qdrant",
        description:
          "A high-performance, open-source vector search engine written in Rust, designed for production workloads requiring advanced filtering. Qdrant supports rich payload filtering alongside vector similarity, making it well-suited for complex queries that combine semantic search with structured metadata constraints.",
        features: [
          "Written in Rust for maximum performance and memory efficiency",
          "Advanced payload filtering with support for nested fields and geo-queries",
          "Quantization (scalar and product) for reducing memory usage by up to 4x",
          "Distributed mode with sharding and replication for horizontal scaling",
        ],
        pricing: "Free (self-hosted, open source) | Qdrant Cloud from $0.025/hour per node",
        integrations: ["LangChain", "LlamaIndex", "Haystack", "OpenAI", "FastEmbed"],
        url: "https://qdrant.tech/",
      },
    ],
    comparison: {
      description:
        "A side-by-side comparison to help you choose the right vector database for your use case.",
      rows: [
        {
          feature: "Open Source",
          values: { Pinecone: "No", Weaviate: "Yes (BSD-3)", Chroma: "Yes (Apache 2.0)", Qdrant: "Yes (Apache 2.0)" },
        },
        {
          feature: "Self-Hosting",
          values: { Pinecone: "No (managed only)", Weaviate: "Yes (Docker/K8s)", Chroma: "Yes (pip/Docker)", Qdrant: "Yes (Docker/K8s)" },
        },
        {
          feature: "Language",
          values: { Pinecone: "Managed service", Weaviate: "Go", Chroma: "Python/Rust", Qdrant: "Rust" },
        },
        {
          feature: "Hybrid Search",
          values: { Pinecone: "Yes (sparse vectors)", Weaviate: "Yes (built-in BM25)", Chroma: "No (vector only)", Qdrant: "Yes (sparse vectors)" },
        },
        {
          feature: "Built-in Embedding",
          values: { Pinecone: "Yes (inference API)", Weaviate: "Yes (vectorizer modules)", Chroma: "Yes (pluggable functions)", Qdrant: "Via FastEmbed" },
        },
        {
          feature: "Best For",
          values: {
            Pinecone: "Production at scale, zero-ops teams",
            Weaviate: "Teams wanting built-in ML + GraphQL",
            Chroma: "Prototyping and local development",
            Qdrant: "High-performance with complex filtering",
          },
        },
      ],
    },
  },
  {
    slug: "memory-providers",
    title: "Memory Providers",
    description: "Long-term memory solutions for persistent agent knowledge.",
    longDescription:
      "Memory providers give agents the ability to remember information across conversations and sessions. Unlike context windows that reset with each request, memory providers persist user preferences, facts, and interaction history, enabling truly personalized and continuity-aware agent experiences.",
    tools: [
      {
        name: "Mem0",
        description:
          "An intelligent memory layer for AI agents and assistants that automatically extracts, stores, and retrieves relevant memories from conversations. Mem0 provides personalized interactions by remembering user preferences, facts, and context across sessions without manual configuration.",
        features: [
          "Automatic memory extraction — no manual tagging or storage logic required",
          "User, agent, and session-scoped memory isolation for multi-tenant apps",
          "Hybrid storage combining vector embeddings with a graph-based knowledge store",
          "Self-improving memory that resolves conflicts and updates stale information",
        ],
        pricing: "Free tier (1K memories) | Pro from $49/month | Enterprise custom",
        integrations: ["OpenAI", "LangChain", "LlamaIndex", "CrewAI", "Vercel AI SDK"],
        url: "https://mem0.ai/",
      },
      {
        name: "Zep",
        description:
          "A long-term memory service for AI assistants that provides automatic conversation summarization, fact extraction, and temporal awareness. Zep enriches agent context with relevant past interactions, enabling assistants to recall and reason about prior conversations intelligently.",
        features: [
          "Automatic dialog summarization to compress long conversation histories",
          "Fact and entity extraction with temporal metadata (when things were said)",
          "Semantic and graph-based memory search for relevant past context",
          "Session management with configurable memory policies and retention",
        ],
        pricing: "Free (open source, self-hosted) | Zep Cloud from $99/month",
        integrations: ["LangChain", "LlamaIndex", "OpenAI", "Anthropic", "Vercel AI SDK"],
        url: "https://www.getzep.com/",
      },
    ],
    comparison: {
      description:
        "Comparing memory providers to help you choose the right solution for your agent's persistence needs.",
      rows: [
        {
          feature: "Open Source",
          values: { Mem0: "Yes (Apache 2.0)", Zep: "Yes (Apache 2.0)" },
        },
        {
          feature: "Self-Hosting",
          values: { Mem0: "Yes", Zep: "Yes (Docker)" },
        },
        {
          feature: "Memory Extraction",
          values: { Mem0: "Automatic (LLM-powered)", Zep: "Automatic (built-in NLP)" },
        },
        {
          feature: "Storage Type",
          values: { Mem0: "Vector + Graph hybrid", Zep: "Vector + Structured + Graph" },
        },
        {
          feature: "Temporal Awareness",
          values: { Mem0: "Basic timestamps", Zep: "Rich temporal metadata" },
        },
        {
          feature: "Best For",
          values: {
            Mem0: "Quick integration, automatic personalization",
            Zep: "Complex assistants needing conversation history and facts",
          },
        },
      ],
    },
  },
  {
    slug: "evaluation-tools",
    title: "Evaluation & Testing Tools",
    description: "Test, evaluate, and benchmark your agent performance.",
    longDescription:
      "Evaluation tools help you measure, benchmark, and improve the quality of your LLM applications and agents. They provide automated metrics for relevance, faithfulness, toxicity, and more, along with CI/CD integration to catch regressions before they reach production.",
    tools: [
      {
        name: "DeepEval",
        description:
          "An open-source LLM evaluation framework that provides 14+ research-backed metrics for systematically testing LLM applications. DeepEval integrates with pytest for unit-testing LLM outputs, supports custom metrics, and connects to the Confident AI platform for analytics and collaboration.",
        features: [
          "14+ built-in metrics including faithfulness, answer relevancy, hallucination, and bias",
          "Pytest integration for unit-testing LLM outputs in your existing CI/CD pipeline",
          "Synthetic test data generation from documents for comprehensive coverage",
          "Confident AI dashboard for tracking evaluation results over time",
        ],
        pricing: "Free / Open source | Confident AI cloud for dashboards and collaboration",
        integrations: ["LangChain", "LlamaIndex", "OpenAI", "Anthropic", "HuggingFace", "pytest"],
        url: "https://docs.confident-ai.com/",
      },
      {
        name: "PromptFoo",
        description:
          "An open-source tool for testing, evaluating, and red-teaming LLM applications. PromptFoo enables side-by-side comparison of prompts and models with configurable assertions, making it easy to iterate on prompt quality and catch regressions across model changes.",
        features: [
          "Side-by-side prompt and model comparison with tabular result views",
          "Configurable assertions (contains, regex, model-graded, JavaScript) for automated pass/fail",
          "Red-teaming module for automated adversarial testing and vulnerability detection",
          "CI-friendly CLI and GitHub Actions integration for automated evaluation",
        ],
        pricing: "Free / Open source | PromptFoo Cloud for team collaboration",
        integrations: ["OpenAI", "Anthropic", "Google AI", "Azure OpenAI", "Ollama", "Any HTTP endpoint"],
        url: "https://promptfoo.dev/",
      },
      {
        name: "Ragas",
        description:
          "A framework specifically designed for evaluating RAG (Retrieval-Augmented Generation) pipelines with automated, reference-free metrics. Ragas measures both the retrieval quality and the generation quality of your RAG system, helping you identify whether problems originate in retrieval or generation.",
        features: [
          "RAG-specific metrics: context precision, context recall, faithfulness, answer relevancy",
          "Reference-free evaluation — no ground truth labels needed for most metrics",
          "Test set generation from documents for building evaluation datasets automatically",
          "Component-level analysis to isolate retrieval vs. generation quality issues",
        ],
        pricing: "Free / Open source",
        integrations: ["LangChain", "LlamaIndex", "Haystack", "OpenAI", "Any RAG pipeline"],
        url: "https://ragas.io/",
      },
    ],
    comparison: {
      description:
        "Choosing the right evaluation tool depends on what you are evaluating and how you want to integrate it.",
      rows: [
        {
          feature: "Primary Focus",
          values: { DeepEval: "General LLM testing", PromptFoo: "Prompt comparison & red-teaming", Ragas: "RAG pipeline evaluation" },
        },
        {
          feature: "Metrics Count",
          values: { DeepEval: "14+ built-in", PromptFoo: "Custom assertions", Ragas: "8+ RAG-specific" },
        },
        {
          feature: "CI/CD Integration",
          values: { DeepEval: "pytest native", PromptFoo: "CLI + GitHub Actions", Ragas: "Python scripts" },
        },
        {
          feature: "Red-teaming",
          values: { DeepEval: "Basic", PromptFoo: "Extensive (built-in module)", Ragas: "No" },
        },
        {
          feature: "Test Data Generation",
          values: { DeepEval: "Yes (synthetic)", PromptFoo: "No", Ragas: "Yes (from documents)" },
        },
        {
          feature: "Best For",
          values: {
            DeepEval: "Teams wanting pytest-based LLM unit tests",
            PromptFoo: "Prompt engineering and adversarial testing",
            Ragas: "Dedicated RAG pipeline quality measurement",
          },
        },
      ],
    },
  },
  {
    slug: "deployment-platforms",
    title: "Deployment Platforms",
    description: "Deploy and scale your AI agents in the cloud.",
    longDescription:
      "Deployment platforms handle the infrastructure complexity of running AI agents in production — from GPU provisioning for model inference to auto-scaling for variable workloads. These platforms let you focus on your agent logic while they manage containers, networking, and scaling.",
    tools: [
      {
        name: "Modal",
        description:
          "A serverless cloud platform purpose-built for AI/ML workloads that provides on-demand GPU access, instant cold starts, and a Python-native developer experience. Modal lets you define infrastructure as code using Python decorators, eliminating the need for Dockerfiles, Kubernetes configs, or cloud console clicks.",
        features: [
          "GPU access (A10G, A100, H100) with per-second billing and instant cold starts",
          "Python-native infrastructure — define compute, storage, and scheduling with decorators",
          "Built-in cron scheduling and webhook endpoints for production agent workflows",
          "Automatic container building with dependency caching for fast iteration",
        ],
        pricing: "Pay per use | ~$0.000575/sec (CPU) | GPU from $0.000309/sec (T4)",
        integrations: ["FastAPI", "vLLM", "HuggingFace", "PyTorch", "LangChain"],
        url: "https://modal.com/",
      },
      {
        name: "Railway",
        description:
          "An instant deployment platform for full-stack applications and backend services that abstracts away DevOps complexity. Railway auto-detects your framework, provisions databases, and deploys from GitHub pushes, making it ideal for teams that want a Heroku-like experience with modern infrastructure.",
        features: [
          "One-click deployments from GitHub with automatic framework detection",
          "Managed databases (Postgres, Redis, MySQL, MongoDB) with one-click provisioning",
          "Private networking between services with automatic service discovery",
          "Preview environments for every pull request with isolated databases",
        ],
        pricing: "Free tier ($5 credit/month) | Pro $20/seat/month | Usage-based compute",
        integrations: ["Next.js", "FastAPI", "Express", "Django", "Docker", "GitHub"],
        url: "https://railway.app/",
      },
      {
        name: "Fly.io",
        description:
          "A global application platform that runs full-stack apps and databases close to users worldwide using lightweight micro-VMs. Fly.io excels at latency-sensitive applications by deploying your code to data centers in 30+ regions, with built-in load balancing and auto-scaling.",
        features: [
          "Global deployment across 30+ regions with automatic geo-routing",
          "Lightweight Firecracker micro-VMs for fast boot times and efficient resource use",
          "Built-in Postgres, Redis, and LiteFS for globally distributed data",
          "GPU machines available for running model inference at the edge",
        ],
        pricing: "Free tier (3 shared VMs) | Pay per use from $0.0015/sec (shared CPU)",
        integrations: ["Docker", "Node.js", "Python", "Go", "Rust", "Elixir", "PostgreSQL"],
        url: "https://fly.io/",
      },
    ],
    comparison: {
      description:
        "Each deployment platform has different strengths depending on your workload type and operational preferences.",
      rows: [
        {
          feature: "Primary Strength",
          values: { Modal: "Serverless AI/ML + GPUs", Railway: "Full-stack app deployment", "Fly.io": "Global edge deployment" },
        },
        {
          feature: "GPU Support",
          values: { Modal: "Yes (A10G, A100, H100)", Railway: "No", "Fly.io": "Yes (A100, L40S)" },
        },
        {
          feature: "Managed Databases",
          values: { Modal: "Volumes + Dicts", Railway: "Yes (Postgres, Redis, MySQL)", "Fly.io": "Yes (Postgres, Redis)" },
        },
        {
          feature: "Deploy Method",
          values: { Modal: "Python decorators (CLI)", Railway: "Git push / Docker", "Fly.io": "CLI / Dockerfile" },
        },
        {
          feature: "Global Regions",
          values: { Modal: "US (AWS)", Railway: "US + EU", "Fly.io": "30+ worldwide" },
        },
        {
          feature: "Best For",
          values: {
            Modal: "GPU workloads, model inference, batch jobs",
            Railway: "Full-stack apps with databases, fast setup",
            "Fly.io": "Low-latency global apps, edge computing",
          },
        },
      ],
    },
  },
];

/* ============================================================
   Static Params & Metadata
   ============================================================ */

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

/* ============================================================
   Page Component
   ============================================================ */

export default async function EcosystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav
        className="mb-6 flex items-center gap-2 text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/ecosystem" className="hover:text-accent transition-colors">
          Ecosystem
        </Link>
        <span>/</span>
        <span
          style={{ color: "var(--text-primary)" }}
          className="font-medium"
        >
          {cat.title}
        </span>
      </nav>

      {/* Header */}
      <h1
        className="text-3xl font-extrabold sm:text-4xl"
        style={{ color: "var(--text-primary)" }}
      >
        {cat.title}
      </h1>
      <p
        className="mt-3 max-w-3xl text-lg leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {cat.longDescription}
      </p>

      {/* Tool count badge */}
      <div className="mt-4">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-secondary)",
          }}
        >
          {cat.tools.length} tool{cat.tools.length !== 1 ? "s" : ""} in this
          category
        </span>
      </div>

      {/* Tool Cards */}
      <div className="mt-10 space-y-6">
        {cat.tools.map((tool) => (
          <div
            key={tool.name}
            className="rounded-xl border p-6 transition-all hover:border-accent"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            {/* Tool Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {tool.name}
                </h2>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {tool.description}
                </p>
              </div>
              <span
                className="shrink-0 self-start rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-muted)",
                }}
              >
                {tool.pricing}
              </span>
            </div>

            {/* Key Features */}
            <div className="mt-5">
              <h3
                className="mb-2.5 text-sm font-semibold uppercase tracking-wide"
                style={{ color: "var(--text-muted)" }}
              >
                Key Features
              </h3>
              <ul className="space-y-2">
                {tool.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Integrations */}
            <div className="mt-5">
              <h3
                className="mb-2.5 text-sm font-semibold uppercase tracking-wide"
                style={{ color: "var(--text-muted)" }}
              >
                Integrations
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {tool.integrations.map((integration) => (
                  <span
                    key={integration}
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>

            {/* Visit Link */}
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Visit {tool.name} <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mt-14">
        <h2
          className="text-2xl font-extrabold"
          style={{ color: "var(--text-primary)" }}
        >
          Comparison
        </h2>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {cat.comparison.description}
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr>
                <th
                  className="whitespace-nowrap px-4 py-3 text-left font-semibold"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    borderBottom: "2px solid var(--border-strong)",
                  }}
                >
                  Feature
                </th>
                {cat.tools.map((tool) => (
                  <th
                    key={tool.name}
                    className="whitespace-nowrap px-4 py-3 text-left font-semibold"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      borderBottom: "2px solid var(--border-strong)",
                    }}
                  >
                    {tool.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cat.comparison.rows.map((row, i) => (
                <tr key={row.feature}>
                  <td
                    className="whitespace-nowrap px-4 py-3 font-medium"
                    style={{
                      color: "var(--text-primary)",
                      borderBottom: "1px solid var(--border)",
                      backgroundColor:
                        i % 2 === 0 ? "transparent" : "var(--bg-secondary)",
                    }}
                  >
                    {row.feature}
                  </td>
                  {cat.tools.map((tool) => (
                    <td
                      key={tool.name}
                      className="px-4 py-3"
                      style={{
                        color: "var(--text-secondary)",
                        borderBottom: "1px solid var(--border)",
                        backgroundColor:
                          i % 2 === 0
                            ? "transparent"
                            : "var(--bg-secondary)",
                      }}
                    >
                      {row.values[tool.name] || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-12">
        <Link
          href="/ecosystem"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
        >
          <ArrowRight size={14} className="rotate-180" />
          Back to all ecosystem tools
        </Link>
      </div>
    </div>
  );
}
