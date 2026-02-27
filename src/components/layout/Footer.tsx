import Link from "next/link";
import { Github, Keyboard, Globe, Linkedin, Coffee } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const footerNav = [
  {
    heading: "Learn",
    links: [
      { label: "Core Concepts", href: "/concepts" },
      { label: "Design Patterns", href: "/patterns" },
      { label: "Glossary", href: "/glossary" },
      { label: "Learning Paths", href: "/learning-paths/beginner" },
    ],
  },
  {
    heading: "Frameworks",
    links: [
      { label: "LangGraph", href: "/frameworks/langgraph" },
      { label: "CrewAI", href: "/frameworks/crewai" },
      { label: "Claude Agent SDK", href: "/frameworks/claude-agent-sdk" },
      { label: "OpenAI Agents SDK", href: "/frameworks/openai-agents-sdk" },
      { label: "View All", href: "/frameworks" },
    ],
  },
  {
    heading: "Build",
    links: [
      { label: "Getting Started", href: "/guides/getting-started" },
      { label: "Choose Your Stack", href: "/guides/choosing-your-stack" },
      { label: "Production Deploy", href: "/guides/production-deployment" },
      { label: "Compare Frameworks", href: "/compare" },
    ],
  },
  {
    heading: "Community",
    links: [
      {
        label: "GitHub Repo",
        href: "https://github.com/sitharaj88/agentic-ai-hub",
        external: true,
      },
      {
        label: "Contribute",
        href: "https://github.com/sitharaj88/agentic-ai-hub/issues",
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="mt-auto border-t transition-colors"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-5">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link
            href="/"
            className="text-lg font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Agentic <span className="text-accent">AI</span> Hub
          </Link>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            The open-source guide to AI agent development. Built for developers.
          </p>
          <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            Created by{" "}
            <a
              href={SITE_CONFIG.authorWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              {SITE_CONFIG.author}
            </a>
          </p>
          <div className="mt-3 flex items-center gap-3">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
              style={{ color: "var(--text-secondary)" }}
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={SITE_CONFIG.authorLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
              style={{ color: "var(--text-secondary)" }}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={SITE_CONFIG.authorWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Website"
            >
              <Globe size={18} />
            </a>
            <a
              href={SITE_CONFIG.authorBuyMeACoffee}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Buy Me a Coffee"
            >
              <Coffee size={18} />
            </a>
          </div>
        </div>

        {/* Nav Columns */}
        {footerNav.map((group) => (
          <div key={group.heading}>
            <h3
              className="mb-3 text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {group.heading}
            </h3>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:text-accent"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-accent"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; 2026{" "}
            <a
              href={SITE_CONFIG.authorWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              {SITE_CONFIG.author}
            </a>
            . Open source under MIT License.
          </p>
          <p
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <Keyboard size={12} />
            Keyboard shortcuts: Press{" "}
            <kbd
              className="inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-secondary)",
              }}
            >
              ?
            </kbd>{" "}
            for help
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Last updated: February 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
