"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Keyboard, X } from "lucide-react";

interface KeyboardNavProps {
  prevHref?: string | null;
  nextHref?: string | null;
}

const shortcuts = [
  { keys: ["j", "\u2192"], description: "Next page" },
  { keys: ["k", "\u2190"], description: "Previous page" },
  { keys: ["h"], description: "Go to homepage" },
  { keys: ["/"], description: "Open search" },
  { keys: ["?"], description: "Show this help" },
];

export function KeyboardNav({ prevHref, nextHref }: KeyboardNavProps) {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      // Don't interfere with modifier key combos (except Shift for ?)
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case "j":
        case "ArrowRight":
          if (nextHref) {
            e.preventDefault();
            router.push(nextHref);
          }
          break;

        case "k":
        case "ArrowLeft":
          if (prevHref) {
            e.preventDefault();
            router.push(prevHref);
          }
          break;

        case "h":
          e.preventDefault();
          router.push("/");
          break;

        case "/":
          e.preventDefault();
          // Trigger the existing Cmd+K search by dispatching a keyboard event
          window.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "k",
              code: "KeyK",
              metaKey: true,
              bubbles: true,
            })
          );
          break;

        case "?":
          e.preventDefault();
          setShowHelp((prev) => !prev);
          break;

        case "Escape":
          if (showHelp) {
            e.preventDefault();
            setShowHelp(false);
          }
          break;
      }
    },
    [nextHref, prevHref, router, showHelp]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!showHelp) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={() => setShowHelp(false)}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm rounded-xl border p-6 shadow-2xl"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard size={18} style={{ color: "var(--color-accent)" }} />
            <h3
              className="text-base font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Keyboard Shortcuts
            </h3>
          </div>
          <button
            onClick={() => setShowHelp(false)}
            className="rounded-md p-1 transition-colors hover:bg-[var(--bg-secondary)]"
            style={{ color: "var(--text-muted)" }}
            aria-label="Close shortcuts help"
          >
            <X size={16} />
          </button>
        </div>

        {/* Shortcuts List */}
        <ul className="space-y-3">
          {shortcuts.map((shortcut) => (
            <li
              key={shortcut.description}
              className="flex items-center justify-between"
            >
              <span
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1.5">
                {shortcut.keys.map((key, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && (
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        or
                      </span>
                    )}
                    <kbd
                      className="inline-flex min-w-[1.75rem] items-center justify-center rounded-md border px-2 py-0.5 text-xs font-mono font-semibold"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {key}
                    </kbd>
                  </span>
                ))}
              </div>
            </li>
          ))}
          <li className="flex items-center justify-between">
            <span
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Search (alternative)
            </span>
            <div className="flex items-center gap-1.5">
              <kbd
                className="inline-flex min-w-[1.75rem] items-center justify-center rounded-md border px-2 py-0.5 text-xs font-mono font-semibold"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                Cmd
              </kbd>
              <span
                className="text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                +
              </span>
              <kbd
                className="inline-flex min-w-[1.75rem] items-center justify-center rounded-md border px-2 py-0.5 text-xs font-mono font-semibold"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                K
              </kbd>
            </div>
          </li>
        </ul>

        {/* Footer hint */}
        <p
          className="mt-5 text-center text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          Press <kbd className="font-mono font-semibold">Esc</kbd> or{" "}
          <kbd className="font-mono font-semibold">?</kbd> to close
        </p>
      </div>
    </div>
  );
}
