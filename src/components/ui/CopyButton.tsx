"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors hover:bg-[var(--bg-secondary)]"
      style={{ color: copied ? "var(--color-beginner)" : "var(--text-muted)" }}
      aria-label={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <>
          <Check size={12} /> Copied
        </>
      ) : (
        <>
          <Copy size={12} /> Copy
        </>
      )}
    </button>
  );
}
