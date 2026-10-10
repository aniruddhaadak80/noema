import Link from "next/link";
import type { CSSProperties } from "react";
import NeuralField from "@/components/neural-field";
import BrainGlyph from "@/components/brain-glyph";
import FactRail from "@/components/fact-rail";
import { NUMBERS, SECTIONS } from "@/data/index";
import { LOBES } from "@/data/regions";
import { MOLECULES } from "@/data/circuits";
import { BIASES } from "@/data/mind";
import { POSITIONS } from "@/data/questions";
import { Action, Plate, Tag } from "@/components/ui";
import { STAIN } from "@/lib/stain";

const RAIL = [
  { value: "61–95", label: "billion neurons — the actual range" },
  { value: "~1:1", label: "glia to neurons, not 10:1" },
  { value: "~80%", label: "of neurons live in the cerebellum" },
  { value: "~20 W", label: "resting power, for 2% of body mass" },
  { value: "4", label: "chunks in working memory, not 7±2" },
  { value: "9", label: "whole brains ever counted" },
  { value: "200 M", label: "axons in the corpus callosum" },
  { value: "~100 ms", label: "minimum threat detection time" },
];

/** The three-line summary of what each register contributes. Used as
 *  the spine of the home page. */
const STRATA = [
  {
    n: "Anatomy",
    s: "gfp" as const,
    gives:
      "Location. Where a function sits, what else is next to it, and what the damage profile looks like when it stops.",
    hides:
      "Almost nothing is where the diagrams put it. The folds are idiosyncratic, the maps are smeared, and the lateral view hides three quarters of the cortex.",
  },
  {
    n: "Chemistry",
    s: "golgi" as const,
    gives:
      "Mechanism. How one cell tells another, how a signal is amplified, and why a drug taken by mouth changes what you notice.",
    hides:
      "Which cells talk to which. A transmitter is a dialect, not a conversation — the same dopamine says different things in six different places.",
  },
  {
    n: "Behaviour",
    s: "melanin" as const,
    gives:
      "Sequence. What a whole organism does, reliably, under conditions you can set up and measure twice.",
    hides:
      "The internal steps. Every behavioural result is a boundary condition on a theory, not a description of the mechanism that produced it.",
  },
  {
    n: "The questions",
    s: "vessel" as const,
    gives:
      "The reason to care. Everything above is technique; this is the part that is actually about being the kind of thing that asks.",
    hides:
      "Nothing — which is the problem. Complete physics would not tell you why any of it feels like something, and the field knows it.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pt-32 pb-20 md:px-10 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
          <NeuralField />
        </div>
        {/* A real brain, behind the type, so the right half of the
            composition has an object rather than a void. */}
        <div
          className="pointer-events-none absolute top-1/2 -right-20 hidden h-[120%] w-[50%] -translate-y-1/2 opacity-50 lg:block"
          aria-hidden
        >
          <BrainGlyph className="size-full" glow="gfp" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/10"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl">
          <div
            className="flex items-center gap-3"
            style={{ animation: "noema-rise 700ms var(--ease-fluid) 60ms both" }}
          >
            <span className="h-px w-10 bg-gfp" aria-hidden />
            <p className="eyebrow">Neuroscience · Psychology · Philosophy</p>
          </div>

          <h1
            className="mt-8 max-w-4xl text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.86] tracking-[-0.02em] text-bone"
            style={{ animation: "noema-rise 900ms var(--ease-fluid) 130ms both" }}
          >
            An atlas
            <br />
            <span className="italic text-melanin">of the mind</span>
          </h1>

          <p
            className="prose-measure mt-9 text-[1.0625rem] leading-relaxed text-mute sm:text-lg"
            style={{ animation: "noema-rise 900ms var(--ease-fluid) 240ms both" }}
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
            style={{ animation: "noema-rise 900ms var(--ease-fluid) 340ms both" }}
          >
            <Action href="/atlas" s="gfp">
              Open the atlas
            </Action>
            <Action href="/questions" s="vessel">
              Start with the hard problem
            </Action>
          </div>

          <dl
            className="mt-14 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-[1.5rem] bg-hair ring-1 ring-white/[0.07] sm:grid-cols-6"
            style={{ animation: "noema-rise 900ms var(--ease-fluid) 440ms both" }}
          >
            {[
              ["31", "regions"],
              ["12", "transmitters"],
              ["14", "experiments"],
              ["12", "biases"],
              ["24", "positions"],
              ["12", "comparisons"],
            ].map(([n, l]) => (
              <div key={l} className="bg-panel px-4 py-4">
                <dt className="font-display text-2xl leading-none text-bone">{n}</dt>
                <dd className="mt-1.5 text-[11px] leading-tight text-dim">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FactRail facts={RAIL} />

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
                style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
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

      {/* ── The four registers ─────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Four levels of explanation"
              title="What each register gives, and what it hides"
              s="gfp"
              lede="The same shape appears at every level of the atlas. Each register explains the one below it well, hands the level above a problem it cannot solve, and is then reinterpreted by it in return. Below: what each one buys you, and the bill."
            />
          </div>

          <div className="mt-14 space-y-3">
            {STRATA.map((x, i) => (
              <article
                key={x.n}
                data-reveal
                style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
                className="grid gap-6 rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised md:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:p-8"
              >
                <h3 className={`text-[1.7rem] leading-none ${STAIN[x.s].text}`}>{x.n}</h3>
                <div className={`border-l-2 pl-5 ${STAIN[x.s].line}`}>
                  <p className="eyebrow mb-2.5">Gives</p>
                  <p className="text-[0.95rem] leading-relaxed text-bone/90">{x.gives}</p>
                </div>
                <div className="border-l-2 border-hair-lit pl-5">
                  <p className="eyebrow mb-2.5">Hides</p>
                  <p className="text-[0.95rem] leading-relaxed text-mute">{x.hides}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FactRail facts={RAIL} s="golgi" />

      {/* ── Sections ───────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="Five registers"
              title="One argument, carried through five levels of explanation"
              s="gfp"
              lede="Anatomy, then chemistry, then behaviour, then the questions the behaviour raises, and finally the machines now arguing the same case in a different substrate."
            />
          </div>

          <div className="mt-16 space-y-3">
            {SECTIONS.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                data-reveal
                style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
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

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LOBES.map((l, i) => (
              <div
                key={l.id}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as CSSProperties}
                className="rounded-[1.5rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised"
              >
                <Tag s={l.stain}>{l.name}</Tag>
                <p className="mt-4 text-sm leading-relaxed text-mute">{l.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sampler ────────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal>
            <Plate
              over="A sampler"
              title="Six entries from the atlas, one from each register"
              s="gfp"
              lede="If you only read six things, read these. Each one is the entry in its category that changes how the rest of the section reads."
            />
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/atlas",
                kind: "Region",
                title: "Cerebellum",
                stain: "gfp" as const,
                body:
                  "Holds roughly 80% of the brain's neurons in a tenth of its volume, and is not a movement organ. It is the prediction engine underneath every timed action, and it is the last structure most people learn to name.",
              },
              {
                href: "/circuits",
                kind: "Molecule",
                title: "Dopamine",
                stain: "golgi" as const,
                body:
                  "Not a pleasure chemical. A teaching signal encoding reward prediction error — the gap between what you expected and what you got. Everything else people say about it is downstream of that.",
              },
              {
                href: "/mind",
                kind: "Experiment",
                title: "Stanford Prison Experiment",
                stain: "melanin" as const,
                body:
                  "Heavily criticised and substantially discredited, including demand characteristics, the experimenter's own coaching of guards, and fabricated data in the recordings. Zimbardo apologised publicly in 2019.",
              },
              {
                href: "/questions",
                kind: "Position",
                title: "Compatibilism",
                stain: "gfp" as const,
                body:
                  "Freedom is not the ability to have done otherwise in a counterfactual sense that includes doing otherwise while everything stays the same. It is acting from your own reasons without coercion.",
              },
              {
                href: "/mirror",
                kind: "Comparison",
                title: "Power",
                stain: "vessel" as const,
                body:
                  "At roughly one joule per output token, a frontier model thinking at human speech rate draws about five watts against the brain's twenty. The crossover happened quietly around 2024–25.",
              },
            ].map((x, i) => (
              <Link
                key={x.title}
                href={x.href}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as CSSProperties}
                className="group rounded-[1.5rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={`text-[1.35rem] leading-tight ${STAIN[x.stain].text}`}>
                    {x.title}
                  </h3>
                  <span className="shrink-0 text-[10px] tracking-[0.16em] text-dim uppercase">
                    {x.kind}
                  </span>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-mute">{x.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] text-dim transition-colors duration-500 group-hover:text-bone">
                  Read the entry
                  <span className="text-gfp">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ────────────────────────────────────────────── */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden rounded-[2rem] bg-panel p-8 ring-1 ring-white/[0.07] md:p-14"
            data-reveal
          >
            <div
              className="pointer-events-none absolute -right-20 -bottom-28 h-[85%] w-[45%] opacity-20"
              aria-hidden
            >
              <BrainGlyph className="size-full" glow="melanin" folds={false} />
            </div>

            <div className="relative max-w-2xl">
              <Tag s="melanin">Start anywhere</Tag>
              <h2 className="mt-6 text-[clamp(2rem,5vw,3.4rem)] leading-[1.03] text-bone">
                The atlas is not a hierarchy. It is a set of doors onto
                the same argument.
              </h2>
              <p className="prose-measure mt-6 text-[1.0625rem] leading-relaxed text-mute">
                Nothing here is a prerequisite for anything else. You can
                start at the axon and end at the hard problem, or start
                at the hard problem and work back to a chemistry you
                already half-knew. The only thing that does not work is
                reading the contested numbers without the contest.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action href="/atlas" s="gfp">
                  Explore all 31 regions
                </Action>
                <Action href="/mirror" s="vessel">
                  Compare to the machine
                </Action>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
