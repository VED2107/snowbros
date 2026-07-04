import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { posts, getPost } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const meta = pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="pb-24">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name },
            url: `${site.url}/blog/${post.slug}`,
          }),
        }}
      />

      <Container size="narrow" className="pt-24 md:pt-32">
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="rounded-full border border-border px-3 py-1">
            {post.tag}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-6 text-[length:var(--text-4xl)] font-normal leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)]">
          {post.title}
        </h1>
      </Container>

      <Container size="narrow" className="mt-12">
        <div className="flex flex-col gap-6 text-lg leading-relaxed text-secondary">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/blog"
            className="text-sm text-secondary transition-colors hover:text-ink"
          >
            ← All posts
          </Link>
        </div>
      </Container>
    </article>
  );
}
