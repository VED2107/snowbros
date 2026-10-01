import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { RevealGroup } from "@/components/motion/reveal";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Engineering Blog",
    description:
      "Notes on performance, applied AI, infrastructure, and the craft of building software that lasts.",
    path: "/blog",
  }),
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/rss.xml" },
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Writing, when there is something worth saying."
        lead="Notes on performance, applied AI and infrastructure, drawn from the work."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
        ]}
      />

      <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
        <RevealGroup as="ol" className="border-t border-ink">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-hairline-strong">
              <Link href={`/blog/${post.slug}`} className="group grid gap-x-8 gap-y-3 py-8 md:grid-cols-12 md:items-baseline">
                <span className="meta md:col-span-2">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span className="md:col-span-7">
                  <span className="block text-[length:var(--text-2xl)] leading-[var(--text-2xl--line-height)] tracking-[-0.03em] text-ink transition-colors duration-[160ms] group-hover:text-accent">
                    {post.title}
                  </span>
                  <span className="mt-2 block max-w-[60ch] text-[15px] leading-relaxed text-secondary">{post.excerpt}</span>
                </span>
                <span className="meta md:col-span-3 md:text-right">
                  {post.tag}, {post.readingTime}
                </span>
              </Link>
            </li>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
