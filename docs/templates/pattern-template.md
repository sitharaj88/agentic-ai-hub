# Pattern Template

Use this when adding a new pattern to `src/data/patterns.ts` and `src/data/pattern-content.ts`.

## `src/data/patterns.ts`

```ts
{
  id: "pattern-id",
  title: "Pattern Name",
  description: "Short explanation of the pattern.",
  difficulty: "intermediate",
  icon: "git-branch",
}
```

## `src/data/pattern-content.ts`

```ts
{
  id: "pattern-id",
  title: "Pattern Name",
  description: "Short explanation of the pattern.",
  difficulty: "intermediate",
  sections: [
    {
      title: "Architecture Overview",
      content: `<p>Explain the structure and why it exists.</p>`,
    },
    {
      title: "Execution Flow",
      content: `<p>Show how the pattern behaves step by step.</p>`,
    },
    {
      title: "Tradeoffs and Failure Modes",
      content: `<p>Explain downsides, risks, and mitigation strategies.</p>`,
    },
  ],
  pseudocode: `function Pattern(task):\n    // describe the control flow`,
  whenToUse: [
    "Use case 1",
    "Use case 2",
  ],
  whenNotToUse: [
    "Avoid when 1",
    "Avoid when 2",
  ],
  implementedBy: ["langgraph", "crewai"],
  relatedPatterns: ["react", "supervisor"],
}
```
