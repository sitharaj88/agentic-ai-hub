export interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "Framework" | "Concept" | "Pattern" | "Guide" | "Tool" | "Glossary";
  category?: string;
}

// This index is populated statically. As content grows, this array grows.
export const searchIndex: SearchItem[] = [
  // Frameworks
  { title: "LangGraph", description: "Graph-based stateful multi-actor agent framework", href: "/frameworks/langgraph", type: "Framework", category: "open-source" },
  { title: "CrewAI", description: "Role-based multi-agent collaboration framework", href: "/frameworks/crewai", type: "Framework", category: "open-source" },
  { title: "OpenAI Agents SDK", description: "OpenAI's official agent development toolkit", href: "/frameworks/openai-agents-sdk", type: "Framework", category: "big-tech" },
  { title: "Claude Agent SDK", description: "Anthropic's production agent runtime with MCP", href: "/frameworks/claude-agent-sdk", type: "Framework", category: "big-tech" },
  { title: "Google ADK", description: "Google's agent development kit for multi-agent systems", href: "/frameworks/google-adk", type: "Framework", category: "big-tech" },
  { title: "Microsoft Agent Framework", description: "Unified AutoGen + Semantic Kernel framework", href: "/frameworks/microsoft-agent-framework", type: "Framework", category: "big-tech" },
  { title: "AWS Strands", description: "AWS agent framework for cloud-native agents", href: "/frameworks/aws-strands", type: "Framework", category: "big-tech" },
  { title: "LlamaIndex", description: "Document-centric agents for knowledge workers", href: "/frameworks/llamaindex", type: "Framework", category: "open-source" },
  { title: "Smolagents", description: "Ultra-minimal code-centric agents by Hugging Face", href: "/frameworks/smolagents", type: "Framework", category: "open-source" },
  { title: "PydanticAI", description: "Type-safe agent framework with Pydantic validation", href: "/frameworks/pydantic-ai", type: "Framework", category: "open-source" },
  { title: "Agno", description: "Lightweight agent orchestration framework", href: "/frameworks/agno", type: "Framework", category: "open-source" },
  { title: "Haystack", description: "Production-ready NLP & agent pipelines by deepset", href: "/frameworks/haystack", type: "Framework", category: "open-source" },
  { title: "Mastra", description: "TypeScript-first agent framework", href: "/frameworks/mastra", type: "Framework", category: "open-source" },
  { title: "AG2", description: "AutoGen's next-gen multi-agent framework", href: "/frameworks/ag2", type: "Framework", category: "open-source" },
  { title: "LangChain", description: "Foundational LLM application framework", href: "/frameworks/langchain", type: "Framework", category: "open-source" },
  { title: "Vercel AI SDK", description: "TypeScript SDK for AI-powered web apps", href: "/frameworks/vercel-ai-sdk", type: "Framework", category: "typescript" },
  { title: "CopilotKit", description: "React components for AI copilot experiences", href: "/frameworks/copilotkit", type: "Framework", category: "typescript" },
  { title: "Dify", description: "Visual AI workflow platform", href: "/frameworks/dify", type: "Framework", category: "enterprise" },
  { title: "Flowise", description: "Drag-and-drop LLM flow builder", href: "/frameworks/flowise", type: "Framework", category: "enterprise" },
  { title: "Rivet", description: "Visual AI agent builder with IDE", href: "/frameworks/rivet", type: "Framework", category: "enterprise" },
  { title: "Model Context Protocol", description: "Open protocol for LLM-tool integration", href: "/frameworks/mcp", type: "Framework", category: "protocol" },
  { title: "Agent2Agent (A2A)", description: "Google's agent interoperability protocol", href: "/frameworks/a2a", type: "Framework", category: "protocol" },

  // Concepts
  { title: "What Are AI Agents?", description: "Understanding autonomous AI systems", href: "/concepts/what-are-ai-agents", type: "Concept" },
  { title: "Tool Use & Function Calling", description: "How agents interact with external tools", href: "/concepts/tool-use", type: "Concept" },
  { title: "Memory Systems", description: "Short-term, long-term, and episodic agent memory", href: "/concepts/memory-systems", type: "Concept" },
  { title: "Planning & Reasoning", description: "CoT, ReAct, Tree of Thought, and more", href: "/concepts/planning-and-reasoning", type: "Concept" },
  { title: "Multi-Agent Systems", description: "Coordinating multiple AI agents", href: "/concepts/multi-agent-systems", type: "Concept" },
  { title: "Model Context Protocol", description: "The open standard for LLM integrations", href: "/concepts/model-context-protocol", type: "Concept" },
  { title: "RAG & Agentic RAG", description: "Retrieval-augmented generation for agents", href: "/concepts/rag", type: "Concept" },

  // Patterns
  { title: "ReAct Pattern", description: "Reasoning and Acting in iterative loops", href: "/patterns/react", type: "Pattern" },
  { title: "Supervisor Pattern", description: "Central orchestrator for multi-agent systems", href: "/patterns/supervisor", type: "Pattern" },
  { title: "Peer Collaboration", description: "Direct agent-to-agent communication", href: "/patterns/peer-collaboration", type: "Pattern" },
  { title: "Hierarchical Decomposition", description: "Multi-layered agent delegation", href: "/patterns/hierarchical", type: "Pattern" },
  { title: "Tool-Augmented Generation", description: "Iterative tool use based on reasoning", href: "/patterns/tool-augmented", type: "Pattern" },
  { title: "Agent Teams", description: "Role-based agent collaboration patterns", href: "/patterns/agent-teams", type: "Pattern" },

  // Guides
  { title: "Getting Started with Agents", description: "Your first steps into agent development", href: "/guides/getting-started", type: "Guide" },
  { title: "Your First Agent in 5 Minutes", description: "Build a working agent quickly", href: "/guides/first-agent", type: "Guide" },
  { title: "Choosing Your Stack", description: "Pick the right framework for your needs", href: "/guides/choosing-your-stack", type: "Guide" },
  { title: "Multi-Agent Architecture", description: "Design multi-agent systems", href: "/guides/multi-agent-architecture", type: "Guide" },
  { title: "Building MCP Servers", description: "Create Model Context Protocol servers", href: "/guides/building-mcp-servers", type: "Guide" },
  { title: "Prompt Engineering for Agents", description: "Craft effective agent prompts", href: "/guides/prompt-engineering", type: "Guide" },
  { title: "Guardrails & Safety", description: "Keep your agents safe and reliable", href: "/guides/guardrails", type: "Guide" },
  { title: "Observability & Monitoring", description: "Monitor agents in production", href: "/guides/observability", type: "Guide" },
  { title: "Evaluation & Testing", description: "Test and evaluate agent performance", href: "/guides/evaluation", type: "Guide" },
  { title: "Production Deployment", description: "Ship agents to production", href: "/guides/production-deployment", type: "Guide" },
];
