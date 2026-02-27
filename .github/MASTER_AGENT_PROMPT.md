# MASTER AGENT PROMPT — Agentic AI Developer Hub
#
# HOW TO USE:
# 1. Place all files from this package into your repo
# 2. Open VS Code → Copilot Chat → switch to "Agent" mode
# 3. Copy and paste EVERYTHING below the dashed line into the chat
# ─────────────────────────────────────────────────────────────────

You are building a world-class GitHub Pages site called the "Agentic AI Developer Hub."

This site will be THE definitive resource for developers working with AI agent development —
covering every major SDK, framework, tool, protocol, and pattern as of 2025–2026.

First, read `.github/copilot-instructions.md` to understand the full project spec.
Confirm you have read it before proceeding. Then execute the following phases in order.

════════════════════════════════════════════════════════════════
PHASE 1 — PROJECT SCAFFOLDING
════════════════════════════════════════════════════════════════

Create the following files:

1. `_config.yml`
   - title: "Agentic AI Developer Hub"
   - description: "The definitive developer reference for AI agent development."
   - baseurl: "/agentic-ai-hub"
   - Jekyll plugins: jekyll-sitemap, jekyll-seo-tag
   - Permalink style: pretty
   - Collections: sdks (output: true)

2. `Gemfile`
   - Jekyll ~> 4.3
   - jekyll-sitemap, jekyll-seo-tag, jekyll-feed, rouge

3. `.github/workflows/deploy.yml`
   - Trigger: push to main + workflow_dispatch
   - Jobs: build (Jekyll) + deploy (GitHub Pages)
   - Uses: actions/checkout@v4, ruby/setup-ruby@v1, actions/configure-pages@v4,
     actions/upload-pages-artifact@v3, actions/deploy-pages@v4

4. `_layouts/default.html`
   - Full HTML5 shell with: <head> (meta, OG tags, CSS, Fuse.js CDN, Mermaid.js CDN),
     sticky nav (logo + links + search box + dark mode toggle), main content area, footer
   - Dark mode: CSS data-theme attribute toggled by JS, persisted in localStorage

5. `_layouts/sdk.html`
   - Extends default.html
   - Two-column layout: main content (left) + sticky sidebar (right)
   - Sidebar shows: developer, language, license, stars, links to GitHub + Docs

6. `_layouts/guide.html`
   - Extends default.html
   - Single column with table of contents sidebar

7. `_includes/nav.html`
   - Logo: "Agentic AI Hub" (with accent color on "AI")
   - Nav links: SDKs, Comparisons, Guides, Glossary, Tools
   - Search input (Fuse.js powered)
   - Dark mode toggle button (☀️/🌙)
   - GitHub star button linking to repo

8. `_includes/footer.html`
   - Links: SDKs, Comparisons, Guides, Glossary
   - "Last updated: February 2026"
   - GitHub repo link
   - "Built for developers, by developers"

9. `_includes/sdk-card.html`
   - Reusable card: name, developer, language tags, license badge, description, stars, "View Guide →" link

10. `assets/css/main.css`
    - CSS custom properties for light + dark themes
    - Sticky nav styles
    - Hero section styles
    - Card grid (auto-fill, minmax 300px)
    - Comparison table styles (sortable header indicators)
    - SDK page two-column layout
    - Strengths/Weaknesses grid
    - Mermaid diagram wrapper
    - Search results dropdown
    - Callout boxes (info, tip, warning)
    - Mobile responsive (breakpoints: 480px, 768px, 1024px)
    - Dark mode transitions

11. `assets/js/main.js`
    - Dark mode toggle (reads/writes localStorage)
    - Fuse.js search initialisation over sdks.yml data
    - Search results dropdown show/hide
    - Category filter buttons (filter cards by data-category)
    - Mermaid.js initialisation
    - Sortable table columns (click header to sort asc/desc)

Summarize your plan before writing any files.
After Phase 1 is complete, give a summary and WAIT FOR MY APPROVAL.

