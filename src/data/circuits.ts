import type {
  Molecule,
  Network,
  Nucleus,
  SleepStage,
  Theory,
} from "@/lib/types";

export const MOLECULES: Molecule[] = [
  {
    id: "glutamate",
    name: "Glutamate",
    cls: "Amino acid · excitatory",
    precursor: "Glutamine, via glutaminase",
    receptors: "NMDA, AMPA, kainate, mGluR",
    role:
      "The brain's main excitatory transmitter and the only one used at the overwhelming majority of its synapses. Nearly everything else modulates glutamate.",
    excess:
      "Excitotoxicity. Too much calcium entry, mitochondrial failure, cell death. This is the shared final pathway in stroke, traumatic brain injury, and probably Alzheimer's.",
    deficit:
      "Poorly tolerated, because there is no way to reduce a signal that is nearly always 'on'. Most anticonvulsants work by blocking the receptors rather than the release.",
    agent: "Memantine blocks the NMDA receptor at resting potential only",
    stain: "melanin",
  },
  {
    id: "gaba",
    name: "GABA",
    cls: "Amino acid · inhibitory",
    precursor: "Glutamate, via glutamate decarboxylase",
    receptors: "GABA-A (ionotropic), GABA-B (metabotropic)",
    role:
      "The main inhibitory transmitter. Hyperpolarises or shunts, which buys the cortex the two things it needs: a floor and a pause.",
    excess: "Sedation, poor coordination, and the reduced drive that follows chronic alcohol use.",
    deficit:
      "Anxiety, panic, and — after alcohol withdrawal — seizures, because the cortex has stopped compensating for a transmitter it no longer receives.",
    agent: "Benzodiazepines are positive allosteric modulators of GABA-A",
    stain: "gfp",
  },
  {
    id: "dopamine",
    name: "Dopamine",
    cls: "Monoamine · catecholamine",
    precursor: "Tyrosine → L-DOPA",
    receptors: "D1–D5, G-protein coupled",
    role:
      "Not a pleasure chemical. A teaching signal encoding reward prediction error — the gap between what you expected and what you got.",
    excess:
      "Psychosis. The mesolimbic pathway running hot produces positive symptoms; the prefrontal D1 signal running low produces the negative symptoms.",
    deficit:
      "Parkinson's, from substantia nigra degeneration. Also the anhedonia and flat motivation of depression, which is why stimulant drugs help it.",
    agent: "Amphetamine raises synaptic dopamine; cocaine blocks its reuptake",
    stain: "golgi",
  },
  {
    id: "serotonin",
    name: "Serotonin",
    cls: "Monoamine · indoleamine",
    precursor: "Tryptophan → 5-HTP",
    receptors: "5-HT1 through 5-HT7, fourteen receptor subtypes",
    role:
      "A widespread gain-setting control over mood, satiety, sleep, pain tolerance and nausea. Its jobs are mostly about how much of other signals gets through.",
    excess: "Serotonin syndrome — clonus, hyperreflexia, agitation — usually from drug combinations, not serotonin itself.",
    deficit:
      "Low central serotonin is associated with low mood and with suicide, though the causal story is weaker than the textbook version.",
    agent: "MDMA floods the release of serotonin and other monoamines",
    stain: "vessel",
  },
  {
    id: "norepi",
    name: "Norepinephrine",
    cls: "Monoamine · catecholamine",
    precursor: "Tyrosine → dopamine → norepinephrine",
    receptors: "α1, α2, β1, β2",
    role:
      "Allostasis and arousal. It is the mediator of the fight-or-flight response and of the vigilance that lets you reorient when something surprising happens.",
    excess:
      "The hyperarousal half of panic. In this form, the SNR and the noradrenergic system co-activate; LC firing predicts which stimulus will capture attention.",
    deficit:
      "Depression, fatigue and poor concentration. Antidepressants that block its reuptake work partly here.",
    agent: "Propranolol blocks the beta receptors, blunting the memory of emotional events",
    stain: "melanin",
  },
  {
    id: "acetylcholine",
    name: "Acetylcholine",
    cls: "Quaternary amine",
    precursor: "Choline + acetyl-CoA, by ChAT",
    receptors: "Muscarinic (M1–M5), nicotinic",
    role:
      "The cortex's gain and its on-switch. Nucleus basalis projections set the cortical state — awake, asleep, attentive — and gate plasticity at synapses.",
    excess: "Cholinergic crisis: the cholinergic toxidrome of Datura, with delirium, miosis and dry skin.",
    deficit:
      "Cholinergic decline is the single most consistent finding in Alzheimer's. Every major symptomatic treatment works by raising it back.",
    agent: "Organophosphates and soman inhibit acetylcholinesterase irreversibly",
    stain: "gfp",
  },
  {
    id: "histamine",
    name: "Histamine",
    cls: "Monoamine · indoleamine",
    precursor: "Histidine, by histidine decarboxylase",
    receptors: "H1–H4",
    role:
      "Wakefulness from the tuberomammillary nucleus. Sedative antihistamines work by blocking H1 in the brain, which is why they make you drowsy.",
    excess: "Agitation, and — with H1 blockade — sedation. Rarely anything stranger.",
    deficit:
      "Narcolepsy. The commonest form is autoimmune loss of orexin neurons, and it is treated with H3 inverse agonists that push histamine back up.",
    agent: "Antihistamines are H1 antagonists and were sold as insomnia aids for decades",
    stain: "vessel",
  },
  {
    id: "glycine",
    name: "Glycine",
    cls: "Amino acid · co-inhibitory",
    precursor: "Serine, via serine hydroxymethyltransferase",
    receptors: "GlyR (ionotropic, pentameric chloride channel)",
    role:
      "The inhibitory transmitter of the spinal cord and retina. It permits chloride influx, hyperpolarising the cell — and in immature neurons it is excitatory instead.",
    excess: "Neuronal inhibition, and the startle reflex going into overdrive.",
    deficit:
      "Stiff-person syndrome, when antibodies destroy glycine receptors: progressive rigidity and spasms triggered by noise or surprise.",
    agent: "Tetanus toxin blocks inhibitory glycine and GABA release — rigidity without consciousness",
    stain: "gfp",
  },
  {
    id: "endorphins",
    name: "Endorphins & enkephalins",
    cls: "Neuropeptide",
    precursor: "Pre-proenkephalin and pro-opiomelanocortin",
    receptors: "Opioid receptors μ, κ, δ",
    role:
      "Endogenous opioids. They gate nociceptive transmission at the level of the spinal cord and midbrain, before the cortex ever hears about it.",
    excess: "Analgesia, euphoria, and the constipation and constricted pupils of a full agonist.",
    deficit:
      "In the spinal cord, loss of descending inhibitory control is central to chronic neuropathic pain.",
    agent: "Morphine and fentanyl are μ agonists that mimic an endogenous system older than dinosaurs",
    stain: "melanin",
  },
  {
    id: "anandamide",
    name: "Anandamide",
    cls: "Lipid · endocannabinoid",
    precursor: "Arachidonic acid",
    receptors: "CB1, CB2",
    role:
      "On-demand, lasts seconds. It is synthesised at the post-synaptic membrane and travels backwards, which is the opposite of every classical transmitter.",
    excess: "The whole of cannabis, essentially — and the mechanism by which it alters memory, appetite and reward.",
    deficit: "Proposed as one of the mechanisms of runner's high, alongside endorphins.",
    agent: "Cannabis is a partial CB1 agonist; the endogenous system is much subtler",
    stain: "golgi",
  },
  {
    id: "oxytocin",
    name: "Oxytocin",
    cls: "Neuropeptide & hormone",
    precursor: "Pro-oxytocinin, released from the posterior pituitary",
    receptors: "OxTR",
    role:
      "Parental and affiliative behaviour, parturition, and milk let-down. Its social effects are heavily species- and context-dependent — pair-bonding claims in rodents do not generalise to humans.",
    excess: "It is a hormone as much as a neurotransmitter, which is why the peripheral and central stories keep getting confused.",
    deficit: "The effects of endogenous variation on human social behaviour are genuinely unsettled.",
    agent: "Not administered socially: it is destroyed within minutes in the blood",
    stain: "vessel",
  },
  {
    id: "cortisol",
    name: "Cortisol",
    cls: "Hormone, not transmitter",
    precursor: "Cholesterol → pregnenolone, via adrenal cortex",
    receptors: "Glucocorticoid receptor, nuclear",
    role:
      "A steroid, so it takes hours to act and changes gene transcription. It converts a brain running on milliseconds into one running on hours.",
    excess:
      "Chronic elevation shrinks the hippocampus, impairs memory, and shifts the system toward amygdala-mediated threat processing. This is the biological core of chronic stress.",
    deficit: "Addison's disease, and the flattening that follows long-term steroid medication.",
    agent: "Prednisolone is cortisol's synthetic stand-in — same molecule, fewer checks",
    stain: "melanin",
  },
];

