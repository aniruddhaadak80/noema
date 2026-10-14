import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import DigitSpan from "@/components/digit-span";
import Stroop from "@/components/stroop";
import ReceptiveField from "@/components/receptive-field";
import { Pin, Plate, Tag } from "@/components/ui";
import { BIASES, CONCEPTS, EXPERIMENTS, FORGETTING, MEMORY } from "@/data/mind";
import { STAIN } from "@/lib/stain";

export const metadata: Metadata = {
  title: "Mind",
  description:
    "Five memory systems with different substrates and half-lives. Twelve cognitive biases, each with its mechanism and its cost. Fourteen landmark experiments, including the two most famous, which are both considerably less solid than their reputations.",
};

export default function MindPage() {
  return (
    <>
      <PageHeader
        over="Register three · Behaviour"
        s="melanin"
        title={
          <>
            What the machinery
            <br />
            <span className="italic text-melanin">actually does</span>
          </>
        }
        lede="Everything on this page is a description of a mechanism that was not designed, does not have a specification, and was assembled by selection rather than engineering. That is worth holding onto while reading: the heuristics here are not bugs in a design. They are what a system optimised for a different environment looks like from the inside."
        stats={[
          ["5", "memory systems"],
          ["12", "biases"],
          ["14", "experiments"],
          ["4", "forgetting effects"],
          ["5", "working definitions"],
          ["2", "studies on life support"],
        ]}
        note="The two most famous experiments in the field are both considerably less solid than their reputations. Both are on this page with what happened to them since."
        chips={[
          "Anterograde amnesia",
          "Reconsolidation",
          "Gain modulation",
          "Prediction error",
        ]}
      />

      {/* ── Memory ────────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Memory"
              title="Not one system, and the differences are the interesting part"
              s="gfp"
              lede="H.M. could not form a new episodic memory and could still learn a new motor skill. That single dissociation is most of what we know about how memory is organised, and it took a lobotomy to produce it."
            />
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {MEMORY.map((m, i) => (
              <article
                key={m.id}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}
                className="rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised"
              >
                <h3 className={`text-[1.4rem] leading-tight ${STAIN[m.stain].text}`}>
                  {m.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/90">{m.holds}</p>
                <dl className="mt-5 space-y-3 border-t border-hair pt-4 text-[13px]">
                  <div>
                    <dt className="text-dim">Lasts</dt>
                    <dd className="text-mute">{m.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-dim">Substrate</dt>
                    <dd className="leading-relaxed text-mute">{m.substrate}</dd>
                  </div>
                </dl>
                <p className="mt-4 flex gap-3 text-[13px] leading-relaxed text-dim">
                  <Pin s={m.stain} />
                  {m.signature}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16" data-reveal>
            <h3 className="text-[1.6rem] leading-tight text-bone">
              Four effects that survive replication
            </h3>
            <div className="mt-8 grid gap-px overflow-hidden rounded-[1.75rem] bg-hair ring-1 ring-white/[0.06] sm:grid-cols-2">
              {FORGETTING.map((f) => (
                <div key={f.name} className="bg-panel p-6">
                  <div className="flex items-center gap-3">
                    <span className={`size-1.5 rotate-45 ${STAIN[f.stain].bg}`} aria-hidden />
                    <p className="text-[0.95rem] text-bone">{f.name}</p>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-mute">{f.finding}</p>
                  <p className="mt-3 text-[12px] leading-relaxed text-dim">{f.caveat}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16" data-reveal>
            <h3 className="text-[1.6rem] leading-tight text-bone">
              Run the 1956 experiment on yourself
            </h3>
            <p className="prose-measure mt-4 text-[0.95rem] leading-relaxed text-mute">
              The capacity numbers at the top of this page came from tasks
              like this one. Three minutes, no account, best score kept on
              this device.
            </p>
            <div className="mt-8">
              <DigitSpan />
            </div>
          </div>
        </div>
      </section>

      {/* ── Biases ────────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Systematic error"
              title="Twelve biases, each with the mechanism and the cost"
              s="gfp"
              lede="A bias is not a mistake the brain makes. It is a fast approximation that pays for itself most of the time. The entries below give the mechanism, what the shortcut bought, and what it charges — because a bias without its payoff is just a complaint."
            />
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-2">
            {BIASES.map((b, i) => (
              <article
                key={b.id}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 60}ms` } as React.CSSProperties}
                className="group rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[1.4rem] leading-tight text-bone">{b.name}</h3>
                    {b.aka?.length ? (
                      <p className="mt-1.5 text-[12px] text-dim">{b.aka.join(" · ")}</p>
                    ) : null}
                  </div>
                  {b.study ? (
                    <span className="shrink-0 text-[11px] text-dim">{b.study}</span>
                  ) : null}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-bone/90">{b.mechanism}</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="border-l border-gfp/30 pl-4">
                    <p className="eyebrow mb-1.5 text-gfp">Why it exists</p>
                    <p className="text-[13px] leading-relaxed text-mute">{b.payoff}</p>
                  </div>
                  <div className="border-l border-vessel/30 pl-4">
                    <p className="eyebrow mb-1.5 text-vessel">What it costs</p>
                    <p className="text-[13px] leading-relaxed text-mute">{b.cost}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16" data-reveal>
            <h3 className="text-[1.6rem] leading-tight text-bone">
              Feel one working on you
            </h3>
            <p className="prose-measure mt-4 text-[0.95rem] leading-relaxed text-mute">
              Reading about interference is not the same as paying for it.
              Twenty-four trials, reaction times measured to the
              millisecond, and a number at the end that is yours.
            </p>
            <div className="mt-8">
              <Stroop />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <h3 className="text-[1.6rem] leading-tight text-bone">Orientation tuning</h3>
            <p className="prose-measure mt-4 text-[0.95rem] leading-relaxed text-mute">
              Hubel &amp; Wiesel (1962): V1 neurons fire most for an oriented bar of the right width and position. Build the receptive field below.
            </p>
            <div className="mt-8">
              <ReceptiveField />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="The canon"
              title="Fourteen studies, with what happened to them since"
              s="vessel"
              lede="Almost every famous experiment in psychology is a story about a small, clever thing done carefully in a specific room. The findings below are grouped with the criticisms, because the criticisms are usually the more useful half."
            />
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-2">
            {EXPERIMENTS.map((e, i) => (
              <article
                key={e.id}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 60}ms` } as React.CSSProperties}
                className="rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised md:p-7"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[1.4rem] leading-tight text-bone">{e.name}</h3>
                  <span className="shrink-0 font-display text-lg text-dim">{e.year}</span>
                </div>
                <p className="mt-1.5 text-[12px] text-dim">{e.by}</p>

                <p className="mt-5 text-[13px] leading-relaxed text-mute">
                  <span className="text-dim">Did: </span>
                  {e.did}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-bone/90">
                  <span className="text-dim">Found: </span>
                  {e.found}
                </p>

                <div className="mt-5 border-t border-hair pt-4">
                  <p className={`eyebrow mb-2 ${STAIN[e.stain].text}`}>Since then</p>
                  <p className="text-[13px] leading-relaxed text-mute">{e.caveat}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Concepts ──────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Working definitions"
              title="Five words that get used as if they were settled"
              s="melanin"
              lede="Each of these has a defensible meaning, a popular meaning, and a gap between them. The third column is where the argument usually is."
            />
          </div>

          <div className="mt-14 space-y-3">
            {CONCEPTS.map((c, i) => (
              <div
                key={c.id}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(i, 4) * 55}ms` } as React.CSSProperties}
                className="grid gap-6 rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:p-8"
              >
                <h3 className={`text-[1.6rem] leading-none ${STAIN[c.stain].text}`}>
                  {c.term}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-bone/90">{c.body}</p>
                <p className="border-l border-hair pl-5 text-[13px] leading-relaxed text-mute">
                  {c.not}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16" data-reveal>
            <div className="rounded-[1.75rem] bg-panel p-8 ring-1 ring-white/[0.06]">
              <Tag s="vessel">The pattern</Tag>
              <p className="prose-measure-wide mt-5 text-[1.0625rem] leading-relaxed text-mute">
                Look across all three registers — anatomy, chemistry,
                behaviour — and the same shape appears. Every level
                explains the one below it well, hands the level above a
                problem it cannot solve, and then gets reinterpreted by
                it in return. The cortex is not explained by the
                neurotransmitter; it is the thing the neurotransmitter is
                <em> for</em>. The bias is not explained by the synapse;
                it is what the synapse buys when the synapse is fast.
              </p>
              <p className="prose-measure-wide mt-5 text-[1.0625rem] leading-relaxed text-mute">
                Which is the honest reason the next section exists. The
                questions that remain are not harder because the data is
                thinner. They are hard because a complete description of
                the mechanism, even if we had one, would not settle them.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
