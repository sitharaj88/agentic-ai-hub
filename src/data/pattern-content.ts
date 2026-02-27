import type { Difficulty } from "@/lib/constants";

export interface PatternContent {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  sections: {
    title: string;
    content: string; // HTML string
  }[];
  pseudocode: string;
  whenToUse: string[];
  whenNotToUse: string[];
  implementedBy: string[]; // framework IDs
  relatedPatterns: string[];
}

export const patternContent: PatternContent[] = [
  // ================================================================
  // 1. ReAct Pattern
  // ================================================================
  {
    id: "react",
    title: "ReAct Pattern",
    description:
      "Reasoning and Acting — the agent interleaves chain-of-thought reasoning with concrete actions in an iterative loop, grounding each decision in observed evidence before proceeding.",
    difficulty: "intermediate",
    sections: [
      {
        title: "Core Mechanism",
        content: `
<p>The ReAct pattern (Reasoning + Acting) was introduced by Yao et al. in 2022 and has become the foundational loop for most modern agent frameworks. The pattern fuses two capabilities that are individually powerful but become transformative when combined: <strong>chain-of-thought reasoning</strong> (the ability to decompose problems into intermediate steps) and <strong>action execution</strong> (the ability to interact with external environments and tools).</p>

<p>A pure chain-of-thought approach reasons internally but has no way to verify its assumptions against reality. Conversely, a pure action-based system takes actions without articulating why, making it brittle and hard to debug. ReAct solves both problems by structuring the agent into a three-phase loop:</p>

<ol>
  <li><strong>Thought:</strong> The agent reasons about the current state, evaluates what information is missing, and formulates a plan for the next step. This reasoning trace is emitted as text, making the agent's decision-making transparent and auditable.</li>
  <li><strong>Action:</strong> Based on the thought, the agent selects and invokes a tool or function — a web search, a database query, a calculation, an API call — with specific parameters.</li>
  <li><strong>Observation:</strong> The result of the action is returned to the agent as new context. The agent incorporates this evidence into its working memory and begins the next iteration.</li>
</ol>

<p>This loop continues until the agent determines it has sufficient information to produce a final answer, or until a maximum iteration limit is reached. The explicit reasoning trace at each step distinguishes ReAct from simpler tool-use patterns and makes it far easier to diagnose failures.</p>
`,
      },
      {
        title: "Step-by-Step Execution Flow",
        content: `
<p>Consider a concrete example: a user asks "What was the GDP growth rate of the country that won the 2024 Cricket World Cup?" A ReAct agent would proceed as follows:</p>

<ol>
  <li><strong>Thought 1:</strong> "I need to find which country won the 2024 Cricket World Cup. I'll search for this information."</li>
  <li><strong>Action 1:</strong> <code>search("2024 Cricket World Cup winner")</code></li>
  <li><strong>Observation 1:</strong> "India won the 2024 ICC T20 Cricket World Cup."</li>
  <li><strong>Thought 2:</strong> "Now I know India won. I need to find India's GDP growth rate. I should search for the most recent data."</li>
  <li><strong>Action 2:</strong> <code>search("India GDP growth rate 2024")</code></li>
  <li><strong>Observation 2:</strong> "India's GDP growth rate for FY2024 was approximately 8.2%."</li>
  <li><strong>Thought 3:</strong> "I now have both pieces of information. India won the 2024 Cricket World Cup and their GDP growth rate was approximately 8.2%. I can formulate the final answer."</li>
  <li><strong>Final Answer:</strong> "India won the 2024 Cricket World Cup. India's GDP growth rate for 2024 was approximately 8.2%."</li>
</ol>

<p>Each iteration builds on the previous observation. The reasoning trace makes it clear <em>why</em> each action was taken, and the observations ground the reasoning in real-world data rather than relying on the model's parametric memory alone.</p>
`,
      },
      {
        title: "Implementation Approaches",
        content: `
<p>Most modern agent frameworks provide first-class support for the ReAct loop. The implementation details vary, but the conceptual structure remains the same.</p>

<p><strong>LangGraph</strong> implements ReAct as a cyclic state graph. You define an <code>AgentState</code> that carries messages, then wire a <code>call_model</code> node (which produces a thought and optional tool call) to a <code>tool_executor</code> node. A conditional edge checks whether the model's response contains a tool call; if so, it routes back to the tool node, and then back to the model. If there is no tool call, the loop terminates and the final response is returned. LangGraph's explicit graph structure gives you full control over the routing logic, making it straightforward to add human-in-the-loop gates, retry logic, or branching.</p>

<p><strong>OpenAI Agents SDK</strong> and <strong>Claude Agent SDK</strong> implement the ReAct loop natively at the API level through function calling. You register tools with their JSON schemas, and the model alternates between producing reasoning and emitting structured tool calls. The SDK manages the loop internally — you receive tool calls, execute them, and return results until the model emits a final text response. This approach requires less boilerplate but offers less control over the loop structure.</p>

<p><strong>Smolagents</strong> takes a code-centric approach: the agent writes and executes Python code rather than calling structured tool schemas. This makes the action space more flexible (the agent can compose tools in a single step) but harder to sandbox safely.</p>
`,
      },
      {
        title: "ReAct vs. Pure Chain-of-Thought",
        content: `
<p>Understanding when to use ReAct versus pure chain-of-thought (CoT) reasoning is essential for designing effective agents:</p>

<table>
  <thead>
    <tr><th>Dimension</th><th>Pure CoT</th><th>ReAct</th></tr>
  </thead>
  <tbody>
    <tr><td>External data access</td><td>None — relies on parametric knowledge</td><td>Yes — retrieves real-time information</td></tr>
    <tr><td>Factual grounding</td><td>Prone to hallucination</td><td>Grounded in observations</td></tr>
    <tr><td>Transparency</td><td>Reasoning is visible but unverified</td><td>Reasoning is visible and evidence-backed</td></tr>
    <tr><td>Latency</td><td>Single inference pass</td><td>Multiple inference passes (higher latency)</td></tr>
    <tr><td>Cost</td><td>Lower (single call)</td><td>Higher (multiple calls + tool execution)</td></tr>
    <tr><td>Best for</td><td>Logic, math, self-contained reasoning</td><td>Research, fact-checking, multi-step retrieval</td></tr>
  </tbody>
</table>

<p>In practice, many systems use CoT for planning and ReAct for execution — the agent reasons about the overall approach (CoT) and then uses the ReAct loop to carry out each step with tool access.</p>
`,
      },
      {
        title: "Limitations and Mitigations",
        content: `
<p>The ReAct pattern is powerful but not without challenges:</p>

<ul>
  <li><strong>Iteration runaway:</strong> An agent can enter infinite loops if its observations don't converge toward a final answer. <em>Mitigation:</em> Enforce a maximum step count (typically 5-15 iterations) and include a fallback that synthesizes the best available answer when the limit is reached.</li>
  <li><strong>Compounding errors:</strong> Early mistakes in reasoning or tool selection can propagate through subsequent steps. <em>Mitigation:</em> Implement self-reflection checkpoints where the agent reviews its progress every N steps and can course-correct.</li>
  <li><strong>Context window pressure:</strong> Each thought-action-observation cycle adds tokens to the context. For long tasks, the agent may exceed the context window. <em>Mitigation:</em> Summarize or truncate earlier observations, use a sliding window, or store intermediate results in external memory.</li>
  <li><strong>Tool selection errors:</strong> The agent may choose inappropriate tools or format parameters incorrectly. <em>Mitigation:</em> Provide clear tool descriptions, examples of correct usage, and validate tool inputs before execution.</li>
  <li><strong>Latency and cost:</strong> Multiple LLM calls increase both latency and API costs. <em>Mitigation:</em> Use smaller, faster models for simple reasoning steps and reserve larger models for complex decisions. Cache tool results when possible.</li>
</ul>
`,
      },
    ],
    pseudocode: `function ReAct(question, tools, max_steps):
    context = [system_prompt, question]

    for step in 1..max_steps:
        // Phase 1: Reason about current state
        thought = LLM(context)
        context.append(thought)

        // Phase 2: Decide on action
        action = LLM.select_tool(thought, tools)

        if action == FINAL_ANSWER:
            return thought.answer

        // Phase 3: Execute and observe
        observation = execute_tool(action.tool, action.params)
        context.append(observation)

    // Fallback if max steps reached
    return LLM.summarize(context)`,
    whenToUse: [
      "Tasks requiring real-time information retrieval or fact-checking",
      "Multi-step research where each step depends on prior findings",
      "Problems that benefit from transparent, auditable reasoning traces",
      "Scenarios where the agent must interact with external APIs, databases, or search engines",
      "When you need to ground the LLM's responses in verified data rather than parametric memory",
    ],
    whenNotToUse: [
      "Simple, self-contained reasoning tasks that don't need external data",
      "Latency-critical applications where multiple LLM calls are unacceptable",
      "Tasks where the entire answer exists within the model's training data",
      "High-throughput batch processing where cost per query must be minimized",
      "When you need deterministic outputs — ReAct introduces variability through tool interactions",
    ],
    implementedBy: [
      "langgraph",
      "openai-agents-sdk",
      "claude-agent-sdk",
      "smolagents",
      "langchain",
      "pydantic-ai",
    ],
    relatedPatterns: [
      "tool-augmented",
      "supervisor",
    ],
  },

  // ================================================================
  // 2. Supervisor Pattern
  // ================================================================
  {
    id: "supervisor",
    title: "Supervisor Pattern",
    description:
      "A central orchestrator agent decomposes complex tasks into subtasks, delegates them to specialized worker agents, and aggregates results into a coherent final output.",
    difficulty: "intermediate",
    sections: [
      {
        title: "Architecture Overview",
        content: `
<p>The Supervisor pattern establishes a <strong>hub-and-spoke architecture</strong> for multi-agent systems. A single supervisor agent acts as the central coordinator — it receives a user request, analyzes it, decomposes it into subtasks, assigns each subtask to an appropriate worker agent, collects and validates results, and synthesizes a final response.</p>

<p>This pattern mirrors organizational structures found in software engineering teams: a tech lead decomposes a feature into tickets and assigns them to developers with the appropriate expertise. The supervisor doesn't do the actual work; instead, it manages the workflow, handles dependencies between tasks, and ensures the final output is coherent and complete.</p>

<p>The key components of the pattern are:</p>

<ul>
  <li><strong>Supervisor Agent:</strong> The orchestrator with a global view of the task. It maintains a task queue, tracks completion status, routes subtasks, and handles failures. It typically uses a more capable model to handle complex planning and decision-making.</li>
  <li><strong>Worker Agents:</strong> Specialized agents, each configured with a specific system prompt, toolset, and (optionally) a specialized model. Workers know nothing about each other — they receive a task, execute it, and return results to the supervisor.</li>
  <li><strong>Shared State:</strong> A message log or state object that the supervisor uses to track progress. In graph-based frameworks, this is typically an explicit state schema; in SDK-based approaches, it may be the conversation history itself.</li>
</ul>
`,
      },
      {
        title: "Routing and Delegation Logic",
        content: `
<p>The supervisor's most critical function is <strong>routing</strong> — deciding which worker to invoke for each subtask. There are several strategies for implementing this:</p>

<p><strong>LLM-based routing:</strong> The supervisor uses the LLM itself to analyze the task and decide which worker is best suited. The supervisor's system prompt includes a description of each available worker and their capabilities. The LLM selects the worker by name or ID, and this selection is parsed and used to dispatch the subtask. This approach is flexible and handles novel task types well, but adds latency (one LLM call per routing decision) and can occasionally misroute.</p>

<p><strong>Rule-based routing:</strong> A set of deterministic rules (keyword matching, regex, classifiers) determines which worker handles each subtask. This is faster and more predictable but less flexible. It works well when the task categories are well-defined and don't change frequently.</p>

<p><strong>Hybrid routing:</strong> Combine a fast classifier for common task types with an LLM fallback for ambiguous cases. This gives you the speed of rule-based routing with the flexibility of LLM routing.</p>

<p>When implementing routing, the supervisor should also manage <strong>task dependencies</strong>. If subtask B depends on the result of subtask A, the supervisor must ensure A completes before dispatching B. Graph-based frameworks like LangGraph make these dependencies explicit through edge definitions, while SDK-based approaches typically handle them through sequential execution logic.</p>
`,
      },
      {
        title: "State Management and Error Handling",
        content: `
<p>Robust state management is what separates production-grade supervisor implementations from prototypes. The supervisor must track:</p>

<ul>
  <li><strong>Task registry:</strong> Which subtasks have been created, their status (pending, in-progress, completed, failed), and their dependencies.</li>
  <li><strong>Worker outputs:</strong> The results returned by each worker, stored in a structured format for aggregation.</li>
  <li><strong>Error state:</strong> Which tasks have failed, how many retries have been attempted, and whether fallback strategies should be invoked.</li>
</ul>

<p>Error handling in the supervisor pattern requires particular attention because failures in one worker can cascade. Key strategies include:</p>

<ul>
  <li><strong>Retry with backoff:</strong> If a worker fails (tool error, timeout, or low-quality output), the supervisor retries the subtask, potentially with a modified prompt or different parameters.</li>
  <li><strong>Fallback workers:</strong> If the primary worker for a task type fails repeatedly, route to an alternative worker or a general-purpose agent.</li>
  <li><strong>Graceful degradation:</strong> If a non-critical subtask fails, the supervisor can proceed with partial results and note the gap in the final output rather than failing the entire request.</li>
  <li><strong>Quality gates:</strong> The supervisor can validate worker outputs before accepting them — checking for format compliance, completeness, or running a lightweight verification step.</li>
</ul>
`,
      },
      {
        title: "Implementation Example",
        content: `
<p>In <strong>LangGraph</strong>, the supervisor pattern is implemented as a state graph with the supervisor as the entry node. The supervisor node produces a routing decision (which worker to call next), and conditional edges dispatch to the appropriate worker node. Each worker node processes its subtask and returns results to the supervisor, which then decides the next step. LangGraph's built-in state persistence means you can checkpoint the workflow, enabling human-in-the-loop review between steps.</p>

<p>In the <strong>OpenAI Agents SDK</strong>, the supervisor is implemented using the handoff mechanism. The supervisor agent is defined with handoff targets pointing to each worker agent. When the supervisor decides to delegate, it performs a handoff to the appropriate worker. The worker completes its task and returns control to the supervisor. This is cleaner than manual routing but gives you less control over the intermediate state.</p>

<p>In <strong>CrewAI</strong>, the supervisor maps to a "manager" agent that uses a hierarchical process. You define a <code>Crew</code> with <code>process=Process.hierarchical</code> and designate a <code>manager_llm</code>. CrewAI handles the routing automatically — the manager analyzes the tasks and delegates to crew members based on their role descriptions.</p>
`,
      },
      {
        title: "Supervisor vs. Peer Topologies",
        content: `
<p>The supervisor pattern is not always the best choice. Understanding when a centralized orchestrator adds value versus when it becomes a bottleneck is essential:</p>

<table>
  <thead>
    <tr><th>Factor</th><th>Supervisor</th><th>Peer / Decentralized</th></tr>
  </thead>
  <tbody>
    <tr><td>Task structure</td><td>Well-decomposable, clear subtasks</td><td>Emergent, exploration-oriented</td></tr>
    <tr><td>Coordination overhead</td><td>Low — single point of control</td><td>Higher — agents must negotiate</td></tr>
    <tr><td>Single point of failure</td><td>Yes — supervisor is critical</td><td>No — more resilient</td></tr>
    <tr><td>Scalability</td><td>Bottleneck at supervisor</td><td>Scales horizontally</td></tr>
    <tr><td>Debugging</td><td>Easy — clear chain of control</td><td>Harder — distributed interactions</td></tr>
    <tr><td>Best for</td><td>Workflows, pipelines, structured tasks</td><td>Creative, debate, brainstorming</td></tr>
  </tbody>
</table>

<p>In general, prefer the supervisor pattern when you can clearly decompose the task into independent or sequentially dependent subtasks, when you need predictable execution order, and when debugging and observability are priorities. Consider peer-based approaches when the task requires negotiation, debate, or emergent solutions.</p>
`,
      },
    ],
    pseudocode: `function Supervisor(task, workers):
    state = { task, subtasks: [], results: [] }

    // Phase 1: Decompose the task
    subtasks = LLM.decompose(task, workers.descriptions)
    state.subtasks = subtasks

    // Phase 2: Execute subtasks
    while state.has_pending_subtasks():
        next_task = state.get_next_ready_subtask()
        worker = route(next_task, workers)

        try:
            result = worker.execute(next_task, state.context)
            state.results.append(result)
            state.mark_completed(next_task)
        catch error:
            if retries_remaining(next_task):
                state.retry(next_task)
            else:
                state.mark_failed(next_task)

    // Phase 3: Aggregate results
    return LLM.synthesize(state.results)`,
    whenToUse: [
      "Complex tasks that naturally decompose into distinct, well-defined subtasks",
      "When you have specialized agents for different domains (research, coding, analysis)",
      "Workflows requiring deterministic execution order and dependency management",
      "Systems where observability and debugging are important — the supervisor provides a clear control flow",
      "When you need centralized error handling, retries, and quality validation",
    ],
    whenNotToUse: [
      "Simple tasks that a single agent can handle without decomposition",
      "When the supervisor becomes a latency bottleneck in real-time systems",
      "Tasks requiring emergent behavior, negotiation, or creative exploration",
      "When workers need to communicate with each other directly and frequently",
      "If the task decomposition is ambiguous and hard to define upfront",
    ],
    implementedBy: [
      "langgraph",
      "crewai",
      "openai-agents-sdk",
      "claude-agent-sdk",
      "google-adk",
      "microsoft-agent-framework",
    ],
    relatedPatterns: [
      "hierarchical",
      "agent-teams",
      "react",
    ],
  },

  // ================================================================
  // 3. Peer Collaboration
  // ================================================================
  {
    id: "peer-collaboration",
    title: "Peer Collaboration",
    description:
      "Agents communicate directly with each other as equals — without a central orchestrator — exchanging messages, debating perspectives, and building consensus to solve problems collaboratively.",
    difficulty: "advanced",
    sections: [
      {
        title: "Decentralized Agent Communication",
        content: `
<p>The Peer Collaboration pattern removes the centralized supervisor and instead lets agents communicate directly with each other in a flat, egalitarian topology. Each agent has its own perspective, expertise, and goals, and they interact through <strong>structured message passing</strong> to collectively arrive at a solution.</p>

<p>This pattern is inspired by real-world collaboration models: peer code review, academic peer review, parliamentary debate, and brainstorming sessions. In each case, no single participant has authority over the others — quality emerges from the interaction itself.</p>

<p>The architecture consists of:</p>

<ul>
  <li><strong>Peer Agents:</strong> Each agent has a defined role, expertise area, and communication interface. Agents can read messages from other agents and produce their own responses.</li>
  <li><strong>Message Bus / Shared Context:</strong> A mechanism for agents to exchange messages. This can be a shared conversation history, a publish-subscribe channel, or a structured message queue.</li>
  <li><strong>Termination Protocol:</strong> A mechanism for determining when the conversation should end — consensus detection, vote counting, or a maximum round limit.</li>
</ul>

<p>Unlike the supervisor pattern, no single agent controls the workflow. This makes the system more resilient (no single point of failure) but harder to predict and debug.</p>
`,
      },
      {
        title: "Message Passing Protocols",
        content: `
<p>The design of the message passing protocol critically affects the quality of peer collaboration. Several patterns exist:</p>

<p><strong>Round-robin:</strong> Agents take turns in a fixed order. Agent A speaks, then Agent B, then Agent C, then back to A. This is the simplest protocol and prevents any agent from dominating the conversation. It works well for structured debates and review processes. The downside is rigidity — an agent that has nothing to add still takes a turn.</p>

<p><strong>Reactive messaging:</strong> Agents respond when they have something relevant to contribute. An agent monitors the shared context and speaks up when it detects content relevant to its expertise. This is more natural but requires a mechanism to prevent simultaneous responses and ensure all agents get heard.</p>

<p><strong>Structured protocols:</strong> Define explicit phases for the conversation: proposal, critique, revision, vote. Each agent participates in each phase according to its role. This combines the predictability of round-robin with the focus of reactive messaging.</p>

<p><strong>Broadcast with filtering:</strong> All messages go to all agents, but each agent has a filter that determines which messages are relevant to its role. This allows parallel processing — agents can work on different aspects simultaneously and only engage when cross-cutting concerns arise.</p>

<p>The choice of protocol depends on the use case. Code review benefits from structured protocols (propose, review, revise). Brainstorming benefits from reactive messaging. Debate benefits from round-robin with rebuttals.</p>
`,
      },
      {
        title: "Consensus and Conflict Resolution",
        content: `
<p>When multiple agents collaborate as peers, they will inevitably disagree. A robust peer collaboration system needs explicit mechanisms for resolving conflicts and reaching consensus:</p>

<p><strong>Majority voting:</strong> After a discussion round, each agent votes on the preferred outcome. The majority wins. This is simple but can produce mediocre compromises. It works best for binary decisions (approve/reject, include/exclude).</p>

<p><strong>Weighted voting:</strong> Agents' votes are weighted by their expertise relevance to the topic at hand. A security expert's vote carries more weight on security decisions than a UI designer's. Weights can be assigned statically or computed dynamically based on the discussion content.</p>

<p><strong>Convergence detection:</strong> The system monitors successive rounds of discussion and detects when agents' positions have converged — when new rounds produce only minor variations rather than substantive changes. This is more sophisticated than voting and works well for iterative refinement tasks.</p>

<p><strong>Escalation:</strong> If agents cannot reach consensus after a maximum number of rounds, the disagreement is escalated to a human reviewer or a more capable model that acts as an arbiter. This is a pragmatic fallback that prevents infinite debates.</p>

<p><strong>Synthesis:</strong> Rather than choosing one agent's position, an aggregation step synthesizes the best elements from all perspectives. A designated synthesis agent (or a final LLM call) reads all contributions and produces a unified output that incorporates the strongest arguments from each participant.</p>
`,
      },
      {
        title: "Use Cases and Applications",
        content: `
<p>Peer collaboration excels in scenarios where diverse perspectives improve outcomes:</p>

<p><strong>Code review:</strong> An author agent writes code, a reviewer agent critiques it for bugs and style issues, a security agent checks for vulnerabilities, and a testing agent suggests test cases. The agents exchange feedback in rounds until the code meets all quality criteria. This mirrors real engineering workflows and can catch issues that a single agent would miss.</p>

<p><strong>Creative writing and brainstorming:</strong> Multiple agents with different creative styles or domain knowledge contribute ideas to a shared canvas. A "divergent thinking" agent generates wild ideas, a "convergent thinking" agent evaluates feasibility, and a "synthesis" agent combines the best elements. The lack of a supervisor allows unexpected connections to emerge.</p>

<p><strong>Debate and analysis:</strong> Agents argue different sides of a question — bull vs. bear for investment analysis, prosecution vs. defense for legal reasoning, or different theoretical frameworks for research. The adversarial dynamic forces each agent to strengthen its arguments and address counterpoints, producing more rigorous analysis.</p>

<p><strong>Multi-perspective research:</strong> When analyzing a complex topic, agents with different expertise (economics, sociology, technology, policy) each contribute their perspective. The peer structure ensures no single viewpoint dominates and cross-disciplinary insights emerge naturally.</p>
`,
      },
      {
        title: "Challenges and Design Considerations",
        content: `
<p>Peer collaboration is the most powerful but also the most challenging multi-agent pattern to implement well:</p>

<ul>
  <li><strong>Conversation drift:</strong> Without a supervisor to keep agents on track, peer conversations can wander off topic. <em>Mitigation:</em> Include a focused objective in each agent's prompt and implement topic-relevance scoring to detect drift.</li>
  <li><strong>Echo chambers:</strong> Agents with similar training may reinforce each other's biases rather than providing genuinely diverse perspectives. <em>Mitigation:</em> Explicitly configure agents with contrarian or adversarial roles, and use different model providers or temperatures for different agents.</li>
  <li><strong>Token explosion:</strong> Every message is consumed by every agent, leading to quadratic growth in token usage. With N agents and R rounds, total tokens scale as O(N x R x context_size). <em>Mitigation:</em> Summarize earlier rounds, limit per-message length, and use selective attention (agents only read messages relevant to their role).</li>
  <li><strong>Non-determinism:</strong> Outcomes vary significantly between runs because the conversation dynamics are emergent. <em>Mitigation:</em> Use lower temperatures, structured protocols, and convergence detection to stabilize outputs. Accept that some variability is inherent and desirable in creative tasks.</li>
  <li><strong>Deadlocks:</strong> Agents may reach a stalemate where no one changes their position. <em>Mitigation:</em> Set maximum round limits and implement escalation protocols.</li>
</ul>
`,
      },
    ],
    pseudocode: `function PeerCollaboration(task, agents, max_rounds):
    shared_context = [task]

    for round in 1..max_rounds:
        responses = []

        for agent in agents:
            // Each agent sees the full shared context
            response = agent.respond(shared_context)
            responses.append(response)
            shared_context.append(response)

        // Check for consensus
        if detect_consensus(responses):
            break

    // Synthesize final output from all contributions
    return synthesize(shared_context, agents)

function detect_consensus(responses):
    // Compare positions across agents
    // Return true if positions have converged
    similarity = pairwise_similarity(responses)
    return similarity > CONSENSUS_THRESHOLD`,
    whenToUse: [
      "Tasks that benefit from diverse perspectives — code review, analysis, brainstorming",
      "When adversarial dynamics improve quality — debate, red-teaming, security review",
      "Creative tasks where emergent, unexpected solutions are valued",
      "When no single agent has sufficient expertise to solve the problem alone",
      "Scenarios where resilience matters — no single point of failure",
    ],
    whenNotToUse: [
      "Well-structured workflows with clear sequential steps — use supervisor instead",
      "Latency-sensitive applications — peer rounds multiply response time",
      "Budget-constrained scenarios — token usage scales quadratically with agent count",
      "Tasks requiring deterministic, reproducible outputs",
      "When a clear authority or decision hierarchy is needed",
    ],
    implementedBy: [
      "microsoft-agent-framework",
      "ag2",
      "crewai",
      "langgraph",
    ],
    relatedPatterns: [
      "supervisor",
      "agent-teams",
      "hierarchical",
    ],
  },

  // ================================================================
  // 4. Hierarchical Decomposition
  // ================================================================
  {
    id: "hierarchical",
    title: "Hierarchical Decomposition",
    description:
      "A multi-level agent hierarchy where manager agents decompose complex objectives into progressively smaller subtasks, delegating to sub-managers and leaf workers in a tree structure.",
    difficulty: "advanced",
    sections: [
      {
        title: "Multi-Level Agent Hierarchies",
        content: `
<p>The Hierarchical Decomposition pattern extends the supervisor pattern into a tree structure. Instead of a single supervisor managing all workers, you build a hierarchy of managers — a top-level executive agent decomposes the objective into major workstreams, mid-level managers further decompose each workstream into specific tasks, and leaf-node workers execute the atomic tasks.</p>

<p>This pattern directly mirrors how large organizations operate. A CEO sets strategic objectives, VPs decompose them into departmental goals, team leads create specific work items, and individual contributors execute them. Each level of the hierarchy operates at a different level of abstraction — higher levels deal with strategy and coordination, lower levels deal with execution and details.</p>

<p>The architecture consists of:</p>

<ul>
  <li><strong>Executive Agent (Root):</strong> Receives the top-level objective and decomposes it into 2-5 major workstreams. Uses the most capable model available because its decisions have the highest impact.</li>
  <li><strong>Manager Agents (Intermediate Nodes):</strong> Each manages a workstream. They further decompose their assigned workstream into specific tasks, delegate to workers or sub-managers, aggregate results, and report back to their parent.</li>
  <li><strong>Worker Agents (Leaf Nodes):</strong> Execute atomic tasks. They are specialized, narrowly scoped, and optimized for speed and cost. They report results back to their parent manager.</li>
</ul>

<p>The depth of the hierarchy depends on the complexity of the task. Most practical systems use 2-3 levels; deeper hierarchies add coordination overhead that outweighs the benefits of further decomposition.</p>
`,
      },
      {
        title: "Task Decomposition Strategies",
        content: `
<p>The quality of the hierarchical system depends entirely on the quality of task decomposition at each level. Several strategies can be applied:</p>

<p><strong>Functional decomposition:</strong> Break the task by function or capability — one branch handles research, another handles writing, another handles validation. This maps naturally to teams with different expertise and works well when the task has clearly separable functional concerns.</p>

<p><strong>Data-parallel decomposition:</strong> When the same operation must be applied to many data items (analyze 50 documents, process 100 customer records), the manager splits the data among workers who execute in parallel. This is the simplest form of decomposition and scales linearly.</p>

<p><strong>Pipeline decomposition:</strong> Break the task into sequential stages — research, draft, review, revise, finalize. Each stage is managed by a sub-manager with its own workers. The output of one stage feeds into the next. This works well for content creation, data processing, and any task with natural phases.</p>

<p><strong>Recursive decomposition:</strong> The manager applies the same decomposition logic recursively until subtasks are small enough for a single worker. This is elegant but requires careful termination criteria to prevent over-decomposition (tasks so small that the coordination overhead exceeds the work itself).</p>

<p>In practice, most systems combine strategies: functional decomposition at the top level (research branch, analysis branch, writing branch), with data-parallel decomposition within each branch (split documents across workers), and pipeline decomposition for the final assembly.</p>
`,
      },
      {
        title: "Result Aggregation and Quality Control",
        content: `
<p>As results flow up the hierarchy, each manager must aggregate outputs from its children into a coherent result for its parent. This aggregation is where much of the value — and risk — of the hierarchical pattern lies.</p>

<p><strong>Simple concatenation:</strong> For data-parallel tasks, results are concatenated or merged. A manager that split 50 documents across 5 workers simply collects all 50 analyses. This is fast but may produce inconsistencies if workers interpreted the task differently.</p>

<p><strong>Synthesis:</strong> For functional or pipeline decomposition, the manager must synthesize diverse outputs into a unified result. A research manager combines findings from multiple search workers into a coherent research brief. This requires an LLM call and adds latency, but produces much higher quality output.</p>

<p><strong>Quality validation:</strong> Before aggregating, the manager should validate each worker's output. Does it address the assigned subtask? Is it in the expected format? Is the quality sufficient? Low-quality outputs can be sent back for revision or routed to an alternative worker.</p>

<p><strong>Conflict resolution:</strong> When workers produce contradictory results (different workers find conflicting data), the manager must resolve the conflict — through additional research, by weighing source reliability, or by presenting both perspectives to the parent with a recommendation.</p>

<p>The aggregation strategy should be defined explicitly at design time. Ad-hoc aggregation (letting the manager LLM figure it out) works for prototypes but produces unpredictable results in production.</p>
`,
      },
      {
        title: "Scaling Considerations",
        content: `
<p>Hierarchical decomposition introduces significant scaling considerations that must be addressed for production systems:</p>

<p><strong>Fan-out control:</strong> Each manager should delegate to 2-7 children (following cognitive load principles). More than 7 children overwhelms the manager's ability to track and coordinate. If a workstream requires more parallelism, add another level of hierarchy rather than widening the fan-out.</p>

<p><strong>Depth vs. breadth:</strong> Deeper hierarchies provide finer-grained control but add communication overhead. Each level adds latency (at least one LLM call for decomposition and one for aggregation). In practice, 2-3 levels handle most tasks. If you need more than 4 levels, reconsider whether hierarchical decomposition is the right pattern.</p>

<p><strong>Cost modeling:</strong> Total cost = sum of all LLM calls across all nodes. A 3-level hierarchy with fan-out of 4 at each level produces 1 + 4 + 16 = 21 nodes, each making at least 2 LLM calls (receive task + produce result), for a minimum of 42 LLM calls. Plus aggregation calls at each manager. Cost grows exponentially with depth. Use cost-effective models for leaf workers and reserve expensive models for root and manager decisions.</p>

<p><strong>Parallelism:</strong> Independent subtasks at the same level can execute in parallel. A well-designed hierarchy maximizes parallelism — siblings don't depend on each other, only on their parent. Use async execution for sibling workers and gather results with appropriate timeouts.</p>

<p><strong>Failure isolation:</strong> A failed worker should only affect its parent's subtask, not the entire hierarchy. Managers should handle child failures locally (retry, fallback, graceful degradation) and only escalate to their parent when local recovery is impossible.</p>
`,
      },
      {
        title: "When Hierarchy Helps vs. Hurts",
        content: `
<p>Hierarchical decomposition is powerful for certain problem classes but counterproductive for others:</p>

<p><strong>Strong fit:</strong> Large-scale content generation (write a 50-page report), comprehensive research (analyze a market with multiple segments), complex data processing (ETL pipeline with validation), and enterprise workflows that mirror organizational structure. In these cases, the hierarchy provides natural structure, parallelism, and manageability.</p>

<p><strong>Poor fit:</strong> Tasks that require tight feedback loops between components (the output of one part changes the requirements of another), creative tasks where the whole is not the sum of the parts (writing a novel — you can't decompose it into independently written chapters), and tasks where the decomposition itself is the hard problem (if you don't know how to break it down, adding hierarchy doesn't help).</p>

<p>A useful heuristic: if a human team would solve the problem using a hierarchical work breakdown structure (WBS), then hierarchical agent decomposition is likely a good fit. If humans would solve it through iterative collaboration and creative exploration, consider peer collaboration or agent teams instead.</p>
`,
      },
    ],
    pseudocode: `function HierarchicalDecomposition(objective, depth=0, max_depth=3):
    if depth >= max_depth or is_atomic(objective):
        // Leaf node: execute directly
        return Worker.execute(objective)

    // Manager: decompose into subtasks
    subtasks = Manager.decompose(objective)

    // Delegate to children (parallel where possible)
    results = parallel_map(subtasks, fn(subtask):
        return HierarchicalDecomposition(
            subtask, depth + 1, max_depth
        )
    )

    // Validate and aggregate results
    validated = Manager.validate(results)
    return Manager.aggregate(validated)

function Manager.decompose(objective):
    return LLM(
        "Break this objective into 2-5 independent subtasks: "
        + objective
    )`,
    whenToUse: [
      "Large-scale tasks that naturally decompose into multiple independent workstreams",
      "Tasks requiring both breadth (many subtasks) and depth (complex subtasks)",
      "When different levels of abstraction require different agent capabilities",
      "Systems that need to parallelize work across many workers for throughput",
      "Enterprise workflows mirroring organizational hierarchies",
    ],
    whenNotToUse: [
      "Tasks where the decomposition is harder than the task itself",
      "Small or medium tasks where a flat supervisor pattern suffices",
      "When tight feedback loops between components are required",
      "Cost-sensitive scenarios — hierarchy multiplies LLM calls exponentially",
      "Creative tasks where emergent holistic quality matters more than component quality",
    ],
    implementedBy: [
      "langgraph",
      "crewai",
      "microsoft-agent-framework",
      "google-adk",
    ],
    relatedPatterns: [
      "supervisor",
      "agent-teams",
      "peer-collaboration",
    ],
  },

  // ================================================================
  // 5. Tool-Augmented Generation
  // ================================================================
  {
    id: "tool-augmented",
    title: "Tool-Augmented Generation",
    description:
      "Agents extend their capabilities by iteratively selecting and invoking external tools — search engines, calculators, APIs, databases — integrating tool outputs into their reasoning to produce grounded, accurate responses.",
    difficulty: "beginner",
    sections: [
      {
        title: "How Agents Use Tools",
        content: `
<p>Tool-Augmented Generation (TAG) is the foundational pattern that makes LLMs genuinely useful as agents. A bare language model can only generate text based on its training data — it cannot access real-time information, perform precise calculations, interact with APIs, or modify external systems. Tools bridge this gap by giving the agent <strong>actuators</strong> that extend its reach into the real world.</p>

<p>The core mechanism works as follows: the agent receives a task, reasons about what information or actions it needs, selects an appropriate tool from its available toolkit, formulates the tool call with the correct parameters, receives the tool's output, and integrates that output into its ongoing reasoning. This cycle may repeat multiple times — the agent might search the web, then query a database based on the search results, then perform a calculation on the database data.</p>

<p>Modern LLMs implement tool use through <strong>function calling</strong> — the model is trained to emit structured JSON objects that specify a function name and its arguments, rather than generating freeform text. The application layer intercepts these structured outputs, executes the corresponding function, and feeds the result back to the model. This structured approach is more reliable than earlier methods that relied on parsing natural language tool calls from the model's text output.</p>

<p>Every major agent framework — LangGraph, OpenAI Agents SDK, Claude Agent SDK, Vercel AI SDK — supports tool use as a primitive operation. The difference between TAG and more complex patterns like ReAct is scope: TAG focuses specifically on tool interaction mechanics, while ReAct wraps tool use in an explicit reasoning loop.</p>
`,
      },
      {
        title: "Tool Selection Strategies",
        content: `
<p>As an agent's toolkit grows, selecting the right tool becomes a critical challenge. An agent with 3 tools can easily pick the right one; an agent with 50 tools needs a strategy.</p>

<p><strong>Description-based selection:</strong> Each tool has a natural-language description that explains what it does, when to use it, and what parameters it expects. The LLM reads all descriptions and selects the most appropriate tool. This is the default approach in most frameworks and works well for up to 10-15 tools. Beyond that, the descriptions compete for context window space and the model's selection accuracy degrades.</p>

<p><strong>Category-based filtering:</strong> Tools are organized into categories (search, math, data, communication). The agent first selects a category, then selects a specific tool within that category. This two-stage approach reduces the cognitive load at each decision point and scales to larger toolkits.</p>

<p><strong>Retrieval-based selection:</strong> Tool descriptions are embedded in a vector store. When the agent needs a tool, it performs a similarity search against the task description to retrieve the top-k most relevant tools. Only these candidates are presented to the model for final selection. This scales to hundreds or thousands of tools.</p>

<p><strong>Learned routing:</strong> A lightweight classifier (fine-tuned BERT or similar) maps task descriptions to tool IDs. This is the fastest approach but requires training data and doesn't generalize to novel task types as well as LLM-based selection.</p>

<p>Regardless of the selection strategy, tool descriptions should be precise and unambiguous. Include the tool's purpose, expected input format, output format, and examples of correct usage. Poorly written tool descriptions are the most common cause of tool selection errors.</p>
`,
      },
      {
        title: "Tool Chaining and Composition",
        content: `
<p>Real-world tasks often require multiple tools used in sequence, where each tool's output feeds into the next tool's input. This is <strong>tool chaining</strong>, and designing for it effectively is crucial for building capable agents.</p>

<p><strong>Sequential chaining:</strong> The agent calls Tool A, processes the result, then calls Tool B with data derived from Tool A's output. Example: search for a company's stock ticker, then query a financial API with that ticker, then calculate return metrics from the financial data. The agent manages the chain implicitly through its reasoning loop.</p>

<p><strong>Parallel tool calls:</strong> Modern function-calling APIs support multiple simultaneous tool calls. If the agent needs data from two independent sources (weather API and calendar API), it can request both in a single turn. This reduces latency by eliminating unnecessary sequential round-trips.</p>

<p><strong>Conditional chaining:</strong> The choice of the next tool depends on the result of the current tool. If a search returns no results, try a different search engine. If a database query returns an error, fall back to a cached version. The agent's reasoning at each step determines the next action based on what it observed.</p>

<p><strong>Tool composition patterns:</strong> Some tools are designed to work together as a pipeline — a scraper feeds into a parser, which feeds into an analyzer. When designing your toolkit, consider which tools are frequently chained together and whether a composite tool (that combines multiple steps internally) would be more reliable than relying on the agent to chain them correctly.</p>
`,
      },
      {
        title: "Error Recovery and Robustness",
        content: `
<p>Tools fail. APIs return errors, databases time out, search engines return irrelevant results, and calculations receive malformed inputs. A robust tool-augmented agent must handle these failures gracefully.</p>

<p><strong>Input validation:</strong> Before executing a tool call, validate that the parameters conform to the expected schema. Type checking, range validation, and format verification can catch many errors before they reach the tool. Return a descriptive error message to the agent so it can reformulate its request.</p>

<p><strong>Output validation:</strong> After receiving a tool's response, verify that it matches the expected format and contains useful data. An HTTP 200 status code doesn't guarantee useful content — the response might be an error page, rate-limit notice, or empty result set.</p>

<p><strong>Retry strategies:</strong> For transient errors (timeouts, rate limits, temporary unavailability), implement exponential backoff retries. For persistent errors, inform the agent so it can try an alternative approach. A well-designed system distinguishes between retryable and non-retryable errors.</p>

<p><strong>Graceful degradation:</strong> When a tool is unavailable, the agent should fall back to its parametric knowledge (with an explicit caveat about reduced accuracy) or suggest an alternative approach. The worst outcome is a hard failure with no useful output; the agent should always provide its best available answer.</p>

<p><strong>Sandboxing:</strong> Tools that execute code, modify files, or make API calls with side effects must be sandboxed. Use containerized execution environments, read-only filesystem mounts, and network policies to prevent accidental damage. This is especially important for code-execution tools where the agent generates the code to run.</p>
`,
      },
      {
        title: "Designing Effective Tool Interfaces",
        content: `
<p>The design of your tool interfaces has an outsized impact on agent performance. Well-designed tools make the agent more capable; poorly designed tools cause frustration and errors.</p>

<p><strong>Single responsibility:</strong> Each tool should do one thing well. A tool that searches the web, parses HTML, and summarizes content is doing three things — break it into three tools or implement it as a single well-tested pipeline. The agent needs to understand what each tool does, and compound tools are harder to reason about.</p>

<p><strong>Clear parameter naming:</strong> Use descriptive parameter names (<code>search_query</code> not <code>q</code>, <code>max_results</code> not <code>n</code>). Include type annotations and constraints. The LLM reads these names and uses them to understand how to call the tool correctly.</p>

<p><strong>Structured outputs:</strong> Return data in a structured format (JSON objects with labeled fields) rather than free text. Structured outputs are easier for the agent to parse and reason about in subsequent steps. Include metadata (source URLs, timestamps, confidence scores) alongside the data.</p>

<p><strong>Informative error messages:</strong> When a tool fails, return a message that helps the agent understand what went wrong and how to fix it. "Invalid date format: expected YYYY-MM-DD, got '2024/01/15'" is far more useful than "Error: 400 Bad Request".</p>

<p><strong>Idempotency:</strong> Where possible, make tools idempotent — calling them multiple times with the same input produces the same result without side effects. This makes retry logic safe and simplifies the agent's reasoning about tool interactions.</p>
`,
      },
    ],
    pseudocode: `function ToolAugmentedGeneration(task, tools):
    messages = [system_prompt, task]

    while true:
        // LLM decides: respond or use a tool
        response = LLM(messages, tools.schemas)

        if response.has_tool_calls():
            for tool_call in response.tool_calls:
                // Validate inputs
                validated = validate_params(
                    tool_call.params,
                    tools[tool_call.name].schema
                )

                // Execute with error handling
                try:
                    result = tools[tool_call.name].execute(validated)
                    messages.append(tool_result(result))
                catch error:
                    messages.append(tool_error(error.message))
        else:
            // No tool calls — return final response
            return response.text`,
    whenToUse: [
      "Any task requiring access to external data, APIs, or real-time information",
      "When the LLM's parametric knowledge is insufficient or potentially outdated",
      "Tasks involving calculations, data lookups, or system interactions",
      "Building general-purpose assistants that need to interact with multiple services",
      "As a building block within more complex patterns (ReAct, Supervisor, Agent Teams)",
    ],
    whenNotToUse: [
      "Pure reasoning or creative writing tasks with no external data needs",
      "When all required information is already in the prompt context",
      "Extremely latency-sensitive applications where tool calls add unacceptable delay",
      "When tools cannot be adequately sandboxed for safety",
      "Simple Q&A where the model can answer directly from training data",
    ],
    implementedBy: [
      "openai-agents-sdk",
      "claude-agent-sdk",
      "vercel-ai-sdk",
      "langgraph",
      "langchain",
      "pydantic-ai",
      "smolagents",
      "google-adk",
    ],
    relatedPatterns: [
      "react",
      "supervisor",
      "agent-teams",
    ],
  },

  // ================================================================
  // 6. Agent Teams
  // ================================================================
  {
    id: "agent-teams",
    title: "Agent Teams",
    description:
      "Role-based multi-agent collaboration where each agent has a defined expertise, persona, and goal — working together through structured communication patterns to deliver complex outputs.",
    difficulty: "intermediate",
    sections: [
      {
        title: "Role-Based Agent Design",
        content: `
<p>The Agent Teams pattern structures multi-agent systems around well-defined <strong>roles</strong> — each agent has a specific job title, area of expertise, set of tools, and behavioral guidelines. Rather than generic "Agent 1" and "Agent 2," you have a Researcher, a Writer, a Reviewer, and an Editor, each configured to excel at their specific function.</p>

<p>This pattern is directly inspired by human team dynamics. A content creation team has a researcher who gathers information, a writer who drafts the content, a reviewer who provides feedback, and an editor who polishes the final output. Each person's expertise and perspective are different, and the quality of the output depends on the composition and coordination of the team.</p>

<p>The key elements of role-based design are:</p>

<ul>
  <li><strong>Role definition:</strong> Each agent has a system prompt that establishes its expertise, perspective, communication style, and goals. A Researcher is instructed to be thorough, cite sources, and flag uncertainty. A Reviewer is instructed to be critical, identify gaps, and suggest improvements. These role definitions are the most important design decision in the pattern.</li>
  <li><strong>Specialized toolsets:</strong> Each role gets access to tools relevant to its function. The Researcher gets search and retrieval tools. The Writer gets formatting and generation tools. The Analyst gets data processing and visualization tools. Restricting tools by role prevents confusion and reduces errors.</li>
  <li><strong>Goal alignment:</strong> Each agent has a clear objective that contributes to the team's overall goal. Individual goals should be complementary, not competing. The Writer's goal is to produce clear prose; the Reviewer's goal is to ensure accuracy and completeness. These goals create a productive tension that improves the final output.</li>
</ul>
`,
      },
      {
        title: "Team Composition Strategies",
        content: `
<p>How you compose your team — which roles to include, how many agents, and what the interaction structure looks like — depends on the task:</p>

<p><strong>Sequential pipeline teams:</strong> Agents work in a fixed order, each building on the previous agent's output. Researcher produces findings, Writer drafts based on findings, Reviewer critiques the draft, Writer revises based on feedback. This is predictable and easy to debug but doesn't allow for parallel work.</p>

<p><strong>Parallel specialist teams:</strong> Multiple agents work simultaneously on different aspects of the same task, and a coordinator merges their outputs. For market analysis: an Industry Analyst, a Financial Analyst, and a Competitive Analyst work in parallel, and a Synthesizer combines their findings. This is faster but requires careful integration.</p>

<p><strong>Iterative refinement teams:</strong> Agents work in loops — a Creator produces output, a Critic evaluates it, the Creator revises based on criticism, and the cycle repeats until quality thresholds are met. This produces the highest quality output but takes the most time and tokens.</p>

<p><strong>Adversarial teams:</strong> Two sub-teams argue opposing positions (bull vs. bear, prosecution vs. defense), and a Judge evaluates their arguments. This is a specialized form of peer collaboration designed to stress-test ideas and produce well-balanced analysis.</p>

<p>Team size matters. Research in organizational psychology suggests that team effectiveness peaks at 4-6 members for most tasks. Beyond that, coordination overhead outweighs the benefits of additional perspectives. The same principle applies to agent teams — start with the minimum viable team and add roles only when you can demonstrate they improve output quality.</p>
`,
      },
      {
        title: "Shared Memory and Context",
        content: `
<p>For an agent team to function effectively, agents need access to shared information. However, simply dumping all messages from all agents into every agent's context is wasteful and degrades performance. Several memory architectures address this:</p>

<p><strong>Shared scratchpad:</strong> A structured document (JSON, markdown, or key-value store) that all agents can read and write. The Researcher adds findings with source citations. The Writer reads findings and adds draft sections. The Reviewer reads drafts and adds comments. Each agent accesses only the sections relevant to its role, keeping context manageable.</p>

<p><strong>Blackboard architecture:</strong> A shared workspace where agents post intermediate results. An orchestrator or event system notifies relevant agents when new information appears. This is more dynamic than a scratchpad and supports both push and pull communication patterns.</p>

<p><strong>Message filtering:</strong> All inter-agent messages flow through a central bus, but each agent receives only messages tagged with its role or area of interest. This reduces context size while maintaining the benefits of a shared communication channel.</p>

<p><strong>Episodic memory:</strong> A persistent store that captures key decisions, findings, and artifacts across the team's lifetime. This allows agents to reference earlier work without keeping the full conversation history in context. Useful for long-running tasks that span many iterations.</p>

<p>The choice of memory architecture should be driven by the team's interaction pattern. Pipeline teams work well with a simple scratchpad. Parallel teams benefit from a blackboard. Large teams with selective communication need message filtering.</p>
`,
      },
      {
        title: "Handoff Patterns",
        content: `
<p>How work transfers between agents — the <strong>handoff</strong> — is a critical design point. A well-designed handoff ensures the receiving agent has all the context it needs; a poor handoff leads to information loss and rework.</p>

<p><strong>Explicit handoff with summary:</strong> When one agent completes its work and passes control to the next, it provides a structured summary: what was accomplished, key findings, outstanding questions, and specific instructions for the next agent. This is the most reliable pattern and reduces the receiving agent's need to re-read earlier context.</p>

<p><strong>Artifact-based handoff:</strong> Instead of passing messages, agents pass structured artifacts — a research brief, a draft document, a data table, a code file. The artifact is the interface between agents. Each role produces a well-defined artifact type and consumes artifacts from upstream roles. This pattern is especially clean for pipeline teams.</p>

<p><strong>Framework-native handoffs:</strong> The OpenAI Agents SDK provides a built-in <code>handoff()</code> mechanism where an agent can transfer control to another agent, optionally passing context and instructions. CrewAI's <code>delegation</code> feature allows agents to ask other crew members for help on specific sub-problems. These framework-native mechanisms handle the plumbing of context transfer and control flow.</p>

<p><strong>Conditional handoffs:</strong> The decision of which agent to hand off to depends on the current state. After analysis, if the findings are quantitative, hand off to the Data Visualization agent; if qualitative, hand off to the Writer. This routing logic can be implemented with LLM-based decisions, rule-based branching, or a combination.</p>
`,
      },
      {
        title: "Framework Implementations",
        content: `
<p>Agent teams are the primary abstraction in several popular frameworks:</p>

<p><strong>CrewAI</strong> is designed specifically for this pattern. You define agents with <code>role</code>, <code>goal</code>, and <code>backstory</code> attributes, organize them into a <code>Crew</code> with defined <code>tasks</code>, and specify the process type (<code>sequential</code> or <code>hierarchical</code>). CrewAI handles the communication between agents, task assignment, and result collection. Its high-level API makes it the fastest path to a working agent team but offers less control over the interaction dynamics.</p>

<p><strong>Microsoft AutoGen / AG2</strong> models agent teams as multi-agent conversations. You define <code>AssistantAgent</code> and <code>UserProxyAgent</code> instances, configure their system prompts and capabilities, and initiate a group chat. The framework manages turn-taking and message routing. AutoGen's <code>GroupChat</code> with a <code>GroupChatManager</code> is particularly effective for debate and collaborative problem-solving scenarios.</p>

<p><strong>LangGraph</strong> gives you lower-level control. You model each agent as a node in a state graph, define edges for handoffs, and implement custom routing logic. This requires more code but allows you to design exactly the interaction pattern you need — including hybrid approaches that combine elements of pipeline, parallel, and iterative team structures.</p>

<p><strong>OpenAI Agents SDK</strong> supports agent teams through its handoff and transfer mechanisms. You define multiple agents with different instructions and tools, and agents can hand off to each other based on the conversation state. The guardrails system lets you add quality checks at each handoff point.</p>
`,
      },
    ],
    pseudocode: `function AgentTeam(task, team_config):
    // Initialize agents with roles
    agents = {}
    for role in team_config.roles:
        agents[role.name] = Agent(
            system_prompt = role.prompt,
            tools = role.tools,
            model = role.model
        )

    // Execute based on team process type
    shared_memory = SharedMemory()

    if team_config.process == "sequential":
        result = task
        for role in team_config.execution_order:
            result = agents[role].execute(
                result, shared_memory
            )
            shared_memory.update(role, result)
        return result

    elif team_config.process == "iterative":
        draft = agents["creator"].execute(task)
        for round in 1..max_rounds:
            feedback = agents["critic"].review(draft)
            if feedback.approved:
                return draft
            draft = agents["creator"].revise(draft, feedback)
        return draft`,
    whenToUse: [
      "Complex tasks requiring multiple distinct areas of expertise (research + writing + review)",
      "Content creation pipelines where quality depends on specialized editing and review",
      "Business processes that mirror human team workflows",
      "When you want to leverage different models for different roles (fast model for research, capable model for writing)",
      "Tasks where iterative refinement through creator-critic loops significantly improves quality",
    ],
    whenNotToUse: [
      "Simple tasks that a single well-prompted agent can handle",
      "When the task doesn't naturally decompose into distinct roles",
      "Real-time applications where multi-agent overhead is unacceptable",
      "When you cannot clearly define each agent's role, goals, and success criteria",
      "Budget-constrained scenarios — agent teams multiply token usage",
    ],
    implementedBy: [
      "crewai",
      "microsoft-agent-framework",
      "ag2",
      "langgraph",
      "openai-agents-sdk",
      "google-adk",
    ],
    relatedPatterns: [
      "supervisor",
      "peer-collaboration",
      "hierarchical",
    ],
  },
];

export function getPatternContent(id: string): PatternContent | undefined {
  return patternContent.find((p) => p.id === id);
}

export function getAllPatternIds(): string[] {
  return patternContent.map((p) => p.id);
}
