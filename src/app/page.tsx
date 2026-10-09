import Link from "next/link";
import NeuralField from "@/components/neural-field";
import { NUMBERS, SECTIONS } from "@/data/index";
import { LOBES } from "@/data/regions";
import { Action, Plate, Tag } from "@/components/ui";
import { STAIN } from "@/lib/stain";

export default function Home() {
  return (
    <>
      {/* ── Hero. Typography left, live field right. ───────────── */}
      <section className="relative overflow-hidden px-5 pt-36 pb-24 md:px-10 md:pt-48 md:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <NeuralField />
        </div>
        {/* Wipe the field out toward the type so the two halves read as
            separate registers rather than one busy picture. */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/25 md:via-ink/70"
          aria-hidden
        />

        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.08fr_1fr]">
          <div>
            <div
              className="flex items-center gap-3"
              style={{ animation: "noema-rise 700ms var(--ease-fluid) 60ms both" }}
            >
              <span className="h-px w-10 bg-gfp" aria-hidden />
              <p className="eyebrow">Neuroscience · Psychology · Philosophy</p>
            </div>

            <h1
              className="mt-8 text-[clamp(3.1rem,10.5vw,7.25rem)] leading-[0.86] text-bone"
              style={{ animation: "noema-rise 900ms var(--ease-fluid) 140ms both" }}
            >
              An atlas
              <br />
              <span className="italic text-melanin">of the mind</span>
            </h1>

            <p
              className="prose-measure mt-9 text-[1.0625rem] leading-relaxed text-mute sm:text-lg"
              style={{ animation: "noema-rise 900ms var(--ease-fluid) 260ms both" }}
            >
              Eighty-six billion neurons is the number everyone quotes. It
              is also four brains, with a confidence interval nobody
              published the data for. This atlas starts from what is
              actually known — the disputed figures included — and follows
              the thread out from the axon through the cortex, into
              memory and bias, on to the hard problem, and finally to the
              machines now running the same argument in silicon.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-3"
              style={{ animation: "noema-rise 900ms var(--ease-fluid) 360ms both" }}
            >
              <Action href="/atlas" s="gfp">
                Open the atlas
              </Action>
              <Action href="/questions" s="vessel">
                Start with the hard problem
              </Action>
            </div>

            <dl
              className="mt-14 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-[1.25rem] bg-hair ring-1 ring-white/[0.06]"
              style={{ animation: "noema-rise 900ms var(--ease-fluid) 460ms both" }}
            >
              {[
                ["31", "regions"],
                ["12", "transmitters"],
                ["24", "positions"],
                ["14", "experiments"],
                ["12", "comparisons"],
                ["1", "honest answer"],
              ].map(([n, l]) => (
                <div key={l} className="bg-panel px-4 py-4">
                  <dt className="font-display text-2xl leading-none text-bone">{n}</dt>
                  <dd className="mt-1.5 text-[11px] leading-tight text-dim">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right column is intentionally quiet on desktop — the field
              is the image, so nothing competes with it. */}
          <div className="hidden lg:block">
            <div className="ml-auto w-full max-w-xs border-l border-hair pl-6">
              <p className="eyebrow">The plate</p>
              <p className="mt-4 text-sm leading-relaxed text-mute">
                Thirty-one regions, drawn as stains on a single lateral
                section. Hover to read; the shape is clipped to the
                silhouette so the diagram stays honest.
              </p>
              <Link
                href="/atlas"
                className="mt-5 inline-flex items-center gap-2 text-sm text-bone transition-colors duration-500 hover:text-gfp"
              >
                Take the tour
                <span className="text-gfp">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The contested number ───────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Where the atlas begins"
              title="The number everyone quotes, and the range it actually came from"
              s="melanin"
              lede="Herculano-Houzel's 2009 isotropic fractionator study put 86.1 ± 8.1 billion neurons in the average adult male brain, from four specimens. In 2024 Goriely showed the confidence interval on that mean runs from about 73 to 99 billion, that the per-brain data were never published, and that a second study of five older women found 61–73 billion — a range that does not overlap. Nine whole brains have ever been counted. Everything below is drawn from what those nine allow."
            />
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] bg-hair ring-1 ring-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <div
                key={n.unit}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="group bg-panel p-6 transition-colors duration-700 ease-fluid hover:bg-raised"
              >
                <p className={`font-display text-[2.75rem] leading-none ${STAIN[n.stain].text}`}>
                  {n.value}
                </p>
                <p className="mt-3 text-sm text-bone">{n.unit}</p>
                <p className="mt-4 text-[13px] leading-relaxed text-dim">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sections, as plates ────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Five registers"
              title="One argument, carried through four levels of explanation"
              s="gfp"
              lede="Anatomy, then chemistry, then behaviour, then the questions the behaviour raises. Each register explains the one below it better than it explains itself — and hands the next one a problem it cannot solve alone."
            />
          </div>

          <div className="mt-16 space-y-3">
            {SECTIONS.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                data-reveal
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                className="group grid gap-6 rounded-[1.75rem] bg-white/[0.02] p-1.5 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:ring-white/[0.14] md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:px-8 md:py-8"
              >
                <span
                  className={`self-start font-display text-[2.5rem] leading-none md:self-center ${STAIN[s.stain].text}`}
                >
                  {s.index}
                </span>

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-[1.75rem] leading-none text-bone md:text-[2.1rem]">
                      {s.title}
                    </h3>
                    <p className="text-sm text-dim">{s.subtitle}</p>
                  </div>
                  <p className="prose-measure-wide mt-3.5 text-sm leading-relaxed text-mute">
                    {s.body}
                  </p>
                </div>

                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-fluid group-hover:translate-x-1 ${STAIN[s.stain].soft} ${STAIN[s.stain].text}`}
                  aria-hidden
                >
                  <svg viewBox="0 0 16 16" className="size-4" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lobe index ─────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Orientation"
              title="Ten divisions, and why the boundaries are arguments"
              s="vessel"
              lede="Lobes are a convenience that predates the cortex. They were named for skull bones they sit under, drawn by anatomists who could not see function, and retained because they are easy. What follows the skull is not what follows the cells."
            />
          </div>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LOBES.map((l, i) => (
              <div
                key={l.id}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
                className="rounded-[1.5rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised"
              >
                <Tag s={l.stain}>{l.name}</Tag>
                <p className="mt-4 text-sm leading-relaxed text-mute">{l.summary}</p>
              </div>
            ))}
          </div>

          <div
            className="mt-16 flex flex-wrap items-center gap-4"
            style={{ animation: "noema-rise 800ms var(--ease-fluid) 200ms both" }}
          >
            <Action href="/atlas" s="gfp">
              Explore all 31 regions
            </Action>
          </div>
        </div>
      </section>
    </>
  );
}
