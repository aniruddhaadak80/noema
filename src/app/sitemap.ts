import type { MetadataRoute } from "next";
import { NAV } from "@/lib/stain";

const SITE = "https://noema-atlas.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "", priority: 1, freq: "weekly" as const },
    ...NAV.map((n) => ({ path: n.href, priority: 0.8, freq: "monthly" as const })),
  ];

  return routes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
