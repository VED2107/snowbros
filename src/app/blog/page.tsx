import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Engineering Blog",
  description:
    "Notes on performance, applied AI, infrastructure, and the craft of building software that lasts.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/rss.xml" },
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Engineering blog"
        title="Notes from the studio."
        lead="Occasional writing on performance, applied AI, and infrastructure — only when we have something worth saying."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <Section>
        <RevealGroup className="flex flex-col divide-y divide-border">
          {posts.map((post) => (
            <Reveal as="div" key={post.slug} className="py-10 first:pt-0">
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="rounded-full border border-border px-3 py-1">
                    {post.tag}
                  </span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-5 max-w-3xl text-[length:var(--text-2xl)] font-medium leading-[var(--text-2xl--line-height)] transition-colors group-hover:text-accent-strong">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary">
                  {post.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
