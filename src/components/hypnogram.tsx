/** A typical young-adult night: five ~90-minute cycles, deep sleep
 *  front-loaded, REM lengthening toward morning. Static SVG, no
 *  JavaScript — it is a figure, not an application. */
export default function Hypnogram() {
  const W = 720;
  const H = 300;
  const padL = 52;
  const padB = 34;
  const padT = 16;
  const innerW = W - padL - 12;
  const innerH = H - padT - padB;

  const levels = ["W", "REM", "N1", "N2", "N3"];
  const y = (stage: number) => padT + (stage / (levels.length - 1)) * innerH;
  const x = (min: number) => padL + (min / 480) * innerW;

  /* Stage indices over the night, sampled every 10 minutes. */
  const seq: number[] = [
    0, 2, 3, 3, 4, 4, 4, 4, 3, 3, 2, 3, 1, 1, 2, 3, 3, 4, 4, 4, 3, 3, 2, 2,
    3, 3, 2, 1, 1, 2, 3, 3, 3, 2, 2, 1, 1, 1, 2, 2, 3, 2, 1, 1, 1, 2, 2, 0,
  ];

  let d = `M ${x(0)},${y(seq[0])}`;
  seq.forEach((s, i) => {
    const t = i * 10;
    d += ` L ${x(t)},${y(s)} L ${x(t + 10)},${y(s)}`;
  });

  return (
    <figure className="overflow-hidden rounded-[1.75rem] bg-panel ring-1 ring-white/[0.06]">
      <div className="border-b border-hair px-6 py-5 sm:px-8">
        <p className="eyebrow">One night, 11pm – 7am · stages per 10 minutes</p>
      </div>
      <div className="px-4 pt-6 pb-2 sm:px-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="Hypnogram of a typical night: deep N3 sleep dominates the first half, REM periods lengthen toward morning"
        >
          {levels.map((label, i) => (
            <g key={label}>
              <line
                x1={padL}
                y1={y(i)}
                x2={W - 12}
                y2={y(i)}
                stroke="#22262f"
                strokeWidth="1"
                strokeDasharray={i === 0 ? undefined : "3 5"}
              />
              <text
                x={padL - 10}
                y={y(i) + 4}
                textAnchor="end"
                fill={label === "REM" ? "#e2458b" : label === "N3" ? "#e8613f" : "#5d6273"}
                fontSize="13"
                fontFamily="sans-serif"
              >
                {label}
              </text>
            </g>
          ))}
          {[
            [0, "11pm"],
            [120, "1am"],
            [240, "3am"],
            [360, "5am"],
            [480, "7am"],
          ].map(([m, label]) => (
            <text
              key={label as string}
              x={x(m as number)}
              y={H - 10}
              textAnchor="middle"
              fill="#5d6273"
              fontSize="12"
              fontFamily="sans-serif"
            >
              {label as string}
            </text>
          ))}
          <path d={d} fill="none" stroke="#45e0c4" strokeWidth="2" strokeLinejoin="round" />
          {/* REM bands, shaded so the lengthening reads at a glance. */}
          {[
            [120, 140],
            [270, 300],
            [350, 380],
            [420, 450],
          ].map(([a, b]) => (
            <rect
              key={`${a}-${b}`}
              x={x(a)}
              y={padT}
              width={x(b) - x(a)}
              height={innerH}
              fill="#e2458b"
              opacity="0.07"
            />
          ))}
        </svg>
      </div>
      <figcaption className="border-t border-hair px-6 py-5 text-[13px] leading-relaxed text-dim sm:px-8">
        Deep N3 dominates the first two cycles and all but vanishes after
        ~3am; REM (shaded) starts near twenty minutes and stretches past
        half an hour by morning. Waking briefly between cycles is normal —
        most awakenings are too short to remember.
      </figcaption>
    </figure>
  );
}
