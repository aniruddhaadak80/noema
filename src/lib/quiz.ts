import { CONSCIOUSNESS_THEORIES, MOLECULES, NETWORKS, NUCLEI, SLEEP_STAGES } from "@/data/circuits";
import { BIASES, EXPERIMENTS, MEMORY } from "@/data/mind";
import { POSITIONS, THOUGHT_EXPERIMENTS } from "@/data/questions";
import { LOBES, REGIONS } from "@/data/regions";

/** One multiple-choice item. Everything is generated from the atlas
 *  data files, so the quiz can never drift out of date with the
 *  content it tests. */
export interface QuizItem {
  id: string;
  mode: QuizMode;
  prompt: string;
  /** The exact question, as a reader would phrase it. */
  ask: string;
  options: string[];
  answer: number;
  /** Shown after answering, right or wrong. */
  explain: string;
  href: string;
}

export type QuizMode = "mixed" | "atlas" | "circuits" | "mind" | "questions";

export const QUIZ_MODES: { id: QuizMode; label: string; blurb: string }[] = [
  { id: "mixed", label: "Mixed", blurb: "Eight questions from anywhere in the atlas." },
  { id: "atlas", label: "Atlas", blurb: "Regions: functions, lesions, and the odd detail." },
  { id: "circuits", label: "Circuits", blurb: "Transmitters, nuclei, networks, sleep, theories." },
  { id: "mind", label: "Mind", blurb: "Memory, biases, and the experiments behind them." },
  { id: "questions", label: "Questions", blurb: "Positions and thought experiments." },
];

export const ROUND_LENGTH = 8;

