export interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "Framework" | "Concept" | "Pattern" | "Guide" | "Tool" | "Glossary" | "Ecosystem" | "Learning Path";
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

  // Learning Paths
  { title: "Beginner Learning Path", description: "New to AI agents? Go from zero to building your first agent in 2 hours.", href: "/learning-paths/beginner", type: "Learning Path", category: "beginner" },
  { title: "Python Developer Path", description: "Build powerful agents with Python frameworks like LangGraph, CrewAI, and PydanticAI.", href: "/learning-paths/python", type: "Learning Path", category: "intermediate" },
  { title: "TypeScript Developer Path", description: "Agent development in the TypeScript ecosystem with Vercel AI SDK, Mastra, and CopilotKit.", href: "/learning-paths/typescript", type: "Learning Path", category: "intermediate" },
  { title: "Production Engineer Path", description: "Ship, monitor, and scale AI agents in production environments.", href: "/learning-paths/production", type: "Learning Path", category: "advanced" },

  // Ecosystem Categories
  { title: "Observability & Monitoring Tools", description: "Debug, trace, and monitor your agents in production with LangSmith, Langfuse, and more.", href: "/ecosystem/observability", type: "Ecosystem", category: "Observability" },
  { title: "Vector Databases", description: "Store and retrieve embeddings for RAG and agent memory with Pinecone, Weaviate, Chroma, and Qdrant.", href: "/ecosystem/vector-databases", type: "Ecosystem", category: "Databases" },
  { title: "Memory Providers", description: "Long-term memory solutions for persistent agent knowledge with Mem0 and Zep.", href: "/ecosystem/memory-providers", type: "Ecosystem", category: "Memory" },
  { title: "Evaluation & Testing Tools", description: "Test, evaluate, and benchmark agent performance with DeepEval, PromptFoo, and Ragas.", href: "/ecosystem/evaluation-tools", type: "Ecosystem", category: "Evaluation" },
  { title: "Deployment Platforms", description: "Deploy and scale your agents in the cloud with Modal, Railway, and Fly.io.", href: "/ecosystem/deployment-platforms", type: "Ecosystem", category: "Deployment" },

  // ── Glossary Terms ──────────────────────────────────────────────

  // Core Concepts
  { title: "Agent", description: "An AI system that can perceive its environment, reason about observations, make decisions, and take autonomous act...", href: "/glossary#A", type: "Glossary", category: "Core Concepts" },
  { title: "Agent Loop", description: "The iterative cycle where an agent observes its environment, reasons about what to do next, takes an action, and...", href: "/glossary#A", type: "Glossary", category: "Core Concepts" },
  { title: "Agentic AI", description: "A class of AI systems that exhibit agency -- the ability to independently plan, make decisions, use tools, and ta...", href: "/glossary#A", type: "Glossary", category: "Core Concepts" },
  { title: "Autonomous Agent", description: "An agent that operates with little to no human intervention, independently deciding which actions to take, when t...", href: "/glossary#A", type: "Glossary", category: "Core Concepts" },
  { title: "Workflow", description: "A defined sequence of steps, decision points, and branching logic that an agent or system follows to complete a t...", href: "/glossary#W", type: "Glossary", category: "Core Concepts" },
  { title: "Orchestration", description: "The coordination and management of multiple agents, tools, or workflow steps to accomplish a larger, composite ta...", href: "/glossary#O", type: "Glossary", category: "Core Concepts" },
  { title: "State", description: "The accumulated information an agent tracks during execution, including conversation history, intermediate result...", href: "/glossary#S", type: "Glossary", category: "Core Concepts" },
  { title: "Action", description: "A discrete operation an agent performs to affect its environment, such as calling an API, writing to a file, exec...", href: "/glossary#A", type: "Glossary", category: "Core Concepts" },
  { title: "Observation", description: "The feedback or data an agent receives after taking an action. Observations inform the next reasoning step and c...", href: "/glossary#O", type: "Glossary", category: "Core Concepts" },

  // Reasoning
  { title: "Chain of Thought (CoT)", description: "A prompting technique that encourages the model to reason step-by-step before arriving at a final answer. By bre...", href: "/glossary#C", type: "Glossary", category: "Reasoning" },
  { title: "ReAct", description: "A reasoning paradigm where the agent interleaves Reasoning, Acting, and Observing. ReAct bridges the gap between...", href: "/glossary#R", type: "Glossary", category: "Reasoning" },
  { title: "Tree of Thought (ToT)", description: "A reasoning strategy where the model explores multiple possible solution paths simultaneously, evaluates their p...", href: "/glossary#T", type: "Glossary", category: "Reasoning" },
  { title: "Reflection", description: "A technique where an agent reviews its own outputs, identifies mistakes or gaps, and revises its response. Refle...", href: "/glossary#R", type: "Glossary", category: "Reasoning" },
  { title: "Self-Ask", description: "A prompting method where the model decomposes a complex question into simpler sub-questions, answers each one in...", href: "/glossary#S", type: "Glossary", category: "Reasoning" },
  { title: "Plan-and-Execute", description: "A two-phase reasoning approach where the agent first generates a high-level plan, then executes each step indivi...", href: "/glossary#P", type: "Glossary", category: "Reasoning" },
  { title: "Inner Monologue", description: "The internal reasoning trace that an agent generates before producing a visible output. Inner monologue lets the...", href: "/glossary#I", type: "Glossary", category: "Reasoning" },

  // Tools
  { title: "Function Calling", description: "The ability of an LLM to output structured JSON payloads that match predefined function schemas, enabling the mo...", href: "/glossary#F", type: "Glossary", category: "Tools" },
  { title: "Tool Use", description: "An agent's ability to invoke external capabilities -- APIs, databases, code execution, web browsing, or file sys...", href: "/glossary#T", type: "Glossary", category: "Tools" },
  { title: "Computer Use", description: "An agent's ability to interact with a computer's graphical user interface by reading the screen, clicking button...", href: "/glossary#C", type: "Glossary", category: "Tools" },
  { title: "Code Interpreter", description: "A sandboxed execution environment where an agent can write and run code to perform calculations, data analysis, ...", href: "/glossary#C", type: "Glossary", category: "Tools" },
  { title: "Structured Output", description: "LLM responses formatted as structured data (JSON, XML, YAML) rather than free-form text. Structured output enab...", href: "/glossary#S", type: "Glossary", category: "Tools" },
  { title: "JSON Mode", description: "A model configuration that constrains the LLM to always produce valid JSON in its response. JSON mode guarantee...", href: "/glossary#J", type: "Glossary", category: "Tools" },
  { title: "MCP Tool", description: "A tool exposed through the Model Context Protocol that an LLM application can discover and invoke at runtime. MC...", href: "/glossary#M", type: "Glossary", category: "Tools" },

  // Memory
  { title: "Short-term Memory", description: "Information that persists only for the duration of a single conversation or task session. In most LLM systems, s...", href: "/glossary#S", type: "Glossary", category: "Memory" },
  { title: "Long-term Memory", description: "Persistent storage that allows an agent to retain and recall information across separate sessions, conversations,...", href: "/glossary#L", type: "Glossary", category: "Memory" },
  { title: "Episodic Memory", description: "Memory of specific past events, interactions, or experiences -- the 'what happened' record. Episodic memory stor...", href: "/glossary#E", type: "Glossary", category: "Memory" },
  { title: "Semantic Memory", description: "General knowledge and facts that are not tied to a specific episode or event. Semantic memory stores concepts, r...", href: "/glossary#S", type: "Glossary", category: "Memory" },
  { title: "Working Memory", description: "The actively maintained subset of information that an agent uses for its current reasoning step. Working memory i...", href: "/glossary#W", type: "Glossary", category: "Memory" },
  { title: "Context Window", description: "The maximum number of tokens an LLM can process in a single request, encompassing both the input and the output....", href: "/glossary#C", type: "Glossary", category: "Memory" },
  { title: "Conversation History", description: "The running record of all messages exchanged between a user and an agent within a session. Conversation history ...", href: "/glossary#C", type: "Glossary", category: "Memory" },

  // RAG
  { title: "RAG (Retrieval-Augmented Generation)", description: "A technique that enhances LLM responses by first retrieving relevant documents from an external knowledge base, ...", href: "/glossary#R", type: "Glossary", category: "RAG" },
  { title: "Agentic RAG", description: "A RAG architecture where the retrieval process itself is managed by an agent that can decide what to search for,...", href: "/glossary#A", type: "Glossary", category: "RAG" },
  { title: "Embedding", description: "A dense numerical vector representation of text that captures semantic meaning in a high-dimensional space. Simi...", href: "/glossary#E", type: "Glossary", category: "RAG" },
  { title: "Vector Database", description: "A database optimized for storing, indexing, and querying high-dimensional vector embeddings using approximate nea...", href: "/glossary#V", type: "Glossary", category: "RAG" },
  { title: "Chunking", description: "The process of splitting large documents into smaller, semantically coherent pieces before embedding them. Chunk...", href: "/glossary#C", type: "Glossary", category: "RAG" },
  { title: "Retrieval", description: "The process of finding and fetching the most relevant documents or chunks from a knowledge base given a user que...", href: "/glossary#R", type: "Glossary", category: "RAG" },
  { title: "Re-ranking", description: "A second-stage relevance scoring step applied after initial retrieval. A re-ranker evaluates each retrieved docu...", href: "/glossary#R", type: "Glossary", category: "RAG" },
  { title: "Hybrid Search", description: "A retrieval approach that combines dense vector similarity search with traditional keyword-based (BM25/TF-IDF) s...", href: "/glossary#H", type: "Glossary", category: "RAG" },
  { title: "Semantic Search", description: "Search based on the meaning of the query rather than exact keyword matching. Semantic search uses embeddings to ...", href: "/glossary#S", type: "Glossary", category: "RAG" },

  // Patterns
  { title: "Supervisor Pattern (Glossary)", description: "A multi-agent architecture where a central supervisor agent receives requests, decomposes them into sub-tasks, a...", href: "/glossary#S", type: "Glossary", category: "Patterns" },
  { title: "Peer Collaboration (Glossary)", description: "A multi-agent pattern where agents of equal authority collaborate by exchanging messages, sharing partial results...", href: "/glossary#P", type: "Glossary", category: "Patterns" },
  { title: "Hierarchical Pattern", description: "A multi-agent architecture organized in layers: a top-level agent delegates to mid-level agents, which delegate...", href: "/glossary#H", type: "Glossary", category: "Patterns" },
  { title: "ReAct Pattern (Glossary)", description: "An implementation pattern where an agent alternates between generating a thought, executing an action, and proce...", href: "/glossary#R", type: "Glossary", category: "Patterns" },
  { title: "Agent Teams (Glossary)", description: "A group of specialized agents that work together on a shared task, each contributing domain-specific expertise. ...", href: "/glossary#A", type: "Glossary", category: "Patterns" },
  { title: "Human-in-the-Loop", description: "A design pattern where human review, approval, or intervention is required at critical decision points in an age...", href: "/glossary#H", type: "Glossary", category: "Patterns" },
  { title: "Handoff", description: "The transfer of control, context, and responsibility from one agent to another during a multi-agent workflow. A w...", href: "/glossary#H", type: "Glossary", category: "Patterns" },

  // Protocols
  { title: "MCP (Model Context Protocol)", description: "An open protocol by Anthropic that standardizes how LLM applications connect to external tools, data sources, an...", href: "/glossary#M", type: "Glossary", category: "Protocols" },
  { title: "A2A (Agent-to-Agent Protocol)", description: "An open protocol by Google that enables AI agents built with different frameworks to communicate, collaborate, an...", href: "/glossary#A", type: "Glossary", category: "Protocols" },
  { title: "MCP Server", description: "A lightweight service that exposes tools, resources, and prompts through the Model Context Protocol. MCP servers...", href: "/glossary#M", type: "Glossary", category: "Protocols" },
  { title: "MCP Client", description: "An application or agent that connects to one or more MCP servers to discover and invoke their tools, read resour...", href: "/glossary#M", type: "Glossary", category: "Protocols" },
  { title: "MCP Transport", description: "The communication layer used to exchange MCP messages between client and server. MCP supports stdio and HTTP wit...", href: "/glossary#M", type: "Glossary", category: "Protocols" },
  { title: "MCP Resource", description: "A read-only data source exposed by an MCP server, such as a file, database record, or API response. Resources p...", href: "/glossary#M", type: "Glossary", category: "Protocols" },
  { title: "MCP Prompt", description: "A reusable prompt template exposed by an MCP server that the client can discover and use. MCP prompts provide st...", href: "/glossary#M", type: "Glossary", category: "Protocols" },

  // LLM Fundamentals
  { title: "LLM (Large Language Model)", description: "A neural network with billions of parameters trained on vast amounts of text data that can generate, understand,...", href: "/glossary#L", type: "Glossary", category: "LLM Fundamentals" },
  { title: "Token", description: "The basic unit of text processing for LLMs. Text is split into tokens before processing -- roughly 4 characters ...", href: "/glossary#T", type: "Glossary", category: "LLM Fundamentals" },
  { title: "Temperature", description: "A parameter (typically 0.0 to 2.0) that controls the randomness of LLM output. Lower temperatures produce more ...", href: "/glossary#T", type: "Glossary", category: "LLM Fundamentals" },
  { title: "Top-p (Nucleus Sampling)", description: "A sampling parameter that limits token selection to the smallest set of tokens whose cumulative probability exce...", href: "/glossary#T", type: "Glossary", category: "LLM Fundamentals" },
  { title: "Fine-tuning", description: "The process of further training a pre-trained LLM on a domain-specific or task-specific dataset to improve its p...", href: "/glossary#F", type: "Glossary", category: "LLM Fundamentals" },
  { title: "Prompt", description: "The input text sent to an LLM that specifies the task, provides context, and guides the model's response. Effect...", href: "/glossary#P", type: "Glossary", category: "LLM Fundamentals" },
  { title: "System Prompt", description: "A special prompt set at the beginning of a conversation that defines the model's role, behavior, constraints, an...", href: "/glossary#S", type: "Glossary", category: "LLM Fundamentals" },
  { title: "Few-shot Prompting", description: "A prompting technique where several examples of the desired input-output format are included in the prompt. Few-...", href: "/glossary#F", type: "Glossary", category: "LLM Fundamentals" },
  { title: "Zero-shot Prompting", description: "A prompting technique where the model is asked to perform a task without any examples, relying solely on instruc...", href: "/glossary#Z", type: "Glossary", category: "LLM Fundamentals" },

  // Safety
  { title: "Guardrails", description: "Safety mechanisms that validate, filter, and constrain agent inputs and outputs against defined policies, formats...", href: "/glossary#G", type: "Glossary", category: "Safety" },
  { title: "Hallucination", description: "When an LLM generates information that is factually incorrect, fabricated, or not grounded in the provided conte...", href: "/glossary#H", type: "Glossary", category: "Safety" },
  { title: "Prompt Injection", description: "An attack where malicious instructions are embedded in user input to override the model's system prompt and inte...", href: "/glossary#P", type: "Glossary", category: "Safety" },
  { title: "Jailbreak", description: "A technique that circumvents an LLM's safety training and content policies to produce restricted or harmful outp...", href: "/glossary#J", type: "Glossary", category: "Safety" },
  { title: "Content Moderation", description: "The automated process of scanning, classifying, and filtering AI-generated content for harmful, inappropriate, o...", href: "/glossary#C", type: "Glossary", category: "Safety" },
  { title: "PII Detection", description: "The identification and handling of Personally Identifiable Information in agent inputs and outputs. PII detectio...", href: "/glossary#P", type: "Glossary", category: "Safety" },
  { title: "Output Validation", description: "The process of verifying that an agent's output meets expected format, safety, and correctness criteria before it...", href: "/glossary#O", type: "Glossary", category: "Safety" },

  // Production
  { title: "Observability", description: "The ability to understand an agent system's internal state through its external outputs -- logs, traces, metrics,...", href: "/glossary#O", type: "Glossary", category: "Production" },
  { title: "Tracing", description: "The practice of recording the full execution path of an agent request -- every LLM call, tool invocation, reason...", href: "/glossary#T", type: "Glossary", category: "Production" },
  { title: "Latency", description: "The total time elapsed between when a user sends a request and when they receive the final response. Agent laten...", href: "/glossary#L", type: "Glossary", category: "Production" },
  { title: "Throughput", description: "The number of agent requests a system can process per unit of time. Throughput is affected by model inference sp...", href: "/glossary#T", type: "Glossary", category: "Production" },
  { title: "Cost per Query", description: "The total monetary cost of processing a single agent request, including all LLM API calls, tool invocations, emb...", href: "/glossary#C", type: "Glossary", category: "Production" },
  { title: "Caching", description: "Storing and reusing the results of previous LLM calls, tool invocations, or embedding computations to reduce lat...", href: "/glossary#C", type: "Glossary", category: "Production" },
  { title: "Rate Limiting", description: "Controlling the number of requests an agent system sends to upstream APIs within a time window. Rate limiting pr...", href: "/glossary#R", type: "Glossary", category: "Production" },
  { title: "Graceful Degradation", description: "A design principle where an agent system continues to provide useful functionality when a component fails, rathe...", href: "/glossary#G", type: "Glossary", category: "Production" },
  { title: "Fallback", description: "An alternative action or model that an agent system uses when the primary option fails, times out, or is rate-li...", href: "/glossary#F", type: "Glossary", category: "Production" },

  // Multi-Agent
  { title: "Multi-Agent System", description: "An architecture where multiple specialized AI agents collaborate, communicate, and delegate tasks to achieve com...", href: "/glossary#M", type: "Glossary", category: "Multi-Agent" },
  { title: "Agent Communication", description: "The mechanisms by which agents exchange information, delegate tasks, and share results. Communication can be dir...", href: "/glossary#A", type: "Glossary", category: "Multi-Agent" },
  { title: "Swarm Intelligence", description: "A multi-agent approach inspired by biological swarms where simple agents following local rules produce emergent ...", href: "/glossary#S", type: "Glossary", category: "Multi-Agent" },
  { title: "Task Decomposition", description: "The process of breaking a complex goal into smaller, manageable sub-tasks that can be assigned to individual age...", href: "/glossary#T", type: "Glossary", category: "Multi-Agent" },
];
