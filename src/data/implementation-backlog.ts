export type BacklogPriority = "next" | "soon" | "later";

export interface BacklogTask {
  title: string;
  description: string;
  fileTargets: string[];
}

export interface BacklogChapter {
  id: string;
  title: string;
  priority: BacklogPriority;
  whyNow: string;
  deliverables: string[];
  tasks: BacklogTask[];
}

export const implementationBacklog: BacklogChapter[] = [];
