# GitHub Copilot Prompt Files
## Agentic AI Developer Hub

These files set up GitHub Copilot to build a world-class GitHub Pages site covering
all Agentic AI SDKs, frameworks, tools, and development guides.

---

## 📁 What's Included

```
.github/
├── copilot-instructions.md        ← Global project instructions (auto-loaded by Copilot)
├── MASTER_AGENT_PROMPT.md         ← Full build prompt — paste into Agent Mode
├── agents/
│   ├── docs-agent.agent.md        ← @docs-agent: SDK documentation writer
│   ├── content-agent.agent.md     ← @content-agent: Guides, glossary, comparisons
│   └── seo-agent.agent.md         ← @seo-agent: Meta tags, sitemap, Lighthouse
└── instructions/
    ├── frontend.instructions.md   ← Auto-applied to HTML/CSS/JS files
    └── content.instructions.md    ← Auto-applied to _data/ and pages/ files
```

---

## 🚀 Setup Steps

### Step 1 — Copy files into your repo
Copy the entire `.github/` folder into the root of your GitHub repository.

### Step 2 — Enable GitHub Pages
Go to repo **Settings → Pages → Source → GitHub Actions**

### Step 3 — Open Copilot Agent Mode in VS Code
- Press `Ctrl+Shift+I` to open Copilot Chat
- Switch mode dropdown to **Agent**
- Select model: **Claude Sonnet** or **GPT-4o** recommended

### Step 4 — Paste the Master Prompt
Open `.github/MASTER_AGENT_PROMPT.md`, copy everything below the dashed line,
and paste it into the Copilot Agent Mode chat.

### Step 5 — Work Phase by Phase
Copilot will work through 6 phases. After each phase it will summarize
and wait for your approval before continuing.

| Phase | What Gets Built |
|-------|----------------|
| 1 | Jekyll scaffold, layouts, CSS, JS, GitHub Actions |
| 2 | All SDK data in `_data/sdks.yml`, tools, categories |
| 3 | Homepage, comparison tables, glossary |
| 4 | 14 SDK deep-dive pages with code + diagrams |
| 5 | 5 developer guides |
| 6 | SEO, sitemap, final audit |

### Step 6 — Use Specialized Agents for Updates
After the initial build, use agents for ongoing updates:

```
@docs-agent Add a complete deep-dive page for Agno framework

@content-agent Update the LangGraph entry in sdks.yml with new GitHub star count

@seo-agent Audit all SDK pages for missing meta descriptions

@content-agent Write a new guide: "Building RAG Agents with LlamaIndex"
```

---

## 📋 Tips for Best Results

**Start a new Agent chat for each phase** — context windows fill up quickly.

**Commit after each phase:**
```bash
git add . && git commit -m "feat: complete phase 1 - scaffolding"
```

**If Copilot stalls**, give a specific nudge:
```
You stopped after creating index.html.
Now create pages/comparisons/all-sdks.md with a full comparison table
of all SDKs from _data/sdks.yml
```

**Preview locally before pushing:**
```bash
gem install bundler jekyll
bundle install
bundle exec jekyll serve
# → open http://localhost:4000/agentic-ai-hub
```

---

## 🎯 Target Output

- **25+ pages** covering every major Agentic AI SDK and framework
- **50+ glossary terms** with cross-linking
- **5 developer guides** for getting started, multi-agent systems, MCP, etc.
- **Sortable comparison tables** across all SDKs
- **Lighthouse 95+** on all four metrics
- **Dark mode** with localStorage persistence
- **Client-side search** via Fuse.js
- **Auto-deployed** via GitHub Actions on every push to main
