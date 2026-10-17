"use client";

import { useEffect, useRef, useState } from "react";
import type { Lobe } from "@/lib/types";
import { LOBES } from "@/data/regions";

export default function LobePicker({ onLobe }: { onLobe: (l: Lobe | "all") => void }) {
  const [active, setActive] = useState<Lobe | "all">("all");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (!ref.current) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>("[role=button]"));
        const i = nodes.indexOf(document.activeElement as HTMLElement);
        nodes[Math.min(i + 1, nodes.length - 1)]?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>("[role=button]"));
        const i = nodes.indexOf(document.activeElement as HTMLElement);
        nodes[Math.max(i - 1, 0)]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        ref.current.querySelector<HTMLElement>("[role=button]")?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>("[role=button]"));
        nodes[nodes.length - 1]?.focus();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <div className="px-4 py-6 sm:px-6">
      <p className="eyebrow mb-3">Navigate by lobe</p>
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Brain lobes"
        className="flex gap-2 sm:flex-wrap sm:max-w-md"
      >
        {[
          { id: "all", name: "All lobes" },
          ...LOBES.map((l) => ({ id: l.id as Lobe, name: l.name.replace(" lobe", "") })),
        ].map((l) => (
          <button
            key={l.id}
            type="button"
            role="button"
            aria-pressed={active === l.id}
            tabIndex={active === l.id ? 0 : -1}
            onClick={() => {
              setActive(l.id as Lobe | "all");
              onLobe(l.id as Lobe | "all");
            }}
            className={`rounded-full px-3 py-1.5 text-[12px] transition-all duration-500 ease-fluid ${
              active === l.id
                ? "bg-bone text-ink"
                : "text-mute ring-1 ring-white/[0.08] hover:text-bone hover:ring-white/20"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
}
