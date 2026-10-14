import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** App icon and favicon: the initial in Didone serif on ink, with a
 *  Golgi-magenta synapse dot. Generated, like the OG card. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#06070b",
          borderRadius: 112,
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 300, lineHeight: 1, color: "#f2efe6", marginTop: -20 }}>N</div>
        <div
          style={{
            position: "absolute",
            right: 118,
            bottom: 128,
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: "#e2458b",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
