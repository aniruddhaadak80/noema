import type { ReactNode } from "react";
import BrainGlyph from "@/components/brain-glyph";
import { STAIN } from "@/lib/stain";
import type { Stain } from "@/lib/types";

/** Every interior page opens with this. The composition is fixed on
 *  purpose: eyebrow and hairline, then the title set large on the
 *  left with the lede under it, then a dense stat rail and the brain
 *  glyph filling the right third. Getting the third right is the whole
 *  point — without an object there the page opens into a void. */
export default function PageHeader({
  over,
  title,
  lede,
  stats,
  note,
  chips,
  s = "gfp",
}: {
  over: string;
  title: ReactNode;
  lede: string;
  stats: [string, string][];
  note?: string;
  chips?: string[];
  s?: Stain;
}) {
  const stain = STAIN[s];

  return (
    <header className="relative overflow-hidden px-5 pt-32 pb-16 md:px-10 md:pt-44 md:pb-20">
      {/* Glyph sits behind the grid, offset right, so the title can
          overlap it without anything looking broken. */}
      <div
        className="pointer-events-none absolute top-1/2 -right-24 hidden h-[120%] w-[62%] -translate-y-1/2 opacity-70 lg:block"
        style={{ animation: "noema-rise 1200ms var(--ease-fluid) 420ms both" }}
        aria-hidden
      >
        <BrainGlyph className="size-full" glow={s} />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
        <div>
          <div
            className="flex items-center gap-3"
            style={{ animation: "noema-rise 700ms var(--ease-fluid) 60ms both" }}
          >
            <span className={`h-px w-10 ${stain.bg}`} aria-hidden />
            <p className="eyebrow">{over}</p>
          </div>

          <h1
            className="mt-7 text-[clamp(2.85rem,7.6vw,5.75rem)] leading-[0.88] tracking-[-0.015em] text-bone"
            style={{ animation: "noema-rise 900ms var(--ease-fluid) 130ms both" }}
          >
            {title}
          </h1>

          <p
            className="prose-measure-wide mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-mute"
            style={{ animation: "noema-rise 900ms var(--ease-fluid) 230ms both" }}
          >
            {lede}
          </p>

          {chips?.length ? (
            <div
              className="mt-9 flex flex-wrap gap-2"
              style={{ animation: "noema-rise 900ms var(--ease-fluid) 330ms both" }}
            >
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full px-2.5 py-1 text-[11px] text-mute ring-1 ring-white/[0.09]"
                >
                  {c}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div
          style={{ animation: "noema-rise 900ms var(--ease-fluid) 400ms both" }}
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-hair ring-1 ring-white/[0.07]">
            {stats.map(([n, l]) => (
              <div key={l} className="bg-panel px-5 py-5">
                <p className="font-display text-[2.15rem] leading-none text-bone">{n}</p>
                <p className="mt-2 text-[11px] leading-tight text-dim">{l}</p>
              </div>
            ))}
          </div>

          {note ? (
            <p className="mt-5 max-w-sm border-l border-hair pl-4 text-[13px] leading-relaxed text-dim">
              {note}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
