import type { SearchEntry } from "@/lib/types";
import { REGIONS, LOBES } from "@/data/regions";
import { MOLECULES, NETWORKS, NUCLEI, SLEEP_STAGES, CONSCIOUSNESS_THEORIES } from "@/data/circuits";
import { MEMORY, BIASES, EXPERIMENTS, FORGETTING, CONCEPTS } from "@/data/mind";
import { POSITIONS, THOUGHT_EXPERIMENTS, COMPARISONS } from "@/data/questions";

/** Keeps the literal stain string from widening to `string` when the
 *  mapped arrays are spread into one list. */
const entry = (e: SearchEntry) => e;

export const NUMBERS = [
  {
    value: "61–95",
    unit: "billion neurons",
    note:
      "The range across every whole-brain count ever performed. The famous 86 billion is a four-brain average with a confidence interval of roughly 73–99 billion, and the underlying data have never been published.",
    stain: "gfp" as const,
  },
  {
    value: "~1:1",
    unit: "glia to neurons",
    note:
      "Not the 10:1 taught for fifty years. That figure had no primary source, and the isotropic fractionator — validated independently by two groups — found glia and neurons in near-equal numbers.",
    stain: "golgi" as const,
  },
  {
    value: "~80%",
    unit: "of neurons in the cerebellum",
    note:
      "About 69 billion granule cells in a structure that is a tenth of the brain's volume. The cerebral cortex holds around 16 billion, not the 100 billion often attributed to it.",
    stain: "melanin" as const,
  },
  {
    value: "~20",
    unit: "watts at rest",
    note:
      "Roughly a fifth of basal metabolism, for two per cent of body mass. Neurons account for most of it, and the cost is not the spikes but the synapses and the recovery from them.",
    stain: "vessel" as const,
  },
  {
    value: "5–9",
    unit: "cycles per second",
    note:
      "The theta range of hippocampal sharp-wave ripples. Under about 100 times faster than the cortical oscillation they ride on, which is the closest thing the brain has to a clock.",
    stain: "gfp" as const,
  },
  {
    value: "200",
    unit: "million axons crossing",
    note:
      "The corpus callosum. Evolution built a second brain and then wired them together point for point, which is why the question of what the two hemispheres are separately for still has an answer.",
    stain: "melanin" as const,
  },
  {
    value: "~100ms",
    unit: "threat detection, minimum",
    note:
      "The amygdala's earliest measurable response, ahead of the visual cortex's own processing of the same stimulus. Fast, accurate, and with a false-alarm rate that has to be tuned somewhere.",
    stain: "vessel" as const,
  },
  {
    value: "4",
    unit: "chunks in working memory",
    note:
      "Cowan's estimate, replacing Miller's seven-plus-or-minus-two. Miller's number came from digit span and has been largely superseded by work that measured capacity more directly.",
    stain: "golgi" as const,
  },
];

