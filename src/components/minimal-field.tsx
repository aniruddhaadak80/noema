"use client";

import { useEffect, useRef, useState } from "react";

const DRIFT: [number, number][] = [
  [0.02, 0.01],
  [-0.03, 0.02],
  [0.01, -0.01],
  [-0.02, -0.03],
  [0.03, 0],
];

function makePoints(): [number, number][] {
  return Array.from({ length: 14 }, () => [Math.random() * 100, Math.random() * 100]);
}

export default function MinimalField() {
  const [pts, setPts] = useState<[number, number][]>(makePoints);
  const raf = useRef<number>(0);

  useEffect(() => {
    const step = () => {
      setPts((cur) =>
        cur.map(([x, y], i) => {
          const dx = DRIFT[i % DRIFT.length][0];
          const dy = DRIFT[i % DRIFT.length][1];
          let nx = x + dx;
          let ny = y + dy;
          if (nx < 0) nx = 100;
          if (nx > 100) nx = 0;
          if (ny < 0) ny = 100;
          if (ny > 100) ny = 0;
          return [nx, ny];
        }),
      );
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="w-full" aria-hidden>
      <defs>
        <radialGradient id="spot" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#45e0c4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#06070b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#spot)" />
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={1.4}
          fill="#f2efe6"
          opacity={0.55 + 0.2 * Math.sin(i)}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </svg>
  );
}
