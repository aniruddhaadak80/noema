"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BRAINSTEM,
  CEREBELLUM,
  CEREBRUM,
  LOBES,
  REGIONS,
  SYLVIAN,
  TEMPORAL,
} from "@/data/regions";
import { STAIN } from "@/lib/stain";
import type { Lobe } from "@/lib/types";
import { Pin, Tag } from "@/components/ui";
import LesionSim from "@/components/lesion-sim";

/* Fold linework, laid onto the silhouette. */
const FOLDS = [
  "M 214,182 C 268,158 322,150 374,160",
  "M 186,232 C 246,208 310,200 372,212",
  "M 168,288 C 236,266 304,258 376,270",
  "M 160,344 C 232,324 304,318 378,328",
  "M 520,146 C 594,138 672,148 742,174",
  "M 536,198 C 608,190 680,200 748,228",
  "M 544,252 C 614,244 680,254 744,282",
  "M 550,308 C 616,302 676,310 734,336",
  "M 660,172 C 738,194 808,234 856,286",
  "M 688,228 C 760,252 822,290 868,340",
  "M 712,286 C 774,310 828,346 870,396",
  "M 300,506 C 380,494 470,492 556,498",
  "M 322,556 C 400,574 486,580 560,572",
  "M 344,604 C 418,624 500,628 572,618",
  "M 590,536 C 662,528 736,528 790,536",
  "M 600,578 C 668,570 738,572 790,580",
  "M 640,620 C 704,612 760,616 800,626",
];

/** The three boundaries a lobar plate is actually drawn around. */
const DIVIDERS = [
  "M 412,116 C 452,214 470,332 456,502",
  SYLVIAN,
  "M 816,214 C 792,284 764,358 710,436",
];

/** Which mass a region can actually be seen on. */
const CLIP_FOR: Record<string, string> = {
  temporal: "clip-temporal",
  subcortical: "clip-sheet",
  cerebellum: "clip-none",
  brainstem: "clip-none",
};

