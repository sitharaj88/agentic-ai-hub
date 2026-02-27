import { SITE_CONFIG } from "@/lib/constants";

const BASE_URL = SITE_CONFIG.url;

/* ============================================================
   Type definitions for JSON-LD schemas
   ============================================================ */

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface ArticleProps {
  title: string;
  description: string;
  slug: string;
  section: string;
  datePublished?: string;
  dateModified?: string;
}

interface TechArticleProps {
  title: string;
  description: string;
  slug: string;
  developer: string;
  languages: string[];
  datePublished?: string;
  dateModified?: string;
}

interface GlossaryTerm {
  term: string;
  definition: string;
}

/* ============================================================
   WebSite Schema — for the homepage
   ============================================================ */

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: BASE_URL,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/glossary/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ============================================================
   Article Schema — for concept, guide, and pattern pages
   ============================================================ */

export function ArticleJsonLd({
  title,
  description,
  slug,
  section,
  datePublished = "2025-06-01",
  dateModified = "2025-06-01",
}: ArticleProps) {
  const url = `${BASE_URL}/${section}/${slug}/`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ============================================================
   TechArticle Schema — for framework pages
   ============================================================ */

export function TechArticleJsonLd({
  title,
  description,
  slug,
  developer,
  languages,
  datePublished = "2025-06-01",
  dateModified = "2025-06-01",
}: TechArticleProps) {
  const url = `${BASE_URL}/frameworks/${slug}/`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    proficiencyLevel: "Beginner",
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    about: {
      "@type": "SoftwareApplication",
      name: title,
      applicationCategory: "AI Agent Framework",
      operatingSystem: "Cross-platform",
      creator: {
        "@type": "Organization",
        name: developer,
      },
      programmingLanguage: languages,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ============================================================
   DefinedTermSet Schema — for the glossary page
   ============================================================ */

export function DefinedTermSetJsonLd({
  terms,
}: {
  terms: GlossaryTerm[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Agentic AI Glossary",
    description:
      "Comprehensive glossary of terms related to AI agent development, covering core concepts, reasoning, tools, memory, RAG, patterns, protocols, LLM fundamentals, safety, production, and multi-agent systems.",
    url: `${BASE_URL}/glossary/`,
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ============================================================
   BreadcrumbList Schema — for all pages with breadcrumbs
   ============================================================ */

export function BreadcrumbJsonLd({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
