import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { Pin, Plate, Tag } from "@/components/ui";
import { COMPARISONS } from "@/data/questions";
import { STAIN } from "@/lib/stain";

export const metadata: Metadata = {
  title: "Mirror",
  description:
    "Twelve axes of comparison between a human brain and a 2026 frontier AI system — with the evidence rather than the analogy, including the axis where silicon has already caught up.",
};

export default function MirrorPage() {
  return (
    <>
      <PageHeader
        over="Register five · The other kind of brain"
        s="gfp"
        title={
          <>
            Same argument,
            <br />
            <span className="italic text-gfp">different substrate</span>
          </>
        }
        lede="The comparison is usually made with a neuron equated to a parameter and a synapse to a weight, and it is close to useless in that form. The twelve axes below use the measurements instead — joules, spikes, replay, forgetting — because the interesting disagreements are not about analogy. They are about which properties each system happens to have, and it turns out those sets barely overlap."
        aside={
          <dl className="grid grid-cols-2 gap-x-8 gap-y-5">
            {[
              ["12", "axes"],
              ["2026", "models current"],
              ["2", "of them settled"],
              ["1", "not settled"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-[2rem] leading-none text-bone">{n}</dt>
                <dd className="mt-1.5 text-[11px] leading-tight text-dim">{l}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {/* The crossover, stated once, prominently — it is the single
              most surprising fact on the page. */}
          <div data-reveal className="rounded-[1.75rem] bg-panel p-8 ring-1 ring-white/[0.06] md:p-12">
            <Tag s="gfp">The finding</Tag>
            <h2 className="mt-6 max-w-4xl text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.05] text-bone">
              Hardware efficiency already crossed over, and nobody noticed,
              because it was the least economically interesting of the
              three comparisons
            </h2>
            <p className="prose-measure-wide mt-7 text-[1.0625rem] leading-relaxed text-mute">
              The brain runs on roughly twenty watts at a hundred
              quadrillion synaptic events per second. A frontier model at
              about one joule per output token, generating at the pace of
              human speech — five tokens a second — draws about five watts.
              Raw operations per joule are now within a factor of a few,
              and on some accounting silicon is ahead.
            </p>
            <p className="prose-measure-wide mt-5 text-[1.0625rem] leading-relaxed text-mute">
              The brain remains ahead on the only measure that matters
              for usefulness: energy per unit of delivered cognition. Zheng
              and Meister put conscious human throughput near ten bits per
              second. A frontier agentic session burns one to twenty
              million tokens for a day's work — thirty to seven hundred
              watts of effective thinking against twenty.
            </p>
            <p className="prose-measure-wide mt-5 text-[1.0625rem] leading-relaxed text-mute">
              Beating the brain on hardware is not the same as beating it
              on outcomes, and the difference between those two sentences
              is where most of the argument about this topic actually is.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Axis by axis"
              title="Twelve comparisons, and where the evidence actually lands"
              s="gfp"
              lede="Each row gives the measurement for both substrates and then says which way the current evidence cuts — including where the honest answer is that nobody knows, and where the popular comparison is simply invalid."
            />
          </div>

          <div className="mt-14 space-y-3">
            {COMPARISONS.map((c, i) => (
              <article
                key={c.id}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(i, 6) * 55}ms` } as React.CSSProperties}
                className="rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised md:p-8"
              >
                <div className="flex items-baseline gap-4 border-b border-hair pb-5">
                  <span className={`font-display text-lg ${STAIN[c.stain].text}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.6rem] leading-tight text-bone">{c.axis}</h3>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
                  <div className={`border-l-2 pl-5 ${STAIN[c.stain].line}`}>
                    <p className="eyebrow mb-2.5 text-bone">Biological brain</p>
                    <p className="text-[0.95rem] leading-relaxed text-mute">{c.brain}</p>
                  </div>
                  <div className="border-l-2 border-hair-lit pl-5">
                    <p className="eyebrow mb-2.5">Artificial system</p>
                    <p className="text-[0.95rem] leading-relaxed text-mute">{c.machine}</p>
                  </div>
                </div>

                <p className="mt-6 flex gap-3 border-t border-hair pt-5 text-[0.95rem] leading-relaxed text-bone/85">
                  <Pin s={c.stain} />
                  {c.verdict}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal className="max-w-3xl">
            <div className={`mb-5 h-px w-14 ${STAIN.vessel.bg}`} />
            <p className="eyebrow mb-4">The part that is not a comparison</p>
            <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] text-bone">
              The trajectory matters more than the ratio
            </h2>
            <p className="prose-measure mt-6 text-[1.0625rem] leading-relaxed text-mute">
              A twenty-watt brain is not a growth curve. Human
              populations are flat. Data centres are not: power demand for
              frontier training has more than doubled annually, the
              largest single runs now exceed a hundred megawatts, and
              projections put the biggest of them between four and sixteen
              gigawatts by 2030 — enough to power millions of homes.
            </p>
            <p className="prose-measure mt-5 text-[1.0625rem] leading-relaxed text-mute">
              Against that, per-query energy estimates have been revised
              downward by a factor of four to twenty once batching and
              concurrency are accounted for properly, and the realistic
              line of sight on further improvement is another eight to
              twenty times. Both of these are true, and the net of them
              is a system that is getting a great deal more capable and
              the grid is finding out.
            </p>
          </div>

          <div
            className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-hair ring-1 ring-white/[0.06] sm:grid-cols-2 lg:grid-cols-4"
            data-reveal
          >
            {[
              ["~20 W", "the entire brain, at rest"],
              ["0.31 Wh", "median energy, one frontier query"],
              ["3.91 Wh", "the same query at 5,000 reasoning tokens"],
              ["4–16 GW", "projected power for the largest 2030 training run"],
            ].map(([n, l]) => (
              <div key={l} className="bg-panel p-6">
                <p className="font-display text-[1.9rem] leading-none text-bone">{n}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-dim">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
