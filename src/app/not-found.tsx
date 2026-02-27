import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div
        className="text-8xl font-black leading-none sm:text-9xl"
        style={{ color: "var(--bg-tertiary)" }}
      >
        404
      </div>

      <h1 className="mt-4 text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
        Page not found
      </h1>

      <p className="mt-3 max-w-md text-lg" style={{ color: "var(--text-secondary)" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try searching or explore our content below.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          <Home size={16} /> Go Home
        </Link>
        <Link
          href="/frameworks"
          className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--bg-secondary)]"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
        >
          Browse Frameworks <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Core Concepts", href: "/concepts", desc: "Learn the fundamentals" },
          { label: "Guides", href: "/guides", desc: "Step-by-step tutorials" },
          { label: "Glossary", href: "/glossary", desc: "Agent terminology A-Z" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border p-4 text-left transition-all hover:border-accent hover:shadow-sm"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {link.label}
            </div>
            <div className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
              {link.desc}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
