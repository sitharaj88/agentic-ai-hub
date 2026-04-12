# Content Standards

This file defines the canonical quality bar for new content in Agentic AI Hub.

## Core Principles

- **Clarity over breadth**: one page should teach a coherent topic, not everything adjacent to it.
- **Decision usefulness**: content should help a developer choose, design, or implement something.
- **Production realism**: include failure modes, tradeoffs, and operational concerns where relevant.
- **Freshness discipline**: avoid brittle claims that will age badly.
- **Safe defaults**: examples should model good engineering practice.

## Global Rules

### 1. Time-sensitive content

Treat these as unstable:

- model names and pricing
- framework stars, adoption, and "most popular" claims
- provider feature matrices
- dates like "latest", "today", "current"

Preferred handling:

- generalize the wording
- label claims as approximate
- move specifics into a dated note only when necessary

### 2. Code examples

- Keep examples short and legible.
- Use realistic names and schemas.
- Avoid unsafe shortcuts as defaults.
- Add a brief note when an example is intentionally simplified.

### 3. Structure

Every content page should answer:

- what is this?
- why does it matter?
- when should I use it?
- what are the tradeoffs?
- what goes wrong in practice?

### 4. Cross-linking

When adding a new top-level topic, usually update:

- `src/lib/search.ts`
- `src/lib/related-content.ts`
- `src/lib/last-updated.ts`
- `README.md` if counts or scope changed

## Content Type Standards

## Foundation Topics

Files:

- `src/data/concepts.ts`
- `src/data/concept-content.ts`

Required fields:

- `id`
- `title`
- `description`
- `difficulty`
- `sections`
- `keyTakeaways`
- `relatedFrameworks`
- `relatedPatterns`

Recommended section shape:

1. definition / why it matters
2. main mechanisms or mental model
3. common patterns or approaches
4. production concerns or failure modes

Checklist:

- Explain the topic in framework-neutral terms first.
- Use tables when comparing approaches.
- Include at least 4 high-signal takeaways.
- Link to downstream guides or frameworks when useful.

## Guides

File:

- `src/data/guide-content.ts`

Required fields:

- `slug`
- `title`
- `description`
- `difficulty`
- `time`
- `prerequisites`
- `whatYoullLearn`
- `sections`
- `commonMistakes`
- `nextSteps`

Guide standard:

- The page should have a clear learning outcome.
- The order should be executable or at least operationally sensible.
- Common mistakes should be practical, not generic.
- Next steps should point to the next best page, not a random list.

## Patterns

Files:

- `src/data/patterns.ts`
- `src/data/pattern-content.ts`

Pattern standard:

- Start with the architecture and why it exists.
- Include when to use and when not to use.
- Pseudocode should explain control flow, not just restate the name.
- Cover operational downsides such as latency, cost, debugging, or coordination overhead.

## Frameworks

File:

- `src/data/frameworks.ts`

Framework standard:

- Be specific about strengths and weaknesses.
- Avoid vendor-style praise.
- Distinguish architecture, use cases, and ecosystem maturity.
- If metadata like stars or notable users is included, treat it as approximate.

## Editorial Style

- Prefer direct prose.
- Avoid hype and vague adjectives.
- Use bullets for decisions, comparisons, and checklists.
- Keep paragraphs short.
- Use tables only when they genuinely improve scanning.

## Review Checklist

- Is the scope tight and coherent?
- Are the claims stable enough to age well?
- Are there clear tradeoffs?
- Are the examples safe?
- Does the page connect cleanly to the rest of the hub?