export const SEARCH_INDEX: SearchEntry[] = [
  ...REGIONS.map((r) =>
    entry({
      id: `region-${r.id}`,
      title: r.name,
      kind: "Region",
      href: `/atlas#${r.id}`,
      blurb: r.aka?.join(", ") ?? LOBES.find((l) => l.id === r.lobe)?.name ?? "",
      stain: r.stain,
    }),
  ),
  ...LOBES.map((l) => entry({
    id: `lobe-${l.id}`,
    title: l.name,
    kind: "Lobe",
    href: "/atlas",
    blurb: l.summary.slice(0, 110),
    stain: l.stain,
  })),
  ...MOLECULES.map((m) => entry({
    id: `mol-${m.id}`,
    title: m.name,
    kind: "Molecule",
    href: "/circuits",
    blurb: `${m.cls} · ${m.role.slice(0, 90)}`,
    stain: m.stain,
  })),
  ...NUCLEI.map((n) => entry({
    id: `nuc-${n.id}`,
    title: n.name,
    kind: "Nucleus",
    href: "/circuits",
    blurb: `${n.transmitter} · ${n.location}`,
    stain: "golgi" as const,
  })),
  ...NETWORKS.map((n) => entry({
    id: `net-${n.id}`,
    title: n.name,
    kind: "Network",
    href: "/circuits",
    blurb: `${n.abbreviation} · ${n.hubs[0]}`,
    stain: n.stain,
  })),
  ...SLEEP_STAGES.map((s) => entry({
    id: `sleep-${s.id}`,
    title: s.label,
    kind: "Sleep",
    href: "/circuits",
    blurb: s.does.slice(0, 100),
    stain: s.stain,
  })),
  ...CONSCIOUSNESS_THEORIES.map((t) => entry({
    id: `th-${t.id}`,
    title: t.name,
    kind: "Theory",
    href: "/circuits",
    blurb: `${t.holder} · ${t.year}`,
    stain: t.stain,
  })),
  ...MEMORY.map((m) => entry({
    id: `mem-${m.id}`,
    title: m.name,
    kind: "Memory",
    href: "/mind",
    blurb: m.holds,
    stain: m.stain,
  })),
  ...BIASES.map((b) => entry({
    id: `bias-${b.id}`,
    title: b.name,
    kind: "Bias",
    href: "/mind",
    blurb: b.mechanism.slice(0, 105),
    stain: b.stain,
  })),
  ...EXPERIMENTS.map((e) => entry({
    id: `exp-${e.id}`,
    title: e.name,
    kind: "Experiment",
    href: "/mind",
    blurb: `${e.by}, ${e.year}`,
    stain: e.stain,
  })),
  ...FORGETTING.map((f) => entry({
    id: `fgt-${f.name}`,
    title: f.name,
    kind: "Memory effect",
    href: "/mind",
    blurb: f.finding.slice(0, 105),
    stain: f.stain,
  })),
  ...CONCEPTS.map((c) => entry({
    id: `con-${c.id}`,
    title: c.term,
    kind: "Concept",
    href: "/mind",
    blurb: c.body.slice(0, 105),
    stain: c.stain,
  })),
  ...POSITIONS.map((p) => entry({
    id: `pos-${p.id}`,
    title: p.name,
    kind: p.family === "mind-body" ? "Mind–body" : "Philosophy",
    href: "/questions",
    blurb: `${p.thinker === "—" ? "" : `${p.thinker}, `}${p.era}`,
    stain: p.stain,
  })),
  ...THOUGHT_EXPERIMENTS.map((t) => entry({
    id: `te-${t.id}`,
    title: t.name,
    kind: "Thought experiment",
    href: "/questions",
    blurb: t.pulls.slice(0, 105),
    stain: t.stain,
  })),
  ...COMPARISONS.map((c) => entry({
    id: `cmp-${c.id}`,
    title: c.axis,
    kind: "Comparison",
    href: "/mirror",
    blurb: c.verdict.slice(0, 105),
    stain: c.stain,
  })),
  entry({
    id: "tool-recall",
    title: "Recall — test yourself",
    kind: "Tool",
    href: "/recall",
    blurb: "Eight questions per round, generated from the atlas itself",
    stain: "melanin",
  }),
  entry({
    id: "tool-search",
    title: "Search everything",
    kind: "Tool",
    href: "/atlas",
    blurb: "⌘K from anywhere — regions, molecules, biases, positions",
    stain: "gfp",
  }),
];

export const SECTIONS = [
  {
    href: "/atlas",
    index: "01",
    title: "Atlas",
    subtitle: "The anatomy, region by region",
    body:
      "An interactive lateral view of the brain. Thirty-one regions, each with what it does, what happens when it stops doing it, and the one detail that does not fit in a textbook sentence.",
    stain: "gfp" as const,
  },
  {
    href: "/circuits",
    index: "02",
    title: "Circuits",
    subtitle: "Chemistry, networks, sleep, consciousness",
    body:
      "Twelve transmitters and what happens when there is too much or too little. The six neuromodulatory nuclei. Seven large-scale networks. A full night of sleep, and the five theories that disagree about what any of it is for.",
    stain: "golgi" as const,
  },
  {
    href: "/mind",
    index: "03",
    title: "Mind",
    subtitle: "Memory, bias, and the studies everyone cites",
    body:
      "Five memory systems with different substrates and different half-lives. Twelve biases, each with the mechanism and the cost. Fourteen experiments — including the two most famous ones, which are both considerably less solid than their reputations.",
    stain: "melanin" as const,
  },
  {
    href: "/questions",
    index: "04",
    title: "Questions",
    subtitle: "What the neuroscience does not settle",
    body:
      "Twenty-four positions on the mind–body problem, consciousness, free will, personal identity and 4E cognition. Each one with what it claims and what it costs to hold.",
    stain: "vessel" as const,
  },
  {
    href: "/mirror",
    index: "05",
    title: "Mirror",
    subtitle: "The other kind of brain",
    body:
      "Twelve axes of comparison against a 2026 frontier model, with the evidence rather than the analogy. Including the part where hardware has already caught up and the part where it has not.",
    stain: "gfp" as const,
  },
];
