"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/stain";

export default function Shortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "?") { e.preventDefault(); setOpen((v) => !v); }
      else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/80 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.75rem] bg-panel p-6 ring-1 ring-white/[0.09]">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Keyboard shortcuts</p>
          <button type="button" onClick={() => setOpen(false)} className="text-mute">✕</button>
        </div>
        <ul className="mt-5 space-y-2.5">
          <li className="flex justify-between text-sm text-mute"><span>Command palette</span><kbd className="rounded bg-white/5 px-2 py-0.5 text-bone">⌘K</kbd></li>
          <li className="flex justify-between text-sm text-mute"><span>Shortcuts help</span><kbd className="rounded bg-white/5 px-2 py-0.5 text-bone">?</kbd></li>
          <li className="flex justify-between text-sm text-mute"><span>Dismiss help</span><kbd className="rounded bg-white/5 px-2 py-0.5 text-bone">Esc</kbd></li>
          <li className="flex justify-between text-sm text-mute"><span>Answer 1-4 / ⌫</span><kbd className="rounded bg-white/5 px-2 py-0.5 text-bone">Recall, Stroop, DigitSpan</kbd></li>
        </ul>
        <div className="mt-5 border-t border-hair pt-4">
          <p className="text-[12px] text-dim">Site routes:</p>
          <div className="mt-2 grid grid-cols-2 gap-1 text-sm text-mute">
            {NAV.map((n) => (<span key={n.href}>{n.label} — {n.href}</span>))}
          </div>
        </div>
      </div>
    </div>
  );
}
