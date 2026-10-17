"use client";

import { useEffect, useRef, useState } from "react";

const CHANNELS = [
  { id: "Fp1", x: 30, y: 72 },
  { id: "Fp2", x: 70, y: 72 },
  { id: "Fz", x: 50, y: 86 },
  { id: "Cz", x: 50, y: 160 },
  { id: "Pz", x: 50, y: 234 },
  { id: "Oz", x: 50, y: 308 },
  { id: "C3", x: 20, y: 160 },
  { id: "C4", x: 80, y: 160 },
  { id: "P3", x: 20, y: 234 },
  { id: "P4", x: 80, y: 234 },
];

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

type Power = Record<string, number>;

export default function BciDemo() {
  const [mode, setMode] = useState<"rest" | "imagined">("rest");
  const [powers, setPowers] = useState<Power>(() => {
    const p: Power = {};
    for (const c of CHANNELS) p[c.id] = 0.42;
    return p;
  });
  const [dial, setDial] = useState(0.5);
  const raf = useRef(0);
  const t = useRef(0);

  /* Restart the oscillator whenever the inputs change; the animation
     itself reads from the closure, so nothing is mirrored into a ref. */
  useEffect(() => {
    const step = () => {
      t.current += 0.015;
      const tau = t.current;
      /* Imagined movement desynchronises the 8-13 Hz sensorimotor
         rhythm over C3/C4. The dial sets how strongly; the drift keeps
         it from looking like a step function. */
      const base = mode === "imagined" ? dial : 0.04;
      const signal =
        base * (0.6 + 0.25 * Math.sin(tau * 2.4) + 0.12 * Math.sin(tau * 5.7));
      const lateral = signal * (0.55 + 0.45 * Math.sin(tau * 0.31));

      setPowers((cur) => {
        const next: Power = {};
        for (const c of CHANNELS) {
          const sensorimotor = c.id === "C3" || c.id === "C4";
          const target = sensorimotor
            ? 0.42 + lateral
            : 0.42 + 0.05 * Math.sin(tau + c.x * 0.05);
          next[c.id] = (cur[c.id] ?? 0.42) * 0.9 + target * 0.1;
        }
        return next;
      });
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [mode, dial]);

  const c3 = powers.C3 ?? 0;
  const c4 = powers.C4 ?? 0;
  const mean = (c3 + c4) / 2;
  const lateralised = c3 > c4 ? sigmoid((c3 - c4 - 0.02) * 45) : 0;
  const idle = 1 - Math.abs(c3 - c4) * 8;
  const confidence = Math.max(0, Math.min(1, mean * 1.9 - 0.25)) * Math.max(0, idle);

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-panel ring-1 ring-white/[0.06]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-hair px-6 py-5 sm:px-8">
        <div>
          <p className="eyebrow">Brain–computer interface</p>
          <h3 className="mt-1.5 font-display text-[1.6rem] leading-tight text-bone">
            Ten channels, one classifier
          </h3>
        </div>
        <div
          className="flex gap-1.5 rounded-full p-1 ring-1 ring-white/[0.09]"
          role="radiogroup"
          aria-label="Motor imagery mode"
        >
          {(["rest", "imagined"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3.5 py-1.5 text-[12px] transition-all duration-500 ease-fluid ${
                mode === m ? "bg-bone text-ink" : "text-mute hover:text-bone"
              }`}
            >
              {m === "rest" ? "Rest" : "Imagery"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-10 px-6 py-8 sm:px-8 md:grid-cols-[1.1fr_1fr]">
        <div>
          <svg
            viewBox="0 0 100 100"
            className="w-full"
            role="img"
            aria-label="Scalp map of ten electrodes. C3 and C4 brighten with imagined right-hand movement."
          >
            <circle cx="50" cy="60" r="36" fill="#0e1119" stroke="#22262f" strokeWidth="0.6" />
            <circle cx="50" cy="18" r="6" fill="#171a26" stroke="#22262f" strokeWidth="0.6" />
            <rect x="41" y="46" width="18" height="26" rx="6" fill="#10131c" stroke="#22262f" strokeWidth="0.5" />
            <text x="50" y="16" textAnchor="middle" fill="#5d6273" fontSize="5" fontFamily="sans-serif">
              nose
            </text>
            {CHANNELS.map((c) => {
              const p = powers[c.id] ?? 0;
              const hot = p > 0.62;
              return (
                <g key={c.id}>
                  {hot && (
                    <circle cx={c.x} cy={c.y} r="4.6" fill="#e8613f" opacity="0.22" />
                  )}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r="2"
                    fill={hot ? "#e8613f" : "#45e0c4"}
                    opacity={hot ? 1 : 0.5}
                  />
                  <text
                    x={c.x}
                    y={c.y - 3.4}
                    textAnchor="middle"
                    fill="#5d6273"
                    fontSize="4.4"
                    fontFamily="sans-serif"
                  >
                    {c.id}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-6">
            <label htmlFor="bci-dial" className="flex justify-between text-[12px] text-dim">
              <span>Imagery strength</span>
              <span className="tabular-nums text-bone">{Math.round(dial * 100)}%</span>
            </label>
            <input
              id="bci-dial"
              type="range"
              min={0.05}
              max={1}
              step={0.05}
              value={dial}
              onChange={(e) => setDial(Number(e.target.value))}
              className="mt-2 w-full accent-[#45e0c4]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] bg-hair ring-1 ring-white/[0.07]">
            <div className="bg-panel px-4 py-4">
              <p className="font-display text-[1.9rem] leading-none text-bone">
                {(powers.C3 ?? 0).toFixed(2)}
              </p>
              <p className="mt-2 text-[11px] text-dim">μ band, C3 (left)</p>
            </div>
            <div className="bg-panel px-4 py-4">
              <p className="font-display text-[1.9rem] leading-none text-bone">
                {(powers.C4 ?? 0).toFixed(2)}
              </p>
              <p className="mt-2 text-[11px] text-dim">μ band, C4 (right)</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[12px] text-dim">
              <span>Right-hand classifier</span>
              <span className="tabular-nums text-bone">{Math.round(lateralised * 100)}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-hair">
              <div
                className="h-full rounded-full bg-vessel transition-[width] duration-200 ease-fluid"
                style={{ width: `${Math.round(lateralised * 100)}%` }}
              />
            </div>
            <div className="mt-4 flex justify-between text-[12px] text-dim">
              <span>Decoder confidence</span>
              <span className="tabular-nums text-bone">{Math.round(confidence * 100)}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-hair">
              <div
                className={`h-full rounded-full transition-[width] duration-200 ease-fluid ${
                  confidence > 0.45 ? "bg-gfp" : "bg-melanin"
                }`}
                style={{ width: `${Math.round(confidence * 100)}%` }}
              />
            </div>
          </div>

          <p className="prose-measure text-[13px] leading-relaxed text-dim">
            The real system is common-signal average reference, band-pass
            8–13 Hz over the sensorimotor strip, a shrinkage-regularised LDA
            fitted per user, then a cursor driven by the classifier&rsquo;s
            velocity. Bit rates in the clinic sit around 1–2 bits per
            second — roughly half a character every four seconds — and
            calibration routinely takes more time than the session itself.
            The signal here is a smooth oscillator, not a brain.
          </p>
        </div>
      </div>
    </div>
  );
}