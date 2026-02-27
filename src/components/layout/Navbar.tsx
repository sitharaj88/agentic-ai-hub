"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Search, Github } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchModal } from "@/components/ui/SearchModal";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Cmd+K shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-lg font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Agentic <span className="text-accent">AI</span> Hub
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "hover:bg-[var(--bg-secondary)]"
                    }`}
                    style={{ color: isActive ? undefined : "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2">
            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors hover:border-accent"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-secondary)",
              }}
              aria-label="Search (Cmd+K)"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded border px-1.5 py-0.5 text-xs sm:inline" style={{ borderColor: "var(--border)" }}>
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <a
              href="https://github.com/sitharaj88/agentic-ai-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--bg-secondary)] sm:flex"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              <Github size={16} />
              Star
            </a>

            {/* Mobile toggle */}
            <button
              className="rounded-md p-1.5 md:hidden"
              style={{ color: "var(--text-primary)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="border-t px-4 pb-4 pt-2 md:hidden"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)" }}
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-md px-3 py-2 text-sm font-medium ${
                        isActive ? "bg-accent/10 text-accent" : ""
                      }`}
                      style={{ color: isActive ? undefined : "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
