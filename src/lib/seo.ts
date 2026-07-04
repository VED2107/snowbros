import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Next.js merges metadata objects shallowly per segment — a page that sets
 * its own `openGraph` fully replaces the parent's (no deep merge), and one
 * that sets none inherits the parent's verbatim (including its title). Left
 * alone, every subpage's social preview would show the homepage title.
 * This helper mirrors title/description into openGraph + twitter on every
 * call so previews always match the page.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  images,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  images?: string[];
}): Metadata {
  const url = `${site.url}${path}`;
  const ogImages = images ?? [`${site.url}/opengraph-image`];
  // og:title/twitter:title aren't run through Next's title template, so the
  // brand suffix (visible in the <title> tag) is added explicitly here to
  // keep social previews consistent with the browser tab.
  const socialTitle = `${title} — ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: site.locale,
      url,
      siteName: site.name,
      title: socialTitle,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ogImages,
    },
  };
}