function clip(s: string, n: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n).trimEnd()}…` : t;
}

function shuffled<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Three distractors from the same category, never the answer itself. */
function distract(names: string[], answer: string): string[] {
  return shuffled(names.filter((n) => n !== answer)).slice(0, 3);
}

function make(
  id: string,
  mode: QuizMode,
  ask: string,
  prompt: string,
  answer: string,
  names: string[],
  explain: string,
  href: string,
): QuizItem {
  const options = shuffled([answer, ...distract(names, answer)]);
  return { id, mode, ask, prompt, options, answer: options.indexOf(answer), explain, href };
}

function lobeName(id: string): string {
  return LOBES.find((l) => l.id === id)?.name ?? id;
}

function buildBank(): QuizItem[] {
  const bank: QuizItem[] = [];
  const regionNames = REGIONS.map((r) => r.name);

  for (const r of REGIONS) {
    bank.push(
      make(
        `region-fn-${r.id}`,
        "atlas",
        "Which region does this describe?",
        `“${r.functions[0]}”`,
        r.name,
        regionNames,
        `${r.aka?.[0] ? `${r.aka[0]} · ` : ""}${lobeName(r.lobe)}, ${r.hemisphere}.`,
        `/atlas#${r.id}`,
      ),
    );
  }
  // A second, harder pass over lesions for the regions that have a
  // named syndrome attached.
  for (const r of REGIONS.filter((x) =>
    /aphasia|neglect|agnosia|apraxia|amnesia|prosopagnosia|Gerstmann|Balint|Huntington|Parkinson|Gage/i.test(
      x.lesions,
    ),
  )) {
    bank.push(
      make(
        `region-lesion-${r.id}`,
        "atlas",
        "Damage here produces which picture?",
        `“${clip(r.lesions, 170)}”`,
        r.name,
        regionNames,
        r.oddity,
        `/atlas#${r.id}`,
      ),
    );
  }

  const molNames = MOLECULES.map((m) => m.name);
  for (const m of MOLECULES) {
    bank.push(
      make(
        `mol-${m.id}`,
        "circuits",
        "Which transmitter?",
        `“${clip(m.role, 180)}”`,
        m.name,
        molNames,
        `${m.cls}. In deficit: ${clip(m.deficit, 120)}`,
        "/circuits",
      ),
    );
  }

  const nucNames = NUCLEI.map((n) => n.name);
  for (const n of NUCLEI) {
    bank.push(
      make(
        `nuc-${n.id}`,
        "circuits",
        "Which nucleus broadcasts this signal?",
        `“${n.transmitter} — ${n.reach.toLowerCase()}”`,
        n.name,
        nucNames,
        n.location,
        "/circuits",
      ),
    );
  }

  const netNames = NETWORKS.map((n) => n.name);
  for (const n of NETWORKS) {
    bank.push(
      make(
        `net-${n.id}`,
        "circuits",
        "Which network is described?",
        `“Active when ${clip(n.active, 150)}”`,
        n.name,
        netNames,
        `Hubs: ${n.hubs.slice(0, 2).join("; ")}.`,
        "/circuits",
      ),
    );
  }

  const sleepNames = SLEEP_STAGES.map((s) => s.label);
  for (const s of SLEEP_STAGES) {
    bank.push(
      make(
        `sleep-${s.id}`,
        "circuits",
        "Which sleep stage?",
        `“${clip(s.does, 170)}”`,
        s.label,
        sleepNames,
        `${s.share} of the night. ${clip(s.signature, 110)}`,
        "/circuits",
      ),
    );
  }

  const theoryNames = CONSCIOUSNESS_THEORIES.map((t) => t.name);
  for (const t of CONSCIOUSNESS_THEORIES) {
    bank.push(
      make(
        `theory-${t.id}`,
        "circuits",
        "Which theory of consciousness claims this?",
        `“${clip(t.claim, 180)}”`,
        t.name,
        theoryNames,
        `${t.holder}, ${t.year}.`,
        "/circuits",
      ),
    );
  }

  const memNames = MEMORY.map((m) => m.name);
  for (const m of MEMORY) {
    bank.push(
      make(
        `mem-${m.id}`,
        "mind",
        "Which memory system?",
        `“${m.holds}. ${clip(m.signature, 140)}”`,
        m.name,
        memNames,
        `Lasts: ${m.duration.toLowerCase()}.`,
        "/mind",
      ),
    );
  }

  const biasNames = BIASES.map((b) => b.name);
  for (const b of BIASES) {
    bank.push(
      make(
        `bias-${b.id}`,
        "mind",
        "Which bias works like this?",
        `“${clip(b.mechanism, 180)}”`,
        b.name,
        biasNames,
        b.study ? `Documented in ${b.study}.` : `Cost: ${clip(b.cost, 130)}`,
        "/mind",
      ),
    );
  }

  const expNames = EXPERIMENTS.map((e) => e.name);
  for (const e of EXPERIMENTS) {
    bank.push(
      make(
        `exp-${e.id}`,
        "mind",
        "Which experiment found this?",
        `“${clip(e.found, 180)}”`,
        e.name,
        expNames,
        `${e.by}, ${e.year}.`,
        "/mind",
      ),
    );
  }

  const posNames = POSITIONS.map((p) => p.name);
  for (const p of POSITIONS) {
    bank.push(
      make(
        `pos-${p.id}`,
        "questions",
        "Which position holds this?",
        `“${clip(p.claim, 185)}”`,
        p.name,
        posNames,
        `${p.thinker === "—" ? "The problem itself" : p.thinker}, ${p.era}.`,
        "/questions",
      ),
    );
  }

  const teNames = THOUGHT_EXPERIMENTS.map((t) => t.name);
  for (const t of THOUGHT_EXPERIMENTS) {
    bank.push(
      make(
        `te-${t.id}`,
        "questions",
        "Which thought experiment is this?",
        `“${clip(t.scenario, 190)}”`,
        t.name,
        teNames,
        clip(t.reveals, 150),
        "/questions",
      ),
    );
  }

  return bank;
}

let bank: QuizItem[] | null = null;
export function questionBank(): QuizItem[] {
  if (!bank) bank = buildBank();
  return bank;
}

export function bankSize(mode: QuizMode): number {
  const all = questionBank();
  return mode === "mixed" ? all.length : all.filter((q) => q.mode === mode).length;
}

/** A fresh shuffled round: 8 items, options reshuffled per item. */
export function dealRound(mode: QuizMode): QuizItem[] {
  const all = questionBank();
  const pool = shuffled(mode === "mixed" ? all : all.filter((q) => q.mode === mode));
  return pool.slice(0, ROUND_LENGTH).map((q) => {
    const options = shuffled(q.options);
    return { ...q, options, answer: options.indexOf(q.options[q.answer]) };
  });
}
