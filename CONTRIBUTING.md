# Contributing

This repo is a documentation product first. The main contribution standard is not just "does it build?" but "is it accurate, useful, current, and consistent with the rest of the hub?"

## Before You Start

- Keep PRs focused. One topic, one fix, or one content batch per PR.
- Prefer improving existing content before adding new top-level sections.
- Treat time-sensitive claims as high-risk. Model names, framework stars, pricing, adoption claims, and feature support can drift quickly.
- If you add or materially change a content page, update its entry in `src/lib/last-updated.ts`.

## Content Workflow

1. Choose the content type:
   - foundation topic in `src/data/concepts.ts` + `src/data/concept-content.ts`
   - guide in `src/data/guide-content.ts`
   - pattern in `src/data/patterns.ts` + `src/data/pattern-content.ts`
   - framework in `src/data/frameworks.ts`
2. Follow the standards in [docs/CONTENT_STANDARDS.md](docs/CONTENT_STANDARDS.md).
3. Start from the relevant template in `docs/templates/`.
4. Update supporting metadata if needed:
   - `src/lib/search.ts`
   - `src/lib/related-content.ts`
   - `src/lib/last-updated.ts`
   - `README.md` if counts or structure claims changed
5. Run `npm run build`.

## Accuracy Rules

- Prefer stable explanations over fragile hype.
- If a claim can age quickly, either:
  - generalize it,
  - label it as approximate,
  - or avoid the claim entirely.
- Do not present speculative ecosystem claims as facts.
- Do not use unsafe code examples as the default teaching path.

## Code Example Rules

- Examples should teach safe defaults.
- Avoid raw `eval`, dangerous shell patterns, destructive database examples, or over-privileged tool code unless the point of the section is explicitly about the risk.
- Keep examples small enough to scan.
- Prefer realistic but minimal examples over pseudo-production boilerplate.
- If a production caveat matters, state it directly after the example.

## Writing Style

- Write for developers, not for marketing.
- Explain tradeoffs, not just features.
- Prefer concrete language over hype words like "revolutionary" or "ultimate".
- Keep sections structured around decisions:
  - what it is
  - when to use it
  - when not to use it
  - tradeoffs
  - production concerns

## Pull Request Checklist

- Content follows the right template.
- New topics are wired into search/related content if needed.
- Last-updated metadata is set.
- Time-sensitive claims were checked or softened.
- Examples are safe by default.
- `npm run build` passes.
