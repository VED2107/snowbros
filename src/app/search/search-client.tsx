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
        placeholder="Search work, services and writing"
        className="w-full border-0 border-b-2 border-ink bg-transparent px-0 py-3 text-[length:var(--text-2xl)] tracking-[-0.02em] text-ink outline-none placeholder:text-[#8b857a] focus-visible:border-accent"
      />

      <div className="mt-10">
        {query.trim() === "" ? (
          <div>
            <p className="meta">Try a term from the work</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {["Postgres", "offline", "Rust", "row-level security", "Flutter", "Razorpay", "Next.js", "accessibility"].map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    onClick={() => setQuery(t)}
                    className="h-9 rounded-[var(--radius-md)] border border-hairline-strong px-3 text-[14px] text-ink transition-[border-color,transform] duration-[160ms] hover:border-ink active:scale-[0.97]"
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : results.length === 0 ? (
          <p className="text-[15px] text-secondary">
            Nothing matches &ldquo;{query}&rdquo;. Try a technology or a project name, or{" "}
            <Link href="/contact" className="link-accent">ask us directly</Link>.
          </p>
        ) : (
          <ul className="border-t border-ink">
            {results.map((doc) => (
              <li key={doc.href}>
                <Link
                  href={doc.href}
                  className="group flex items-center justify-between gap-4 border-b border-hairline-strong py-5"
                >
                  <div>
                    <p className="text-lg font-medium transition-colors group-hover:text-accent">
                      {doc.title}
                    </p>
                    <p className="mt-1 line-clamp-1 text-sm text-secondary">
                      {doc.text}
                    </p>
                  </div>
                  <span className="meta shrink-0">
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