export default function BrainAtlas() {
  const [selected, setSelected] = useState<string>("hippocampus");
  const [lesionId, setLesionId] = useState<string | null>(null);
  const lesionRegion = useMemo(
    () => (lesionId ? REGIONS.find((r) => r.id === lesionId) ?? null : null),
    [lesionId],
  );
  const [hovered, setHovered] = useState<string | null>(null);
  const [lobe, setLobe] = useState<Lobe | "all">("all");
  const [copied, setCopied] = useState(false);

  /* Deep links: /atlas#hippocampus selects the region on load and
     follows the hash afterwards, so entries can link straight here
     and readers can share a region. replaceState avoids the jump. */
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (id && REGIONS.some((r) => r.id === id)) setSelected(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (id: string) => {
    setSelected(id);
    window.history.replaceState(null, "", `#${id}`);
    setLesionId(null);
  };

  const order = useMemo(() => REGIONS.map((r) => r.id), []);
  const step = (dir: 1 | -1) => {
    const i = order.indexOf(selected);
    select(order[(i + dir + order.length) % order.length]);
  };

  const copyLink = async () => {
    try {
      await window.navigator.clipboard.writeText(
        `${window.location.origin}${window.location.pathname}#${selected}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the URL bar already has the hash */
    }
  };

  const active = hovered ?? selected;
  const current = useMemo(
    () => REGIONS.find((r) => r.id === (hovered ?? selected)) ?? REGIONS[0],
    [hovered, selected],
  );
  const activeLobe = LOBES.find((l) => l.id === current.lobe);

  const dimmed = (id: string) =>
    lobe !== "all" && REGIONS.find((r) => r.id === id)?.lobe !== lobe;

  const paint = (id: string, c: string) => {
    const on = active === id;
    const off = dimmed(id);
    return {
      fill: c,
      fillOpacity: off ? 0.02 : on ? 0.32 : 0.09,
      stroke: c,
      strokeOpacity: off ? 0.05 : on ? 0.92 : 0.3,
      strokeWidth: on ? 2.2 : 1,
    };
  };

  const handlers = (id: string) => ({
    onPointerEnter: () => setHovered(id),
    onPointerLeave: () => setHovered(null),
    onFocus: () => setHovered(id),
    onBlur: () => setHovered(null),
    onClick: () => select(id),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(id);
      }
    },
  });

  const surface = REGIONS.filter((r) => !["cerebellum", "brainstem"].includes(r.lobe));

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10">
      {/* ── The plate ───────────────────────────────────────── */}
      <div className="rounded-[1.75rem] bg-white/[0.02] p-1.5 ring-1 ring-white/[0.06]">
        <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-tissue shadow-[inset_0_1px_0_rgba(242,239,230,0.05)]">
          <div className="flex flex-wrap items-center gap-1.5 border-b border-hair px-4 py-3">
            <span className="mr-2 text-[10px] tracking-[0.16em] text-dim uppercase">
              Lateral view · left hemisphere
            </span>
            {(["all", ...LOBES.map((l) => l.id)] as const).map((id) => {
              const l = LOBES.find((x) => x.id === id);
              const on = lobe === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setLobe(id as Lobe | "all")}
                  aria-pressed={on}
                  className={`rounded-full px-2.5 py-1 text-[11px] transition-colors duration-500 ease-fluid ${
                    on
                      ? l
                        ? `bg-white/10 text-bone ring-1 ${STAIN[l.stain].ring}`
                        : "bg-bone text-ink"
                      : "text-mute hover:bg-white/5 hover:text-bone"
                  }`}
                >
                  {l ? l.name.replace(" lobe", "").replace(" & thalamus", "") : "All"}
                </button>
              );
            })}
          </div>

          <svg
            viewBox="40 56 940 730"
            className="w-full"
            role="group"
            aria-label="Interactive lateral diagram of the human brain. Regions are selectable."
          >
            <defs>
              <clipPath id="clip-cerebrum">
                <path d={CEREBRUM} />
              </clipPath>
              <clipPath id="clip-temporal">
                <path d={TEMPORAL} />
              </clipPath>
              <clipPath id="clip-sheet">
                <path d={CEREBRUM} />
                <path d={TEMPORAL} />
              </clipPath>
              <radialGradient id="vignette" cx="50%" cy="42%" r="68%">
                <stop offset="52%" stopColor="#0b0d14" stopOpacity="0" />
                <stop offset="100%" stopColor="#06070b" stopOpacity="0.92" />
              </radialGradient>
            </defs>

            <rect width="1000" height="800" fill="url(#vignette)" />

            {/* Deep masses first, so the temporal lobe overlaps them the
                way it does in a real section. */}
            <g>
              <path
                d={CEREBELLUM}
                {...paint("cerebellum", STAIN.gfp.hex)}
                {...handlers("cerebellum")}
                tabIndex={0}
                role="button"
                aria-label="Cerebellum"
                className="cursor-pointer outline-none transition-[fill-opacity,stroke-opacity] duration-500 ease-fluid"
              />
              <path
                d={BRAINSTEM}
                {...paint("brainstem", STAIN.vessel.hex)}
                {...handlers("brainstem")}
                tabIndex={0}
                role="button"
                aria-label="Brainstem"
                className="cursor-pointer outline-none transition-[fill-opacity,stroke-opacity] duration-500 ease-fluid"
              />
            </g>

            <g clipPath="url(#clip-sheet)">
              <path d={CEREBRUM} fill="#0e1119" />
              <path d={TEMPORAL} fill="#0e1119" />
            </g>

            {/* Folds and sulcal boundaries span the whole sheet. */}
            <g clipPath="url(#clip-sheet)">
              <g stroke={STAIN.gfp.hex} strokeOpacity="0.12" strokeWidth="1.1" fill="none">
                {FOLDS.map((d) => (
                  <path key={d} d={d} />
                ))}
              </g>
              <g stroke="#f2efe6" strokeOpacity="0.32" strokeWidth="1.8" fill="none">
                {DIVIDERS.map((d) => (
                  <path key={d} d={d} />
                ))}
              </g>
            </g>

            {/* Cortical regions hold to the cerebrum, temporal regions to
                the temporal lobe, deep ones to both and dash. */}
            {surface.map((r) => {
              const c = STAIN[r.stain].hex;
              const off = dimmed(r.id);
              const on = active === r.id;
              const clip = CLIP_FOR[r.lobe] ?? "clip-cerebrum";
              return (
                <g key={r.id} clipPath={`url(#${clip})`}>
                  <path
                    d={r.path}
                    tabIndex={off ? -1 : 0}
                    role="button"
                    aria-label={`${r.name}. ${r.functions[0]}`}
                    aria-pressed={selected === r.id}
                    {...handlers(r.id)}
                    fill={c}
                    fillOpacity={off ? 0.02 : on ? 0.32 : 0.09}
                    stroke={c}
                    strokeOpacity={off ? 0.05 : on ? 0.92 : 0.3}
                    strokeWidth={on ? 2.2 : 1}
                    strokeDasharray={r.lobe === "subcortical" ? "5 4" : undefined}
                    className={`cursor-pointer outline-none transition-[fill-opacity,stroke-opacity,stroke-width] duration-500 ease-fluid focus-visible:stroke-[3] ${
                      off ? "pointer-events-none" : ""
                    }`}
                  />
                </g>
              );
            })}

            {/* The fissure, then the outline of each visible mass. */}
            <path
              d={SYLVIAN}
              fill="none"
              stroke="#06070b"
              strokeWidth="6"
              strokeOpacity="0.9"
              strokeLinecap="round"
            />
            <path
              d={SYLVIAN}
              fill="none"
              stroke="#f2efe6"
              strokeOpacity="0.24"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {[CEREBRUM, TEMPORAL].map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke="#f2efe6"
                strokeOpacity="0.52"
                strokeWidth="1.8"
              />
            ))}

            <g stroke="#5d6273" strokeOpacity="0.5" strokeWidth="0.9" fill="none">
              <path d="M 862,590 L 938,668" />
              <path d="M 676,690 L 790,742" />
            </g>
            <text x="944" y="676" textAnchor="end" fill="#8b90a2" fontFamily="sans-serif" fontSize="16">
              cerebellum
            </text>
            <text x="794" y="748" fill="#8b90a2" fontFamily="sans-serif" fontSize="16">
              brainstem
            </text>
          </svg>
        </div>
      </div>

      {/* ── The reading ─────────────────────────────────────── */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[1.75rem] bg-white/[0.02] p-1.5 ring-1 ring-white/[0.06]">
          <div className="rounded-[calc(1.75rem-0.375rem)] bg-panel p-6 shadow-[inset_0_1px_0_rgba(242,239,230,0.05)] sm:p-7">
            <div className="flex items-center gap-2.5">
              <Tag s={current.stain}>{activeLobe?.name ?? "Region"}</Tag>
              <span className="text-[10px] tracking-[0.16em] text-dim uppercase">
                {current.hemisphere === "bilateral"
                  ? "Both sides"
                  : `${current.hemisphere} hemisphere`}
              </span>
            </div>

            <h3 className="mt-5 text-[clamp(1.6rem,3.4vw,2.15rem)] leading-[1.08] text-bone">
              {current.name}
            </h3>
            {current.aka?.length ? (
              <p className="mt-2 text-sm text-dim">{current.aka.join(" · ")}</p>
            ) : null}

            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous region"
                className="grid size-8 place-items-center rounded-full text-mute ring-1 ring-white/10 transition-all duration-500 ease-fluid hover:text-bone hover:ring-white/25 active:scale-[0.96]"
              >
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next region"
                className="grid size-8 place-items-center rounded-full text-mute ring-1 ring-white/10 transition-all duration-500 ease-fluid hover:text-bone hover:ring-white/25 active:scale-[0.96]"
              >
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="mx-1 h-4 w-px bg-hair" aria-hidden />
              <button
                type="button"
                onClick={copyLink}
                className="rounded-full px-3 py-1.5 text-[12px] text-mute ring-1 ring-white/10 transition-colors duration-500 hover:text-bone"
              >
                {copied ? "Link copied" : "Copy link to region"}
              </button>
              <button
                type="button"
                onClick={() => setLesionId(selected)}
                className="rounded-full px-3 py-1.5 text-[12px] text-mute ring-1 ring-white/10 transition-colors duration-500 hover:text-bone"
              >
                Simulate lesion
              </button>
              <span className="ml-auto text-[11px] tabular-nums text-dim">
                {order.indexOf(current.id) + 1} / {order.length}
              </span>
            </div>

            <ul className="mt-7 space-y-2.5">
              {current.functions.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed text-mute">
                  <Pin s={current.stain} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-6 border-t border-hair pt-7">
              <div>
                <p className={`eyebrow mb-2.5 ${STAIN[current.stain].text}`}>When it stops</p>
                <p className="text-sm leading-relaxed text-mute">{current.lesions}</p>
              </div>
              <div>
                <p className={`eyebrow mb-2.5 ${STAIN[current.stain].text}`}>
                  Worth knowing
                </p>
                <p className="text-sm leading-relaxed text-mute">{current.oddity}</p>
              </div>
            </div>
          </div>
        </div>

        <details className="group mt-4 rounded-[1.25rem] bg-white/[0.02] ring-1 ring-white/[0.06]">
          <summary className="cursor-pointer list-none px-5 py-4 text-sm text-mute transition-colors duration-500 hover:text-bone">
            <span className="mr-2 inline-block transition-transform duration-500 ease-fluid group-open:rotate-90">
              ↳
            </span>
            All {REGIONS.length} regions
          </summary>
          <ul className="max-h-96 overflow-y-auto border-t border-hair p-2">
            {REGIONS.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => {
                    select(r.id);
                    setHovered(r.id);
                  }}
                  onPointerLeave={() => setHovered(null)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition-colors duration-300 ${
                    selected === r.id
                      ? "bg-white/[0.06] text-bone"
                      : "text-mute hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`size-1.5 shrink-0 rotate-45 ring-1 ${STAIN[r.stain].bg} ${STAIN[r.stain].ring}`}
                    aria-hidden
                  />
                  {r.name}
                </button>
              </li>
            ))}
          </ul>
        </details>
      </aside>
    </div>

    <div className="mx-auto mt-10 max-w-6xl">
      <LesionSim region={lesionRegion} onClear={() => setLesionId(null)} />
    </div>
    </>
  );
}
