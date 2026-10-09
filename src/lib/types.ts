/** Shared shapes for the atlas. Kept deliberately flat so the
 *  content files stay readable as documents rather than schemas. */

export type Stain = "golgi" | "gfp" | "melanin" | "vessel";

export type Lobe =
  | "frontal"
  | "parietal"
  | "temporal"
  | "occipital"
  | "insula"
  | "cingulate"
  | "subcortical"
  | "brainstem"
  | "cerebellum"
  | "commissural";

export interface Region {
  id: string;
  name: string;
  /** Alternate names and the eponyms people actually search for. */
  aka?: string[];
  lobe: Lobe;
  hemisphere: "left" | "right" | "bilateral";
  /** Normalised path on the 1000×760 brain canvas. */
  path: string;
  cx: number;
  cy: number;
  stain: Stain;
  functions: string[];
  /** What goes wrong when it goes wrong. */
  lesions: string;
  /** The one detail that does not fit in a textbook sentence. */
  oddity: string;
}

export interface LobeMeta {
  id: Lobe;
  name: string;
  /** Divider y on the brain canvas, for the lobe filter. */
  stain: Stain;
  summary: string;
}

export interface Molecule {
  id: string;
  name: string;
  cls: string;
  precursor: string;
  receptors: string;
  role: string;
  excess: string;
  deficit: string;
  agent: string;
  stain: Stain;
}

export interface Nucleus {
  id: string;
  name: string;
  location: string;
  transmitter: string;
  reach: string;
  signature: string;
}

export interface Network {
  id: string;
  name: string;
  abbreviation: string;
  hubs: string[];
  active: string;
  inactive: string;
  function: string;
  found: string;
  stain: Stain;
}

export interface SleepStage {
  id: string;
  label: string;
  share: string;
  signature: string;
  does: string;
  stain: Stain;
}

export interface Theory {
  id: string;
  name: string;
  holder: string;
  year: string;
  claim: string;
  stake: string;
  stain: Stain;
}

export interface Bias {
  id: string;
  name: string;
  aka?: string[];
  /** The mechanism in one line — this is the useful column. */
  mechanism: string;
  payoff: string;
  cost: string;
  study?: string;
  stain: Stain;
}

export interface MemorySystem {
  id: string;
  name: string;
  holds: string;
  duration: string;
  substrate: string;
  signature: string;
  stain: Stain;
}

export interface Experiment {
  id: string;
  name: string;
  year: string;
  by: string;
  did: string;
  found: string;
  /** Every famous study has a caveat. This is not optional. */
  caveat: string;
  stain: Stain;
}

export interface Position {
  id: string;
  name: string;
  thinker: string;
  era: string;
  claim: string;
  /** What it costs you to hold this view. */
  price: string;
  family: "mind-body" | "consciousness" | "agency" | "identity" | "embodied";
  stain: Stain;
}

export interface ThoughtExperiment {
  id: string;
  name: string;
  scenario: string;
  pulls: string;
  reveals: string;
  stain: Stain;
}

export interface Comparison {
  id: string;
  axis: string;
  brain: string;
  machine: string;
  /** Whose side the current evidence actually favours, and why. */
  verdict: string;
  stain: Stain;
}

export interface SearchEntry {
  id: string;
  title: string;
  kind: string;
  href: string;
  blurb: string;
  stain: Stain;
}
