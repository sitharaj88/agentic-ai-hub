import type { Category } from "@/lib/constants";

export interface Framework {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  developer: string;
  language: string[];
  license: string;
  github_url: string;
  docs_url: string;
  description: string;
  architecture: string;
  use_cases: string[];
  strengths: string[];
  weaknesses: string[];
  code_example: string;
  code_language: string;
  stars_approx: string;
  mcp_support: boolean;
  multi_agent: boolean;
  featured: boolean;
  notable_users: string[];
}

export const frameworks: Framework[] = [
  // ─────────────────────────────────────────────────────────────
  // BIG TECH
  // ─────────────────────────────────────────────────────────────
  {
    id: "claude-agent-sdk",
    name: "Claude Agent SDK",
    tagline: "Anthropic's production agent runtime",
    category: "big-tech",
    developer: "Anthropic",
    language: ["Python", "TypeScript"],
    license: "MIT",
    github_url: "https://github.com/anthropics/anthropic-sdk-python",
    docs_url: "https://docs.anthropic.com/en/docs/agents-and-tools/agent-sdk",
    description:
      "Anthropic's production-grade agent runtime with deep MCP integration, computer use capabilities, and a developer-first design philosophy. It provides an agentic loop that automatically handles tool calls, supports multi-turn conversations, and includes built-in guardrails for safe agent behavior.",
    architecture:
      "The SDK wraps the Anthropic Messages API in an agentic loop that iterates until the model produces a stop response. Each iteration sends the conversation history (including tool results) back to the model, which decides whether to call more tools or return a final answer. MCP servers are integrated as first-class tool providers via a client-server transport layer.",
    use_cases: [
      "Production agent systems with tool use",
      "Computer use automation (browser, desktop)",
      "MCP-native applications and integrations",
      "Multi-turn conversational assistants",
      "Code generation and analysis pipelines",
    ],
    strengths: [
      "Deep MCP integration as a first-class feature",
      "Computer use support for GUI automation",
      "Strong safety features and content filtering",
      "Clean, Pythonic API with excellent TypeScript support",
      "Built-in support for streaming responses",
    ],
    weaknesses: [
      "Primarily optimized for Anthropic Claude models",
      "Newer ecosystem compared to LangChain/LlamaIndex",
      "Community tooling still catching up to more established frameworks",
    ],
    code_example: `import anthropic

client = anthropic.Anthropic()

# Define tools for the agent
tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a location.",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "City name"}
            },
            "required": ["location"],
        },
    }
]

def run_agent(user_message: str):
    messages = [{"role": "user", "content": user_message}]

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            tools=tools,
            messages=messages,
        )

        # If the model stops, return the final text
        if response.stop_reason == "end_turn":
            return response.content[0].text

        # Process tool calls
        for block in response.content:
            if block.type == "tool_use":
                tool_result = execute_tool(block.name, block.input)
                messages.append({"role": "assistant", "content": response.content})
                messages.append({
                    "role": "user",
                    "content": [{
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": tool_result,
                    }],
                })

result = run_agent("What's the weather in San Francisco?")
print(result)`,
    code_language: "python",
    stars_approx: "10k+",
    mcp_support: true,
    multi_agent: true,
    featured: true,
    notable_users: ["Anthropic", "Notion", "DuckDuckGo", "Sourcegraph"],
  },
  {
    id: "openai-agents-sdk",
    name: "OpenAI Agents SDK",
    tagline: "Official OpenAI agent toolkit",
    category: "big-tech",
    developer: "OpenAI",
    language: ["Python"],
    license: "MIT",
    github_url: "https://github.com/openai/openai-agents-python",
    docs_url: "https://openai.github.io/openai-agents-python/",
    description:
      "OpenAI's official SDK for building production-ready agents with managed infrastructure, tool use, handoffs between specialized agents, and built-in guardrails. It provides a minimal yet powerful set of primitives: Agents, Handoffs, Guardrails, and a Runner to orchestrate everything.",
    architecture:
      "The SDK is built around an Agent class that bundles instructions, tools, and model configuration. A Runner orchestrates the agentic loop, invoking the model, processing tool calls, and managing handoffs between agents. Guardrails run in parallel with the main agent to validate inputs and outputs, enabling safe multi-step execution.",
    use_cases: [
      "Production AI assistants with handoffs",
      "Tool-augmented chatbots and copilots",
      "Enterprise workflows with guardrails",
      "Multi-agent systems with specialized roles",
      "Customer support automation pipelines",
    ],
    strengths: [
      "Deep OpenAI model integration and optimization",
      "Built-in guardrails for input/output validation",
      "Elegant handoff mechanism between specialized agents",
      "Tracing and observability out of the box",
      "Minimal abstraction with maximum control",
    ],
    weaknesses: [
      "OpenAI model lock-in by default (requires adapters for other providers)",
      "Python-only SDK at launch",
      "Smaller plugin ecosystem compared to LangChain",
    ],
    code_example: `from agents import Agent, Runner, function_tool

@function_tool
def get_weather(city: str) -> str:
    """Get the current weather for a city."""
    return f"The weather in {city} is sunny, 72°F."

weather_agent = Agent(
    name="Weather Assistant",
    instructions="You are a helpful weather assistant. Use the get_weather tool to answer questions about weather.",
    tools=[get_weather],
)

# Run the agent
result = Runner.run_sync(weather_agent, "What's the weather in Tokyo?")
print(result.final_output)`,
    code_language: "python",
    stars_approx: "15k+",
    mcp_support: true,
    multi_agent: true,
    featured: true,
    notable_users: ["OpenAI", "Stripe", "Shopify", "Klarna"],
  },
  {
    id: "google-adk",
    name: "Google ADK",
    tagline: "Google's agent development kit",
    category: "big-tech",
    developer: "Google",
    language: ["Python"],
    license: "Apache-2.0",
    github_url: "https://github.com/google/adk-python",
    docs_url: "https://google.github.io/adk-docs/",
    description:
      "Google's comprehensive Agent Development Kit for building multi-agent systems powered by Gemini and other models. It provides a layered architecture supporting simple LLM agents, pipeline agents with sequential/parallel/loop workflows, and custom agents with arbitrary orchestration logic. Deep integration with Google Cloud services and Vertex AI.",
    architecture:
      "ADK uses a hierarchical agent architecture where a root agent can delegate to sub-agents. Agents are organized as a tree, with each agent having access to tools, a model, and optional sub-agents. The framework supports three agent types: LLM agents (model-driven), pipeline agents (workflow-driven with SequentialAgent, ParallelAgent, LoopAgent), and custom agents (code-driven). Session and memory services handle state persistence.",
    use_cases: [
      "Gemini-powered multi-modal agents",
      "Google Cloud-integrated enterprise workflows",
      "Multi-agent systems with hierarchical delegation",
      "Pipeline-based data processing agents",
      "Vertex AI deployed production agents",
    ],
    strengths: [
      "Multi-modal support via Gemini (text, image, video, audio)",
      "Deep Google Cloud and Vertex AI integration",
      "Flexible agent hierarchy: LLM, pipeline, and custom agents",
      "Built-in session management and memory services",
      "A2A protocol support for cross-framework interop",
    ],
    weaknesses: [
      "Google ecosystem focus may limit portability",
      "Newer framework with a rapidly evolving API",
      "Smaller community compared to LangChain or CrewAI",
    ],
    code_example: `from google.adk.agents import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService

def get_weather(city: str) -> dict:
    """Get the current weather for a city."""
    return {"status": "success", "report": f"Sunny, 25°C in {city}"}

weather_agent = Agent(
    name="weather_agent",
    model="gemini-2.0-flash",
    description="An agent that provides weather information.",
    instruction="You are a helpful weather assistant. Use tools to answer weather queries.",
    tools=[get_weather],
)

# Set up session and runner
session_service = InMemorySessionService()
runner = Runner(agent=weather_agent, app_name="weather_app", session_service=session_service)

session = session_service.create_session(app_name="weather_app", user_id="user1")

# Run the agent
from google.adk.runners import RunConfig
response = runner.run(
    user_id="user1",
    session_id=session.id,
    new_message="What's the weather in Paris?",
)
for event in response:
    if event.is_final_response():
        print(event.content.parts[0].text)`,
    code_language: "python",
    stars_approx: "5k+",
    mcp_support: true,
    multi_agent: true,
    featured: true,
    notable_users: ["Google", "Kaggle", "DeepMind", "Wayfair"],
  },
  {
    id: "microsoft-agent-framework",
    name: "Microsoft AutoGen",
    tagline: "Multi-agent conversation framework",
    category: "big-tech",
    developer: "Microsoft",
    language: ["Python", "C#"],
    license: "MIT",
    github_url: "https://github.com/microsoft/autogen",
    docs_url: "https://microsoft.github.io/autogen/",
    description:
      "Microsoft's framework for building multi-agent systems where agents can converse with each other, use tools, and collaborate on complex tasks. AutoGen 0.4 introduced a complete rewrite with an event-driven architecture, async-first design, and a modular component system. Complements Semantic Kernel for enterprise scenarios with Azure integration.",
    architecture:
      "AutoGen 0.4 uses an event-driven, actor-based architecture where agents communicate through an AgentRuntime message bus. Each agent is an independent actor that receives and sends messages asynchronously. Teams (like RoundRobinGroupChat, SelectorGroupChat) orchestrate multi-agent conversations with configurable termination conditions. The framework separates the core agent protocol from specific implementations, enabling custom agent types.",
    use_cases: [
      "Multi-agent debates and discussions",
      "Enterprise workflows with Azure integration",
      "Complex problem-solving with agent collaboration",
      "Code generation and review pipelines",
      "Research and analysis with multiple specialist agents",
    ],
    strengths: [
      "Mature multi-agent conversation patterns",
      "Event-driven async architecture (v0.4)",
      "Deep Azure and Microsoft ecosystem integration",
      "Multi-language support (Python, C#)",
      "Flexible team orchestration patterns",
    ],
    weaknesses: [
      "Major API changes between v0.2 and v0.4 can cause confusion",
      "Complex setup for simple use cases",
      "Heavy enterprise focus may overwhelm smaller projects",
      "Documentation split between old and new versions",
    ],
    code_example: `from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import TextMentionTermination
from autogen_ext.models.openai import OpenAIChatCompletionClient

# Create a model client
model_client = OpenAIChatCompletionClient(model="gpt-4o")

# Define agents
primary_agent = AssistantAgent(
    "primary",
    model_client=model_client,
    system_message="You are a helpful AI assistant. Say 'APPROVE' when the task is done.",
)

critic_agent = AssistantAgent(
    "critic",
    model_client=model_client,
    system_message="You review responses and provide constructive feedback. Say 'APPROVE' when satisfied.",
)

# Create a team with termination condition
termination = TextMentionTermination("APPROVE")
team = RoundRobinGroupChat(
    [primary_agent, critic_agent],
    termination_condition=termination,
)

# Run the team
import asyncio

async def main():
    result = await team.run(task="Write a haiku about AI agents.")
    print(result.messages[-1].content)

asyncio.run(main())`,
    code_language: "python",
    stars_approx: "38k+",
    mcp_support: true,
    multi_agent: true,
    featured: false,
    notable_users: ["Microsoft", "Accenture", "EY", "McKinsey"],
  },
  {
    id: "aws-strands",
    name: "AWS Strands",
    tagline: "Cloud-native agent framework",
    category: "big-tech",
    developer: "Amazon Web Services",
    language: ["Python"],
    license: "Apache-2.0",
    github_url: "https://github.com/strands-agents/sdk-python",
    docs_url: "https://strandsagents.com/",
    description:
      "AWS's open-source SDK for building AI agents that integrates seamlessly with Amazon Bedrock and other AWS services. Strands follows a model-driven approach where the AI model acts as the orchestrator, deciding which tools to call and when. It supports any model provider while providing first-class Bedrock integration for production deployments.",
    architecture:
      "Strands uses a simple Agent abstraction that wraps a model provider and a set of tools. The agent loop sends the user message plus available tool definitions to the model, which returns either a text response or tool call requests. The SDK handles tool execution and feeds results back to the model. This model-driven loop continues until the model produces a final response. Tool definitions are Python functions decorated with @tool.",
    use_cases: [
      "AWS-native AI agent applications",
      "Amazon Bedrock-powered workflows",
      "Cloud infrastructure automation agents",
      "Enterprise data processing pipelines",
      "Multi-service AWS orchestration",
    ],
    strengths: [
      "Deep AWS ecosystem integration (Bedrock, Lambda, S3, etc.)",
      "Model-agnostic with Bedrock-native optimizations",
      "Simple, Pythonic API with minimal boilerplate",
      "Production-ready with AWS infrastructure backing",
      "Open-source with active AWS investment",
    ],
    weaknesses: [
      "AWS-focused ecosystem may limit portability",
      "Smaller community compared to established frameworks",
      "Fewer pre-built tools and integrations outside AWS",
    ],
    code_example: `from strands import Agent
from strands.tools import tool

@tool
def get_weather(location: str) -> str:
    """Get the current weather for a location.

    Args:
        location: The city name to get weather for.
    """
    return f"The weather in {location} is sunny, 75°F."

# Create an agent with Amazon Bedrock (default)
agent = Agent(
    tools=[get_weather],
    system_prompt="You are a helpful weather assistant.",
)

# Run the agent
response = agent("What's the weather in Seattle?")
print(response)`,
    code_language: "python",
    stars_approx: "4k+",
    mcp_support: true,
    multi_agent: true,
    featured: false,
    notable_users: ["Amazon", "AWS", "Twitch", "Capital One"],
  },

  // ─────────────────────────────────────────────────────────────
  // OPEN SOURCE
  // ─────────────────────────────────────────────────────────────
  {
    id: "langgraph",
    name: "LangGraph",
    tagline: "Stateful agents as graphs",
    category: "open-source",
    developer: "LangChain Inc.",
    language: ["Python", "TypeScript"],
    license: "MIT",
    github_url: "https://github.com/langchain-ai/langgraph",
    docs_url: "https://langchain-ai.github.io/langgraph/",
    description:
      "Graph-based framework for building stateful, multi-actor LLM applications with cycles, controllability, and persistence. LangGraph models agent workflows as state machines where nodes are functions and edges define transitions, including conditional routing. It provides built-in checkpointing, human-in-the-loop support, and seamless LangSmith integration for debugging.",
    architecture:
      "LangGraph represents agent logic as a directed graph (StateGraph) where nodes are Python functions that read and write to a shared state object. Edges connect nodes and can be conditional, allowing dynamic routing based on state. The graph compiles into a runnable that executes nodes in topological order, supporting cycles for iterative agent loops. A checkpointer persists state between runs, enabling human-in-the-loop workflows and fault tolerance.",
    use_cases: [
      "Complex multi-step agent workflows with branching logic",
      "Human-in-the-loop approval and review systems",
      "Stateful conversational agents with memory",
      "Multi-agent systems with supervisor patterns",
      "Production RAG pipelines with agentic retrieval",
    ],
    strengths: [
      "Fine-grained control over execution flow via graph structure",
      "Built-in persistence and checkpointing for fault tolerance",
      "Excellent debugging and observability with LangSmith",
      "Supports complex patterns: cycles, branching, parallel execution",
      "First-class streaming support for real-time applications",
    ],
    weaknesses: [
      "Steeper learning curve than simpler frameworks",
      "Graph abstraction can feel verbose for simple agents",
      "Tightly coupled with the LangChain ecosystem",
    ],
    code_example: `from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_openai import ChatOpenAI

class State(TypedDict):
    messages: Annotated[list, add_messages]

llm = ChatOpenAI(model="gpt-4o")

def chatbot(state: State):
    return {"messages": [llm.invoke(state["messages"])]}

# Build the graph
graph = StateGraph(State)
graph.add_node("chatbot", chatbot)
graph.add_edge(START, "chatbot")
graph.add_edge("chatbot", END)

# Compile and run
app = graph.compile()
result = app.invoke({"messages": [{"role": "user", "content": "Hello!"}]})
print(result["messages"][-1].content)`,
    code_language: "python",
    stars_approx: "8k+",
    mcp_support: true,
    multi_agent: true,
    featured: true,
    notable_users: ["Elastic", "Replit", "Rakuten", "LangChain"],
  },
  {
    id: "crewai",
    name: "CrewAI",
    tagline: "AI agent teams with roles",
    category: "open-source",
    developer: "CrewAI Inc.",
    language: ["Python"],
    license: "MIT",
    github_url: "https://github.com/crewAIInc/crewAI",
    docs_url: "https://docs.crewai.com/",
    description:
      "Role-based multi-agent framework where agents have defined roles, backstories, and goals. CrewAI emphasizes natural collaboration and delegation between agents organized as a 'crew'. It provides a high-level abstraction that makes it easy to create teams of AI agents that work together on complex tasks, with built-in support for sequential and hierarchical processes.",
    architecture:
      "CrewAI uses a role-playing architecture where each Agent has a role, goal, and backstory that shape its behavior. Tasks define the work to be done and can be assigned to specific agents. A Crew orchestrates the agents, running them through a Process (sequential, hierarchical, or consensual). Under the hood, agents use a ReAct-style loop for tool use and reasoning, with optional delegation to other agents in the crew.",
    use_cases: [
      "Business process automation with specialized teams",
      "Content creation pipelines (research, write, edit)",
      "Research teams with multiple analyst agents",
      "Customer support triage and resolution",
      "Data analysis with collaborative agent workflows",
    ],
    strengths: [
      "Intuitive role-based design that maps to real team structures",
      "Excellent for non-technical users and rapid prototyping",
      "Built-in process types: sequential, hierarchical, consensual",
      "Active community with many pre-built templates",
      "Simple API that hides complexity behind clean abstractions",
    ],
    weaknesses: [
      "Less control over individual agent internals and reasoning",
      "Limited low-level customization of the orchestration loop",
      "Can produce verbose agent interactions for simple tasks",
    ],
    code_example: `from crewai import Agent, Task, Crew, Process

# Create agents with roles
researcher = Agent(
    role="Senior Research Analyst",
    goal="Find and analyze the latest AI trends",
    backstory="You are an expert analyst with deep knowledge of the AI industry.",
    verbose=True,
)

writer = Agent(
    role="Tech Content Writer",
    goal="Write engaging articles about AI discoveries",
    backstory="You are a skilled writer who translates complex tech into clear content.",
    verbose=True,
)

# Define tasks
research_task = Task(
    description="Research the latest developments in AI agents for 2025.",
    expected_output="A detailed summary of the top 5 AI agent trends.",
    agent=researcher,
)

writing_task = Task(
    description="Write a blog post based on the research findings.",
    expected_output="A polished blog post of approximately 500 words.",
    agent=writer,
)

# Assemble the crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process=Process.sequential,
    verbose=True,
)

result = crew.kickoff()
print(result)`,
    code_language: "python",
    stars_approx: "25k+",
    mcp_support: true,
    multi_agent: true,
    featured: true,
    notable_users: ["Oracle", "Deloitte", "Accenture", "KPMG"],
  },
  {
    id: "ag2",
    name: "AG2",
    tagline: "Community-driven multi-agent framework",
    category: "open-source",
    developer: "AG2 Community",
    language: ["Python"],
    license: "Apache-2.0",
    github_url: "https://github.com/ag2ai/ag2",
    docs_url: "https://docs.ag2.ai/",
    description:
      "Community-driven evolution of the original AutoGen project, focused on open multi-agent conversation patterns and group decision-making. AG2 emphasizes conversable agents that can engage in flexible, dynamic conversations with each other, supporting human participation and complex group chat scenarios.",
    architecture:
      "AG2 uses a conversable agent architecture where each agent (ConversableAgent) can send and receive messages. Agents can be configured with LLM capabilities (AssistantAgent) or human input (UserProxyAgent). Group chats are managed by a GroupChatManager that coordinates turn-taking among multiple agents. The framework supports nested conversations, function calling, and code execution within the conversation flow.",
    use_cases: [
      "Multi-agent conversations and debates",
      "Group decision-making with diverse agent perspectives",
      "Research and brainstorming with AI collaborators",
      "Code generation with automated testing feedback loops",
      "Complex problem decomposition across agent teams",
    ],
    strengths: [
      "Flexible conversation-driven agent interactions",
      "Strong group chat and multi-party dynamics",
      "Active open-source community with rapid development",
      "Built-in code execution capabilities",
      "Supports nested and hierarchical conversations",
    ],
    weaknesses: [
      "Complex API surface for beginners",
      "Rapidly evolving with frequent breaking changes",
      "Documentation can lag behind development pace",
    ],
    code_example: `from ag2 import AssistantAgent, UserProxyAgent

# Create an assistant agent
assistant = AssistantAgent(
    name="assistant",
    llm_config={"model": "gpt-4o", "api_type": "openai"},
    system_message="You are a helpful AI assistant. Solve tasks step by step.",
)

# Create a user proxy that can execute code
user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=5,
    code_execution_config={"work_dir": "coding", "use_docker": False},
)

# Start a conversation
user_proxy.initiate_chat(
    assistant,
    message="Write a Python function to calculate the Fibonacci sequence up to n terms, then test it with n=10.",
)`,
    code_language: "python",
    stars_approx: "5k+",
    mcp_support: true,
    multi_agent: true,
    featured: false,
    notable_users: ["Penn State University", "Microsoft Research", "University of Washington"],
  },
  {
    id: "llamaindex",
    name: "LlamaIndex",
    tagline: "Knowledge agents for your data",
    category: "open-source",
    developer: "LlamaIndex Inc.",
    language: ["Python", "TypeScript"],
    license: "MIT",
    github_url: "https://github.com/run-llama/llama_index",
    docs_url: "https://docs.llamaindex.ai/",
    description:
      "Document-centric agent framework built from industry-leading RAG foundations. LlamaIndex focuses on structured data ingestion, indexing, and agentic document workflows. Its agent abstraction combines reasoning with data retrieval, making it the go-to framework for knowledge-intensive applications that need to reason over private data.",
    architecture:
      "LlamaIndex provides a layered architecture: data connectors ingest documents from various sources, indexes organize them for efficient retrieval (vector, keyword, knowledge graph), and query engines expose them to agents. The AgentRunner manages the agent loop, maintaining a TaskState and StepHistory. Agents use a ReAct-style loop with tool abstractions that wrap query engines, APIs, and other data sources. The Workflows API adds event-driven orchestration for complex pipelines.",
    use_cases: [
      "Knowledge management and document Q&A systems",
      "Agentic RAG with multi-step retrieval",
      "Data-driven agents over private enterprise data",
      "Multi-document analysis and comparison",
      "Structured data extraction from unstructured sources",
    ],
    strengths: [
      "Best-in-class RAG capabilities with multiple index types",
      "Rich data connectors (LlamaHub) for 100+ data sources",
      "Hybrid search combining vector, keyword, and knowledge graph",
      "TypeScript support via LlamaIndex.TS",
      "Production-ready with LlamaCloud managed service",
    ],
    weaknesses: [
      "Document-focused design can feel heavy for non-RAG agents",
      "Can be complex for simple agent use cases",
      "Large dependency footprint for full feature set",
    ],
    code_example: `from llama_index.core.agent import ReActAgent
from llama_index.llms.openai import OpenAI
from llama_index.core.tools import FunctionTool

def multiply(a: float, b: float) -> float:
    """Multiply two numbers and return the result."""
    return a * b

def add(a: float, b: float) -> float:
    """Add two numbers and return the result."""
    return a + b

# Wrap functions as tools
multiply_tool = FunctionTool.from_defaults(fn=multiply)
add_tool = FunctionTool.from_defaults(fn=add)

# Create a ReAct agent
llm = OpenAI(model="gpt-4o")
agent = ReActAgent.from_tools(
    [multiply_tool, add_tool],
    llm=llm,
    verbose=True,
)

response = agent.chat("What is (3 + 5) * 2?")
print(response)`,
    code_language: "python",
    stars_approx: "38k+",
    mcp_support: true,
    multi_agent: true,
    featured: false,
    notable_users: ["Uber", "Dropbox", "Notion", "Databricks"],
  },
  {
    id: "smolagents",
    name: "Smolagents",
    tagline: "Minimal code-centric agents",
    category: "open-source",
    developer: "Hugging Face",
    language: ["Python"],
    license: "Apache-2.0",
    github_url: "https://github.com/huggingface/smolagents",
    docs_url: "https://huggingface.co/docs/smolagents/",
    description:
      "Ultra-minimal agent framework from Hugging Face where agents write and execute Python code to achieve goals. Instead of traditional tool calling via JSON, smolagents uses a 'code agent' approach where the LLM generates Python code snippets that are executed in a sandboxed environment. This leads to more flexible and composable agent behavior.",
    architecture:
      "Smolagents provides two agent types: CodeAgent (generates and executes Python code) and ToolCallingAgent (uses standard tool calling). Both run in a ReAct-style loop where the model reasons about the task, takes an action (code or tool call), observes the result, and repeats. Tools are simple Python functions or classes. The framework includes a secure sandboxed execution environment and supports any model via a lightweight model adapter interface.",
    use_cases: [
      "Learning and understanding agent fundamentals",
      "Code-generation and data analysis tasks",
      "Rapid prototyping of agent ideas",
      "Hugging Face model and dataset interactions",
      "Research experiments with minimal overhead",
    ],
    strengths: [
      "Extremely simple API (< 1000 lines of core code)",
      "Code-first approach enables flexible tool composition",
      "Great for learning agent concepts hands-on",
      "Hugging Face Hub integration for models and tools",
      "Sandboxed code execution for safety",
    ],
    weaknesses: [
      "Limited production features (no persistence, limited memory)",
      "Basic orchestration — not suitable for complex multi-agent systems",
      "Code execution approach may not suit all use cases",
    ],
    code_example: `from smolagents import CodeAgent, tool, HfApiModel

@tool
def get_weather(city: str) -> str:
    """Get the current weather for a given city.

    Args:
        city: The city name to get weather for.
    """
    return f"Sunny, 22°C in {city}"

# Use any Hugging Face model or OpenAI
model = HfApiModel("Qwen/Qwen2.5-Coder-32B-Instruct")

agent = CodeAgent(
    tools=[get_weather],
    model=model,
)

result = agent.run("What's the weather in London?")
print(result)`,
    code_language: "python",
    stars_approx: "15k+",
    mcp_support: false,
    multi_agent: true,
    featured: false,
    notable_users: ["Hugging Face", "CERN", "Allen AI", "BigScience"],
  },
  {
    id: "pydantic-ai",
    name: "PydanticAI",
    tagline: "Type-safe AI agents",
    category: "open-source",
    developer: "Pydantic",
    language: ["Python"],
    license: "MIT",
    github_url: "https://github.com/pydantic/pydantic-ai",
    docs_url: "https://ai.pydantic.dev/",
    description:
      "Type-safe agent framework built by the creators of Pydantic. PydanticAI leverages Python's type system for structured agent outputs, dependency injection, and model-agnostic design. It brings the reliability and developer experience of Pydantic validation to the world of AI agents, ensuring outputs conform to defined schemas.",
    architecture:
      "PydanticAI centers around an Agent class parameterized by a dependency type and a result type. The agent uses a system prompt (which can be dynamic via decorators), tools (registered via decorators with dependency injection), and a model. When run, it enters a loop where the model generates responses validated against the result type using Pydantic. Dependencies are injected into tools at runtime via a RunContext, enabling clean separation of concerns and testability.",
    use_cases: [
      "Type-safe agent outputs with guaranteed schema compliance",
      "Structured data extraction from unstructured text",
      "API-driven agents that need validated responses",
      "Applications requiring dependency injection and testability",
      "Production agents where output reliability is critical",
    ],
    strengths: [
      "Pydantic-powered validation ensures type-safe outputs",
      "Clean dependency injection via RunContext",
      "Model-agnostic: supports OpenAI, Anthropic, Gemini, and more",
      "Excellent developer experience with IDE autocomplete",
      "Lightweight with minimal dependencies",
    ],
    weaknesses: [
      "Newer framework with a smaller ecosystem",
      "No built-in multi-agent orchestration",
      "Focused on single-agent patterns (use LangGraph for complex workflows)",
    ],
    code_example: `from pydantic import BaseModel
from pydantic_ai import Agent

class CityInfo(BaseModel):
    name: str
    country: str
    population: int
    fun_fact: str

agent = Agent(
    "openai:gpt-4o",
    result_type=CityInfo,
    system_prompt="You are a geography expert. Provide accurate city information.",
)

result = agent.run_sync("Tell me about Tokyo")
print(f"City: {result.data.name}")
print(f"Country: {result.data.country}")
print(f"Population: {result.data.population:,}")
print(f"Fun fact: {result.data.fun_fact}")`,
    code_language: "python",
    stars_approx: "6k+",
    mcp_support: true,
    multi_agent: false,
    featured: false,
    notable_users: ["Pydantic", "FastAPI community", "Logfire", "Robusta"],
  },
  {
    id: "agno",
    name: "Agno",
    tagline: "Lightweight multi-modal agents",
    category: "open-source",
    developer: "Agno",
    language: ["Python"],
    license: "Apache-2.0",
    github_url: "https://github.com/agno-agi/agno",
    docs_url: "https://docs.agno.com/",
    description:
      "Lightweight, model-agnostic agent framework focused on simplicity, speed, and multi-modal support. Formerly known as Phidata, Agno provides a clean API for building agents with tools, knowledge bases, memory, and team collaboration. It supports text, image, audio, and video modalities with a unified interface.",
    architecture:
      "Agno uses an Agent class that wraps a model provider with tools, knowledge (vector databases), memory (chat history + summaries), and optional storage backends. Agents run in a loop where the model generates responses, optionally calling tools, until a final answer is produced. Teams of agents can be organized with a leader agent that delegates to specialized member agents. The framework uses a plugin-like architecture for models, tools, and storage.",
    use_cases: [
      "Fast agent prototyping with minimal boilerplate",
      "Multi-modal agents (text, image, audio, video)",
      "Knowledge-base agents with built-in RAG",
      "Agent teams with delegation patterns",
      "Production applications with persistent storage",
    ],
    strengths: [
      "Lightweight and fast with minimal overhead",
      "Model-agnostic: supports 20+ model providers",
      "Multi-modal support across text, image, audio, and video",
      "Built-in knowledge bases and memory management",
      "Clean, intuitive API that is easy to learn",
    ],
    weaknesses: [
      "Smaller community compared to LangChain or CrewAI",
      "Less documentation and fewer tutorials available",
      "Recent rebrand from Phidata may cause confusion",
    ],
    code_example: `from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    tools=[DuckDuckGoTools()],
    description="You are a helpful research assistant.",
    instructions=["Always provide sources for your information."],
    markdown=True,
    show_tool_calls=True,
)

# Run the agent
agent.print_response(
    "What are the latest developments in AI agents?",
    stream=True,
)`,
    code_language: "python",
    stars_approx: "18k+",
    mcp_support: true,
    multi_agent: true,
    featured: false,
    notable_users: ["Agno", "Phidata users", "Y Combinator startups"],
  },
  {
    id: "haystack",
    name: "Haystack",
    tagline: "Production NLP pipelines",
    category: "open-source",
    developer: "deepset",
    language: ["Python"],
    license: "Apache-2.0",
    github_url: "https://github.com/deepset-ai/haystack",
    docs_url: "https://docs.haystack.deepset.ai/",
    description:
      "Production-ready framework for building composable NLP and AI pipelines. Haystack 2.x uses a component-based architecture where each component (generators, retrievers, converters, etc.) is a self-contained unit that can be connected into pipelines. While primarily a pipeline framework, it supports agentic patterns through its ChatGenerator components and tool use capabilities.",
    architecture:
      "Haystack 2.x uses a directed acyclic graph (DAG) pipeline architecture where components are nodes connected by typed input/output sockets. Each component declares its inputs and outputs, and the pipeline validates connections at build time. Components are run in topological order with automatic data routing. For agentic patterns, the framework provides ChatGenerator components that support tool use, with a pipeline loop that feeds tool results back to the model until it produces a final response.",
    use_cases: [
      "Production NLP and RAG pipelines",
      "Document processing and indexing at scale",
      "Hybrid search (semantic + keyword) systems",
      "Enterprise question answering platforms",
      "Agentic pipelines with tool-using LLMs",
    ],
    strengths: [
      "Battle-tested pipeline architecture for production use",
      "Type-safe component connections with validation",
      "Rich integration ecosystem (50+ components)",
      "Excellent documentation and tutorials",
      "Self-hostable with deepset Cloud for managed deployment",
    ],
    weaknesses: [
      "Pipeline-centric design is less flexible than free-form agents",
      "Learning curve for the component/pipeline abstraction",
      "Less suited for dynamic, open-ended agent behaviors",
    ],
    code_example: `from haystack import Pipeline
from haystack.components.generators.chat import OpenAIChatGenerator
from haystack.components.builders import ChatPromptBuilder
from haystack.dataclasses import ChatMessage

# Build a simple chat pipeline
pipeline = Pipeline()
pipeline.add_component("prompt_builder", ChatPromptBuilder())
pipeline.add_component("llm", OpenAIChatGenerator(model="gpt-4o"))

pipeline.connect("prompt_builder.prompt", "llm.messages")

# Define a system message and user template
messages = [
    ChatMessage.from_system("You are a helpful assistant."),
    ChatMessage.from_user("Tell me about {{topic}}"),
]

# Run the pipeline
result = pipeline.run({
    "prompt_builder": {
        "template": messages,
        "template_variables": {"topic": "AI agents"},
    }
})

print(result["llm"]["replies"][0].text)`,
    code_language: "python",
    stars_approx: "18k+",
    mcp_support: false,
    multi_agent: false,
    featured: false,
    notable_users: ["Airbus", "deepset", "BMW", "Intel"],
  },
  {
    id: "mastra",
    name: "Mastra",
    tagline: "TypeScript-first agent framework",
    category: "open-source",
    developer: "Mastra",
    language: ["TypeScript"],
    license: "MIT",
    github_url: "https://github.com/mastra-ai/mastra",
    docs_url: "https://mastra.ai/docs",
    description:
      "TypeScript-first agent framework with built-in workflows, RAG, integrations, and evaluation tools. Mastra provides a cohesive toolkit for building production agents in the TypeScript/Node.js ecosystem, with first-class support for structured outputs, tool calling, and multi-step workflows using an XState-inspired state machine approach.",
    architecture:
      "Mastra uses an Agent class that combines a model, tools, and system instructions. Workflows are defined as state machines with steps, transitions, and conditional logic, similar to XState. The framework includes a built-in RAG module with vector store abstractions, an integration layer for connecting to external APIs, and an evaluation module for testing agent outputs. All components are TypeScript-native with full type safety.",
    use_cases: [
      "TypeScript/Node.js backend agents and services",
      "Full-stack AI applications with React frontends",
      "API automation with third-party integrations",
      "Workflow automation with state machine logic",
      "RAG applications in the TypeScript ecosystem",
    ],
    strengths: [
      "TypeScript-native with full type safety throughout",
      "Built-in workflow engine with state machine semantics",
      "Integrated RAG, evaluation, and observability",
      "Good integration library for third-party APIs",
      "MCP support for standardized tool access",
    ],
    weaknesses: [
      "Newer framework with a smaller community",
      "TypeScript-only limits accessibility for Python developers",
      "Fewer pre-built tools compared to LangChain ecosystem",
    ],
    code_example: `import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const weatherTool = {
  id: "get_weather",
  description: "Get the current weather for a location",
  inputSchema: z.object({
    location: z.string().describe("The city name"),
  }),
  outputSchema: z.object({
    temperature: z.number(),
    condition: z.string(),
  }),
  execute: async ({ location }: { location: string }) => {
    return { temperature: 72, condition: "Sunny" };
  },
};

const agent = new Agent({
  name: "Weather Agent",
  instructions: "You are a helpful weather assistant.",
  model: openai("gpt-4o"),
  tools: { get_weather: weatherTool },
});

const response = await agent.generate(
  "What's the weather in San Francisco?"
);
console.log(response.text);`,
    code_language: "typescript",
    stars_approx: "8k+",
    mcp_support: true,
    multi_agent: true,
    featured: false,
    notable_users: ["Mastra", "Vercel ecosystem developers"],
  },
  {
    id: "langchain",
    name: "LangChain",
    tagline: "The foundational LLM framework",
    category: "open-source",
    developer: "LangChain Inc.",
    language: ["Python", "TypeScript"],
    license: "MIT",
    github_url: "https://github.com/langchain-ai/langchain",
    docs_url: "https://python.langchain.com/",
    description:
      "The foundational framework for building LLM-powered applications with a massive integration ecosystem. LangChain provides composable abstractions for prompt templates, output parsers, chains, retrievers, and tool integration. While LangGraph is now the recommended path for agents, LangChain remains the backbone for model integrations, tool definitions, and the broader ecosystem.",
    architecture:
      "LangChain uses a modular architecture with core abstractions: Models (chat models, LLMs, embeddings), Prompts (templates, few-shot selectors), Output Parsers (JSON, Pydantic, etc.), Retrievers (vector stores, keyword search), and the LCEL (LangChain Expression Language) for composing components into chains. The Runnables protocol provides a unified interface for all components with built-in streaming, batching, and async support.",
    use_cases: [
      "LLM-powered applications with rich integrations",
      "Chain-based workflows combining multiple LLM calls",
      "Tool and API integration via a standardized interface",
      "RAG applications with diverse retriever backends",
      "Prototyping with rapid model and tool swapping",
    ],
    strengths: [
      "Largest ecosystem with 700+ integrations",
      "Comprehensive model provider support (OpenAI, Anthropic, Google, etc.)",
      "Well-documented with extensive tutorials and cookbooks",
      "LCEL provides composable, streaming-first chain building",
      "Both Python and TypeScript implementations",
    ],
    weaknesses: [
      "Abstraction overhead can make debugging difficult",
      "Rapid API changes across versions cause migration pain",
      "For agent use cases, LangGraph is now the recommended approach",
      "Large dependency footprint for the full package",
    ],
    code_example: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Create a simple chain with LCEL
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that translates {input_language} to {output_language}."),
    ("human", "{input}"),
])

