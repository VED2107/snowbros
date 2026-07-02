"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { searchDocs } from "@/lib/search-index";

export function SearchClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchDocs(query), [query]);

  return (
    <div>
      <label htmlFor="site-search" className="sr-only">
        Search the site
      </label>
      <input
        id="site-search"
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search work, services, and writing…"
        className="w-full rounded-[var(--radius-md)] border border-border bg-surface px-5 py-4 text-lg outline-none transition-colors placeholder:text-muted focus-visible:border-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
      />

      <div className="mt-10">
        {query.trim() === "" ? (
          <p className="text-sm text-muted">
            Start typing to search the studio.
          </p>
        ) : results.length === 0 ? (
          <p className="text-sm text-muted">
            No results for &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {results.map((doc) => (
              <li key={doc.href}>
                <Link
                  href={doc.href}
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <div>
                    <p className="text-lg font-medium transition-colors group-hover:text-accent-strong">
                      {doc.title}
                    </p>
                    <p className="mt-1 line-clamp-1 text-sm text-secondary">
                      {doc.text}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {doc.kind}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
