"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GLOSSARY, type GlossaryTerm } from "@/data/glossary";

const CATEGORIES: (GlossaryTerm["category"] | "all")[] = [
  "all",
  "anatomy",
  "chemistry",
  "function",
  "network",
  "disorder",
  "method",
  "philosophy",
];

const STAIN_OF: Record<GlossaryTerm["category"], string> = {
  anatomy: "text-gfp",
  chemistry: "text-golgi",
  function: "text-melanin",
  network: "text-vessel",
  disorder: "text-vessel",
  method: "text-gfp",
  philosophy: "text-melanin",
};

export default function GlossaryIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<GlossaryTerm["category"] | "all">("all");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GLOSSARY.filter((t) => {
      if (cat !== "all" && t.category !== cat) return false;
      if (!needle) return true;
      return (
        t.term.toLowerCase().includes(needle) ||
        t.definition.toLowerCase().includes(needle)
      );
    }).sort((x, y) => x.term.localeCompare(y.term));
  }, [q, cat]);

  const grouped = useMemo(() => {
    const m = new Map<string, GlossaryTerm[]>();
    for (const t of results) {
      const k = t.term[0].toUpperCase();
      m.set(k, [...(m.get(k) ?? []), t]);
    }
    return [...m.entries()];
  }, [results]);

  const letters = useMemo(() => {
    const set = new Set(GLOSSARY.map((t) => t.term[0].toUpperCase()));
    return [...set].sort();
  }, []);

  return (
    <div>
      <div className="sticky top-24 z-20 -mx-5 mb-10 bg-ink/85 px-5 py-4 backdrop-blur-sm md:-mx-10 md:px-10">
        <label htmlFor="glossary-q" className="sr-only">
          Search the glossary
        </label>
        <input
          id="glossary-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms and definitions…"
          className="w-full rounded-full border border-hair bg-panel px-5 py-3 text-sm text-bone outline-none transition-colors duration-300 placeholder:text-dim focus:border-gfp"
        />
        <div className="mt-3 flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full px-3 py-1 text-[11px] capitalize transition-all duration-500 ease-fluid ${
                cat === c ? "bg-bone text-ink" : "text-mute ring-1 ring-white/10 hover:text-bone"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-8 text-[12px] text-dim" aria-live="polite">
        {results.length} {results.length === 1 ? "term" : "terms"}
        {q ? ` matching “${q}”` : ""}
        {cat !== "all" ? ` in ${cat}` : ""}
      </p>

      {results.length === 0 ? (
        <div className="rounded-[1.75rem] bg-panel p-10 text-center ring-1 ring-white/[0.06]">
          <p className="text-[1.2rem] text-bone">Nothing matches that</p>
          <p className="mt-3 text-sm text-dim">
            Try a broader term, or clear the category filter.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {grouped.map(([letter, terms]) => (
            <section key={letter} id={letter}>
              <h2 className="mb-4 font-display text-[2rem] leading-none text-bone">{letter}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {terms.map((t) => (
                  <article
                    key={t.id}
                    className="rounded-[1.25rem] bg-panel p-5 ring-1 ring-white/[0.06] transition-colors duration-500 hover:bg-raised"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className={`text-[1.1rem] leading-tight ${STAIN_OF[t.category]}`}>
                        {t.term}
                      </h3>
                      <span className="shrink-0 text-[10px] tracking-[0.16em] text-dim uppercase">
                        {t.category}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[0.93rem] leading-relaxed text-mute">
                      {t.definition}
                    </p>
                    <div className="mt-3.5 flex flex-wrap items-center gap-2">
                      {t.see?.map((href) => (
                        <Link
                          key={href}
                          href={href}
                          className="rounded-full px-2.5 py-1 text-[10px] tracking-[0.14em] text-dim uppercase ring-1 ring-white/[0.08] transition-colors duration-300 hover:text-bone"
                        >
                          {href.replace("/", "")}
                        </Link>
                      ))}
                      {t.related?.length ? (
                        <span className="text-[11px] text-dim">
                          ↳{" "}
                          {t.related
                            .map((r) => GLOSSARY.find((x) => x.id === r)?.term ?? r)
                            .join(", ")}
                        </span>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-hair pt-6">
        <span className="eyebrow mr-2">Jump to</span>
        {letters.map((l) => (
          <a
            key={l}
            href={`#${l}`}
            className="text-[11px] tracking-[0.16em] text-dim uppercase transition-colors duration-300 hover:text-bone"
          >
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}