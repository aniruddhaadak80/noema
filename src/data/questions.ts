import type { Comparison, Position, ThoughtExperiment } from "@/lib/types";

export const POSITIONS: Position[] = [
  {
    id: "dualism",
    name: "Substance dualism",
    thinker: "René Descartes",
    era: "1641",
    claim:
      "Mind and body are two distinct kinds of substance: res cogitans, which thinks and has no spatial extent, and res extensa, which has extent and does not think.",
    price:
      "The interaction problem follows immediately. Two substances that share no common properties and share no causal mechanism have no explanation for how one acts on the other. Descartes reached for the pineal gland, which does not solve it.",
    family: "mind-body",
    stain: "vessel",
  },
  {
    id: "interaction",
    name: "The interaction problem",
    thinker: "—",
    era: "17th c.",
    claim:
      "How does a non-spatial, non-material mind cause a physical body to move, and how does a physical body cause a non-material mind to feel anything?",
    price:
      "Any theory of mind that solves this by simply asserting it has exchanged one mystery for another. Theories that dissolve the problem do so by dissolving something else.",
    family: "mind-body",
    stain: "vessel",
  },
  {
    id: "functionalism",
    name: "Functionalism",
    thinker: "Hilary Putnam, Jerry Fodor",
    era: "1967",
    claim:
      "A mental state is defined by its functional role — what it does, and its relations to other states — not by its material. Anything implementing the role is a mind.",
    price:
      "Multiple realizability is both its strength and its problem. If mental states are roles, then a role played by different machinery is still the same state, and the causal consequences of the machinery get pushed outside the explanation.",
    family: "mind-body",
    stain: "gfp",
  },
  {
    id: "typeid",
    name: "Type identity theory",
    thinker: "J.J.C. Smart",
    era: "1959",
    claim:
      "Mental states are not like anything else. To have a mental state is to be a brain in a particular physical state — pain is identical to C-fibre firing, full stop.",
    price:
      "It handles the problem of mental causation elegantly and handles the problem of other minds badly. It also makes the explanatory gap conceptually impossible, which is either the point or the flaw depending on your priors.",
    family: "mind-body",
    stain: "melanin",
  },
  {
    id: "chineseroom",
    name: "The Chinese room",
    thinker: "John Searle",
    era: "1980",
    claim:
      "A man in a room translating Chinese into English from a rulebook understands nothing. Syntax is not semantics, and therefore running the right program is not the same as understanding.",
    price:
      "It is a claim about understanding, not about computation, and Searle's framing makes it easy to answer a different question. The systems reply, that the room plus its rules plus its physical embodiment understands, is coherent but moves the goalposts.",
    family: "mind-body",
    stain: "golgi",
  },
  {
    id: "elim",
    name: "Eliminative materialism",
    thinker: "Paul & Patricia Churchland",
    era: "1978",
    claim:
      "Folklore psychology — beliefs, desires, intentions as commonly understood — will turn out to be like medieval physics about the heavens. Bad theory, replaced rather than corrected.",
    price:
      "It calls for progress without supplying a theory to replace the one it rejects, which is a hard thing to advocate and an easy thing to accuse others of. It has been thirty years of waiting.",
    family: "mind-body",
    stain: "melanin",
  },
  {
    id: "bio",
    name: "Biological naturalism",
    thinker: "John Searle",
    era: "1992",
    claim:
      "Brains cause minds the way any physical system causes any other. The apparent irreducibility comes from our own inability to simulate, not from the ontological gap.",
    price:
      "It concedes the entire phenomenon and explains little. It is arguably the least satisfying answer precisely because it refuses the question that made the field interesting.",
    family: "mind-body",
    stain: "gfp",
  },
  {
    id: "panpsychism",
    name: "Panpsychism",
    thinker: "William James, Bertrand Russell, Giulio Tononi",
    era: "1874",
    claim:
      "Proto-experiential properties go all the way down. Combination is what produces consciousness, and it takes an enormous number of very small things.",
    price:
      "Combination is the hard part and has never been convincingly specified. It risks the combination problem, which is the panpsychist's version of the explanatory gap.",
    family: "consciousness",
    stain: "golgi",
  },
  {
    id: "russellian",
    name: "Russellian monism",
    thinker: "Paul Humphries, T.H. Metzinger",
    era: "1989",
    claim:
      "Physics describes the world relationally, as relations among quanta. We know our own conscious experience non-relationally, by acquaintance. Conscious experience is what the intrinsic nature of matter is like.",
    price:
      "It promises to close the explanatory gap by unifying, but it does so by taking the intrinsic nature of matter to be partly mental, which is a substantive metaphysical commitment rather than an argument.",
    family: "consciousness",
    stain: "vessel",
  },
  {
    id: "hardproblem",
    name: "The hard problem",
    thinker: "David Chalmers",
    era: "1995",
    claim:
      "Everything physical is explained by function and information. What is left over is why there is any subjective experience at all — why these processes feel like anything from the inside.",
    price:
      "Chalmers does not claim it is unanswerable. He claims that answering it requires a new kind of principle, which makes his position a research programme with no methods.",
    family: "consciousness",
    stain: "melanin",
  },
  {
    id: "gaproblem",
    name: "The explanatory gap",
    thinker: "Joseph Levine",
    era: "1983",
    claim:
      "We can explain colour in every physical and functional respect, and still have no explanation of why seeing red is like anything.",
    price:
      "It identifies a real asymmetry without saying whether it needs closing. As a research agenda it has been productive; as an argument it is complete.",
    family: "consciousness",
    stain: "gfp",
  },
  {
    id: "libertarian",
    name: "Libertarian free will",
    thinker: "Roderick Chisholm, Robert Kane",
    era: "1963",
    claim:
      "I could have done otherwise in the relevant circumstances, and that fact is not fixed in advance by the past and the laws. Indeterminism makes freedom possible; determinism abolishes it.",
    price:
      "It requires an agent capable of acting otherwise in exactly the same circumstances, which is difficult to reconcile with a law-governed past. And indeterminism does not obviously deliver authorship — it may just be randomness with extra steps.",
    family: "agency",
    stain: "vessel",
  },
  {
    id: "harddeterminism",
    name: "Hard determinism",
    thinker: "D. H. Melton, Paul van Inwagen",
    era: "2008",
    claim:
      "Determinism and true responsibility are incompatible. If the past is settled, no one could have done otherwise, and praise and blame are unintelligible.",
    price:
      "It reads as moral realism about free will at the cost of moral realism about desert. It also has to be delivered while its holder has, apparently, just chosen to deliver it.",
    family: "agency",
    stain: "golgi",
  },
  {
    id: "compatibilism",
    name: "Compatibilism",
    thinker: "H.H. Price, Daniel Dennett, P.F. Strawson",
    era: "1909",
    claim:
      "Freedom is not the ability to have done otherwise in a counterfactual sense that includes doing otherwise while everything stays the same. Freedom is acting from your own reasons without coercion.",
    price:
      "The counterfactual is not obviously irrelevant to what we care about. Strawson's reaction theory — that our concepts of responsibility are constitutive of who we are, not conclusions about what we do — is the sharpest version.",
    family: "agency",
    stain: "gfp",
  },
  {
    id: "frankfurt",
    name: "Frankfurt cases",
    thinker: "Harry Frankfurt",
    era: "1969",
    claim:
      "A person could have done otherwise, yet would not have, even if the situation had been arranged so that her doing otherwise was not up to her. So the ability to do otherwise is neither necessary nor sufficient for responsibility.",
    price:
      "They break the standard argument from determinism. The replies cluster around whether counterfactual ability still exists at all — which is a more precise but narrower debate.",
    family: "agency",
    stain: "melanin",
  },
  {
    id: "consequence",
    name: "The consequence argument",
    thinker: "Peter van Inwagen",
    era: "1983",
    claim:
      "If determinism is true, our actions are consequences of events in the remote past and the laws — none of which we chose. That we do not choose them does not show that our action was not voluntary. But that we do not choose them is never a ground for holding ourselves responsible.",
    price:
      "It threatens to dissolve responsibility rather than locate it elsewhere. Compatibilists reply that the argument only shows we lack a specific kind of control, not that we lack the control that matters.",
    family: "agency",
    stain: "vessel",
  },
  {
    id: "locke",
    name: "Psychological continuity",
    thinker: "John Locke, Derek Parfit",
    era: "1690",
    claim:
      "Personal identity over time is continuity of psychological connections — memory, intention, character, belief. Bodily persistence is neither necessary nor sufficient.",
    price:
      "It has a problem with memory being circular and mistaken, and with circularity being unavoidable if identity must be a matter of kind. Parfit accepted the reduction rather than defending it.",
    family: "identity",
    stain: "gfp",
  },
  {
    id: "teletransport",
    name: "Teletransportation",
    thinker: "Bernard Williams",
    era: "1956",
    claim:
      "A machine scans you, destroys you, and builds a perfect replica elsewhere. Is the replica you? Williams said no, and that the fear of it is the key to identity.",
    price:
      "Parfit said yes. The case exists to show that continuity of consciousness, not bodily persistence, is the plausible criterion — and it is one of the few thought experiments that changed minds.",
    family: "identity",
    stain: "golgi",
  },
  {
    id: "fission",
    name: "The fission problem",
    thinker: "Derek Parfit",
    era: "1984",
    claim:
      "One brain is gradually split into two, each half retaining full psychological continuity with the original. Identity cannot be one-to-many, so identity is not what we take it to be.",
    price:
      "It is almost universally regarded as a success. What it establishes is a negative result — survival is not a fact about persons — and negative results are hard to build on.",
    family: "identity",
    stain: "melanin",
  },
  {
    id: "bundle",
    name: "Bundle theory",
    thinker: "David Hume",
    era: "1739",
    claim:
      "There is no enduring self, only a bundle of perceptions that succeed each other with an insane resemblance and succession. Identity is a fiction we find convenient, not a substance.",
    price:
      "Hume's own version of the argument — that no impression is constant enough to be the self — does not obviously work for a bundle that includes memory and intention. Bundle theory survives mainly as a rival to substance dualism.",
    family: "identity",
    stain: "vessel",
  },
  {
    id: "narrative",
    name: "Narrative self",
    thinker: "Dan Zahavi, Mary Midgley",
    era: "1999",
    claim:
      "There is no homunculus inside. The self is the ongoing, socially embedded story through which experience is organised and communicated — which is a real thing, even though it is not a person.",
    price:
      "It does not explain why a story should feel like being someone rather than merely having a narrative. Explanatory gap, relocated.",
    family: "identity",
    stain: "gfp",
  },
  {
    id: "extended",
    name: "The extended mind",
    thinker: "Clark & Chalmers",
    era: "1998",
    claim:
      "The boundaries of the cognitive system are drawn around functional organisation, not around the skull. When a notebook is reliably available and used as memory, it is part of the memory system.",
    price:
      "Parity or coupling must be tight and reliable, or the extension dissolves into the whole causal chain. Critics argue the parity principle is stated in terms of exactly what is at issue.",
    family: "embodied",
    stain: "melanin",
  },
  {
    id: "enactivism",
    name: "Enactivism",
    thinker: "Varela, Thompson, Di Paolo",
    era: "1991",
    claim:
      "Cognition is not representation of a world. It is the enactment of a sense-making process that comes with a normativity of its own — a nervous system that cares whether it is getting things right.",
    price:
      "It is phenomenologically informed and empirically thin. Almost nothing in it can be falsified by an experiment, which is either a legitimate criticism of the framework or a failure of imagination on the part of the critic.",
    family: "embodied",
    stain: "golgi",
  },
  {
    id: "predictive",
    name: "Predictive mind",
    thinker: "Andy Clark",
    era: "2013",
    claim:
      "Perception, action and cognition are one process: the settling of predictions against prediction error, with the brain as a hierarchical generative model acting on its own predictions.",
    price:
      "It risks explaining everything and therefore nothing — a well-known failure mode. The response is that a theory which unifies perception, action and the brain is a big deal if it holds, and it is testable in ways most philosophy of mind is not.",
    family: "embodied",
    stain: "gfp",
  },
];

