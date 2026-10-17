export type GlossaryTerm = {
  id: string;
  term: string;
  category: "anatomy" | "chemistry" | "network" | "function" | "disorder" | "method" | "philosophy";
  definition: string;
  related?: string[]; // term ids
  see?: string[]; // page hrefs
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: "action-potential",
    term: "Action potential",
    category: "function",
    definition:
      "A rapid, all-or-nothing reversal of membrane voltage that carries information along an axon. It travels without decaying, which is why a spike from your toe reaches your cortex with the same shape it left with.",
    see: ["/circuits"],
  },
  {
    id: "axon",
    term: "Axon",
    category: "anatomy",
    definition:
      "The long fibre of a neuron that conducts action potentials away from the cell body toward other neurons, muscles, or glands.",
    related: ["dendrite", "synapse", "myelin"],
  },
  {
    id: "basal-ganglia",
    term: "Basal ganglia",
    category: "anatomy",
    definition:
      "A group of subcortical nuclei (caudate, putamen, globus pallidus, subthalamic nucleus, substantia nigra) that help select and groom actions, habits, and movement.",
    see: ["/circuits", "/mirror"],
  },
  {
    id: "brocas-area",
    term: "Broca's area",
    category: "function",
    definition:
      "Left inferior frontal cortex (roughly BA 44/45). Damage produces non-fluent aphasia: comprehension largely intact, speech effortful and telegraphic.",
    see: ["/atlas", "/questions"],
  },
  {
    id: "cerebellum",
    term: "Cerebellum",
    category: "anatomy",
    definition:
      "The 'little brain' at the back of the skull. Not just for movement — it also contributes to timing, prediction, language, and some cognitive functions.",
    see: ["/atlas", "/circuits"],
  },
  {
    id: "default-mode-network",
    term: "Default Mode Network (DMN)",
    category: "network",
    definition:
      "A large-scale network active when the mind wanders, remembers the past, imagines the future, or thinks about oneself. It quiets during demanding external tasks.",
    see: ["/circuits", "/mind"],
  },
  {
    id: "dendrite",
    term: "Dendrite",
    category: "anatomy",
    definition:
      "Branched extensions of a neuron that receive synaptic input from other cells and carry it toward the cell body.",
    related: ["axon", "synapse"],
  },
  {
    id: "dopamine",
    term: "Dopamine",
    category: "chemistry",
    definition:
      "A catecholamine neurotransmitter central to reward prediction, motivation, movement, and learning. Midbrain dopamine neurons signal prediction errors.",
    see: ["/circuits"],
  },
  {
    id: "eeg",
    term: "Electroencephalography (EEG)",
    category: "method",
    definition:
      "Recording of electrical activity from the scalp, summed over many neurons. Best temporal resolution of any non-invasive brain method; poor spatial precision.",
    see: ["/circuits"],
  },
  {
    id: "fmri",
    term: "fMRI (functional MRI)",
    category: "method",
    definition:
      "Measures blood-oxygen-level-dependent (BOLD) signal as a proxy for local neural activity. Good spatial resolution, slow temporal resolution.",
    see: ["/circuits"],
  },
  {
    id: "frontal-lobe",
    term: "Frontal lobe",
    category: "anatomy",
    definition:
      "The anterior lobe, responsible for executive function, planning, decision-making, working memory, and motor control.",
    see: ["/atlas"],
  },
  {
    id: "gaba",
    term: "GABA",
    category: "chemistry",
    definition:
      "The brain's main inhibitory neurotransmitter. It hyperpolarises neurons and keeps excitation in check; benzodiazepines and alcohol enhance it.",
    see: ["/circuits"],
  },
  {
    id: "glia",
    term: "Glia",
    category: "anatomy",
    definition:
      "Non-neuronal cells (astrocytes, oligodendrocytes, microglia) that outnumber neurons in some regions. They support metabolism, myelinate axons, and prune synapses.",
  },
  {
    id: "glutamate",
    term: "Glutamate",
    category: "chemistry",
    definition:
      "The brain's main excitatory neurotransmitter. Most cortical pyramidal cells use it; excess glutamate is excitotoxic.",
    see: ["/circuits"],
  },
  {
    id: "hippocampus",
    term: "Hippocampus",
    category: "anatomy",
    definition:
      "Medial temporal structure essential for forming new episodic memories and spatial navigation. One of the first regions affected in Alzheimer's disease.",
    see: ["/atlas", "/mind"],
  },
  {
    id: "lateral-geniculate",
    term: "Lateral geniculate nucleus (LGN)",
    category: "anatomy",
    definition:
      "Thalamic relay that receives retinal input and sends it to primary visual cortex. It is also gated by attention and cortical feedback.",
    see: ["/atlas"],
  },
  {
    id: "lesion",
    term: "Lesion",
    category: "function",
    definition:
      "Damage to brain tissue (stroke, trauma, surgery). Comparing what is lost after a lesion is how much of cognitive neuroscience was built.",
    see: ["/atlas", "/questions"],
  },
  {
    id: "long-term-potentiation",
    term: "Long-term potentiation (LTP)",
    category: "function",
    definition:
      "A long-lasting increase in synaptic strength after high-frequency activity. The leading cellular candidate for learning and memory.",
  },
  {
    id: "myelin",
    term: "Myelin",
    category: "anatomy",
    definition:
      "Fatty insulation wrapped around axons by oligodendrocytes (CNS) or Schwann cells (PNS). It speeds conduction up to 100×.",
    related: ["axon", "action-potential"],
  },
  {
    id: "neurotransmitter",
    term: "Neurotransmitter",
    category: "chemistry",
    definition:
      "A chemical released at a synapse that crosses the cleft and binds receptors on the postsynaptic neuron, exciting or inhibiting it.",
    related: ["synapse", "dopamine", "gaba", "glutamate", "serotonin"],
  },
  {
    id: "occipital-lobe",
    term: "Occipital lobe",
    category: "anatomy",
    definition:
      "The rearmost lobe, devoted to vision. Primary visual cortex (V1) sits at the back, with extrastriate areas forward of it.",
    see: ["/atlas"],
  },
  {
    id: "parietal-lobe",
    term: "Parietal lobe",
    category: "anatomy",
    definition:
      "The upper-rear lobe. Handles somatosensation, spatial attention, and the body's representation of where limbs are in space.",
    see: ["/atlas"],
  },
  {
    id: "parahippocampal",
    term: "Parahippocampal gyrus",
    category: "anatomy",
    definition:
      "A cortical strip surrounding the hippocampus. Contains the parahippocampal place area (PPA), selective for scenes and places.",
    see: ["/atlas"],
  },
  {
    id: "parkinson",
    term: "Parkinson's disease",
    category: "disorder",
    definition:
      "A movement disorder caused by loss of dopaminergic neurons in the substantia nigra. Treated with L-DOPA, which replaces the missing dopamine.",
    see: ["/circuits", "/mirror"],
  },
  {
    id: "postcingulate",
    term: "Posterior cingulate cortex",
    category: "anatomy",
    definition:
      "A hub of the Default Mode Network, active during self-referential thought and autobiographical memory.",
    see: ["/atlas", "/circuits"],
  },
  {
    id: "prefrontal-cortex",
    term: "Prefrontal cortex",
    category: "anatomy",
    definition:
      "The anterior frontal cortex. Supports working memory, executive control, decision-making, and social behaviour. One of the last regions to mature.",
    see: ["/atlas"],
  },
  {
    id: "receptive-field",
    term: "Receptive field",
    category: "function",
    definition:
      "The region of sensory space (or feature space) that drives a neuron. V1 simple cells have oriented bar receptive fields.",
    see: ["/mind", "/circuits"],
  },
  {
    id: "serotonin",
    term: "Serotonin",
    category: "chemistry",
    definition:
      "A monoamine involved in mood, sleep, appetite, and impulsivity. SSRIs increase synaptic serotonin by blocking its reuptake.",
    see: ["/circuits"],
  },
  {
    id: "sleep-spindle",
    term: "Sleep spindle",
    category: "function",
    definition:
      "A burst of 12–14 Hz oscillation during N2 sleep, generated by thalamocortical loops. Thought to protect sleep and support memory consolidation.",
    see: ["/circuits"],
  },
  {
    id: "stem",
    term: "Brainstem",
    category: "anatomy",
    definition:
      "The stalk connecting brain to spinal cord (midbrain, pons, medulla). Controls heartbeat, breathing, arousal, and relays sensory/motor traffic.",
    see: ["/atlas"],
  },
  {
    id: "synapse",
    term: "Synapse",
    category: "function",
    definition:
      "The junction between two neurons where transmission occurs — usually chemical, via neurotransmitters released from vesicles.",
    related: ["neurotransmitter", "axon", "dendrite"],
    see: ["/circuits"],
  },
  {
    id: "temporal-lobe",
    term: "Temporal lobe",
    category: "anatomy",
    definition:
      "The side lobe. Handles hearing, language comprehension, memory, and object recognition. Contains the hippocampus and amygdala.",
    see: ["/atlas"],
  },
  {
    id: "thalamus",
    term: "Thalamus",
    category: "anatomy",
    definition:
      "The great relay. Nearly every sensory pathway (except smell) and many motor loops pass through the thalamus en route to cortex.",
    see: ["/atlas", "/circuits"],
  },
  {
    id: "v1",
    term: "Primary visual cortex (V1)",
    category: "function",
    definition:
      "The first cortical stage of vision, in the occipital lobe. Neurons here are selective for orientation, spatial frequency, and eye of origin.",
    see: ["/mind", "/circuits"],
  },
  {
    id: "wernickes-area",
    term: "Wernicke's area",
    category: "function",
    definition:
      "Left posterior temporal cortex. Damage produces fluent but meaningless speech with poor comprehension.",
    see: ["/atlas", "/questions"],
  },
  {
    id: "working-memory",
    term: "Working memory",
    category: "function",
    definition:
      "The ability to hold information online for seconds while manipulating it. Closely tied to the prefrontal cortex and dopamine.",
    see: ["/mind"],
  },
];

export function glossaryByLetter() {
  const out = new Map<string, GlossaryTerm[]>();
  for (const t of GLOSSARY) {
    const k = t.term[0].toUpperCase();
    (out.get(k) ?? []).push(t);
    out.set(k, (out.get(k) ?? []));
  }
  return out;
}

export function findTerm(id: string) {
  return GLOSSARY.find((t) => t.id === id);
}
