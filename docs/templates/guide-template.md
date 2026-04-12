# Guide Template

Use this when adding a new guide to `src/data/guide-content.ts`.

```ts
{
  slug: "your-guide-slug",
  title: "Your Guide Title",
  description: "What the guide helps the reader accomplish.",
  difficulty: "intermediate",
  time: "20 min",
  prerequisites: [
    "Prerequisite 1",
    "Prerequisite 2",
  ],
  whatYoullLearn: [
    "Learning outcome 1",
    "Learning outcome 2",
    "Learning outcome 3",
  ],
  sections: [
    {
      title: "Step 1",
      content: `<p>Explain the step and include the key details.</p>`,
    },
    {
      title: "Step 2",
      content: `<p>Show the next step, example, or decision.</p>`,
    },
  ],
  commonMistakes: [
    "Mistake 1",
    "Mistake 2",
    "Mistake 3",
  ],
  nextSteps: [
    { title: "Related Page", href: "/guides/example" },
    { title: "Related Concept", href: "/concepts/example" },
  ],
}
```

## Guide reminders

- The guide should have a concrete outcome.
- The section order should be actionable.
- Include realistic mistakes, not generic warnings.
- Keep the time estimate credible.
