"use client";

import { useState } from "react";

export default function SynapseLab() {
  const [mode, setMode] = useState<"excitatory" | "inhibitory" | "modulatory">("excitatory");
  const [release, setRelease] = useState(0.6);
  const [reuptake, setReuptake] = useState(0.35);
  const [receptors, setReceptors] = useState(24);

  const drive = mode === "excitatory" ? 1 : mode === "inhibitory" ? -1 : 0.2;
  const epsp = (release * (1 - reuptake) * receptors * Math.max(0, drive) * 1.1).toFixed(2);
  const ipsp = (release * (1 - reuptake) * receptors * Math.max(0, -drive) * 1.1).toFixed(2);

  const vesicles = Math.round(6 + release * 30);
  const cleftDots = Math.round(4 + release * (1 - reuptake) * 26);

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-panel ring-1 ring-white/[0.06]">
      <div className="border-b border-hair px-6 py-5 sm:px-8">
        <p className="eyebrow">Synaptic cleft · 1 ms, 20,000×</p>
      </div>
      <div className="grid gap-10 px-6 py-8 sm:px-8 md:grid-cols-[1.2fr_1fr]">
        <svg viewBox="0 0 320 260" className="w-full" role="img" aria-label="Synaptic cleft simulation">
          {/* pre-syn */}
          <rect x="10" y="10" width="300" height="70" rx="20" fill="#10131c" />
          <text x="20" y="30" fill="#5d6273" fontSize="12" fontFamily="sans-serif">presynaptic terminal</text>
          {/* vesicles */}
          {Array.from({ length: vesicles }).map((_, i) => {
            const x = 38 + (i * 47) % 250;
            const y = 46 + (i % 3) * 10;
            return <circle key={i} cx={x} cy={y} r="9" fill="#f0b44a" opacity="0.65" />;
          })}
          {/* cleft */}
          <rect x="10" y="86" width="300" height="94" fill="none" stroke="#22262f" strokeDasharray="4 6" />
          <text x="20" y="106" fill="#5d6273" fontSize="12" fontFamily="sans-serif">cleft (about 20 nm)</text>
          {Array.from({ length: cleftDots }).map((_, i) => (
            <circle key={"d" + i} cx={40 + ((i * 113) % 240)} cy={140 + ((i % 4) - 2) * 4} r="3" fill={mode === "inhibitory" ? "#e2458b" : "#45e0c4"} />
          ))}
          {/* post-syn receptors */}
          <g transform="translate(0,180)">
            <rect x="10" y="0" width="300" height="70" rx="20" fill="#10131c" />
            <text x="20" y="22" fill="#5d6273" fontSize="12" fontFamily="sans-serif">postsynaptic membrane</text>
            {Array.from({ length: receptors }).map((_, i) => {
              const x = 30 + i * 11.5;
              return <rect key={i} x={x} y="36" width="6" height="14" rx="2" fill="#8b90a2" opacity="0.8" />;
            })}
          </g>
          {/* reuptake pumps */}
          <g transform="translate(10,90)">
            <text x="0" y="0" fill="#5d6273" fontSize="11" fontFamily="sans-serif">reuptake</text>
            <rect x="0" y="4" width={300 * reuptake} height="6" fill="#e8613f" opacity="0.85" />
          </g>
        </svg>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Synapse mode">
            {(["excitatory", "inhibitory", "modulatory"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`rounded-full px-3.5 py-1.5 text-[13px] transition-all duration-500 ease-fluid ${
                  mode === m ? "bg-bone text-ink" : "text-mute ring-1 ring-white/10 hover:text-bone"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          {[
            { label: "Release prob", v: release, set: setRelease, min: 0.05, max: 0.95 },
            { label: "Reuptake fraction", v: reuptake, set: setReuptake, min: 0, max: 0.9 },
            { label: "Receptor density", v: receptors, set: (n: number) => setReceptors(Math.round(n)), min: 8, max: 48, step: 2 },
          ].map(({ label, v, set, min, max, step }) => (
            <div key={label}>
              <div className="flex justify-between text-sm">
                <span className="text-mute">{label}</span>
                <span className="text-bone">{v.toFixed(label === "Receptor density" ? 0 : 2)}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step ?? 0.01}
                value={v}
                onChange={(e) => set(Number(e.target.value))}
                className="mt-2 w-full accent-[#45e0c4]"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] bg-hair ring-1 ring-white/[0.07]">
            <div className="bg-panel px-4 py-4">
              <p className="font-display text-3xl leading-none text-bone">{epsp}</p>
              <p className="mt-2 text-[12px] text-dim">EPSP (mV-ish)</p>
            </div>
            <div className="bg-panel px-4 py-4">
              <p className="font-display text-3xl leading-none text-bone">{ipsp}</p>
              <p className="mt-2 text-[12px] text-dim">IPSP (mV-ish)</p>
            </div>
          </div>
          <p className="text-sm text-dim">
            Release drives vesicles; receptors bind quoted molecules; reuptake closes the loop. Watch EPSP/IPSP shift.
          </p>
        </div>
      </div>
    </div>
  );
}