════════════════════════════════════════════════════════════════
PHASE 2 — DATA LAYER
════════════════════════════════════════════════════════════════

Create `_data/sdks.yml` with COMPLETE entries for every SDK below.
Use the EXACT schema from `.github/agents/docs-agent.agent.md`.
Every entry MUST have: id, name, category, developer, language, license,
github_url, docs_url, description, use_cases, strengths, weaknesses,
code_example, notable_users, stars_approx, last_updated.

BIG TECH:
- OpenAI Agents SDK (category: big-tech)
- Google Agent Development Kit / ADK (category: big-tech)
- Microsoft Agent Framework (category: big-tech)
- AWS Strands Agents SDK (category: big-tech)
- Anthropic Claude SDK (category: big-tech)

OPEN SOURCE:
- LangGraph (category: open-source)
- LangChain (category: open-source)
- CrewAI (category: open-source)
- LlamaIndex (category: open-source)
- Smolagents by Hugging Face (category: open-source)
- PydanticAI (category: open-source)
- Agno (category: open-source)
- Haystack by Deepset (category: open-source)
- Mastra (category: open-source)
- AG2 (category: open-source)

TYPESCRIPT:
- Vercel AI SDK (category: typescript)
- CopilotKit (category: typescript)

ENTERPRISE:
- Vellum (category: enterprise)
- Dify (category: enterprise)
- Flowise (category: enterprise)
- Rivet (category: enterprise)

PROTOCOLS:
- Model Context Protocol / MCP (category: protocol)
- Agent2Agent Protocol / A2A (category: protocol)

Create `_data/tools.yml` with supporting tools:
- Observability: LangSmith, Langfuse, Arize Phoenix, Weights & Biases
- Testing: DeepEval, PromptFoo
- Deployment: Modal, Railway, Fly.io
- Vector DBs: Pinecone, Weaviate, ChromaDB, Qdrant
- Memory: Mem0, Zep

Create `_data/categories.yml` defining the taxonomy labels, icons,
descriptions, and colors for each category.

After Phase 2 is complete, give a summary and WAIT FOR MY APPROVAL.

════════════════════════════════════════════════════════════════
PHASE 3 — CORE PAGES
════════════════════════════════════════════════════════════════

1. `index.html`
   - Hero: headline "The Definitive Reference for AI Agent Development",
     subheadline, two CTA buttons (Browse SDKs / View Comparisons)
   - Stats bar: total SDKs tracked, categories, last updated
   - Category filter buttons (All / Big Tech / Open Source / TypeScript / Enterprise / Protocols)
   - SDK card grid (Jekyll loops over _data/sdks.yml, filtered by JS)
   - Featured section: "Top Picks for Production" (LangGraph, CrewAI, OpenAI Agents SDK)
   - Bottom CTA: GitHub star button

2. `pages/comparisons/all-sdks.md`
   - Full comparison table of ALL SDKs from _data/sdks.yml
   - Columns: Name, Developer, Language, Agent Style, License, Stars, Best For
   - Sortable columns via JS
   - Filter row by category

3. `pages/comparisons/choose-your-sdk.md`
   - Decision guide: "What do you need?" → recommendation
   - Mermaid decision tree diagram
   - "If you need X, choose Y" table
   - Quick verdict for 8 common scenarios:
     (production complexity / rapid prototyping / TypeScript / enterprise .NET /
      role-based teams / document RAG / full-stack React / MCP tooling)

4. `pages/glossary.md`
   - 50+ terms following the format in content-agent.agent.md
   - Alphabetical with anchor links
   - A–Z quick-jump nav at top

After Phase 3 is complete, give a summary and WAIT FOR MY APPROVAL.

════════════════════════════════════════════════════════════════
PHASE 4 — SDK DEEP-DIVE PAGES
════════════════════════════════════════════════════════════════

Generate individual pages for EACH of these SDKs.
Use the exact template from `.github/agents/docs-agent.agent.md`.
Every page MUST include: YAML front matter, what-is section, when-to-use,
Mermaid architecture diagram, Quick Start code, Key Concepts, S&W table,
notable users, resources.

