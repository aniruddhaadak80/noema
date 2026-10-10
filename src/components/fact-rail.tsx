import type { CSSProperties } from "react";
import { STAIN } from "@/lib/stain";

/** A scrolling readout of figures. Styled as a lab instrument strip
 *  rather than a decoration: hairline rules, tabular figures, and the
 *  disputed ones flagged. Two copies run side by side so the loop is
 *  seamless, and the whole thing stops for reduced motion. */
export default function FactRail({
  facts,
  s = "gfp",
}: {
  facts: { value: string; label: string }[];
  s?: keyof typeof STAIN;
}) {
  const stain = STAIN[s];
  const loop = [...facts, ...facts];

  return (
    <section
      className="relative overflow-hidden border-y border-hair py-7"
      aria-label="Key figures"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

      <ul
        className="rail-track flex w-max items-center gap-12 pl-6"
        style={{
          animation: "noema-rail 60s linear infinite",
        } as CSSProperties}
      >
        {loop.map((f, i) => (
          <li key={`${f.label}-${i}`} className="flex items-baseline gap-4 whitespace-nowrap">
            <span className={`font-display text-[1.7rem] leading-none ${stain.text}`}>
              {f.value}
            </span>
            <span className="text-[13px] text-mute">{f.label}</span>
            <span className="ml-8 h-4 w-px bg-hair-lit" aria-hidden />
          </li>
        ))}
      </ul>
    </section>
  );
}

export type { CSSProperties };
