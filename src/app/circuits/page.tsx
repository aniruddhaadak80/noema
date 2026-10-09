import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { Pin, Plate, Tag } from "@/components/ui";
import {
  CONSCIOUSNESS_THEORIES,
  MOLECULES,
  NETWORKS,
  NUCLEI,
  SLEEP_STAGES,
} from "@/data/circuits";
import { STAIN } from "@/lib/stain";

export const metadata: Metadata = {
  title: "Circuits",
  description:
    "Twelve neurotransmitters and what happens when there is too much or too little. The six neuromodulatory nuclei. Seven large-scale brain networks. A full night of sleep, and the five theories of consciousness that disagree about what any of it is for.",
};

export default function CircuitsPage() {
  return (
    <>
      <PageHeader
        over="Register two · Chemistry and organisation"
        s="golgi"
        title={
          <>
            The chemistry,
            <br />
            <span className="italic text-golgi">then the shape</span>
          </>
        }
        lede="Two molecules carry almost every message in the brain: one that excites, one that inhibits. Everything else on this page exists to adjust the gain, set the timing, and decide what gets through. Below that sits a second layer — the handful of nuclei that project everywhere and modulate everything, and the seven networks they organise the cortex into."
        aside={
          <dl className="grid grid-cols-2 gap-x-8 gap-y-5">
            {[
              ["12", "transmitters"],
              ["6", "diffuse nuclei"],
              ["7", "networks"],
              ["4", "sleep stages"],
              ["5", "consciousness theories"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-[2rem] leading-none text-bone">{n}</dt>
                <dd className="mt-1.5 text-[11px] leading-tight text-dim">{l}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* ── Molecules ─────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Transmitters"
              title="Twelve chemicals, and what too much or too little does"
              s="golgi"
              lede="Glutamate and GABA do the work. The monoamines and peptides set the conditions under which the work happens — which is why a drug that changes one of them changes mood, appetite, arousal and pain at once."
            />
          </div>

          <div className="mt-16 space-y-3">
            {MOLECULES.map((m, i) => (
              <article
                key={m.id}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(i, 6) * 55}ms` } as React.CSSProperties}
                className="group grid gap-6 rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised md:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] md:gap-10 md:p-8"
              >
                <div>
                  <h3 className={`text-[1.7rem] leading-none ${STAIN[m.stain].text}`}>
                    {m.name}
                  </h3>
                  <p className="mt-2.5 text-[11px] tracking-[0.12em] text-dim uppercase">
                    {m.cls}
                  </p>
                  <dl className="mt-6 space-y-2.5 text-[13px]">
                    {[
                      ["Precursor", m.precursor],
                      ["Receptors", m.receptors],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-dim">{k}</dt>
                        <dd className="text-mute">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="space-y-5">
                  <p className="text-[0.95rem] leading-relaxed text-bone/90">{m.role}</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="border-l border-hair pl-4">
                      <p className={`eyebrow mb-1.5 ${STAIN[m.stain].text}`}>Excess</p>
                      <p className="text-[13px] leading-relaxed text-mute">{m.excess}</p>
                    </div>
                    <div className="border-l border-hair pl-4">
                      <p className={`eyebrow mb-1.5 ${STAIN[m.stain].text}`}>Deficit</p>
                      <p className="text-[13px] leading-relaxed text-mute">{m.deficit}</p>
                    </div>
                  </div>
                  <p className="flex gap-3 border-t border-hair pt-4 text-[13px] leading-relaxed text-dim">
                    <Pin s={m.stain} />
                    {m.agent}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nuclei ────────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Neuromodulatory nuclei"
              title="Six small clusters that project everywhere"
              s="gfp"
              lede="These are not pathways but sources: small nuclei whose axons scatter across the entire brain and set state rather than transmit events. Between them they account for a large share of how the cortex is regulated, and every one of them has a disease, a drug, or both attached to it."
            />
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-hair ring-1 ring-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
            {NUCLEI.map((n, i) => (
              <div
                key={n.id}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}
                className="bg-panel p-6 transition-colors duration-700 ease-fluid hover:bg-raised"
              >
                <h3 className="text-lg leading-tight text-bone">{n.name}</h3>
                <p className="mt-2 text-[11px] tracking-[0.12em] text-golgi uppercase">
                  {n.transmitter}
                </p>
                <p className="mt-4 text-[13px] leading-relaxed text-mute">{n.signature}</p>
                <dl className="mt-5 space-y-1.5 border-t border-hair pt-4 text-[12px] text-dim">
                  <div>
                    <dt className="inline">Where: </dt>
                    <dd className="inline text-mute">{n.location}</dd>
                  </div>
                  <div>
                    <dt className="inline">Reach: </dt>
                    <dd className="inline text-mute">{n.reach}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Networks ──────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Large-scale organisation"
              title="Seven networks, found by subtracting one task from another"
              s="melanin"
              lede="The default mode network was discovered by accident, in 2001, when a subtraction method revealed activity that increased when the brain was given nothing to do. Everything since has been a finer partition of the same trick — and the partitions are still being argued over."
            />
          </div>

          <div className="mt-14 space-y-3">
            {NETWORKS.map((n, i) => (
              <details
                key={n.id}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(i, 5) * 50}ms` } as React.CSSProperties}
                className="group rounded-[1.5rem] bg-panel ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid open:bg-raised"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5">
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full text-[11px] ${STAIN[n.stain].soft} ${STAIN[n.stain].text}`}
                  >
                    {n.abbreviation}
                  </span>
                  <span className="flex-1 text-[1.15rem] leading-tight text-bone">{n.name}</span>
                  <span className="shrink-0 text-dim transition-transform duration-500 ease-fluid group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="grid gap-6 border-t border-hair px-6 py-6 sm:grid-cols-2">
                  <div>
                    <p className={`eyebrow mb-2 ${STAIN[n.stain].text}`}>Active when</p>
                    <p className="text-sm leading-relaxed text-mute">{n.active}</p>
                    <p className={`eyebrow mt-5 mb-2 ${STAIN[n.stain].text}`}>Quiet when</p>
                    <p className="text-sm leading-relaxed text-mute">{n.inactive}</p>
                  </div>
                  <div>
                    <p className={`eyebrow mb-2 ${STAIN[n.stain].text}`}>Hubs</p>
                    <ul className="space-y-1.5">
                      {n.hubs.map((h) => (
                        <li key={h} className="flex gap-3 text-sm text-mute">
                          <Pin s={n.stain} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sm:col-span-2 border-t border-hair pt-5">
                    <p className="text-sm leading-relaxed text-mute">{n.function}</p>
                    <p className="mt-3 text-[12px] text-dim">Source: {n.found}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sleep ─────────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="One night"
              title="Eight hours in four states, ninety times over"
              s="vessel"
              lede="A typical night is four to six complete cycles of roughly ninety minutes. The proportions below are for a young adult and they shift with age — deep sleep falls first, which is one of the better-documented changes of ageing and one of the least discussed."
            />
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-hair ring-1 ring-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {SLEEP_STAGES.map((s, i) => (
              <div
                key={s.id}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="bg-panel p-6 transition-colors duration-700 ease-fluid hover:bg-raised"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg leading-tight text-bone">{s.label}</h3>
                  <span className={`font-display text-xl ${STAIN[s.stain].text}`}>
                    {s.share}
                  </span>
                </div>
                <p className="mt-5 text-[13px] leading-relaxed text-mute">{s.signature}</p>
                <p className="mt-4 border-t border-hair pt-4 text-[13px] leading-relaxed text-dim">
                  {s.does}
                </p>
              </div>
            ))}
          </div>

          <p
            data-reveal
            className="mt-8 max-w-3xl border-l border-hair pl-5 text-[13px] leading-relaxed text-dim"
          >
            The two-process model holds that sleep pressure is driven by
            adenosine accumulating through waking hours, and that
            circadian rhythm — carried by the suprachiasmatic nucleus —
            gates when that pressure can be discharged. Caffeine works by
            occupying adenosine receptors without activating them, which
            is why the pressure is still there when it wears off.
          </p>
        </div>
      </section>

      {/* ── Consciousness ─────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="The disputed part"
              title="Five theories that disagree about what any of this is for"
              s="vessel"
              lede="None of these is settled. They are not equivalent — one is far more experimentally productive than the others — and the argument between them is the live edge of the field. Each is stated here with what it actually stakes."
            />
          </div>

          <div className="mt-14 grid gap-3 lg:grid-cols-2">
            {CONSCIOUSNESS_THEORIES.map((t, i) => (
              <article
                key={t.id}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 70}ms` } as React.CSSProperties}
                className="rounded-[1.75rem] bg-panel p-7 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[1.5rem] leading-tight text-bone">{t.name}</h3>
                    <p className="mt-2 text-[13px] text-dim">
                      {t.holder} · {t.year}
                    </p>
                  </div>
                  <Tag s={t.stain}>{t.id}</Tag>
                </div>
                <p className="mt-6 text-[0.95rem] leading-relaxed text-bone/90">{t.claim}</p>
                <p className="mt-5 border-l border-hair pl-4 text-[13px] leading-relaxed text-mute">
                  {t.stake}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
