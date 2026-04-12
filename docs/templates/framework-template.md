# Framework Template

Use this when adding a new framework to `src/data/frameworks.ts`.

```ts
{
  id: "framework-id",
  name: "Framework Name",
  tagline: "One-line positioning statement",
  category: "open-source",
  developer: "Vendor or team",
  language: ["Python"],
  license: "MIT",
  github_url: "https://github.com/example/repo",
  docs_url: "https://example.com/docs",
  description: "Neutral description of what the framework is and what it is good at.",
  architecture: "How the framework is structured and how it typically runs agents.",
  use_cases: [
    "Use case 1",
    "Use case 2",
  ],
  strengths: [
    "Strength 1",
    "Strength 2",
  ],
  weaknesses: [
    "Weakness 1",
    "Weakness 2",
  ],
  code_example: `# Minimal example here`,
  code_language: "python",
  stars_approx: "10k+",
  mcp_support: true,
  multi_agent: true,
  featured: false,
  notable_users: ["Company A", "Company B"],
}
```

## Framework reminders

- Be concrete about tradeoffs.
- Distinguish architecture from use cases.
- Keep ecosystem claims approximate unless they are durable.
- Prefer a small, representative example over a long demo.
