"use client";

import { useRef } from "react";
import { Code } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * Applies lightweight regex-based syntax highlighting to plain code text.
 * Returns HTML with <span class="token-*"> wrappers for common token types.
 */
function highlightCode(code: string): string {
  // Escape HTML entities first
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Order matters: comments and strings first (they can contain keywords)
  // We use a placeholder approach to avoid double-matching

  const placeholders: string[] = [];
  function placeholder(match: string, className: string): string {
    const idx = placeholders.length;
    placeholders.push(`<span class="${className}">${match}</span>`);
    return `\x00${idx}\x00`;
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
    // Don't highlight keywords that were already captured
    if (full.includes("\x00")) return full;
    return placeholder(name, "token-function") + full.slice(name.length);
  });

  // Operators
  html = html.replace(
    /([+\-*/%=!<>&|^~?]+|\.{3})/g,
    (m) => {
      if (m.includes("\x00")) return m;
      return `<span class="token-operator">${m}</span>`;
    }
  );

  // Punctuation
  html = html.replace(
    /([{}()[\];:,.])/g,
    (m) => {
      if (m.includes("\x00")) return m;
      return `<span class="token-punctuation">${m}</span>`;
    }
  );

  // Restore placeholders
  html = html.replace(/\x00(\d+)\x00/g, (_, idx) => placeholders[Number(idx)]);

  return html;
}

/**
 * A styled code block with language label, copy button, and syntax highlighting.
 * Used for standalone code blocks rendered in JSX (not from dangerouslySetInnerHTML).
 */
export function CodeBlock({ code, language = "python" }: CodeBlockProps) {
  const codeRef = useRef<HTMLPreElement>(null);
  const highlighted = highlightCode(code);

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-lang">
          <Code size={14} />
          {language}
        </span>
        <CopyButton text={code} />
      </div>
      <pre ref={codeRef} className="code-block-pre">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}
