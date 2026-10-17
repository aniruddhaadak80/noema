import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { GLOSSARY, glossaryByLetter } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Plain-language definitions of the terms used across Noema.",
};

export default function GlossaryPage() {
  const letters = glossaryByLetter();

  return (
    <main>
      <PageHeader
        over="reference"
        title="Glossary"
        lede="Plain-language definitions of the terms used across the atlas, circuits, mind, and philosophy sections — with the honest limits of each one."
        note="Definitions are condensed textbook summaries. Every term is debated; the references under each section go deeper."
        stats={[
          [String(GLOSSARY.length), "terms"],
          [String(letters.size), "letters"],
          ["anatomy", "chemistry"],
          ["network", "philosophy"],
        ]}
        chips={["reference", "definitions", "anatomy"]}
        s="melanin"
      />

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-wrap items-center gap-2">
            {[...letters.keys()].map((k) => (
              <a
                key={k}
                href={`#${k}`}
                className="text-[11px] tracking-[0.16em] uppercase text-dim hover:text-bone transition-colors duration-300"
              >
                {k}
              </a>
            ))}
          </div>

          <div className="grid gap-4">
            {[...letters.entries()].map(([letter, terms]) => (
              <section
                key={letter}
                id={letter}
                className="space-y-2.5 border-b border-hair pb-6 last:border-none last:pb-0"
              >
                <h2
                  className="text-[1.1rem] tracking-[0.16em] uppercase text-dim"
                >
                  {letter}
                </h2>
                <div className="space-y-3">
                  {terms.map((t) => (
                    <article
                      key={t.id}
                      className="rounded-[1.25rem] bg-panel p-5 ring-1 ring-white/[0.06]"
                    >
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-[1.1rem] leading-tight text-bone">
                          {t.term}
                        </h3>
                        <span
                          className={`shrink-0 text-[10px] tracking-[0.16em] text-dim uppercase ring-1 ring-white/[0.05] rounded-full px-2 py-0.5`}
                        >
                          {t.category}
                        </span>
                      </div>
                      <p className="mt-2 text-[0.98rem] leading-relaxed text-mute">
                        {t.definition}
                      </p>
                      {t.related?.length && (
                        <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                          {t.related.map((r) => {
                            const term = GLOSSARY.find((x) => x.id === r);
                            return (
                              <span
                                key={r}
                                className="text-gfp hover:text-bone transition-colors duration-300 cursor-pointer"
                              >
                                → {term?.term ?? r}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
