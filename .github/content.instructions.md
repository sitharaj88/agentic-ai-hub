---
applyTo: "_data/**,pages/**"
description: "Data schema and content standards for all YAML data files and Markdown pages"
---

# Data & Content Standards

## YAML Rules (_data/ files)
- Always validate YAML syntax before committing — indentation is critical
- Use 2-space indentation consistently
- Multi-line strings (code_example): use the `|` block scalar
- Arrays: always use the `- item` format, never inline `[a, b, c]` for lists > 2 items
- Strings with colons or special characters: always wrap in double quotes
- Boolean values: use `true`/`false` (not `yes`/`no`)
- Dates: ISO format `YYYY-MM` for last_updated field

## Markdown Rules (pages/ files)
- Every page MUST have YAML front matter with: layout, title, description
- Use ATX-style headings (`#`) not Setext style (underlines)
- One blank line before and after headings, code blocks, and lists
- Code blocks: always specify language for syntax highlighting
  - Python: ` ```python `
  - TypeScript: ` ```typescript `
  - YAML: ` ```yaml `
  - Bash: ` ```bash `
- External links: always include descriptive link text, never "click here"
- Internal links: use relative paths `/pages/sdks/langgraph/`

## SDK Page Front Matter (required fields)
```yaml
---
layout: sdk
title: "SDK Name — Complete Developer Guide"
description: "150-160 character description for SEO."
category: open-source
github_url: https://github.com/...
docs_url: https://docs...
stars: "10k+"
language: Python
license: MIT
last_updated: 2026-02
---
```

## Guide Page Front Matter (required fields)
```yaml
---
layout: guide
title: "Guide Title"
description: "What the reader will learn or build."
difficulty: beginner    # beginner | intermediate | advanced
time_estimate: "15 min"
---
```

## Mermaid Diagram Standards
- Always use `graph TD` (top-down) for architecture diagrams
- Always use `flowchart LR` (left-right) for decision trees
- Keep node labels short (< 30 chars)
- Use subgraphs to group related components
- Wrap in a `<div class="mermaid">` block

## Content Accuracy Rules
- Never guess at GitHub star counts — use "~Xk" approximations or mark as `<!-- TODO: verify -->`
- Never invent code examples — test them mentally for correctness
- Always cite notable users only when publicly confirmed
- Mark any uncertain data with `<!-- TODO: verify -->`
