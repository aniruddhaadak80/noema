import type { Stain } from "@/lib/types";

/** Tailwind only sees class names it can find as literals in source,
 *  so every utility string here is spelled out rather than built from
 *  a fragment. The stain doubles as the accent key across the app. */
export const STAIN = {
  golgi: {
    hex: "#e2458b",
    text: "text-golgi",
    bg: "bg-golgi",
    soft: "bg-golgi/10",
    line: "border-golgi/30",
    ring: "ring-golgi/40",
  },
  gfp: {
    hex: "#45e0c4",
    text: "text-gfp",
    bg: "bg-gfp",
    soft: "bg-gfp/10",
    line: "border-gfp/30",
    ring: "ring-gfp/40",
  },
  melanin: {
    hex: "#f0b44a",
    text: "text-melanin",
    bg: "bg-melanin",
    soft: "bg-melanin/10",
    line: "border-melanin/30",
    ring: "ring-melanin/40",
  },
  vessel: {
    hex: "#e8613f",
    text: "text-vessel",
    bg: "bg-vessel",
    soft: "bg-vessel/10",
    line: "border-vessel/30",
    ring: "ring-vessel/40",
  },
} as const;

export const stain = (s: Stain) => STAIN[s];

/** Every route in the atlas, in the order the nav shows them. */
export const NAV = [
  { href: "/atlas", label: "Atlas" },
  { href: "/circuits", label: "Circuits" },
  { href: "/mind", label: "Mind" },
  { href: "/questions", label: "Questions" },
  { href: "/mirror", label: "Mirror" },
  { href: "/recall", label: "Recall" },
] as const;
