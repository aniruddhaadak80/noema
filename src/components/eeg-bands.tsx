"use client";

import { useEffect, useState } from "react";

const BANDS = [
  { id: "delta", f: 2, amp: 16, col: "#e8613f" },
  { id: "theta", f: 6, amp: 13, col: "#f0b44a" },
  { id: "alpha", f: 10, amp: 11, col: "#45e0c4" },
  { id: "beta", f: 20, amp: 8, col: "#6ea8fe" },
  { id: "gamma", f: 40, amp: 5, col: "#e2458b" },
];

export default function EegBands() {
  const [t, setT] = useState(0);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduce) return;
    let id = 0;
    const loop = () => {
      setT((x) => x + 0.08);
      id = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(id);
  }, [reduce]);

  const path = (f: number, amp: number) => {
    let d = "M0,60";
    for (let x = 0; x <= 280; x += 2) {
      const y = 60 + amp * Math.sin((x / 280) * 2 * Math.PI * f + t);
      d += ` L${x},${y}`;
    }
    return d;
  };

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-panel ring-1 ring-white/[0.06]">
      <div className="flex items-center justify-between border-b border-hair px-6 py-5 sm:px-8">
        <p className="eyebrow">EEG bands \u00b7 scalp rhythms</p>
        <p className="text-[11px] uppercase tracking-[0.14em] text-dim">\u22481s window</p>
      </div>
      <svg viewBox="0 0 280 120" className="w-full px-4 sm:px-6" aria-hidden>
        {[20, 60, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="#22262f" />
        ))}
        {BANDS.map((b) => (
          <path
            key={b.id}
            d={path(b.f, b.amp)}
            stroke={b.col}
            strokeWidth="1.6"
            fill="none"
            opacity="0.95"
          />
        ))}
      </svg>
      <div className="grid grid-cols-5 gap-px bg-hair text-center text-[12px]">
        {BANDS.map((b) => (
          <div key={b.id} className="bg-panel py-2">
            <p className="capitalize text-bone">{b.id}</p>
            <p className="text-dim">
              {b.f}\u2013{b.f * 2} Hz
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
