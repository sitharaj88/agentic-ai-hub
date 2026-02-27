# Agentic AI Developer Hub — Copilot Instructions

## Project Purpose
This is a world-class GitHub Pages site that serves as the definitive developer reference
for Agentic AI development — covering all major SDKs, frameworks, tools, protocols,
and best practices as of 2025–2026.

## Tech Stack
- **Static Site**: GitHub Pages with Jekyll
- **Styling**: Custom CSS with dark mode support
- **Content**: Markdown → HTML via Jekyll
- **Search**: Fuse.js (client-side fuzzy search)
- **Diagrams**: Mermaid.js for architecture diagrams
- **Deployment**: GitHub Actions → GitHub Pages

## Project Structure
```
/
├── index.html
├── _config.yml
├── _layouts/
│   ├── default.html
│   ├── sdk.html
│   └── guide.html
├── _includes/
│   ├── nav.html
│   ├── footer.html
│   └── sdk-card.html
├── _data/
│   ├── sdks.yml
│   ├── tools.yml
│   └── categories.yml
├── pages/
│   ├── sdks/
│   ├── tools/
│   ├── guides/
│   ├── comparisons/
│   └── glossary.md
├── assets/
│   ├── css/main.css
│   └── js/main.js
└── .github/
    ├── copilot-instructions.md
    ├── agents/
    └── workflows/deploy.yml
```

## Content Standards
- Every SDK entry MUST include: name, developer, language support, license, GitHub stars,
  description, use cases, pros, cons, code example, and official docs link
- All SDK categories: Big Tech SDKs, Open-Source Frameworks, TypeScript/JS Ecosystem,
  Enterprise/Visual Platforms, Protocols & Standards
- Always include a comparison table when listing multiple SDKs
- Content must be accurate and current as of early 2026

## Code Standards
- Use semantic HTML5 elements (section, article, nav, main, aside)
- All pages must be mobile-responsive
- Lighthouse score target: 95+ on Performance, Accessibility, SEO, Best Practices
- All external links: `target="_blank" rel="noopener noreferrer"`
- Dark mode via CSS `prefers-color-scheme` + manual toggle with localStorage
- No heavy JS frameworks — dependency-light for fast load times
- Always specify language on code blocks for syntax highlighting

## Writing Style
- Tone: Technical but approachable — for developers, not executives
- Use active voice
- Lead with "what" and "why" before "how"
- Short sentences. One idea per paragraph.
- Code before prose when both are relevant

## Agent Behaviour Rules
- Summarize your plan BEFORE writing any files
- Make one logical change per commit
- Never delete existing content without user confirmation
- When adding a new SDK, always follow the exact schema in `_data/sdks.yml`
- After every major change: verify the page renders, check all links are valid
- When unsure about SDK accuracy, add `<!-- TODO: verify -->` comment
- After each phase, give a summary and ask for approval before continuing