export const THOUGHT_EXPERIMENTS: ThoughtExperiment[] = [
  {
    id: "zombie",
    name: "The philosophical zombie",
    scenario:
      "There is a being physically identical to you, molecule for molecule, which behaves exactly as you do and reports being you — and is not you. No one could tell.",
    pulls: "Functionalism. If behaviour, function and physical structure are all identical and consciousness is not, then consciousness is not a functional or physical property.",
    reveals:
      "The whole force depends on whether you can conceive such a being. Most people find it inconceivable, which is evidence for functionalism and evidence that the argument is not doing what it appears to.",
    stain: "vessel",
  },
  {
    id: "mary",
    name: "Mary the scientist",
    scenario:
      "A scientist knows every physical fact about colour vision. She has never seen colour. On her release she sees red for the first time.",
    pulls: "Physicalism. If she knows everything physical, she should know what seeing red is like — but she does not, until she sees it.",
    reveals:
      "It isolates the knowledge argument from the quality-space argument. If you can say 'there is something she knows that she does not know', then physical facts are not all there is to know.",
    stain: "melanin",
  },
  {
    id: "bat",
    name: "What is it like to be a bat?",
    scenario:
      "You are a bat. You have a sonar-based world. Now imagine that your sonar is disabled, and you learn to echolocate visually.",
    pulls: "Tomas Nagel argues physicalism faces a difficulty in imagining this from the outside — that there is something it is like to be that creature, which is neither you nor your replacement.",
    reveals:
      "The case is about the difficulty of a certain kind of imaginative projection, not about whether bats are conscious. Nagel was explicit that he was not making a claim about other minds.",
    stain: "golgi",
  },
  {
    id: "inverted",
    name: "Inverted spectrum",
    scenario:
      "Two people have identical colour-processing hardware. One of them experiences red as we do; the other experiences what we call red as what we call green. Neither can tell.",
    pulls: "Functionalism. If the two are physically and causally identical and yet differ experientially, then experience is not determined by function.",
    reveals:
      "A philosopher's reply is that the two would behave identically, including in every experiment, so the scenario posits a difference with no consequences — which some regard as a reductio against the scenario rather than a rebuttal of functionalism.",
    stain: "gfp",
  },
  {
    id: "wvs",
    name: "The willing suspension",
    scenario:
      "No one is under hypnosis, drunk, or dreaming — a subject is found whose mental state follows their instructions and whose general capacities are otherwise intact.",
    pulls: "Agency. If you would act differently were you not drugged, the state that produced the inhibition and the state that would have produced the inhibition appear to be the same, and responsibility looks groundless.",
    reveals:
      "It isolates intentional control from the reasons for it, which is the specific move Frankfurt used and that a great deal of the compatibilist literature now turns on.",
    stain: "melanin",
  },
];