model = ChatOpenAI(model="gpt-4o")
output_parser = StrOutputParser()

# Compose with LCEL pipe operator
chain = prompt | model | output_parser

result = chain.invoke({
    "input_language": "English",
    "output_language": "French",
    "input": "Hello, how are you?",
})
print(result)`,
    code_language: "python",
    stars_approx: "100k+",
    mcp_support: true,
    multi_agent: false,
    featured: false,
    notable_users: ["Elastic", "Databricks", "Morningstar", "Rakuten"],
  },

  // ─────────────────────────────────────────────────────────────
  // TYPESCRIPT
  // ─────────────────────────────────────────────────────────────
  {
    id: "vercel-ai-sdk",
    name: "Vercel AI SDK",
    tagline: "AI for the web platform",
    category: "typescript",
    developer: "Vercel",
    language: ["TypeScript"],
    license: "Apache-2.0",
    github_url: "https://github.com/vercel/ai",
    docs_url: "https://sdk.vercel.ai/docs",
    description:
      "TypeScript-first SDK for building AI-powered web applications with streaming, tool use, structured outputs, and multi-model support. The Vercel AI SDK provides three layers: AI SDK Core for server-side LLM calls, AI SDK UI for React/Svelte/Vue chat hooks, and AI SDK RSC for React Server Components streaming. It is the most popular way to integrate AI into web applications.",
    architecture:
      "The SDK is organized into three layers. AI SDK Core provides model-agnostic functions (generateText, streamText, generateObject) that work with any provider via a unified interface. AI SDK UI provides framework hooks (useChat, useCompletion) for building interactive UIs with automatic streaming. AI SDK RSC enables streaming React Server Components with AI-generated content. The provider system allows hot-swapping between OpenAI, Anthropic, Google, and other model providers with zero code changes.",
    use_cases: [
      "AI-powered web applications with streaming UIs",
      "Chat interfaces with tool use and multi-turn conversations",
      "Multi-provider applications that swap models dynamically",
      "Structured data generation with validated outputs",
      "Next.js and React AI integration",
    ],
    strengths: [
      "TypeScript-native with excellent type safety",
      "Streaming-first design for responsive UIs",
      "Model-agnostic with 15+ provider integrations",
      "Seamless React/Next.js integration via hooks",
      "Built-in structured output generation with Zod schemas",
    ],
    weaknesses: [
      "Web-focused design is less suited for backend-only agents",
      "Agent loop patterns require manual implementation",
      "No built-in multi-agent orchestration",
    ],
    code_example: `import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const result = await generateText({
  model: openai("gpt-4o"),
  tools: {
    weather: tool({
      description: "Get the weather in a location",
      parameters: z.object({
        location: z.string().describe("The city to get weather for"),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72,
        condition: "Sunny",
      }),
    }),
  },
  maxSteps: 5, // Enable multi-step tool use
  prompt: "What's the weather in San Francisco?",
});

