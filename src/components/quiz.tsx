"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  QUIZ_MODES,
  ROUND_LENGTH,
  bankSize,
  dealRound,
  type QuizItem,
  type QuizMode,
} from "@/lib/quiz";
import { STAIN } from "@/lib/stain";
import { Tag } from "@/components/ui";

type Phase =
  | { name: "setup" }
  | { name: "asking"; index: number; picked: number | null; correct: number; streak: number }
  | { name: "done"; correct: number; best: number; improved: boolean };

const BEST_KEY = "noema-recall-best";

function readBest(): Record<string, number> {
  try {
    return JSON.parse(window.localStorage.getItem(BEST_KEY) ?? "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

const MODE_STAIN: Record<QuizMode, keyof typeof STAIN> = {
  mixed: "melanin",
  atlas: "gfp",
  circuits: "golgi",
  mind: "melanin",
  questions: "vessel",
};

export default function Quiz() {
  const [mode, setMode] = useState<QuizMode>("mixed");
  const [round, setRound] = useState<QuizItem[]>([]);
  const [phase, setPhase] = useState<Phase>({ name: "setup" });

  const stain = STAIN[MODE_STAIN[mode]];

  const start = useCallback((m: QuizMode) => {
    setMode(m);
    setRound(dealRound(m));
    setPhase({ name: "asking", index: 0, picked: null, correct: 0, streak: 0 });
  }, []);

  const answer = useCallback(
    (i: number) => {
      setPhase((p) => {
        if (p.name !== "asking" || p.picked !== null) return p;
        const hit = i === round[p.index].answer;
        return {
          ...p,
          picked: i,
          correct: p.correct + (hit ? 1 : 0),
          streak: hit ? p.streak + 1 : 0,
        };
      });
    },
    [round],
  );

  const next = useCallback(() => {
    setPhase((p) => {
      if (p.name !== "asking") return p;
      if (p.index + 1 >= round.length) {
        const best = readBest();
        const prev = best[mode] ?? 0;
        const improved = p.correct > prev;
        try {
          window.localStorage.setItem(
            BEST_KEY,
            JSON.stringify({ ...best, [mode]: Math.max(prev, p.correct) }),
          );
        } catch {
          /* private mode — the round still counts */
        }
        return { name: "done", correct: p.correct, best: Math.max(prev, p.correct), improved };
      }
      return { ...p, index: p.index + 1, picked: null };
    });
  }, [round.length, mode]);

  useEffect(() => {
    if (phase.name !== "asking") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "4") answer(Number(e.key) - 1);
      if ((e.key === "Enter" || e.key === " ") && phase.picked !== null) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, answer, next]);

  const sizes = useMemo(() => {
    const out = {} as Record<QuizMode, number>;
    for (const m of QUIZ_MODES) out[m.id] = bankSize(m.id);
    return out;
  }, []);

  /* ── Setup ─────────────────────────────────────────────── */
  if (phase.name === "setup") {
    return (
      <div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUIZ_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => start(m.id)}
              className="group rounded-[1.5rem] bg-panel p-6 text-left ring-1 ring-white/[0.06] transition-all duration-500 ease-fluid hover:bg-raised hover:ring-white/[0.14]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.35rem] leading-none text-bone">{m.label}</h3>
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-fluid group-hover:translate-x-1 ${STAIN[MODE_STAIN[m.id]].soft} ${STAIN[MODE_STAIN[m.id]].text}`}
                  aria-hidden
                >
                  <svg viewBox="0 0 16 16" className="size-4" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mute">{m.blurb}</p>
              <p className="mt-4 text-[12px] text-dim">
                {sizes[m.id]} questions in the bank · {ROUND_LENGTH} per round
              </p>
            </button>
          ))}

          <div className="rounded-[1.5rem] bg-panel p-6 ring-1 ring-white/[0.06] sm:col-span-2 lg:col-span-1">
            <Tag s="gfp">How it works</Tag>
            <p className="mt-4 text-sm leading-relaxed text-mute">
              Every question is generated from the atlas itself, with
              distractors drawn from the same category — so a wrong
              answer is always a plausible one. Answer with the mouse
              or keys 1–4, Enter to continue. Your best score per mode
              is kept on this device only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Results ───────────────────────────────────────────── */
  if (phase.name === "done") {
    const pct = Math.round((phase.correct / round.length) * 100);
    const verdict =
      pct === 100
        ? "A clean sweep. The atlas has nothing left to teach you in this mode — try another."
        : pct >= 75
          ? "Strong. The misses are worth chasing down; each one links back to its entry."
          : pct >= 50
            ? "Halfway there. The explanations below each question are the fastest way up."
            : "The atlas is winning. Read the entries it links to, then run it back.";
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Round complete · {QUIZ_MODES.find((m) => m.id === mode)?.label}</p>
        <p className={`mt-6 font-display text-[5rem] leading-none ${stain.text}`}>
          {phase.correct}
          <span className="text-dim">/{round.length}</span>
        </p>
        {phase.improved ? (
          <p className="mt-4 inline-block rounded-full bg-gfp/10 px-3 py-1 text-[12px] text-gfp ring-1 ring-gfp/40">
            New best for this mode
          </p>
        ) : (
          <p className="mt-4 text-sm text-dim">Best in this mode: {phase.best}/{round.length}</p>
        )}
        <p className="prose-measure mx-auto mt-6 text-[1.0625rem] leading-relaxed text-mute">
          {verdict}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => start(mode)}
            className={`rounded-full px-5 py-3 text-sm text-ink transition-transform duration-500 ease-fluid active:scale-[0.98] ${stain.bg}`}
          >
            Run it back
          </button>
          <button
            type="button"
            onClick={() => setPhase({ name: "setup" })}
            className="rounded-full px-5 py-3 text-sm text-mute ring-1 ring-white/10 transition-colors duration-500 hover:text-bone"
          >
            Change mode
          </button>
        </div>
      </div>
    );
  }

  /* ── Asking ────────────────────────────────────────────── */
  const q = round[phase.index];
  const revealed = phase.picked !== null;
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center gap-4">
        <p className="shrink-0 text-[12px] tracking-[0.14em] text-dim uppercase">
          {phase.index + 1} / {round.length}
        </p>
        <div
          className="h-px flex-1 bg-hair"
          role="progressbar"
          aria-valuenow={phase.index + 1}
          aria-valuemin={1}
          aria-valuemax={round.length}
          aria-label="Quiz progress"
        >
          <div
            className={`h-px transition-all duration-700 ease-fluid ${stain.bg}`}
            style={{ width: `${((phase.index + 1) / round.length) * 100}%` }}
          />
        </div>
        <p className="shrink-0 text-[12px] text-dim">
          {phase.correct} right{phase.streak >= 2 ? ` · streak ${phase.streak}` : ""}
        </p>
      </div>

      <div key={q.id} style={{ animation: "noema-rise 500ms var(--ease-fluid) both" }}>
        <p className="eyebrow mt-10">{q.ask}</p>
        <p className="mt-4 max-w-2xl text-[clamp(1.25rem,3vw,1.7rem)] leading-snug text-bone">
          {q.prompt}
        </p>

        <div className="mt-8 grid gap-2.5" role="group" aria-label="Answer choices">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer;
            const isPicked = i === phase.picked;
            const showRight = revealed && isAnswer;
            const showWrong = revealed && isPicked && !isAnswer;
            return (
              <button
                key={opt}
                type="button"
                disabled={revealed}
                onClick={() => answer(i)}
                aria-label={`Option ${i + 1}: ${opt}`}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left ring-1 transition-all duration-500 ease-fluid ${
                  showRight
                    ? "bg-gfp/10 text-bone ring-gfp/50"
                    : showWrong
                      ? "bg-vessel/10 text-bone ring-vessel/50"
                      : revealed
                        ? "bg-panel text-dim ring-white/[0.06]"
                        : "bg-panel text-bone ring-white/[0.06] hover:bg-raised hover:ring-white/[0.16]"
                } ${revealed && !isPicked && !isAnswer ? "opacity-60" : ""}`}
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full text-[12px] ring-1 ${
                    showRight
                      ? "bg-gfp/20 text-gfp ring-gfp/50"
                      : showWrong
                        ? "bg-vessel/20 text-vessel ring-vessel/50"
                        : "text-dim ring-white/10"
                  }`}
                  aria-hidden
                >
                  {showRight ? "✓" : showWrong ? "✕" : i + 1}
                </span>
                <span className="text-[0.95rem]">{opt}</span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          {revealed ? (
            <div
              className="mt-6 rounded-[1.5rem] bg-panel p-6 ring-1 ring-white/[0.06]"
              style={{ animation: "noema-rise 500ms var(--ease-fluid) both" }}
            >
              <p className={`text-sm ${phase.picked === q.answer ? "text-gfp" : "text-vessel"}`}>
                {phase.picked === q.answer
                  ? phase.streak >= 3
                    ? `Right — streak of ${phase.streak}.`
                    : "Right."
                  : `Not quite — the answer is ${q.options[q.answer]}.`}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mute">{q.explain}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={next}
                  className={`rounded-full px-5 py-2.5 text-sm text-ink transition-transform duration-500 ease-fluid active:scale-[0.98] ${stain.bg}`}
                >
                  {phase.index + 1 >= round.length ? "See results" : "Next question"}
                </button>
                <Link
                  href={q.href}
                  className="text-sm text-dim transition-colors duration-500 hover:text-bone"
                >
                  Read the entry →
                </Link>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-[12px] text-dim">Keys 1–4 answer · Enter continues</p>
          )}
        </div>
      </div>
    </div>
  );
}
