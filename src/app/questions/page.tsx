import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { Pin, Plate, Tag } from "@/components/ui";
import { POSITIONS, THOUGHT_EXPERIMENTS } from "@/data/questions";
import { STAIN } from "@/lib/stain";
import type { Position } from "@/lib/types";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Twenty-four positions on the mind–body problem, consciousness, free will, personal identity and embodied cognition. Each stated with what it claims and what it costs to hold.",
};

const FAMILIES: { id: Position["family"]; label: string; note: string; s: keyof typeof STAIN }[] = [
  {
    id: "mind-body",
    label: "Mind and body",
    note: "How a non-material mind could be a material brain, and why every answer makes this harder.",
    s: "vessel",
  },
  {
    id: "consciousness",
    label: "Consciousness",
    note: "What is left over once the physical account is complete, and whether that remainder is a subject worth explaining.",
    s: "melanin",
  },
  {
    id: "agency",
    label: "Free will",
    note: "Whether responsibility survives a settled past, and what follows if it does not.",
    s: "gfp",
  },
  {
    id: "identity",
    label: "Personal identity",
    note: "What makes the person you are now the same one as ten years ago, and whether that is the right question.",
    s: "golgi",
  },
  {
    id: "embodied",
    label: "Where thinking happens",
    note: "Whether the skull is the boundary of a mind at all, and what changes if it is not.",
    s: "gfp",
  },
];

export default function QuestionsPage() {
  return (
    <>
      <PageHeader
        over="Register four · Philosophy"
        s="vessel"
        title={
          <>
            The questions the
            <br />
            <span className="italic text-vessel">neuroscience does not settle</span>
          </>
        }
        lede="Everything so far has been an explanation of mechanism. None of it explains why there is something it is like to run the mechanism — and that gap is not a temporary one. It might be an artefact of asking the wrong question. It might be the whole question. The positions below are the live options, each with the claim and the bill."
        stats={[
          ["24", "positions"],
          ["5", "thought experiments"],
          ["2,600", "years of argument"],
          ["0", "consensus"],
          ["5", "families of view"],
          ["1", "hard problem"],
        ]}
        note="The positions are grouped by what they are about, not by who held them or when. Order within each family runs from the most committal to the least."
        chips={[
          "Mind and body",
          "Consciousness",
          "Free will",
          "Personal identity",
          "Where thinking happens",
        ]}
      />

      {FAMILIES.map((fam) => {
        const items = POSITIONS.filter((p) => p.family === fam.id);
        return (
          <section key={fam.id} className="px-5 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-6xl">
              <div data-reveal className="max-w-3xl">
                <div className={`mb-5 h-px w-14 ${STAIN[fam.s].bg}`} />
                <div className="flex items-center gap-3">
                  <h2 className="text-[clamp(1.9rem,4.5vw,2.9rem)] leading-tight text-bone">
                    {fam.label}
                  </h2>
                  <Tag s={fam.s}>{items.length}</Tag>
                </div>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-mute">{fam.note}</p>
              </div>

              <div className="mt-12 space-y-3">
                {items.map((p, i) => (
                  <article
                    key={p.id}
                    data-reveal
                    style={{ "--reveal-delay": `${Math.min(i, 5) * 55}ms` } as React.CSSProperties}
                    className="group grid gap-6 rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] md:gap-10 md:p-8"
                  >
                    <div>
                      <h3 className={`text-[1.5rem] leading-tight ${STAIN[p.stain].text}`}>
                        {p.name}
                      </h3>
                      <p className="mt-2 text-[13px] text-dim">
                        {p.thinker === "—" ? "The problem itself" : p.thinker} · {p.era}
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.95rem] leading-relaxed text-bone/90">{p.claim}</p>
                      <p className="mt-5 flex gap-3 border-t border-hair pt-4 text-[13px] leading-relaxed text-mute">
                        <Pin s={p.stain} />
                        {p.price}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Thought experiments ───────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="The apparatus"
              title="Five thought experiments that still move people"
              s="golgi"
              lede="Good thought experiments do not prove anything. They expose which of your commitments is doing the work. Each one below is followed by what it is supposed to reveal, and by why a fair number of philosophers think it reveals nothing at all."
            />
          </div>

          <div className="mt-14 space-y-3">
            {THOUGHT_EXPERIMENTS.map((t, i) => (
              <article
                key={t.id}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(i, 4) * 60}ms` } as React.CSSProperties}
                className="rounded-[1.75rem] bg-panel p-7 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised md:p-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className={`font-display text-lg ${STAIN[t.stain].text}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.6rem] leading-tight text-bone">{t.name}</h3>
                </div>
                <p className="prose-measure-wide mt-5 text-[0.95rem] leading-relaxed text-bone/90">
                  {t.scenario}
                </p>
                <div className="mt-6 grid gap-5 border-t border-hair pt-5 md:grid-cols-2">
                  <div className={`border-l-2 pl-4 ${STAIN[t.stain].line}`}>
                    <p className={`eyebrow mb-2 ${STAIN[t.stain].text}`}>What it pulls on</p>
                    <p className="text-[13px] leading-relaxed text-mute">{t.pulls}</p>
                  </div>
                  <div className="border-l-2 border-hair pl-4">
                    <p className="eyebrow mb-2 text-dim">What it reveals</p>
                    <p className="text-[13px] leading-relaxed text-mute">{t.reveals}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16" data-reveal>
            <div className="rounded-[1.75rem] bg-panel p-8 ring-1 ring-white/[0.06] md:p-10">
              <Tag s="vessel">The honest summary</Tag>
              <p className="prose-measure-wide mt-6 text-[1.0625rem] leading-relaxed text-mute">
                There is no position on this list that the neuroscience
                has ruled out and no position it has established. That is
                usually presented as a failure, and it is closer to the
                opposite: the brain has turned out to be a far more
                ordinary object than the mind–body problem required. It is
                wet, slow, full of historical accident, and largely built
                from six chemicals.
              </p>
              <p className="prose-measure-wide mt-5 text-[1.0625rem] leading-relaxed text-mute">
                Which leaves the residual with nothing to appeal to. The
                questions were not dissolved by the data. They were made
                sharper, and considerably harder to answer with a gesture
                in the direction of a diagram.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