console.log(result.text);`,
    code_language: "typescript",
    stars_approx: "12k+",
    mcp_support: false,
    multi_agent: false,
    featured: true,
    notable_users: ["Vercel", "Perplexity", "Hashnode", "Cal.com"],
  },
  {
    id: "copilotkit",
    name: "CopilotKit",
    tagline: "React AI copilot components",
    category: "typescript",
    developer: "CopilotKit",
    language: ["TypeScript"],
    license: "MIT",
    github_url: "https://github.com/CopilotKit/CopilotKit",
    docs_url: "https://docs.copilotkit.ai/",
    description:
      "React component library for building AI copilot experiences with in-app chat, context awareness, and agent integration. CopilotKit provides ready-made React components and hooks that let you embed AI assistants directly into your application, with the ability to read app state, take actions, and interact with LangGraph or other agent backends.",
    architecture:
      "CopilotKit uses a client-server architecture. On the client side, React components (CopilotSidebar, CopilotPopup, CopilotTextarea) connect to a CopilotProvider that manages state and communication. The useCopilotReadable hook exposes app state to the AI, while useCopilotAction defines actions the AI can take. The server-side CopilotRuntime handles LLM communication and can connect to agent backends like LangGraph via the CoAgents protocol.",
    use_cases: [
      "In-app AI copilots and assistants",
      "React-based AI chat interfaces",
      "Context-aware AI that understands application state",
      "AI-powered form filling and text generation",
      "Agent-backed interactive dashboards",
    ],
    strengths: [
      "Production-ready React components out of the box",
      "Deep application context integration via hooks",
      "Built-in CoAgents protocol for backend agent connectivity",
      "Excellent developer experience with TypeScript",
      "Supports both chat and inline AI experiences",
    ],
    weaknesses: [
      "React-only (no Vue, Svelte, or Angular support)",
      "Frontend-focused; requires separate backend agent setup",
      "Less suited for non-web or headless agent applications",
    ],
    code_example: `import {
  CopilotKit,
  CopilotSidebar,
  useCopilotReadable,
  useCopilotAction,
} from "@copilotkit/react";

