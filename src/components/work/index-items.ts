import { type Project, projectHref } from "@/lib/content";
import type { IndexItem } from "./project-index";

export function toIndexItems(list: Project[]): IndexItem[] {
  return list.map((p) => ({
    slug: p.slug,
    name: p.client,
    href: projectHref(p),
    category: p.category,
    year: p.year,
    status: p.version ? `${p.status}, ${p.version}` : p.status,
    summary: p.summary,
    media: p.media[0]
      ? { src: p.media[0].src, alt: p.media[0].alt, width: p.media[0].width, height: p.media[0].height }
      : undefined,
  }));
}
