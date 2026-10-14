"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Tag } from "@/components/ui";

type Stage =
  | { name: "idle" }
  | { name: "showing"; digits: string; shown: number }
  | { name: "recall"; digits: string }
  | { name: "done"; span: number; best: number; improved: boolean };

const BEST_KEY = "noema-digit-best";
const MAX_LEN = 9;

function readBest(): number {
  try {
    return Number(window.localStorage.getItem(BEST_KEY) ?? 0) || 0;
  } catch {
    return 0;
  }
}

function freshDigits(n: number): string {
  let s = "";
  while (s.length < n) {
    const d = String(Math.floor(Math.random() * 10));
    // No immediate repeats — those are free points, not memory.
    if (d !== s[s.length - 1]) s += d;
  }
  return s;
}

/** The 1956 experiment, runnable. Digits appear one per second; type
 *  them back in order. Two consecutive failures at a length ends the
 *  run, and the span is the longest length cleared. */
export default function DigitSpan() {
  const [stage, setStage] = useState<Stage>({ name: "idle" });
  const [length, setLength] = useState(3);
  const [fails, setFails] = useState(0);
  const [entry, setEntry] = useState("");
  const [flash, setFlash] = useState<"good" | "bad" | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const begin = useCallback((len: number) => {
    clearTimers();
    setEntry("");
    setFlash(null);
    const digits = freshDigits(len);
    setStage({ name: "showing", digits, shown: 0 });
    for (let i = 0; i < len; i++) {
      timers.current.push(
        window.setTimeout(() => {
          setStage((s) => (s.name === "showing" ? { ...s, shown: i + 1 } : s));
        }, 500 + i * 1000),
      );
    }
    timers.current.push(
      window.setTimeout(() => {
        setStage((s) => (s.name === "showing" ? { name: "recall", digits } : s));
      }, 500 + len * 1000 + 300),
    );
  }, []);

  const start = useCallback(() => {
    setLength(3);
    setFails(0);
    begin(3);
  }, [begin]);

  const finish = useCallback(
    (span: number) => {
      const prev = readBest();
      const improved = span > prev;
      try {
        window.localStorage.setItem(BEST_KEY, String(Math.max(prev, span)));
      } catch {
        /* private mode */
      }
      setStage({ name: "done", span, best: Math.max(prev, span), improved });
    },
    [],
  );

  const submit = useCallback(
    (value: string) => {
      setStage((s) => {
        if (s.name !== "recall") return s;
        if (value === s.digits) {
          const nextLen = length + 1;
          if (nextLen > MAX_LEN) {
            window.setTimeout(() => finish(MAX_LEN), 350);
            setFlash("good");
            return s;
          }
          window.setTimeout(() => {
            setLength(nextLen);
            setFails(0);
            begin(nextLen);
          }, 650);
          setFlash("good");
          return s;
        }
        const nextFails = fails + 1;
        if (nextFails >= 2) {
          window.setTimeout(() => finish(length - 1), 650);
          setFlash("bad");
          return s;
        }
        window.setTimeout(() => {
          setFails(nextFails);
          begin(length);
        }, 900);
        setFlash("bad");
        return s;
      });
    },
    [length, fails, begin, finish],
  );

  const press = (d: string) => {
    if (stage.name !== "recall") return;
    const next = (entry + d).slice(0, stage.digits.length);
    setEntry(next);
    if (next.length === stage.digits.length) submit(next);
  };

  const backspace = () => {
    if (stage.name === "recall") setEntry((e) => e.slice(0, -1));
  };

  useEffect(() => {
    if (stage.name !== "recall") return;
    const onKey = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") backspace();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage.name, entry, length, fails]);

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-panel ring-1 ring-white/[0.06]">
      <div className="border-b border-hair px-6 py-5 sm:px-8">
        <p className="eyebrow">The 1956 experiment, runnable</p>
      </div>

      <div className="px-6 py-8 sm:px-8">
        {stage.name === "idle" && (
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[1.0625rem] leading-relaxed text-mute">
              Digits appear one per second. Type them back in order. The
              list grows each time you clear it and stops after two
              consecutive failures. Most adults land between 5 and 9
              going forward — which is why Miller&rsquo;s 7±2 survived
              as long as it did, and why Cowan&rsquo;s 4±1 replaced it
              once chunking was controlled for.
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-7 rounded-full bg-bone px-6 py-3 text-sm text-ink transition-transform duration-500 ease-fluid active:scale-[0.98]"
            >
              Start with three digits
            </button>
          </div>
        )}

        {stage.name === "showing" && (
          <div className="mx-auto max-w-xl text-center" aria-live="polite">
            <p className="text-[12px] tracking-[0.14em] text-dim uppercase">
              Memorise · {stage.digits.length} digits
            </p>
            <div className="mt-6 flex min-h-24 items-center justify-center gap-3">
              {stage.digits.split("").map((d, i) => (
                <span
                  key={i}
                  className={`grid size-14 place-items-center rounded-2xl font-display text-3xl ring-1 transition-all duration-300 ${
                    i < stage.shown
                      ? "bg-white/[0.06] text-bone ring-white/20"
                      : "text-transparent ring-white/[0.06]"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-dim">Watch. Typing comes next.</p>
          </div>
        )}

        {stage.name === "recall" && (
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[12px] tracking-[0.14em] text-dim uppercase" aria-live="polite">
              Your turn · {stage.digits.length} digits
            </p>
            <div
              className={`mx-auto mt-6 flex min-h-16 items-center justify-center gap-2 rounded-2xl px-4 ring-1 transition-colors duration-300 ${
                flash === "good"
                  ? "ring-gfp/60"
                  : flash === "bad"
                    ? "ring-vessel/60"
                    : "ring-white/[0.08]"
              }`}
              aria-live="polite"
            >
              <span className="font-display text-3xl tracking-[0.2em] text-bone">
                {entry || "···"}
              </span>
            </div>
            <div className="mx-auto mt-6 grid max-w-60 grid-cols-3 gap-2" role="group" aria-label="Digit keypad">
              {"123456789".split("").map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => press(d)}
                  className="rounded-xl bg-white/[0.04] py-3 font-display text-xl text-bone ring-1 ring-white/[0.07] transition-all duration-300 hover:bg-white/[0.08] active:scale-[0.96]"
                >
                  {d}
                </button>
              ))}
              <span />
              <button
                type="button"
                onClick={() => press("0")}
                className="rounded-xl bg-white/[0.04] py-3 font-display text-xl text-bone ring-1 ring-white/[0.07] transition-all duration-300 hover:bg-white/[0.08] active:scale-[0.96]"
              >
                0
              </button>
              <button
                type="button"
                onClick={backspace}
                aria-label="Delete last digit"
                className="rounded-xl bg-white/[0.04] py-3 text-sm text-mute ring-1 ring-white/[0.07] transition-all duration-300 hover:text-bone active:scale-[0.96]"
              >
                ⌫
              </button>
            </div>
            <p className="mt-5 text-[12px] text-dim">
              Length {length} · {fails === 0 ? "first attempt" : "second attempt — fail this and the run ends"}
            </p>
          </div>
        )}

        {stage.name === "done" && (
          <div className="mx-auto max-w-xl text-center">
            <Tag s={stage.span >= 7 ? "gfp" : stage.span >= 5 ? "melanin" : "vessel"}>
              Span {stage.span}
            </Tag>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-mute">
              {stage.span >= 7
                ? "At or above the classic forward average. You are almost certainly chunking — grouping digits into pairs or familiar runs — which is exactly the strategy Cowan controlled away to get 4±1."
                : stage.span >= 5
                  ? "Squarely in the normal adult range. Unrelated items without a chunking strategy hold at about four; digits allow a little more because everyone chunks them a little."
                  : "Below the usual forward range, which most often means the task was unfamiliar rather than the memory small. Run it again — the second attempt is usually a digit longer."}
            </p>
            <p className="mt-4 text-sm text-dim">
              {stage.improved ? "New best on this device." : `Best on this device: ${stage.best}.`}
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-7 rounded-full bg-bone px-6 py-3 text-sm text-ink transition-transform duration-500 ease-fluid active:scale-[0.98]"
            >
              Run it again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