function App() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <CopilotSidebar>
        <TodoApp />
      </CopilotSidebar>
    </CopilotKit>
  );
}

function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);

  // Expose app state to the AI
  useCopilotReadable({
    description: "The current todo list",
    value: todos,
  });

  // Define an action the AI can take
  useCopilotAction({
    name: "addTodo",
    description: "Add a new todo item to the list",
    parameters: [
      { name: "todo", type: "string", description: "The todo text" },
    ],
    handler: async ({ todo }) => {
      setTodos((prev) => [...prev, todo]);
    },
  });

  return (
    <ul>
      {todos.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  );
}`,
    code_language: "typescript",
    stars_approx: "17k+",
    mcp_support: false,
    multi_agent: false,
    featured: false,
    notable_users: ["CopilotKit", "Mintlify", "Supabase community"],
  },

  // ─────────────────────────────────────────────────────────────
  // ENTERPRISE
  // ─────────────────────────────────────────────────────────────
  {
    id: "dify",
    name: "Dify",
    tagline: "Visual AI workflow platform",
    category: "enterprise",
    developer: "Dify AI",
    language: ["Python", "TypeScript"],
    license: "Apache-2.0",
    github_url: "https://github.com/langgenius/dify",
    docs_url: "https://docs.dify.ai/",
    description:
      "Open-source platform for building AI workflows visually with a drag-and-drop interface. Dify combines a visual workflow builder, RAG pipeline, model management, and observability into a single platform. It supports chatbots, agents, text generation, and complex workflow applications, with support for 100+ model providers.",
    architecture:
      "Dify uses a web-based application architecture with a React frontend and Flask/Python backend. Workflows are defined as directed graphs in a visual canvas, with nodes representing LLM calls, tools, conditions, code blocks, and other operations. The execution engine processes nodes in dependency order, passing data between them. A built-in RAG engine handles document ingestion, chunking, embedding, and retrieval. The platform exposes workflows as APIs for integration.",
    use_cases: [
      "No-code AI workflow building for business teams",
      "RAG applications with visual pipeline configuration",
      "Enterprise chatbots with multi-model support",
      "Internal tools and automation without coding",
      "Rapid AI application prototyping and iteration",
    ],
    strengths: [
      "Powerful visual workflow builder accessible to non-developers",
      "Self-hostable with Docker for full data control",
      "Supports 100+ model providers (OpenAI, Anthropic, local models)",
      "Built-in RAG, annotation, and dataset management",
      "Active community with 60k+ GitHub stars",
    ],
    weaknesses: [
      "Platform dependency limits flexibility for code-first developers",
      "Complex workflows can become hard to manage in the visual UI",
      "Self-hosting requires infrastructure knowledge and resources",
      "Limited extensibility compared to code-first frameworks",
    ],
    code_example: `# Dify is primarily a visual platform. Interact via API:
