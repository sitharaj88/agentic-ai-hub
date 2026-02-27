<div align="center">

# Agentic AI Hub

**The definitive open-source guide to AI agent development.**
Concepts · Frameworks · Patterns · Guides — from first steps to production.

[![Live Site](https://img.shields.io/badge/Live%20Site-sitharaj88.github.io-blue?style=for-the-badge&logo=vercel)](https://sitharaj88.github.io/agentic-ai-hub)
[![GitHub Stars](https://img.shields.io/github/stars/sitharaj88/agentic-ai-hub?style=for-the-badge&logo=github)](https://github.com/sitharaj88/agentic-ai-hub/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

<br />

![Agentic AI Hub — Banner](public/og-image.png)

</div>

---

## About

**Agentic AI Hub** is a free, open-source developer reference for the rapidly evolving world of AI agents. It covers every major framework, design pattern, and core concept you need to understand and build production-grade agentic systems.

Whether you are picking your first framework or designing a multi-agent system for production, this hub has you covered.

---

## Features

- **7 Core Concepts** — Deep-dives with code examples, academic citations, and key takeaways
- **22+ Frameworks** — LangGraph, CrewAI, Claude Agent SDK, OpenAI Agents SDK, AutoGen, and more
- **6 Design Patterns** — ReAct, Supervisor, Peer Collaboration, and others with pseudocode
- **10 Step-by-step Guides** — Getting started to production deployment
- **Learning Paths** — Curated journeys for Beginner, Python, TypeScript, and Production tracks
- **Framework Comparison** — Filter and compare frameworks side-by-side
- **Full-text Search** — Client-side fuzzy search powered by Fuse.js
- **Dark / Light Mode** — Persisted preference with smooth transitions
- **Keyboard Navigation** — Press `?` for shortcuts, `[` / `]` to navigate pages
- **Print-friendly** — Clean print styles for offline reading
- **SEO Optimised** — JSON-LD structured data, Open Graph, Twitter cards
- **100% Static** — Exports to GitHub Pages with zero server cost

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (Static Export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + CSS Custom Properties |
| Icons | Lucide React |
| Search | Fuse.js |
| Syntax Highlighting | Shiki |
| Deployment | GitHub Actions → GitHub Pages |

---

## Project Structure

```
agentic-ai-hub/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── concepts/[slug]/    # Core concept detail pages
│   │   ├── frameworks/[slug]/  # Framework detail pages
│   │   ├── patterns/[slug]/    # Design pattern detail pages
│   │   ├── guides/[slug]/      # Step-by-step guide pages
│   │   ├── compare/            # Framework comparison tool
│   │   ├── glossary/           # AI terminology glossary
│   │   └── learning-paths/     # Curated learning journeys
│   ├── components/
│   │   ├── content/            # Article-level components (ToC, EditOnGithub…)
│   │   ├── layout/             # Navbar, Footer
│   │   ├── seo/                # JSON-LD, meta helpers
│   │   └── ui/                 # Shared UI primitives (Badge, SearchModal…)
│   ├── data/                   # All content as TypeScript data files
│   │   ├── concept-content.ts  # 7 concepts with full HTML content
│   │   ├── frameworks.ts       # 22+ framework definitions
│   │   ├── pattern-content.ts  # 6 design patterns
│   │   └── guide-content.ts    # 10 guides
│   └── lib/                    # Utilities (search, constants, last-updated…)
├── public/                     # Static assets
├── .github/                    # GitHub Actions workflow + Copilot agents
└── out/                        # Static export output (auto-generated)
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Local Development

```bash
# Clone the repo
git clone https://github.com/sitharaj88/agentic-ai-hub.git
cd agentic-ai-hub

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000
```

### Build & Export

```bash
# Production build (static export)
npm run build

# Preview the static output locally
npx serve out
```

### Deploy to GitHub Pages

Deployment is fully automated. Every push to `main` triggers the GitHub Actions workflow which builds and deploys to GitHub Pages.

```bash
git push origin main
# → Auto-deployed to https://sitharaj88.github.io/agentic-ai-hub
```

---

## Content

All content lives in `src/data/` as TypeScript files — no CMS, no database, no API.

| File | Content |
|---|---|
| `concept-content.ts` | 7 core concepts with full HTML sections, code examples, key takeaways |
| `frameworks.ts` | 22+ framework cards with metadata, language, category, and features |
| `pattern-content.ts` | 6 design patterns with pseudocode, when-to-use, and related patterns |
| `guide-content.ts` | 10 guides with prerequisites, sections, common mistakes, and next steps |

---

## Contributing

Contributions are welcome! Here's how you can help:

- **Fix inaccuracies** — Open an issue or PR if you spot outdated or incorrect content
- **Add a framework** — Add a new entry to `src/data/frameworks.ts`
- **Improve a concept** — Expand a section in `src/data/concept-content.ts`
- **Write a guide** — Add a new guide to `src/data/guide-content.ts`

### Contribution Steps

```bash
# Fork the repo, then:
git checkout -b feat/your-contribution
# ... make your changes ...
git commit -m "feat: add XYZ framework"
git push origin feat/your-contribution
# Open a Pull Request
```

Please keep PRs focused — one feature or fix per PR.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, provided the original copyright notice is retained.

---

## Author

<table>
  <tr>
    <td align="center">
      <strong>Sitharaj Seenivasan</strong><br />
      <a href="https://sitharaj.in">🌐 sitharaj.in</a> ·
      <a href="https://linkedin.com/in/sitharaj08">💼 LinkedIn</a> ·
      <a href="https://github.com/sitharaj88">🐙 GitHub</a>
    </td>
  </tr>
</table>

If this project helps you, consider supporting it:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-sitharaj88-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/sitharaj88)

---

## Acknowledgements

Built on the shoulders of great open-source work:

- [Next.js](https://nextjs.org) by Vercel
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Fuse.js](https://fusejs.io) for fuzzy search
- [Shiki](https://shiki.style) for syntax highlighting
- The researchers and teams behind every framework documented here

---

<div align="center">

⭐ **Star this repo** if you find it useful — it helps more developers discover it.

[sitharaj88.github.io/agentic-ai-hub](https://sitharaj88.github.io/agentic-ai-hub)

</div>
