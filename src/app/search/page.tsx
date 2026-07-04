import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/layout/container";
import { SearchClient } from "./search-client";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Search",
    description: "Search SNOWBROS work, services, and writing.",
    path: "/search",
  }),
  robots: { index: false, follow: true },
};

type SearchParams = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: SearchParams) {
  const { q = "" } = await searchParams;

  return (
    <>
      <PageHeader eyebrow="Search" title="Find your way around." />
      <Container size="narrow" className="py-16">
        <Suspense fallback={null}>
          <SearchClient initialQuery={q} />
        </Suspense>
      </Container>
    </>
  );
}
