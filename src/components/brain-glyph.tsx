import {
  BRAINSTEM,
  CEREBELLUM,
  CEREBRUM,
  SYLVIAN,
  TEMPORAL,
} from "@/data/regions";

/** A compact, static brain glyph. Used as the visual anchor in page
 *  headers — every interior page gets one so the composition has a
 *  object rather than a void, and the object means the same thing as
 *  the page it is on. */
export default function BrainGlyph({
  className = "",
  glow = "gfp",
  folds = true,
}: {
  className?: string;
  glow?: "gfp" | "golgi" | "melanin" | "vessel";
  folds?: boolean;
}) {
  const FOLDS = [
    "M 214,182 C 268,158 322,150 374,160",
    "M 186,232 C 246,208 310,200 372,212",
    "M 168,288 C 236,266 304,258 376,270",
    "M 160,344 C 232,324 304,318 378,328",
    "M 520,146 C 594,138 672,148 742,174",
    "M 536,198 C 608,190 680,200 748,228",
    "M 544,252 C 614,244 680,254 744,282",
    "M 550,308 C 616,302 676,310 734,336",
    "M 660,172 C 738,194 808,234 856,286",
    "M 688,228 C 760,252 822,290 868,340",
    "M 712,286 C 774,310 828,346 870,396",
    "M 300,506 C 380,494 470,492 556,498",
    "M 322,556 C 400,574 486,580 560,572",
    "M 590,536 C 662,528 736,528 790,536",
  ];

  const accent =
    glow === "golgi"
      ? "#e2458b"
      : glow === "melanin"
        ? "#f0b44a"
        : glow === "vessel"
          ? "#e8613f"
          : "#45e0c4";

  return (
    <svg
      viewBox="60 40 920 740"
      className={className}
      role="img"
      aria-label="Diagram of the human brain, lateral view"
    >
      <defs>
        <radialGradient id={`glyph-glow-${glow}`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect
        x="60"
        y="40"
        width="920"
        height="740"
        fill={`url(#glyph-glow-${glow})`}
      />

      {[CEREBELLUM, BRAINSTEM].map((d) => (
        <path
          key={d}
          d={d}
          fill="#f2efe6"
          fillOpacity="0.035"
          stroke="#f2efe6"
          strokeOpacity="0.16"
          strokeWidth="1.4"
        />
      ))}

      {[CEREBRUM, TEMPORAL].map((d) => (
        <path key={d} d={d} fill="#f2efe6" fillOpacity="0.03" />
      ))}

      {folds ? (
        <g stroke={accent} strokeOpacity="0.3" strokeWidth="1.3" fill="none">
          {FOLDS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      ) : null}

      <path
        d={SYLVIAN}
        fill="none"
        stroke={accent}
        strokeOpacity="0.55"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {[CEREBRUM, TEMPORAL].map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="#f2efe6"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
      ))}

      {/* A single synapse flare, so the glyph is not inert. */}
      <g>
        <line
          x1="330"
          y1="250"
          x2="404"
          y2="316"
          stroke={accent}
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
        <circle cx="404" cy="316" r="7" fill={accent} fillOpacity="0.16" />
        <circle cx="404" cy="316" r="2.6" fill={accent} />
        <line
          x1="404"
          y1="316"
          x2="486"
          y2="290"
          stroke={accent}
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
        <circle cx="486" cy="290" r="6" fill={accent} fillOpacity="0.14" />
        <circle cx="486" cy="290" r="2.4" fill={accent} />
      </g>
    </svg>
  );
}
