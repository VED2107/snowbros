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
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
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
          { name: "Writing", href: "/blog" },
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
            author: { "@type": "Person", name: site.founder.name },
            publisher: { "@type": "Organization", name: site.name },
            url: `${site.url}/blog/${post.slug}`,
          }),
        }}
      />

      <Container size="narrow" className="pt-12 md:pt-20">
        <nav aria-label="Breadcrumb" className="meta enter">
          <Link href="/blog" className="transition-colors hover:text-ink">Writing</Link>
          <span aria-hidden> / </span>
          <span className="text-ink">{post.tag}</span>
        </nav>
        <h1
          className="enter mt-6 text-[length:var(--text-4xl)] font-medium leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)] text-ink"
          style={{ "--enter-delay": "60ms" } as React.CSSProperties}
        >
          {post.title}
        </h1>
        <p className="meta enter mt-6 border-t border-ink pt-3" style={{ "--enter-delay": "120ms" } as React.CSSProperties}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readingTime} read, by {site.founder.name}
        </p>
      </Container>

      <Container size="narrow" className="mt-12">
        <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink/85">
          {post.body.map((para, i) => (
            <p key={i} className={i === 0 ? "text-[length:var(--text-xl)] leading-[1.55] text-ink" : undefined}>
              {para}
            </p>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-ink pt-6">
          <Link href="/blog" className="text-[14px] text-secondary transition-colors hover:text-ink">
            <span aria-hidden>&larr; </span>All writing
          </Link>
          <Link href="/contact" className="link-accent text-[14px]">
            Start a project
          </Link>
        </div>
      </Container>
    </article>
  );
}
