import { ImageResponse } from "next/og";

export const alt = "Noema — an atlas of the mind";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated social card. Inline styles only — no Tailwind, no
 *  custom fonts in the edge runtime — set in a Didone serif with
 *  the atlas palette on the same near-black ground. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#06070b",
          padding: 72,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "system-ui, sans-serif",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5d6273",
          }}
        >
          <div style={{ width: 56, height: 1, backgroundColor: "#45e0c4", marginRight: 16 }} />
          Neuroscience · Psychology · Philosophy
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 118, lineHeight: 1, color: "#f2efe6" }}>An atlas</div>
          <div style={{ fontSize: 118, lineHeight: 1, fontStyle: "italic", color: "#f0b44a" }}>
            of the mind
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontFamily: "system-ui, sans-serif",
            fontSize: 24,
            color: "#8b90a2",
          }}
        >
          <span>
            <span style={{ color: "#45e0c4", fontSize: 34 }}>31</span> regions
          </span>
          <span>
            <span style={{ color: "#e2458b", fontSize: 34 }}>12</span> transmitters
          </span>
          <span>
            <span style={{ color: "#f0b44a", fontSize: 34 }}>24</span> positions
          </span>
          <span>
            <span style={{ color: "#e8613f", fontSize: 34 }}>12</span> comparisons
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
