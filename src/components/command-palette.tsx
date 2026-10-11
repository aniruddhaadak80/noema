"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SEARCH_INDEX } from "@/data/index";
import { STAIN } from "@/lib/stain";

/** Subsequence match with a bonus for hits at word starts and a
 *  penalty for gaps. Enough to make "hipp" find hippocampus and
 *  "wgts" find Global Workspace without a dependency. */
function score(query: string, haystack: string): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const t = haystack.toLowerCase();
  if (t.startsWith(q)) return 1000;
  const direct = t.indexOf(q);
  if (direct > -1) return 700 - direct;

  let ti = 0;
  let total = 0;
  let streak = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return -1;
    streak = found === ti ? streak + 1 : 0;
    total += found === 0 || t[found - 1] === " " ? 12 : 3;
    total -= Math.min(6, (found - ti) * 0.4);
    total += streak * 4;
    ti = found + 1;
  }
  return Math.max(1, total);
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return SEARCH_INDEX.slice(0, 14);
    return SEARCH_INDEX.map((e) => ({
      entry: e,
      s: Math.max(
        score(q, e.title),
        score(q, `${e.kind} ${e.title}`) * 0.9,
        score(q, e.blurb) * 0.55,
      ),
    }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 14)
      .map((r) => r.entry);
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const surprise = useCallback(() => {
    const pick = SEARCH_INDEX[Math.floor(Math.random() * SEARCH_INDEX.length)];
    close();
    router.push(pick.href);
  }, [close, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  /** Cursor moves only ever happen in event handlers, so the scroll
   *  follows here rather than in a second effect. */
  const moveCursor = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, results.length - 1));
      setCursor(clamped);
      window.requestAnimationFrame(() => {
        listRef.current?.children[clamped]?.scrollIntoView({ block: "nearest" });
      });
    },
    [results.length],
  );

  const onQuery = useCallback((value: string) => {
    setQuery(value);
    setCursor(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-mute transition-colors duration-500 ease-fluid hover:text-bone"
        aria-label="Search the atlas"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.3" />
          <path d="m10.4 10.4 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-hair px-1.5 py-0.5 font-sans text-[10px] text-dim sm:inline">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search the atlas"
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={close}
            className="absolute inset-0 cursor-default bg-ink/80 backdrop-blur-2xl"
            style={{ animation: "noema-fade 400ms var(--ease-fluid)" }}
          />

          <div
            className="relative w-full max-w-2xl rounded-[1.75rem] bg-white/[0.03] p-1.5 ring-1 ring-white/10"
            style={{ animation: "noema-pop 520ms var(--ease-fluid)" }}
          >
            <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-panel shadow-[inset_0_1px_0_rgba(242,239,230,0.06)]">
              <div className="flex items-center gap-3 border-b border-hair px-5">
                <span className="size-1.5 shrink-0 rotate-45 bg-gfp ring-1 ring-gfp/40" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => onQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      moveCursor(cursor + 1);
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      moveCursor(cursor - 1);
                    }
                    if (e.key === "Enter" && results[cursor]) {
                      e.preventDefault();
                      go(results[cursor].href);
                    }
                  }}
                  placeholder="Search regions, molecules, biases, positions…"
                  className="w-full bg-transparent py-5 text-[0.95rem] text-bone outline-none placeholder:text-dim"
                />
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 rounded border border-hair px-1.5 py-0.5 text-[10px] text-dim transition-colors hover:text-bone"
                >
                  esc
                </button>
              </div>

              <ul ref={listRef} className="max-h-[46vh] overflow-y-auto p-1.5">
                <li>
                  <button
                    type="button"
                    onClick={surprise}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors duration-300 hover:bg-white/[0.05]"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-melanin/10 text-melanin ring-1 ring-melanin/40" aria-hidden>
                      <svg viewBox="0 0 16 16" className="size-3" fill="none">
                        <path
                          d="M13.5 2.5h-11m11 0v11m0-11L8 8M2.5 13.5h11m-11 0v-11m0 11L8 8"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-bone">Surprise me</span>
                    <span className="ml-auto hidden text-xs text-dim sm:block">
                      one of {SEARCH_INDEX.length} entries, at random
                    </span>
                  </button>
                </li>
                {results.length === 0 ? (
                  <li className="px-4 py-8 text-center text-sm text-dim">
                    Nothing matches “{query}”.
                  </li>
                ) : (
                  results.map((entry, i) => (
                    <li key={entry.id}>
                      <Link
                        href={entry.href}
                        onClick={close}
                        onMouseEnter={() => moveCursor(i)}
                        className={`flex items-baseline gap-3 rounded-xl px-4 py-2.5 transition-colors duration-300 ${
                          i === cursor ? "bg-white/[0.05]" : ""
                        }`}
                      >
                        <span
                          className={`size-1.5 shrink-0 translate-y-[-2px] rotate-45 ring-1 ${STAIN[entry.stain].bg} ${STAIN[entry.stain].ring}`}
                          aria-hidden
                        />
                        <span className="shrink-0 text-[10px] tracking-[0.14em] text-dim uppercase">
                          {entry.kind}
                        </span>
                        <span className="truncate text-sm text-bone">{entry.title}</span>
                        <span className="ml-auto hidden truncate text-xs text-dim sm:block">
                          {entry.blurb}
                        </span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>

              <p className="border-t border-hair px-5 py-3 text-[11px] text-dim">
                {results.length} result{results.length === 1 ? "" : "s"} · ↑ ↓ to move, ↵ to open
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
