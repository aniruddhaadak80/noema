import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import GlossaryIndex from "@/components/glossary-index";
import { GLOSSARY } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Plain-language definitions of the terms used across Noema.",
};

export default function GlossaryPage() {
  const letters = new Set(GLOSSARY.map((t) => t.term[0].toUpperCase()));

  return (
    <main>
      <PageHeader
        over="reference"
        title="Glossary"
        lede="Plain-language definitions of the terms used across the atlas, circuits, mind, and philosophy sections — with the honest limits of each one."
        note="Definitions are condensed textbook summaries. Every term is debated; the pages each one links to go deeper."
        stats={[
          [String(GLOSSARY.length), "terms"],
          [String(letters.size), "letters"],
          ["7", "categories"],
          ["searchable", "definitions included"],
        ]}
        chips={["reference", "definitions", "anatomy"]}
        s="melanin"
      />

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-5xl">
          <GlossaryIndex />
        </div>
      </section>
    </main>
  );
}