export const NUCLEI: Nucleus[] = [
  {
    id: "raphe",
    name: "Raphe nuclei",
    location: "Brainstem midline, running rostrally into the forebrain",
    transmitter: "Serotonin",
    reach: "Diffuse — one small cluster projecting to most of the cortex",
    signature:
      "Six nuclei of varying density along the midline. Their projections are unusually diffuse, which is why serotonin is a state regulator rather than a signal.",
  },
  {
    id: "locus",
    name: "Locus coeruleus",
    location: "Floor of the fourth ventricle, pons",
    transmitter: "Norepinephrine",
    reach: "Nearly every cortical region",
    signature:
      "An unusually small nucleus by cell count and one of the longest studied in neuroscience. Its neurons are among the first to degenerate in Alzheimer's — and it projects to vessels, not just neurons.",
  },
  {
    id: "vta",
    name: "Ventral tegmental area",
    location: "Midbrain, either side of the midline",
    transmitter: "Dopamine",
    reach: "Nucleus accumbens, prefrontal cortex, hippocampus, amygdala",
    signature:
      "The mesolimbic and mesocortical systems. Reward prediction error is computed here and read out everywhere else.",
  },
  {
    id: "substantia",
    name: "Substantia nigra",
    location: "Midbrain tegmentum",
    transmitter: "Dopamine",
    reach: "Striatum, in the densest dopaminergic projection known",
    signature:
      "Pigmented with neuromelanin that accumulates with age. The naming convention inverted — nigra is the darker part, substantia the substance it sits in.",
  },
  {
    id: "meynert",
    name: "Nucleus basalis of Meynert",
    location: "Basal forebrain",
    transmitter: "Acetylcholine",
    reach: "Entire cortex",
    signature:
      "The cortex's power supply in chemical form. Its projection is diffuse and slow-modulating, which suits a job about setting state rather than transmitting events.",
  },
  {
    id: "tmn",
    name: "Tuberomammillary nucleus",
    location: "Hypothalamus",
    transmitter: "Histamine",
    reach: "Cortex, thalamus, brainstem",
    signature:
      "Fewer neurones than the other six combined, and the entire source of brain histamine. Lesions produce profound sleepiness.",
  },
  {
    id: "ppt",
    name: "Pedunculopontine nucleus",
    location: "Upper pons and lower midbrain",
    transmitter: "Acetylcholine and glutamate",
    reach: "Basal ganglia, thalamus, cortex",
    signature:
      "A hub rather than a transmitter source — a junction where arousal meets movement, and a deep brain stimulation target for gait in Parkinson's.",
  },
];

