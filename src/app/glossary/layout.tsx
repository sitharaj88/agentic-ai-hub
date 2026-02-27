import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary — AI Agent Development Terms",
  description:
    "Comprehensive glossary of key terminology for AI agent development, covering core concepts, reasoning, tools, memory, RAG, patterns, protocols, and more.",
};

const BASE_URL = SITE_CONFIG.url;

const glossaryJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Agentic AI Glossary",
  description:
    "Comprehensive glossary of terms related to AI agent development, covering core concepts, reasoning, tools, memory, RAG, patterns, protocols, LLM fundamentals, safety, production, and multi-agent systems.",
  url: `${BASE_URL}/glossary/`,
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
      />
      {children}
    </>
  );
}
