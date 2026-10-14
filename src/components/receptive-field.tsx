"use client";

import { useState } from "react";

export default function ReceptiveField() {
  const [theta, setTheta] = useState(30);
  const [sf, setSf] = useState(1.8);
  const [phase, setPhase] = useState(0);
  const [contrast, setContrast] = useState(0.9);

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-panel ring-1 ring-white/[0.06]">
      <div className="border-b border-hair px-6 py-5 sm:px-8">
        <p className="eyebrow">Receptive field \u00b7 V1 simple cell</p>
      </div>
      <div className="grid gap-10 px-6 py-8 sm:px-8 md:grid-cols-[1.1fr_1fr]">
        <svg viewBox="0 0 320 320" className="w-full" role="img" aria-label="Gabor-like receptive field">
          <defs>
            <filter id="gabor">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
            <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#1b1f2a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="320" height="320" fill="url(#grid)" />
          <g transform={`rotate(${theta},160,160)`} opacity={contrast}>
            <ellipse cx="160" cy="160" rx={36 * sf} ry={14 / sf} fill="#45e0c4" filter="url(#gabor)" />
            <ellipse cx="160" cy="160" rx={22 * sf} ry={8 / sf} fill="#06070b" />
            <ellipse cx="160" cy="160" rx={10 * sf} ry={4 / sf} fill="#e8613f" />
          </g>
        </svg>
        <div className="space-y-6">
          {[
            { label: "Orientation", v: theta, min: 0, max: 180, step: 5, set: setTheta, fmt: "0" },
            { label: "Spatial scale", v: sf, min: 0.8, max: 2.6, step: 0.1, set: setSf, fmt: "1" },
            { label: "Phase", v: phase, min: 0, max: 360, step: 15, set: setPhase, fmt: "0" },
            { label: "Contrast", v: contrast, min: 0.2, max: 1, step: 0.05, set: setContrast, fmt: "0.00" },
          ].map(({ label, v, min, max, step, set, fmt }) => (
            <div key={label}>
              <div className="flex justify-between text-sm">
                <span className="text-mute">{label}</span>
                <span className="text-bone">
                  {fmt === "0" ? Math.round(v) : fmt === "1" ? v.toFixed(1) : v.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={v}
                onChange={(e) => set(Number(e.target.value))}
                className="mt-2 w-full accent-[#45e0c4]"
              />
            </div>
          ))}
          <p className="text-sm text-dim">
            Hubel &amp; Wiesel (1962): a simple cell fires best to an oriented bar of the right width and position.
          </p>
        </div>
      </div>
    </div>
  );
}