export const NETWORKS: Network[] = [
  {
    id: "dmn",
    name: "Default mode network",
    abbreviation: "DMN",
    hubs: ["Posterior cingulate & precuneus", "Angular gyrus", "Medial prefrontal cortex", "Hippocampus"],
    active: "Rest, mind-wandering, autobiographical recall, imagining the future, theory of mind",
    inactive: "Any demanding external task",
    function:
      "First mapped by Marcus Raichle by subtracting task-on from task-off brain images. It got its name from the assumption that it was what the brain did when it was not doing anything — a better description is that it is what the brain does when it is not being asked a question.",
    found: "Raichle et al., 2001, from task-subtraction fMRI",
    stain: "gfp",
  },
  {
    id: "salience",
    name: "Salience network",
    abbreviation: "SN",
    hubs: ["Anterior insula", "Dorsal anterior cingulate", "Amygdala", "Striatum"],
    active: "Behaviourally relevant events, conflict, pain, and the detection that something needs a different mode",
    inactive: "Routine, well-learned, uneventful processing",
    function:
      "A switch. It decides which of the two other networks gets the resources — hold the current task, or hand over to the internally directed one. The insula is where the decision is thought to be made.",
    found: "Corbetta & Shulman, 2002; formally defined by Sridharan et al., 2008",
    stain: "vessel",
  },
  {
    id: "frontoparietal",
    name: "Frontoparietal control network",
    abbreviation: "FPN",
    hubs: ["Dorsolateral prefrontal cortex", "Posterior parietal cortex", "Anterior cingulate"],
    active: "Task-set maintenance, adaptive control, working memory, binding",
    inactive: "Rest, and fully automatic processing",
    function:
      "The executive. It holds a rule, applies it to the current situation, and reconfigures when the situation demands it. Its connectivity with the dorsal attention network correlates with individual differences in fluid intelligence more than any other region's.",
    found: "Sala, Talsma and Yantis, 2012",
    stain: "melanin",
  },
  {
    id: "dorsal_attn",
    name: "Dorsal attention network",
    abbreviation: "DAN",
    hubs: ["Intraparietal sulcus", "Frontal eye fields"],
    active: "Goal-directed, sustained, voluntary attention",
    inactive: "Attention drawn by something unexpected",
    function:
      "Where to point the spotlight on purpose. Its lesion profile — neglect — is one of the cleanest cortical dissociations in neurology.",
    found: "Corbetta & Shulman, 2002",
    stain: "gfp",
  },
  {
    id: "ventral_attn",
    name: "Ventral attention network",
    abbreviation: "VAN",
    hubs: ["Temporoparietal junction", "Ventral frontal cortex", "Face-selective regions"],
    active: "Bottom-up capture — something salient grabs you",
    inactive: "Goal-directed search",
    function:
      "The reflex system of attention. It is the reason you cannot stop noticing your own name in a room full of noise, and the reason a face is detected in peripheral vision faster than an object.",
    found: "Corbetta & Shulman, 2002",
    stain: "golgi",
  },
  {
    id: "visual",
    name: "Visual network",
    abbreviation: "VIS",
    hubs: ["Occipital V1–V5", "Temporal MT", "Extrastriate association cortex"],
    active: "Anything with light in it, all the time",
    inactive: "Sleep, and eyes closed with a covered lid",
    function:
      "Multiple parallel streams rather than one feed. Motion, form, colour, faces and objects are computed separately and only meet late.",
    found: "Yeo et al., 2011 — seven of the seventeen canonical networks",
    stain: "vessel",
  },
  {
    id: "limbic",
    name: "Limbic & memory network",
    abbreviation: "LIM",
    hubs: ["Hippocampus", "Amygdala", "Entorhinal cortex", "Posterior cingulate"],
    active: "Encoding, retrieval, emotional processing, scene and face recognition",
    inactive: "Deep non-REM sleep",
    function:
      "The network that writes autobiographical memory and attaches affect to what it stores. It is the network that is measurably impaired first in Alzheimer's.",
    found: "Yeo et al., 2011",
    stain: "golgi",
  },
];