import requests

DIFY_API_URL = "https://api.dify.ai/v1"
API_KEY = "app-your-api-key"

# Send a chat message to a Dify chatbot application
response = requests.post(
    f"{DIFY_API_URL}/chat-messages",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    },
    json={
        "inputs": {},
        "query": "What are the latest AI agent trends?",
        "response_mode": "blocking",
        "conversation_id": "",
        "user": "user-123",
    },
)

data = response.json()
print(data["answer"])`,
    code_language: "python",
    stars_approx: "60k+",
    mcp_support: true,
    multi_agent: false,
    featured: false,
    notable_users: ["Samsung", "TCL", "Baidu", "Tencent"],
  },
  {
    id: "flowise",
    name: "Flowise",
    tagline: "Drag & drop LLM flow builder",
    category: "enterprise",
    developer: "FlowiseAI",
    language: ["TypeScript"],
    license: "Apache-2.0",
    github_url: "https://github.com/FlowiseAI/Flowise",
    docs_url: "https://docs.flowiseai.com/",
    description:
      "Open-source drag-and-drop tool for building LLM flows and AI agents with a visual node-based interface. Built on top of LangChain.js, Flowise makes it easy to prototype and deploy chatbots, RAG systems, and agent workflows without writing code. Each node represents a LangChain component that can be configured and connected visually.",
    architecture:
      "Flowise is a Node.js/TypeScript application with a React frontend using the ReactFlow library for the visual canvas. The backend wraps LangChain.js components as configurable nodes. When a flow is executed, the system resolves the node graph, instantiates LangChain components with their configured parameters, and runs the resulting chain or agent. Flows are persisted in a database and can be exposed as REST APIs or embedded as chat widgets.",
    use_cases: [
      "Visual LLM workflow prototyping and building",
      "Chatbot creation without coding",
      "RAG application building with visual configuration",
      "No-code agent prototyping for business users",
      "Rapid experimentation with different LLM architectures",
    ],
    strengths: [
      "Intuitive visual interface for non-developers",
      "LangChain.js integration provides access to a rich component library",
      "Easy deployment as APIs or embeddable chat widgets",
      "Self-hostable with simple Docker setup",
      "Active community with frequent updates",
    ],
    weaknesses: [
      "Limited for complex agent orchestration beyond visual nodes",
      "UI-dependent workflow definition can be hard to version control",
      "Performance may lag behind code-first approaches for complex flows",
      "Debugging visual flows is less intuitive than debugging code",
    ],
    code_example: `// Flowise is a visual builder. Use the API to interact with deployed flows:
