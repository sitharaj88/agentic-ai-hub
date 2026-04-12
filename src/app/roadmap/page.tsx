import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Clock3, Map } from "lucide-react";
import { topicMap, countTopicsByStatus, type TopicStatus } from "@/data/topic-map";

export const metadata: Metadata = {
  title: "GenAI Coverage Roadmap",
  description:
    "A topic map showing what this hub already covers, what is partial, and which GenAI and agent topics are planned next.",
};

const statusMeta: Record<
  TopicStatus,
  { label: string; className: string; description: string }
> = {
  covered: {
    label: "Covered",
    className: "badge-beginner",
    description: "Substantive content already exists in the hub.",
  },
  partial: {
    label: "Partial",
    className: "badge-intermediate",
    description: "Covered indirectly, but still missing dedicated depth.",
  },
  planned: {
    label: "Planned",
    className: "badge-advanced",
    description: "Identified as an important topic for future expansion.",
  },
};

const statusCounts = {
  covered: countTopicsByStatus("covered"),
  partial: countTopicsByStatus("partial"),
  planned: countTopicsByStatus("planned"),
};

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
          <Map size={14} />
          Coverage Roadmap
        </div>

        <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          GenAI Coverage Roadmap
        </h1>
        <p className="mt-3 max-w-3xl text-lg" style={{ color: "var(--text-secondary)" }}>
          This map shows the documentation scope this hub is aiming for: what is already covered well, what is only partially covered today, and which GenAI and agent topics should be added next.
        </p>
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {Object.entries(statusMeta).map(([status, meta]) => (
          <div
            key={status}
            className="rounded-2xl border p-5"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className={`${meta.className} rounded-full px-2.5 py-0.5 text-xs font-medium`}>
                {meta.label}
              </span>
              <span className="text-2xl font-extrabold text-accent">
                {statusCounts[status as TopicStatus]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {meta.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-10 rounded-2xl border-l-4 p-5" style={{ backgroundColor: "var(--callout-info-bg)", borderColor: "var(--callout-info-border)" }}>
        <h2 className="flex items-center gap-2 text-base font-bold" style={{ color: "var(--text-primary)" }}>
          <CheckCircle2 size={18} className="text-accent" />
          Recommended Sequence
        </h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Learn this hub in four passes: GenAI foundations first, then application engineering, then agent systems, then production operations. That order reduces confusion and makes later agent topics much easier to understand.
        </p>
      </div>

      <div className="space-y-10">
        {topicMap.map((section) => (
          <section key={section.id}>
            <div className="mb-4">
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {section.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {section.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {section.topics.map((topic) => {
                const meta = statusMeta[topic.status];

                return (
                  <article
                    key={topic.title}
                    className="rounded-2xl border p-5"
                    style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                        {topic.title}
                      </h3>
                      <span className={`${meta.className} shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium`}>
                        {meta.label}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {topic.description}
                    </p>

                    {topic.href ? (
                      <Link
                        href={topic.href}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-all hover:gap-2"
                      >
                        Open current coverage <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <div className="mt-4 inline-flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Clock3 size={12} />
                        Not yet documented as a dedicated page
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
