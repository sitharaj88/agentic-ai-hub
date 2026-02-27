import Link from "next/link";
import { ArrowRight, BookOpen, Code, Rocket, Shield, Github, Coffee } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { FrameworkCard } from "@/components/content/FrameworkCard";
import { ConceptCard } from "@/components/content/ConceptCard";
import { PatternCard } from "@/components/content/PatternCard";
import { getFeaturedFrameworks } from "@/data/frameworks";
import { concepts } from "@/data/concepts";
import { patterns } from "@/data/patterns";
import { WebSiteJsonLd } from "@/components/seo/JsonLd";

const learningPaths = [
  {
    title: "Start Here",
    description: "New to AI agents? Learn the fundamentals from zero.",
    icon: BookOpen,
    difficulty: "Beginner",
    time: "2 hours",
    href: "/learning-paths/beginner",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    title: "Python Developer",
    description: "Build agents with Python frameworks like LangGraph and CrewAI.",
    icon: Code,
    difficulty: "Intermediate",
    time: "3 hours",
    href: "/learning-paths/python",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "TypeScript Developer",
    description: "Agent development in the TypeScript ecosystem.",
    icon: Code,
    difficulty: "Intermediate",
    time: "2.5 hours",
    href: "/learning-paths/typescript",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    title: "Production Engineer",
    description: "Ship, monitor, and scale agents in production.",
    icon: Rocket,
    difficulty: "Advanced",
    time: "4 hours",
    href: "/learning-paths/production",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
];

const stats = [
  { value: "22+", label: "Frameworks" },
  { value: "7", label: "Core Concepts" },
  { value: "6", label: "Design Patterns" },
  { value: "10", label: "Guides" },
];

export default function HomePage() {
  const featured = getFeaturedFrameworks();

  return (
    <>
      <WebSiteJsonLd />

      {/* ===== HERO ===== */}
      <section
        className="border-b"
        style={{
          borderColor: "var(--border)",
          background: "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28">
          {/* Eyebrow */}
          <div className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            The 2026 Agent Development Landscape
          </div>

          {/* Title */}
          <h1
            className="mx-auto max-w-4xl bg-gradient-to-r from-[var(--text-primary)] to-accent bg-clip-text text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            Build Intelligent AI Agents
          </h1>

          {/* Subtitle */}
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            The definitive open-source guide to every framework, pattern, and tool
            for AI agent development. From first steps to production.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/learning-paths/beginner"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="/frameworks"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-base font-semibold transition-colors hover:bg-[var(--bg-secondary)]"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              Browse Frameworks
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-accent">{stat.value}</div>
                <div className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEARNING PATHS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Choose Your Path
          </h2>
          <p className="mt-3 text-lg" style={{ color: "var(--text-secondary)" }}>
            Curated learning journeys for every experience level
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {learningPaths.map((path) => {
            const Icon = path.icon;
            return (
              <Link
                key={path.href}
                href={path.href}
                className="group flex flex-col gap-4 rounded-xl border p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${path.bg}`}>
                  <Icon size={24} className={path.color} />
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
                    {path.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {path.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span className={`badge-${path.difficulty.toLowerCase()} rounded-full px-2 py-0.5 font-medium`}>
                    {path.difficulty}
                  </span>
                  <span>{path.time}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== CORE CONCEPTS ===== */}
      <section
        className="border-y py-16 sm:py-20"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                Core Concepts
              </h2>
              <p className="mt-3 text-lg" style={{ color: "var(--text-secondary)" }}>
                The fundamentals of AI agent development
              </p>
            </div>
            <Link
              href="/concepts"
              className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:flex"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {concepts.map((concept) => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED FRAMEWORKS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              Popular Frameworks
            </h2>
            <p className="mt-3 text-lg" style={{ color: "var(--text-secondary)" }}>
              The most-used agent development frameworks in 2026
            </p>
          </div>
          <Link
            href="/frameworks"
            className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:flex"
          >
            View all 22+ <ArrowRight size={14} />
          </Link>
        </div>

        <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((fw) => (
            <FrameworkCard key={fw.id} framework={fw} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/frameworks" className="text-sm font-medium text-accent hover:underline">
            View all 22+ frameworks <ArrowRight size={14} className="inline" />
          </Link>
        </div>
      </section>

      {/* ===== DESIGN PATTERNS ===== */}
      <section
        className="border-y py-16 sm:py-20"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                Design Patterns
              </h2>
              <p className="mt-3 text-lg" style={{ color: "var(--text-secondary)" }}>
                Proven architectures for building effective agents
              </p>
            </div>
            <Link
              href="/patterns"
              className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:flex"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {patterns.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== GUIDES PREVIEW ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Guides & Tutorials
          </h2>
          <p className="mt-3 text-lg" style={{ color: "var(--text-secondary)" }}>
            Step-by-step tutorials from beginner to production
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Getting Started", desc: "Your first steps into agent development", href: "/guides/getting-started", icon: BookOpen, badge: "Beginner" },
            { title: "First Agent in 5 Min", desc: "Build a working agent quickly", href: "/guides/first-agent", icon: Rocket, badge: "Beginner" },
            { title: "Guardrails & Safety", desc: "Keep your agents safe and reliable", href: "/guides/guardrails", icon: Shield, badge: "Advanced" },
            { title: "Production Deploy", desc: "Ship agents to production", href: "/guides/production-deployment", icon: Rocket, badge: "Advanced" },
          ].map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <Icon size={20} className="mb-3 text-accent" />
                <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
                  {guide.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                  {guide.desc}
                </p>
                <span className={`badge-${guide.badge.toLowerCase()} mt-3 inline-block rounded-full px-2 py-0.5 text-xs font-medium`}>
                  {guide.badge}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/guides" className="text-sm font-medium text-accent hover:underline">
            View all 10 guides <ArrowRight size={14} className="inline" />
          </Link>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="bg-gradient-to-r from-accent to-accent-dark py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold">Open Source & Community Driven</h2>
          <p className="mt-4 text-lg text-white/85">
            Built by{" "}
            <a
              href={SITE_CONFIG.authorWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-white/40 hover:decoration-white"
            >
              {SITE_CONFIG.author}
            </a>
            . This guide is free, open source, and built for the developer community.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-accent transition-colors hover:bg-white/90"
            >
              <Github size={18} />
              Star on GitHub
            </a>
            <a
              href={SITE_CONFIG.authorBuyMeACoffee}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFDD00] px-6 py-3 font-semibold text-[#000000] transition-colors hover:bg-[#FFDD00]/90"
            >
              <Coffee size={18} />
              Buy Me a Coffee
            </a>
            <a
              href={`${SITE_CONFIG.github}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contribute
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