const response = await fetch("http://localhost:3000/api/v1/prediction/your-chatflow-id", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    question: "What is an AI agent?",
    overrideConfig: {
      temperature: 0.7,
    },
  }),
});

const data = await response.json();
console.log(data.text);

// Flowise also supports streaming
const streamResponse = await fetch(
  "http://localhost:3000/api/v1/prediction/your-chatflow-id",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: "Explain multi-agent systems",
      streaming: true,
    }),
  }
);

const reader = streamResponse.body?.getReader();
const decoder = new TextDecoder();
while (reader) {
  const { done, value } = await reader.read();
  if (done) break;
  process.stdout.write(decoder.decode(value));
}`,
    code_language: "typescript",
    stars_approx: "35k+",
    mcp_support: false,
    multi_agent: false,
    featured: false,
    notable_users: ["FlowiseAI", "Monday.com", "Zapier community"],
  },
  {
    id: "rivet",
    name: "Rivet",
    tagline: "Visual AI agent IDE",
    category: "enterprise",
    developer: "Ironclad",
    language: ["TypeScript"],
    license: "MIT",
    github_url: "https://github.com/Ironclad/rivet",
    docs_url: "https://rivet.ironcladapp.com/docs",
    description:
      "Desktop IDE for visually building, debugging, and testing AI agent graphs with a node-based editor. Rivet was built by Ironclad for their own AI needs and open-sourced as a tool for teams to collaborate on AI agent development. It focuses on the development experience: visual debugging, real-time execution tracing, and team-friendly project management.",
    architecture:
      "Rivet uses a node-graph architecture where each node represents an operation (LLM call, text processing, conditional logic, subgraph, etc.). Graphs are defined visually in the desktop IDE and can be exported as JSON project files. The execution engine processes nodes in dependency order, supporting loops, conditionals, and subgraph invocation. A TypeScript runtime library (rivet-node) allows executing Rivet graphs programmatically in Node.js applications, bridging visual design and code deployment.",
    use_cases: [
      "Visual agent prototyping and design",
      "Debugging complex AI agent logic step by step",
      "Team collaboration on AI prompt engineering",
      "Testing and validating AI workflows before deployment",
      "Building reusable AI graph components",
    ],
    strengths: [
      "Excellent visual IDE for agent development and debugging",
      "Real-time execution tracing shows data flow through the graph",
      "Team-friendly with shareable project files",
      "rivet-node library enables production deployment of visual graphs",
      "Open-source with Ironclad's production backing",
    ],
    weaknesses: [
      "Desktop-only application (Electron-based)",
      "Smaller community compared to web-based alternatives",
      "Less suited for code-first developers who prefer pure TypeScript",
      "Limited integration ecosystem outside the core nodes",
    ],
    code_example: `// Use rivet-node to execute Rivet graphs programmatically
