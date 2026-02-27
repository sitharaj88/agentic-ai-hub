import type { Difficulty } from "@/lib/constants";

export interface Pattern {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  icon: string;
}

export const patterns: Pattern[] = [
  {
    id: "react",
    title: "ReAct Pattern",
    description: "Reasoning and Acting — the agent thinks step-by-step, then acts on its reasoning in iterative loops.",
    difficulty: "intermediate",
    icon: "refresh-cw",
  },
  {
    id: "supervisor",
    title: "Supervisor Pattern",
    description: "A central orchestrator agent decomposes tasks and coordinates specialized worker agents.",
    difficulty: "intermediate",
    icon: "git-branch",
  },
  {
    id: "peer-collaboration",
    title: "Peer Collaboration",
    description: "Agents communicate directly without a central orchestrator for exploratory and creative tasks.",
    difficulty: "advanced",
    icon: "message-circle",
  },
  {
    id: "hierarchical",
    title: "Hierarchical Decomposition",
    description: "Multi-layered agent architecture where supervisors manage teams of specialized sub-agents.",
    difficulty: "advanced",
    icon: "layers",
  },
  {
    id: "tool-augmented",
    title: "Tool-Augmented Generation",
    description: "Agents iteratively use tools based on reasoning to augment their generation capabilities.",
    difficulty: "beginner",
    icon: "tool",
  },
  {
    id: "agent-teams",
    title: "Agent Teams",
    description: "Role-based agent collaboration where each agent has defined expertise, goals, and communication patterns.",
    difficulty: "intermediate",
    icon: "users",
  },
];
