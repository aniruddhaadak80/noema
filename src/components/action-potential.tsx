"use client";

import { useEffect, useRef, useState } from "react";

/** Five snapshots of the ~2 ms that everything else on this page is
 *  about. A pulse travels the axon on a loop; the phase stepper
 *  below walks the membrane voltage through the canonical trace. */

const PHASES = [
  {
    id: "resting",
    label: "Resting",
    voltage: "−70 mV",
    x: 120,
    y: 148,
    na: "closed",
    k: "leak open",
    body: "The pump has done its work: sodium out, potassium in, and the inside sits seventy millivolts below the outside. Nothing is happening, which is the achievement.",
  },
  {
    id: "threshold",
    label: "Threshold",
    voltage: "−55 mV",
    x: 218,
    y: 148,
    na: "opening",
    k: "leak open",
    body: "A stimulus nudges the membrane past threshold. Voltage-gated sodium channels begin to open — a few at first, then all of them, because each opening makes the next more likely.",
  },
  {
    id: "depol",
    label: "Depolarisation",
    voltage: "+40 mV",
    x: 316,
    y: 40,
    na: "flood in",
    k: "opening",
    body: "Sodium floods in down its electrochemical gradient and the voltage reverses outright. This is the spike: fast, all-or-nothing, and over in about a millisecond.",
  },
  {
    id: "repol",
    label: "Repolarisation",
    voltage: "−90 mV",
    x: 430,
    y: 176,
    na: "inactivated",
    k: "flood out",
    body: "Sodium channels slam inactivated and potassium floods out. The voltage falls past resting — an undershoot — because the potassium gates are slow to close.",
  },
  {
    id: "refractory",
    label: "Refractory",
    voltage: "−70 mV",
    x: 560,
    y: 148,
    na: "resetting",
    k: "pump restoring",
    body: "For a few milliseconds no new spike can start, which is what forces the signal to travel in one direction. The pump restores the gradients; the membrane is ready again.",
  },
];

/* Canonical trace, drawn once, marker placed per phase. */
const TRACE =
  "M 20,148 L 200,148 L 236,148 L 268,132 L 300,48 L 330,52 L 360,120 L 400,168 L 448,178 L 500,162 L 560,148 L 680,148";

export default function ActionPotential() {
  const [phase, setPhase] = useState(2);
  const [playing, setPlaying] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const svgRef = useRef<SVGSVGElement>(null);
  const current = PHASES[phase];

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        svg.pauseAnimations();
      } catch {
        /* static renderers have nothing to pause */
      }
    }
  }, []);

  const toggle = () => {
    const svg = svgRef.current;
    if (!svg) return;
    try {
      if (playing) svg.pauseAnimations();
      else svg.unpauseAnimations();
    } catch {
      /* no-op */
    }
    setPlaying(!playing);
  };

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-panel ring-1 ring-white/[0.06]">
      {/* The fibre. Pulse loops via SMIL so there is no JS ticker. */}
      <div className="border-b border-hair px-6 pt-6 pb-2 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">A myelinated axon, one spike</p>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            className="rounded-full px-3 py-1.5 text-[12px] text-mute ring-1 ring-white/10 transition-colors duration-500 hover:text-bone"
          >
            {playing ? "Pause pulse" : "Run pulse"}
          </button>
        </div>
        <svg
          ref={svgRef}
          viewBox="0 0 700 120"
          className="mt-2 w-full"
          role="img"
          aria-label="Animation of an action potential travelling down a myelinated axon"
        >
          <line x1="10" y1="60" x2="690" y2="60" stroke="#5d6273" strokeWidth="3" strokeLinecap="round" />
          {[90, 210, 330, 450, 570].map((x) => (
            <g key={x}>
              <rect x={x - 52} y={38} width={96} height={44} rx={22} fill="#171a26" stroke="#343a4b" strokeWidth="1.2" />
              <line x1={x - 40} y1={60} x2={x + 40} y2={60} stroke="#343a4b" strokeWidth="1" />
            </g>
          ))}
          <g>
            <circle r="16" fill="#e2458b" opacity="0.18">
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M 10,60 L 690,60" />
            </circle>
            <circle r="5" fill="#e2458b">
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M 10,60 L 690,60" />
            </circle>
          </g>
          <text x="10" y="108" fill="#5d6273" fontSize="13" fontFamily="sans-serif">dendrites</text>
          <text x="640" y="108" fill="#5d6273" fontSize="13" fontFamily="sans-serif">terminals</text>
        </svg>
      </div>

      {/* The trace. */}
      <div className="px-6 pt-6 sm:px-8">
        <svg
          viewBox="0 0 700 210"
          className="w-full"
          role="img"
          aria-label={`Membrane voltage trace, currently at ${current.label}, ${current.voltage}`}
        >
          {[40, 148].map((y) => (
            <line key={y} x1="20" y1={y} x2="680" y2={y} stroke="#22262f" strokeWidth="1" strokeDasharray="4 5" />
          ))}
          <text x="24" y="34" fill="#5d6273" fontSize="12" fontFamily="sans-serif">+40 mV</text>
          <text x="24" y="142" fill="#5d6273" fontSize="12" fontFamily="sans-serif">−70 mV</text>
          <path d={TRACE} fill="none" stroke="#45e0c4" strokeWidth="2.2" strokeLinejoin="round" />
          <g style={{ transition: "transform 600ms var(--ease-fluid)" }}>
            <circle cx={current.x} cy={current.y} r="14" fill="#45e0c4" opacity="0.18" />
            <circle cx={current.x} cy={current.y} r="5" fill="#45e0c4" />
          </g>
        </svg>
      </div>

      {/* The stepper. */}
      <div className="px-6 pb-6 sm:px-8 sm:pb-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Action potential phases">
          {PHASES.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPhase(i)}
              aria-pressed={i === phase}
              className={`rounded-full px-3.5 py-1.5 text-[13px] transition-all duration-500 ease-fluid ${
                i === phase
                  ? "bg-bone text-ink"
                  : "text-mute ring-1 ring-white/10 hover:text-bone hover:ring-white/25"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div key={current.id} style={{ animation: "noema-rise 450ms var(--ease-fluid) both" }}>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <p className="font-display text-[2rem] leading-none text-bone">{current.voltage}</p>
            <p className="text-sm text-dim">
              Na<sup>+</sup> channels <span className="text-golgi">{current.na}</span>
              {" · "}K<sup>+</sup> channels <span className="text-gfp">{current.k}</span>
            </p>
          </div>
          <p className="prose-measure mt-3 text-[0.95rem] leading-relaxed text-mute">
            {current.body}
          </p>
        </div>
      </div>
    </div>
  );
}
