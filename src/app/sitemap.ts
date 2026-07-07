import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects, posts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/products",
    "/atlas",
    "/mentor",
    "/about",
    "/services",
    "/work",
    "/case-studies",
    "/labs",
    "/blog",
    "/open-source",
    "/careers",
    "/contact",
    "/credits",
    "/privacy",
    "/terms",
    "/cookies",
    "/accessibility",
    "/security",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  for (const p of projects) {
    entries.push({
      url: `${site.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  for (const post of posts) {
    entries.push({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  return entries;
}
