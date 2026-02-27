"use client";

import { useEffect, useRef } from "react";

/**
 * Applies lightweight regex-based syntax highlighting to a plain-text code string.
 * Returns HTML with <span class="token-*"> wrappers.
 */
function highlightCode(code: string): string {
  // The input is already HTML-escaped since it came from innerHTML,
  // but we need to work with the text content for regex matching.
  // We'll work directly with the HTML text since entities are already escaped.

  let html = code;

  const placeholders: string[] = [];
  // Use X…X wrapper so the index digit is flanked by word-chars on both sides.
  // This prevents the number regex (\b\d+\b) from matching the index digit inside
  // a placeholder, which was causing strings like "type", "name" to render as numbers.
  function placeholder(match: string, className: string): string {
    const idx = placeholders.length;
    placeholders.push(`<span class="${className}">${match}</span>`);
    return `\x00X${idx}X\x00`;
  }

  // Multi-line comments (/* ... */)
  html = html.replace(/\/\*[\s\S]*?\*\//g, (m) =>
    placeholder(m, "token-comment")
  );

  // Single-line comments (// ... and # ...)
  html = html.replace(/(\/\/.*|#.*)/g, (m) =>
    placeholder(m, "token-comment")
  );

  // Strings: double-quoted, single-quoted, backtick template literals
  html = html.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    (m) => placeholder(m, "token-string")
  );

  // Decorators (@something)
  html = html.replace(/@\w+/g, (m) =>
    placeholder(m, "token-function")
  );

  // Numbers (integers, floats, hex)
  html = html.replace(/\b(0x[0-9a-fA-F]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/g, (m) =>
    placeholder(m, "token-number")
  );

  // Keywords
  html = html.replace(
    /\b(def|function|import|from|export|class|const|let|var|return|if|else|elif|for|while|try|catch|except|finally|async|await|yield|new|throw|switch|case|break|continue|do|in|of|with|as|is|not|and|or|True|False|None|true|false|null|undefined|self|this|type|interface|extends|implements|abstract|static|public|private|protected|super|lambda|pass|raise|del|global|nonlocal|assert|print|default|void|enum|struct|fn|mut|pub|use|mod|crate|impl|trait|where|loop|match)\b/g,
    (m) => placeholder(m, "token-keyword")
  );

  // Function calls: word followed by (
  html = html.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, (full, name) => {
    if (full.includes("\x00")) return full;
    return placeholder(name, "token-function") + full.slice(name.length);
  });

  // Restore placeholders
  html = html.replace(/\x00X(\d+)X\x00/g, (_, idx) => placeholders[Number(idx)]);

  return html;
}

/**
 * Detects the programming language from the code content or class name.
 */
function detectLanguage(codeEl: HTMLElement): string {
  // Check for class-based language hints (e.g., language-python, lang-js)
  const classList = codeEl.className + " " + (codeEl.parentElement?.className || "");
  const langMatch = classList.match(/(?:language|lang)-(\w+)/);
  if (langMatch) return langMatch[1];

  const text = codeEl.textContent || "";

  // Heuristic detection based on content
  if (/^\s*(pip install|python -m|import\s+\w|from\s+\w+\s+import|def\s+\w|class\s+\w+.*:)/m.test(text)) return "python";
  if (/^\s*(npm |npx |yarn |pnpm |import\s+.*from\s+['"]|const\s+\w+\s*=\s*require)/m.test(text)) return "javascript";
  if (/^\s*(interface\s+\w|type\s+\w+\s*=|:\s*(string|number|boolean))/m.test(text)) return "typescript";
  if (/^\s*(curl\s|wget\s|mkdir\s|cd\s|ls\s|echo\s|source\s|export\s)/m.test(text)) return "bash";
  if (/^\s*(\$\s|>\s)/.test(text)) return "bash";
  if (/^\s*\{[\s\S]*"[\w]+"/.test(text)) return "json";
  if (/^\s*(SELECT|INSERT|CREATE|ALTER|DROP)\s/im.test(text)) return "sql";
  if (/^\s*(<!DOCTYPE|<html|<div|<span)/i.test(text)) return "html";
  if (/^\s*(fn\s|let\s+mut|use\s+std::)/m.test(text)) return "rust";
  if (/^\s*(func\s|package\s|import\s+")/m.test(text)) return "go";

  return "code";
}

/**
 * Creates a copy button DOM element that copies the given text to clipboard.
 */
function createCopyButton(text: string): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.className = "code-block-copy-btn";
  btn.setAttribute("aria-label", "Copy code");
  btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> <span>Copy</span>`;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Copied</span>`;
    btn.style.color = "var(--color-beginner)";
    setTimeout(() => {
      btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> <span>Copy</span>`;
      btn.style.color = "";
    }, 2000);
  });

  return btn;
}

/**
 * ProseCodeBlocks — a wrapper component that enhances all <pre><code> blocks
 * within its children with:
 *   - A header bar showing the detected language
 *   - A copy-to-clipboard button
 *   - Lightweight regex-based syntax highlighting
 *
 * Usage:
 *   <ProseCodeBlocks>
 *     <article className="prose" dangerouslySetInnerHTML={{ __html: content }} />
 *   </ProseCodeBlocks>
 *
 * Or wrap an existing article that contains dangerouslySetInnerHTML sections.
 */
export function ProseCodeBlocks({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preBlocks = container.querySelectorAll("pre");

    preBlocks.forEach((pre) => {
      // Skip if already enhanced
      if (pre.parentElement?.classList.contains("code-block-wrapper")) return;

      const codeEl = pre.querySelector("code");
      if (!codeEl) return;

      const rawText = codeEl.textContent || "";
      const language = detectLanguage(codeEl);

      // Apply syntax highlighting
      const originalHTML = codeEl.innerHTML;
      // Only apply highlighting if there are no existing span elements (not already highlighted)
      if (!/<span\s+class="token-/.test(originalHTML)) {
        codeEl.innerHTML = highlightCode(originalHTML);
      }

      // Create wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";

      // Create header
      const header = document.createElement("div");
      header.className = "code-block-header";

      // Language label
      const langLabel = document.createElement("span");
      langLabel.className = "code-block-lang";
      langLabel.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> ${language}`;

      // Copy button
      const copyBtn = createCopyButton(rawText);

      header.appendChild(langLabel);
      header.appendChild(copyBtn);
      wrapper.appendChild(header);

      // Move pre into wrapper
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
    });
  }, []);

  return <div ref={containerRef} className="min-w-0 overflow-hidden">{children}</div>;
}