- `pages/sdks/langgraph.md`
- `pages/sdks/crewai.md`
- `pages/sdks/openai-agents-sdk.md`
- `pages/sdks/google-adk.md`
- `pages/sdks/microsoft-agent-framework.md`
- `pages/sdks/aws-strands.md`
- `pages/sdks/copilotkit.md`
- `pages/sdks/vercel-ai-sdk.md`
- `pages/sdks/pydantic-ai.md`
- `pages/sdks/llamaindex.md`
- `pages/sdks/smolagents.md`
- `pages/sdks/mcp.md`
- `pages/sdks/crewai.md`
- `pages/sdks/langchain.md`

After Phase 4 is complete, give a summary and WAIT FOR MY APPROVAL.

════════════════════════════════════════════════════════════════
PHASE 5 — GUIDES
════════════════════════════════════════════════════════════════

Create these guides using the template in content-agent.agent.md:

1. `pages/guides/getting-started-with-agents.md`
   - What is an AI agent?
   - Your first agent in 5 minutes (LangGraph example)
   - Key concepts to know first
   - Common beginner mistakes

2. `pages/guides/multi-agent-systems.md`
   - When to use multi-agent architecture
   - Patterns: Supervisor, Swarm, Pipeline, Peer-to-peer
   - Code examples with LangGraph and CrewAI
   - Production considerations

3. `pages/guides/mcp-protocol-guide.md`
   - What MCP is and why it matters
   - Building your first MCP server
   - Connecting MCP to different frameworks
   - Available MCP servers directory

4. `pages/guides/choosing-your-stack.md`
   - Decision framework by use case
   - By team size / expertise
   - By cloud provider
   - By language preference
   - By budget (open source vs enterprise)

5. `pages/guides/production-deployment.md`
   - Observability and monitoring
   - Error handling and retries
   - Cost management strategies
   - Security considerations

After Phase 5 is complete, give a summary and WAIT FOR MY APPROVAL.

════════════════════════════════════════════════════════════════
PHASE 6 — POLISH & SEO
════════════════════════════════════════════════════════════════

Using `.github/agents/seo-agent.agent.md` as your guide:

1. Add Open Graph + Twitter Card tags to `_layouts/default.html`
2. Add JSON-LD (WebSite schema) to `_layouts/default.html`
3. Add JSON-LD (TechArticle schema) to `_layouts/sdk.html`
4. Create `sitemap.xml` covering all pages with correct priorities
5. Create `robots.txt` (allow all, point to sitemap)
6. Create `404.html` — custom not-found page with search + top links
7. Verify every internal link resolves correctly
8. Final self-audit — confirm ALL of the following:
   [ ] All sdks.yml entries have code_example populated
   [ ] All SDK pages have Mermaid diagram
   [ ] All comparison tables are complete and sortable
   [ ] Dark mode works on every page
   [ ] Fuse.js search returns relevant results
   [ ] Every page has unique meta title and description
   [ ] GitHub Actions deploy.yml is syntactically correct
   [ ] No broken internal links
   [ ] All external links have target="_blank" rel="noopener noreferrer"
   [ ] Mobile layout works at 375px width

Report the audit results.

════════════════════════════════════════════════════════════════
QUALITY BAR (apply to every file you create)
════════════════════════════════════════════════════════════════

- Lighthouse 95+ on Performance, Accessibility, SEO, Best Practices
- Every SDK page: description + working code + S&W table + official links
- Search works client-side across names, descriptions, and tags
- Site works with JavaScript disabled (progressive enhancement)
- Design quality target: docs.stripe.com — clean, professional, developer-focused
- No placeholder content — every field must be real and accurate

════════════════════════════════════════════════════════════════
START NOW
════════════════════════════════════════════════════════════════

Begin with Phase 1.
Read `.github/copilot-instructions.md` first.
Summarize your Phase 1 plan BEFORE writing any files.
Wait for my approval after each phase before continuing.