export const COMPARISONS: Comparison[] = [
  {
    id: "cells",
    axis: "Elements",
    brain: "60–95 billion neurons, plus a roughly 1:1 population of glial cells",
    machine: "104 billion activated parameters in an open frontier mixture-of-experts model; 2.8 trillion in total",
    verdict:
      "A parameter is not a neuron. One neuron has dendrites, an axon, thousands of synapses, spiking dynamics and an axon that carries signal. The comparison is not one-to-one and reporting it as though it were is misleading in both directions.",
    stain: "gfp",
  },
  {
    id: "code",
    axis: "Signal",
    brain: "Rate and timing of discrete spikes. Information is carried in when a neuron fires and how often",
    machine: "Dense real-valued activations through continuous matrix multiplications. No spikes, no refractory period",
    verdict:
      "Rate coding is the more expensive representation and the more robust one. Silicon is roughly eight orders of magnitude better at analog arithmetic than neurons are, which is the real asymmetry.",
    stain: "melanin",
  },
  {
    id: "power",
    axis: "Power",
    brain: "~20 W, about 20% of basal metabolism, at ~10¹⁴–10¹⁵ synaptic events per second",
    machine: "~0.31 Wh per median query for models above 200B parameters; ~3.91 Wh for a 5,000-token reasoning response",
    verdict:
      "At roughly one joule per output token, a model thinking at human speech rate — about five tokens per second — draws five watts. The brain draws twenty. Hardware efficiency crossed over around 2024–25 and nobody noticed, because it was the least economically interesting of the three comparisons.",
    stain: "vessel",
  },
  {
    id: "learning",
    axis: "Learning",
    brain: "Local, unsupervised, error-driven. Every synapse updates from its own pre- and post-synaptic activity, continuously",
    machine: "Global, supervised by a loss function, and expensive: the entire parameter set is updated on every step",
    verdict:
      "Backpropagation is not how the brain learns. The brain has no backwards pass, no global loss, and no synchronised update. Predictive coding, dendritic error signals, equilibium propagation and three-factor rules are the live candidates.",
    stain: "golgi",
  },
  {
    id: "forget",
    axis: "Plasticity",
    brain: "Interleaved rehearsal and structured forgetting, and it is why you can learn without erasing",
    machine: "Catastrophic forgetting. Sequential training on new distributions destroys the old model unless the new data is replayed",
    verdict:
      "This is the cleanest architectural gap and the least discussed. The brain's replay during sleep and its interleaved scheduling are what a machine needs and does not have.",
    stain: "melanin",
  },
  {
    id: "efficiency",
    axis: "Sample efficiency",
    brain: "A child sees perhaps a thousand labelled examples of a word and has a concept. Machines want millions",
    machine: "Enormous data appetite, improved by synthetic data and pretraining at scale",
    verdict:
      "Machines learn faster per unit of compute and far slower per unit of experience. Both are true, and they are the reason the two are not straightforwardly comparable.",
    stain: "gfp",
  },
  {
    id: "throughput",
    axis: "Delivered cognition",
    brain: "Roughly 10 bits per second of consciously available information, on 20 watts",
    machine: "Silicon is now within a factor of a few of the brain in operations per joule, and often ahead",
    verdict:
      "The brain's substrate is competitive and its bottleneck is behavioural. Zheng and Meister put conscious throughput near 10 bits per second against sensory input near 10⁹ bits per second. Beating the brain on hardware is not the same as beating it on outcomes.",
    stain: "vessel",
  },
  {
    id: "embodied",
    axis: "Grounding",
    brain: "A body, a nervous system, thirty billion years of evolved sensorimotor coupling, continuous homeostasis",
    machine: "Text and pixels, and increasingly sound and video, with no body and no stakes",
    verdict:
      "Whether grounding is necessary for understanding is the live argument. It matters a great deal for reliability and for anything involving continuous action, and rather less for the sort of question a language model is asked at a text box.",
    stain: "golgi",
  },
  {
    id: "neuromorphic",
    axis: "Hardware that copies it",
    brain: "20 W, event-driven, locally computed, no clock",
    machine: "Loihi 2 and TrueNorth spike in event-driven, locally computed, clock-free silicon",
    verdict:
      "Neuromorphic chips exist and are used at the edges. They have not taken over, mostly because their programming models are far harder and general-purpose GPUs keep getting more efficient faster than the alternatives get easier.",
    stain: "melanin",
  },
  {
    id: "conscious",
    axis: "Consciousness",
    brain: "Experiences something. There is no explanation for why, and this is the hard problem",
    machine: "No evidence that current systems experience anything. Reporting is not access to an inner state",
    verdict:
      "An attention schema account predicts consciousness-like behaviour in systems that model their own attention, which means behaviour may not settle the question. This is where the honest position is that nobody knows, and that both confident answers are early.",
    stain: "gfp",
  },
  {
    id: "whole",
    axis: "Whole-brain emulation",
    brain: "~1.5 kg, 2% of body mass, one organ",
    machine:
      "MICrONS mapped a cubic millimetre of mouse visual cortex at synaptic resolution — 100,000 neurons, about 1/800th of a human brain",
    verdict:
      "Emulation is not understanding, and reconstruction is not simulation. At the current rate the honest horizon for whole human cortex is decades, and the harder problem will arrive when the emulation is finished.",
    stain: "vessel",
  },
  {
    id: "powertrend",
    axis: "Where the energy is going",
    brain: "Fixed. ~20 W, and humans will not build many more of them",
    machine:
      "Frontier training power has more than doubled annually, with the largest runs now above 100 MW and projected at 4–16 GW by 2030",
    verdict:
      "The energy story that matters is not the comparison with the brain but the trajectory of the buildout. Data centres passed the hundred-gigawatt mark worldwide and are on track to approach a large fraction of US generation.",
    stain: "melanin",
  },
];