export const SLEEP_STAGES: SleepStage[] = [
  {
    id: "n1",
    label: "N1 — light",
    share: "4–5%",
    signature: "Alpha drops out, theta appears, muscle tone falls. The transition you can be woken from without noticing.",
    does: "The hinge between waking and sleep. Most of the night is spent getting here, not staying here.",
    stain: "gfp",
  },
  {
    id: "n2",
    label: "N2 — intermediate",
    share: "45–55%",
    signature: "Sleep spindles and K-complexes, both generated by the thalamic reticular nucleus.",
    does: "Decouples cortex from sensory input and begins the housekeeping. Also the stage that is disproportionately redistributed by ageing.",
    stain: "melanin",
  },
  {
    id: "n3",
    label: "N3 — deep, slow wave",
    share: "13–23%",
    signature: "Delta below 4 Hz, with a synchronised cortical slow oscillation running under the spindles.",
    does: "Slow-wave replay of the day. Sharp-wave ripples in the hippocampus during this stage are where a good deal of consolidation is believed to happen.",
    stain: "vessel",
  },
  {
    id: "rem",
    label: "REM — dreaming",
    share: "20–25%",
    signature: "An awake-looking EEG with complete muscle atonia, and the only stage you wake from feeling like you woke.",
    does: "Emotional memory processing and the reconsolidation of memories into a more general form. Atronically and heavily shortened antidepressants suppress REM.",
    stain: "golgi",
  },
];

