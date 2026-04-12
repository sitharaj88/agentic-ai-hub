# Concept Template

Use this when adding a new item to `src/data/concepts.ts` and `src/data/concept-content.ts`.

## `src/data/concepts.ts`

```ts
{
  id: "your-topic-id",
  title: "Your Topic Title",
  description: "One-sentence description of what the topic teaches.",
  icon: "cpu",
  difficulty: "beginner",
  group: "genai-foundations",
}
```

## `src/data/concept-content.ts`

```ts
{
  id: "your-topic-id",
  title: "Your Topic Title",
  description: "One-sentence description of what the topic teaches.",
  difficulty: "beginner",
  sections: [
    {
      id: "why-it-matters",
      title: "Why It Matters",
      content: `
<p>Define the concept and explain why a developer should care.</p>
`,
    },
    {
      id: "main-mechanism",
      title: "Main Mechanism",
      content: `
<p>Explain the key mental model, flow, or architecture.</p>
`,
    },
    {
      id: "patterns-and-tradeoffs",
      title: "Patterns and Tradeoffs",
      content: `
<p>Compare approaches and explain when each one fits.</p>
`,
    },
    {
      id: "production-concerns",
      title: "Production Concerns",
      content: `
<p>Cover failure modes, reliability, security, or operational considerations.</p>
`,
    },
  ],
  keyTakeaways: [
    "Short takeaway 1",
    "Short takeaway 2",
    "Short takeaway 3",
    "Short takeaway 4",
  ],
  relatedFrameworks: ["langgraph", "openai-agents-sdk"],
  relatedPatterns: ["react", "tool-augmented"],
}
```
