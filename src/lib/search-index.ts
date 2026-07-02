import { services, projects, posts } from "@/lib/content";

export type SearchDoc = {
  title: string;
  href: string;
  kind: "Service" | "Work" | "Post" | "Page";
  text: string;
};

export const searchIndex: SearchDoc[] = [
  ...services.map((s) => ({
    title: s.title,
    href: `/services#${s.slug}`,
    kind: "Service" as const,
    text: `${s.summary} ${s.capabilities.join(" ")}`,
  })),
  ...projects.map((p) => ({
    title: p.title,
    href: `/work/${p.slug}`,
    kind: "Work" as const,
    text: `${p.client} ${p.discipline} ${p.summary}`,
  })),
  ...posts.map((p) => ({
    title: p.title,
    href: `/blog/${p.slug}`,
    kind: "Post" as const,
    text: `${p.tag} ${p.excerpt}`,
  })),
  {
    title: "About the studio",
    href: "/about",
    kind: "Page",
    text: "who we are craft principles values studio",
  },
  {
    title: "Careers",
    href: "/careers",
    kind: "Page",
    text: "jobs roles hiring open positions",
  },
  {
    title: "Open Source",
    href: "/open-source",
    kind: "Page",
    text: "github libraries tools",
  },
  {
    title: "Contact",
    href: "/contact",
    kind: "Page",
    text: "get in touch start a project inquiry",
  },
];

export function searchDocs(query: string): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return searchIndex
    .map((doc) => {
      const haystack = `${doc.title} ${doc.text}`.toLowerCase();
      const score = terms.reduce(
        (acc, t) => acc + (haystack.includes(t) ? 1 : 0),
        0,
      );
      return { doc, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.doc);
}