import * as Rivet from "@ironclad/rivet-node";

// Load a Rivet project file
const project = await Rivet.loadProjectFromFile("./my-agent.rivet-project");

// Create a processor to run the graph
const processor = Rivet.createProcessor(project, {
  graph: "Main Agent Graph",
  inputs: {
    userMessage: {
      type: "string",
      value: "What are the benefits of AI agents?",
    },
  },
  context: {},
  // Provide model configuration
  openAiKey: process.env.OPENAI_API_KEY,
});

// Run and get results
const result = await processor.run();
console.log(result.output.value);`,
    code_language: "typescript",
    stars_approx: "3k+",
    mcp_support: false,
    multi_agent: true,
    featured: false,
    notable_users: ["Ironclad", "Legal tech companies"],
  },

  // ─────────────────────────────────────────────────────────────
  // PROTOCOLS
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcp",
    name: "Model Context Protocol",
    tagline: "The standard for LLM integrations",
    category: "protocol",
    developer: "Anthropic",
    language: ["Python", "TypeScript"],
    license: "MIT",
    github_url: "https://github.com/modelcontextprotocol",
    docs_url: "https://modelcontextprotocol.io/",
    description:
      "Open protocol that standardizes how LLM applications connect to external data sources, tools, and services. MCP defines a client-server architecture where MCP servers expose tools, resources, and prompts through a standard interface, and MCP clients (like Claude, IDEs, and agent frameworks) can discover and use them. Think of it as a 'USB-C for AI' — one standard connector for all integrations.",
    architecture:
      "MCP uses a JSON-RPC 2.0-based client-server protocol. An MCP server exposes three primitives: Tools (callable functions), Resources (readable data), and Prompts (reusable templates). The transport layer supports stdio (for local servers) and HTTP with Server-Sent Events (for remote servers). Clients discover server capabilities via an initialization handshake, then invoke tools and read resources through typed RPC calls. The protocol is stateful within a session but stateless between sessions.",
    use_cases: [
      "Standardized tool integration for LLM applications",
      "Connecting AI assistants to databases, APIs, and services",
      "Building reusable tool servers shared across applications",
      "Agent interoperability across different frameworks",
      "IDE and developer tool AI integration",
    ],
    strengths: [
      "Industry standard backed by Anthropic, OpenAI, and others",
      "Growing ecosystem with 1000+ community servers",
      "Simple protocol that is easy to implement in any language",
      "Decouples tool implementation from agent framework",
      "Supports both local (stdio) and remote (HTTP/SSE) transports",
    ],
    weaknesses: [
      "Still evolving — specification changes can break implementations",
      "Authentication and authorization patterns still maturing",
      "Discovery and registry mechanisms are still being developed",
    ],
    code_example: `# Build an MCP server in Python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Weather Service")