export const CONSCIOUSNESS_THEORIES: Theory[] = [
  {
    id: "gwt",
    name: "Global workspace theory",
    holder: "Bernard Baars, Stanislas Dehaene",
    year: "1988",
    claim:
      "A representation becomes conscious when it is broadcast from a specialised system into a global workspace, at which point it becomes available to memory, language, decision and report.",
    stake:
      "Predicts that consciousness should be all-or-nothing, late in processing, and unavailable to the unconscious parts of the system. P300 timings fit. Ignition-style masking experiments fit. It is the most empirically productive of the four.",
    stain: "gfp",
  },
  {
    id: "iit",
    name: "Integrated information theory",
    holder: "Giulio Tononi",
    year: "2004",
    claim:
      "Consciousness is integrated information, quantified as phi — the system's capacity to be in many distinct states that are nonetheless irreducibly linked.",
    stake:
      "Produces a striking corollary: a system with more phi is more conscious, so simple integrated systems may be more conscious than complex fragmented ones. This is contested on almost every point and is the theory most criticised by working neuroscientists.",
    stain: "melanin",
  },
  {
    id: "hot",
    name: "Higher-order theories",
    holder: "David Rosenthal, Hakwan Lau",
    year: "2002",
    claim:
      "A mental state is conscious when a higher-order representation of that state is available to the system itself — when the system knows that it is in that state.",
    stake:
      "Makes consciousness a reflexive achievement, and explains why a reportable state can be absent from experience. It predicts that lowering a state below awareness does not remove it, only unseats it.",
    stain: "vessel",
  },
  {
    id: "predictive",
    name: "Predictive processing",
    holder: "Karl Friston, Andy Clark",
    year: "2005",
    claim:
      "Perception is not inference from data but the settling of prediction errors against a hierarchical generative model. You experience the model's best guess, not the input.",
    stake:
      "Not strictly a theory of consciousness, but the best-supported framework for why perception fails in the specific, regular ways it does — and it recasts hallucination as what prediction without prediction error looks like.",
    stain: "golgi",
  },
  {
    id: "ast",
    name: "Attention schema theory",
    holder: "Michael Graziano",
    year: "2015",
    claim:
      "The brain builds a simplified internal model of its own attention, and the subjective character of awareness is that model rather than a property of the world.",
    stake:
      "Reframes consciousness as a useful internal representation, which makes it a tractable engineering problem rather than a metaphysical one. It also predicts consciousness-like behaviour in machines that model their own attention, which is testable and disturbing.",
    stain: "gfp",
  },
];
