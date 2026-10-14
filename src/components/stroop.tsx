"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Tag } from "@/components/ui";

const INKS = [
  { name: "red", hex: "#e8613f" },
  { name: "green", hex: "#45e0c4" },
  { name: "blue", hex: "#6ea8fe" },
  { name: "yellow", hex: "#f0b44a" },
] as const;

type InkName = (typeof INKS)[number]["name"];

interface Trial {
  word: string;
  ink: InkName;
  congruent: boolean;
}

const TRIALS = 24;

function buildTrials(): Trial[] {
  const names = INKS.map((i) => i.name.toUpperCase());
  const out: Trial[] = [];
  while (out.filter((t) => t.congruent).length < TRIALS / 2) {
    const w = names[Math.floor(Math.random() * names.length)];
    out.push({ word: w, ink: w.toLowerCase() as InkName, congruent: true });
  }
  while (out.length < TRIALS) {
    const w = names[Math.floor(Math.random() * names.length)];
    const ink = names[Math.floor(Math.random() * names.length)].toLowerCase() as InkName;
    if (ink === w.toLowerCase()) continue;
    out.push({ word: w, ink, congruent: false });
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const BEST_KEY = "noema-stroop-best";

function readBest(): number | null {
  try {
    const v = window.localStorage.getItem(BEST_KEY);
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
}

/** Name the ink, not the word. Twenty-four trials; the interference
 *  cost — incongruent minus congruent reaction time — is the
 *  measurement. Typical is a few hundred milliseconds, and it does
 *  not go away with practice. */
export default function Stroop() {
  const [trials, setTrials] = useState<Trial[]>([]);
  const [index, setIndex] = useState(0);
  const [rts, setRts] = useState<{ congruent: number[]; incongruent: number[] }>({ congruent: [], incongruent: [] });
  const [errors, setErrors] = useState(0);
  const [flash, setFlash] = useState<InkName | null>(null);
  const [done, setDone] = useState<null | { interference: number; best: number | null; improved: boolean }>(null);
  const startRef = useRef(0);

  const start = useCallback(() => {
    setTrials(buildTrials());
    setIndex(0);
    setRts({ congruent: [], incongruent: [] });
    setErrors(0);
    setFlash(null);
    setDone(null);
    startRef.current = performance.now();
  }, []);

  const answer = useCallback(
    (ink: InkName) => {
      if (trials.length === 0 || done) return;
      const t = trials[index];
      const rt = performance.now() - startRef.current;
      if (ink === t.ink) {
        setRts((r) => ({
          ...r,
          [t.congruent ? "congruent" : "incongruent"]: [
            ...r[t.congruent ? "congruent" : "incongruent"],
            rt,
          ],
        }));
      } else {
        setErrors((e) => e + 1);
      }
      setFlash(ink);
      window.setTimeout(() => {
        setFlash(null);
        if (index + 1 >= trials.length) {
          setRts((r) => {
            const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
            const interference = Math.round(mean(r.incongruent) - mean(r.congruent));
            const prev = readBest();
            const improved = prev === null || interference < prev;
            try {
              window.localStorage.setItem(BEST_KEY, String(prev === null ? interference : Math.min(prev, interference)));
            } catch {
              /* private mode */
            }
            setDone({
              interference,
              best: prev === null ? interference : Math.min(prev, interference),
              improved: prev !== null && improved,
            });
            return r;
          });
        } else {
          setIndex((i) => i + 1);
          startRef.current = performance.now();
        }
      }, 220);
    },
    [trials, index, done],
  );

  useEffect(() => {
    if (trials.length === 0 || done) return;
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= 4) answer(INKS[n - 1].name);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trials, done, answer, index]);

  const mean = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : 0);
  const current = trials[index];
  const inkHex = current ? INKS.find((i) => i.name === current.ink)?.hex : undefined;

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-panel ring-1 ring-white/[0.06]">
      <div className="border-b border-hair px-6 py-5 sm:px-8">
        <p className="eyebrow">Name the ink, not the word · keys 1–4</p>
      </div>

      <div className="px-6 py-8 sm:px-8">
        {trials.length === 0 && (
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[1.0625rem] leading-relaxed text-mute">
              A colour word appears in an ink that may or may not match.
              Press the button for the <span className="text-bone">ink colour</span> —
              ignore what the word says. Reading is automatic; naming the
              ink is not, and the collision between the two is the entire
              measurement.
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-7 rounded-full bg-bone px-6 py-3 text-sm text-ink transition-transform duration-500 ease-fluid active:scale-[0.98]"
            >
              Start 24 trials
            </button>
          </div>
        )}

        {trials.length > 0 && !done && current && (
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[12px] tracking-[0.14em] text-dim uppercase">
              Trial {index + 1} / {trials.length} · {errors} {errors === 1 ? "error" : "errors"}
            </p>
            <p
              className="mt-8 font-display text-[4.5rem] leading-none sm:text-[5.5rem]"
              style={{ color: inkHex }}
              aria-label={`The word ${current.word}, shown in ${current.ink} ink`}
            >
              {current.word}
            </p>
            <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-2.5" role="group" aria-label="Ink colours">
              {INKS.map((ink, i) => (
                <button
                  key={ink.name}
                  type="button"
                  onClick={() => answer(ink.name)}
                  className={`flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3.5 text-left ring-1 transition-all duration-300 hover:bg-white/[0.08] active:scale-[0.97] ${
                    flash === ink.name ? "ring-white/40" : "ring-white/[0.07]"
                  }`}
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full text-[12px] text-dim ring-1 ring-white/10" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: ink.hex }} aria-hidden />
                  <span className="text-sm text-bone capitalize">{ink.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {done && (
          <div className="mx-auto max-w-xl text-center">
            <Tag s={done.interference < 400 ? "gfp" : done.interference < 800 ? "melanin" : "vessel"}>
              Interference {done.interference} ms
            </Tag>
            <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl bg-hair ring-1 ring-white/[0.07]">
              <div className="bg-panel px-4 py-5">
                <p className="font-display text-3xl leading-none text-bone">{mean(rts.congruent)} ms</p>
                <p className="mt-2 text-[12px] text-dim">matching trials</p>
              </div>
              <div className="bg-panel px-4 py-5">
                <p className="font-display text-3xl leading-none text-bone">{mean(rts.incongruent)} ms</p>
                <p className="mt-2 text-[12px] text-dim">mismatching trials</p>
              </div>
            </div>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-mute">
              {done.interference < 0
                ? "A negative interference — faster on mismatches than matches — usually means the errors told the story instead. Check the error count: speed bought with accuracy is the classic trade-off, not an exemption."
                : done.interference < 400
                  ? "A textbook Stroop effect. The word is read automatically whether you want it or not, and suppressing it to name the ink costs a few hundred milliseconds every trial."
                  : "A large interference cost. The automatic reading response is winning by a wide margin — which is exactly what the anterior cingulate conflict monitors on the circuits page are for."}
            </p>
            <p className="mt-4 text-sm text-dim">
              {errors} {errors === 1 ? "error" : "errors"} ·{" "}
              {done.improved ? "New best interference on this device." : `Best interference here: ${done.best} ms (lower is better).`}
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-7 rounded-full bg-bone px-6 py-3 text-sm text-ink transition-transform duration-500 ease-fluid active:scale-[0.98]"
            >
              Run it again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