@mcp.tool()
def get_weather(city: str) -> str:
    """Get the current weather for a city.

    Args:
        city: The city name to get weather for
    """
    return f"The weather in {city} is sunny, 72°F."

@mcp.resource("weather://current/{city}")
def weather_resource(city: str) -> str:
    """Provide weather data as a readable resource."""
    return f"Current conditions in {city}: Sunny, 72°F, Humidity: 45%"

@mcp.prompt()
def weather_prompt(city: str) -> str:
    """Generate a weather analysis prompt."""
    return f"Analyze the current weather conditions in {city} and provide recommendations."

# Run the server (stdio transport for local use)
if __name__ == "__main__":
    mcp.run()`,
    code_language: "python",
    stars_approx: "40k+",
    mcp_support: true,
    multi_agent: false,
    featured: false,
    notable_users: ["Anthropic", "OpenAI", "Cursor", "Zed"],
  },
  {
    id: "a2a",
    name: "Agent2Agent (A2A)",
    tagline: "Agent interoperability protocol",
    category: "protocol",
    developer: "Google",
    language: ["Python", "TypeScript"],
    license: "Apache-2.0",
    github_url: "https://github.com/google/A2A",
    docs_url: "https://google.github.io/A2A/",
    description:
      "Google's open protocol for agent-to-agent communication and interoperability across different frameworks and organizations. A2A enables agents built with different frameworks to discover each other's capabilities, negotiate interaction modes, and collaborate on tasks. It complements MCP (which connects agents to tools) by focusing on agent-to-agent coordination.",
    architecture:
      "A2A uses an HTTP-based protocol where each agent exposes an Agent Card (a JSON metadata document at /.well-known/agent.json) describing its capabilities, supported modes, and authentication requirements. Agents communicate through Tasks, which go through states (submitted, working, input-required, completed, failed). Communication happens via JSON-RPC over HTTP, with support for streaming via Server-Sent Events. The protocol supports opaque parts (multimodal content exchange) and push notifications for long-running tasks.",
    use_cases: [
      "Cross-framework agent communication and collaboration",
      "Agent discovery and capability advertisement",
      "Enterprise agent networks with heterogeneous frameworks",
      "Multi-organization AI agent coordination",
      "Building agent marketplaces and ecosystems",
    ],
    strengths: [
      "Google-backed with broad industry support (50+ launch partners)",
      "Framework-agnostic design works with any agent implementation",
      "Complements MCP for a complete interoperability stack",
      "Supports streaming, push notifications, and multimodal content",
      "Enterprise-focused with authentication and authorization support",
    ],
    weaknesses: [
      "Early stage protocol still under active development",
      "Limited real-world production deployments so far",
      "Competing mindshare with MCP in the standardization space",
    ],
    code_example: `# A2A Agent Card (/.well-known/agent.json)
# This is the discovery mechanism for A2A agents
agent_card = {
    "name": "Weather Agent",
    "description": "Provides weather information for any city worldwide.",
    "url": "https://weather-agent.example.com",
    "version": "1.0.0",
    "capabilities": {
        "streaming": True,
        "pushNotifications": False,
    },
    "skills": [
        {
            "id": "get-weather",
            "name": "Get Weather",
            "description": "Get current weather for a location",
            "inputModes": ["text/plain"],
            "outputModes": ["text/plain", "application/json"],
        }
    ],
}

# A2A client sending a task to another agent
import httpx

async def send_task_to_agent(agent_url: str, message: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{agent_url}/tasks/send",
            json={
                "jsonrpc": "2.0",
                "method": "tasks/send",
                "params": {
                    "id": "task-001",
                    "message": {
                        "role": "user",
                        "parts": [{"type": "text", "text": message}],
                    },
                },
                "id": "req-001",
            },
        )
        return response.json()`,
    code_language: "python",
    stars_approx: "5k+",
    mcp_support: false,
    multi_agent: true,
    featured: false,
    notable_users: ["Google", "Salesforce", "SAP", "Atlassian"],
  },
];

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

export function getFramework(id: string): Framework | undefined {
  return frameworks.find((f) => f.id === id);
}

export function getFeaturedFrameworks(): Framework[] {
  return frameworks.filter((f) => f.featured);
}

export function getFrameworksByCategory(category: Category): Framework[] {
  return frameworks.filter((f) => f.category === category);
}
