import { site } from "@/lib/site";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, static, server-rendered.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        description: site.description,
        email: site.email,
        logo: `${site.url}/snowbros-logo.svg`,
        image: `${site.url}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: site.email,
          contactType: "customer support",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
        founder: {
          "@type": "Person",
          name: site.founder.name,
          jobTitle: site.founder.role,
          url: site.social.portfolio,
          sameAs: [site.social.github, site.social.linkedin],
        },
        sameAs: [
          site.social.github,
          site.social.linkedin,
          site.social.portfolio,
        ],
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.name,
        url: site.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${site.url}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
  repo,
  image,
}: {
  name: string;
  description: string;
  url: string;
  repo: string;
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name,
        description,
        url,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux, Windows",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        downloadUrl: repo,
        license: "https://spdx.org/licenses/MIT.html",
        image: image ?? `${site.url}/opengraph-image`,
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.href}`,
        })),
      }}
    />
  );
}
