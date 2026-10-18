"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { REGIONS, LOBES } from "@/data/regions";
import { STAIN } from "@/lib/stain";
import { Pin, Tag } from "@/components/ui";

const STOP = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "have",
  "in", "into", "is", "it", "its", "of", "on", "or", "that", "the", "this",
  "to", "was", "were", "which", "with", "their", "they", "than", "then", "not",
  "but", "so", "if", "when", "what", "who", "how", "we", "you", "can", "do",
]);

function keywords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z\s-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP.has(w)),
  );
}

function Picker({
  label,
  value,
  onChange,
  exclude,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  exclude: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-hair bg-panel px-3.5 py-2.5 text-sm text-bone outline-none transition-colors duration-300 focus:border-gfp"
      >
        {REGIONS.filter((r) => r.id !== exclude).map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function RegionCompare() {
  const [a, setA] = useState("hippocampus");
  const [b, setB] = useState("amygdala");

  /* Shareable: #hippocampus-vs-amygdala. replaceState, no history spam. */
  useEffect(() => {
    const apply = () => {
      const [x, y] = window.location.hash.slice(1).split("-vs-");
      if (x && REGIONS.some((r) => r.id === x)) setA(x);
      if (y && REGIONS.some((r) => r.id === y)) setB(y);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${a}-vs-${b}`);
  }, [a, b]);

  const swap = useCallback(() => {
    setA(b);
    setB(a);
  }, [a, b]);

  const random = useCallback(() => {
    let x = a;
    let y = b;
    while (x === y) {
      x = REGIONS[Math.floor(Math.random() * REGIONS.length)].id;
      y = REGIONS[Math.floor(Math.random() * REGIONS.length)].id;
    }
    setA(x);
    setB(y);
  }, [a, b]);

  const ra = useMemo(() => REGIONS.find((r) => r.id === a) ?? REGIONS[0], [a]);
  const rb = useMemo(() => REGIONS.find((r) => r.id === b) ?? REGIONS[1], [b]);

  const shared = useMemo(() => {
    const ka = new Set<string>();
    for (const f of ra.functions) for (const k of keywords(f)) ka.add(k);
    const hits = new Set<string>();
    for (const f of rb.functions) for (const k of keywords(f)) if (ka.has(k)) hits.add(k);
    return [...hits].sort();
  }, [ra, rb]);

  const lobeA = LOBES.find((l) => l.id === ra.lobe);
  const lobeB = LOBES.find((l) => l.id === rb.lobe);

  const rows: [string, string, string, boolean][] = [
    ["Division", lobeA?.name ?? ra.lobe, lobeB?.name ?? rb.lobe, ra.lobe === rb.lobe],
    ["Hemisphere", ra.hemisphere, rb.hemisphere, ra.hemisphere === rb.hemisphere],
    ["Functions listed", String(ra.functions.length), String(rb.functions.length), ra.functions.length === rb.functions.length],
    ["Also called", ra.aka?.join(", ") || "—", rb.aka?.join(", ") || "—", (ra.aka?.join() ?? "") === (rb.aka?.join() ?? "")],
  ];

  return (
    <div>
      <div className="rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06] sm:p-8">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <Picker label="Region A" value={a} onChange={setA} exclude={b} />
          <div className="flex gap-2 pb-0.5">
            <button
              type="button"
              onClick={swap}
              aria-label="Swap regions"
              className="grid size-9 place-items-center rounded-full text-mute ring-1 ring-white/10 transition-all duration-500 ease-fluid hover:text-bone hover:ring-white/25 active:scale-[0.96]"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
                <path
                  d="M2 5h9l-2.5-2.5M14 11H5l2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={random}
              aria-label="Random pair"
              className="grid size-9 place-items-center rounded-full text-mute ring-1 ring-white/10 transition-all duration-500 ease-fluid hover:text-bone hover:ring-white/25 active:scale-[0.96]"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
                <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="5.6" cy="5.6" r="1" fill="currentColor" />
                <circle cx="10.4" cy="10.4" r="1" fill="currentColor" />
                <circle cx="10.4" cy="5.6" r="1" fill="currentColor" />
                <circle cx="5.6" cy="10.4" r="1" fill="currentColor" />
              </svg>
            </button>
          </div>
          <Picker label="Region B" value={b} onChange={setB} exclude={a} />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-[1.75rem] ring-1 ring-white/[0.06]">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Attribute comparison</caption>
          <thead>
            <tr className="bg-raised text-dim">
              <th scope="col" className="px-5 py-3 font-normal text-[11px] tracking-[0.14em] uppercase">
                Attribute
              </th>
              <th scope="col" className="px-5 py-3 font-normal text-[11px] tracking-[0.14em] uppercase">
                {ra.name}
              </th>
              <th scope="col" className="px-5 py-3 font-normal text-[11px] tracking-[0.14em] uppercase">
                {rb.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, x, y, same]) => (
              <tr key={k} className="border-t border-hair">
                <th scope="row" className="px-5 py-3.5 font-normal text-dim">
                  {k}
                </th>
                <td className={`px-5 py-3.5 ${same ? "text-gfp" : "text-bone"}`}>{x}</td>
                <td className={`px-5 py-3.5 ${same ? "text-gfp" : "text-bone"}`}>{y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { r: ra, side: "A" },
          { r: rb, side: "B" },
        ].map(({ r, side }) => (
          <article key={side} className="rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06]">
            <div className="flex items-center gap-2">
              <Tag s={r.stain}>{LOBES.find((l) => l.id === r.lobe)?.name ?? r.lobe}</Tag>
              <Link
                href={`/atlas#${r.id}`}
                className="ml-auto text-[11px] text-dim underline-offset-4 hover:text-bone hover:underline"
              >
                Open on the atlas
              </Link>
            </div>
            <h3 className={`mt-4 text-[1.5rem] leading-tight ${STAIN[r.stain].text}`}>{r.name}</h3>
            <ul className="mt-5 space-y-2.5">
              {r.functions.map((f) => (
                <li key={f} className="flex gap-3 text-[13px] leading-relaxed text-mute">
                  <Pin s={r.stain} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-5 border-t border-hair pt-5">
              <div>
                <p className={`eyebrow mb-2 ${STAIN[r.stain].text}`}>When it stops</p>
                <p className="text-[13px] leading-relaxed text-mute">{r.lesions}</p>
              </div>
              <div>
                <p className={`eyebrow mb-2 ${STAIN[r.stain].text}`}>Worth knowing</p>
                <p className="text-[13px] leading-relaxed text-mute">{r.oddity}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.06]">
        <p className="eyebrow">Shared vocabulary</p>
        {shared.length ? (
          <>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {shared.map((w) => (
                <span
                  key={w}
                  className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-mute ring-1 ring-white/10"
                >
                  {w}
                </span>
              ))}
            </div>
            <p className="prose-measure mt-4 text-[13px] leading-relaxed text-dim">
              These are the content words both entries share. It is a crude
              measure — shared vocabulary is not shared function, and two
              regions can share every keyword while doing opposite jobs.
            </p>
          </>
        ) : (
          <p className="prose-measure mt-4 text-[13px] leading-relaxed text-dim">
            No content words in common. These two entries barely talk to each
            other, which on its own is worth knowing.
          </p>
        )}
      </div>
    </div>
  );
}