"use client";

import type { Region } from "@/lib/types";
import { Plate, Tag } from "@/components/ui";

interface Props {
  region: Region | null;
  onClear?: () => void;
}

export default function LesionSim({ region, onClear }: Props) {
  if (!region) return null;
  const hasLesion = Boolean(region.lesions);

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-panel ring-1 ring-white/[0.06]">
      <div className="flex items-start justify-between gap-4 border-b border-hair px-6 py-5 sm:px-8">
        <div>
          <p className="eyebrow">Lesion simulator</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-bone">
            {region.name}
          </h3>
          {region.aka && region.aka.length > 0 && (
            <p className="mt-1 text-sm text-dim">{region.aka.join(" \u00b7 ")}</p>
          )}
        </div>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-full px-3 py-1.5 text-[12px] text-mute ring-1 ring-white/10 transition-colors duration-500 ease-fluid hover:text-bone"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid gap-8 px-6 py-8 sm:px-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Plate over="Predicted deficit" title="Classic syndrome" s="vessel" />
          <p className="prose-measure mt-5 text-[0.98rem] leading-relaxed text-mute">
            {hasLesion
              ? region.lesions
              : "No single, clean syndrome is taught for this entry. Disruption tends to be task-dependent or a larger network effect."}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag s="gfp">{region.lobe}</Tag>
            <Tag s="melanin">{region.hemisphere}</Tag>
            {hasLesion && <Tag s="vessel">localising</Tag>}
          </div>
        </div>

        <div className="rounded-[1.25rem] bg-white/[0.02] p-6 ring-1 ring-white/[0.05]">
          <p className="eyebrow text-dim">How to read this</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-mute">
            <li>
              <span className="text-bone">Syndromes</span> are the textbook picture. Real lesions are rarely this neat.
            </li>
            <li>
              <span className="text-bone">Diaschisis</span> means distant regions can go offline too.
            </li>
            <li>
              <span className="text-bone">Plasticity</span> matters — acute vs chronic look very different.
            </li>
            <li>
              <span className="text-bone">Double dissociations</span>, not single cases, carry the weight.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
