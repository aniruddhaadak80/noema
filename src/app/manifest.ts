import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Noema — an atlas of the mind",
    short_name: "Noema",
    description:
      "An interactive atlas of the human brain and mind: neuroanatomy, neurochemistry, psychology, philosophy, and brain–AI comparison.",
    start_url: "/",
    display: "standalone",
    background_color: "#06070b",
    theme_color: "#06070b",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
