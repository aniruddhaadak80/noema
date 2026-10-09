import type { Bias, Experiment, MemorySystem, Stain } from "@/lib/types";

export const MEMORY: MemorySystem[] = [
  {
    id: "working",
    name: "Working memory",
    holds: "A few seconds of actively held material",
    duration: "Seconds, without rehearsal",
    substrate:
      "Distributed frontoparietal loops. Cowan's working memory capacity of about four chunks is now better supported than Miller's seven-plus-or-minus-two, which was derived from digit span and has largely been superseded.",
    signature:
      "Ask someone to hold a list of items while doing something else and the tail falls off fast — the last items are held better than the first, which is not how a decaying trace would behave.",
    stain: "gfp",
  },
  {
    id: "episodic",
    name: "Episodic memory",
    holds: "Events located in a particular time and place",
    duration: "Indefinite, but with a very steep initial forgetting curve",
    substrate:
      "Hippocampus and entorhinal cortex at the point of encoding. Whether it remains the long-term store or merely the way in is still genuinely unresolved after fifty years.",
    signature:
      "It is the only memory system that supports mental time travel — you can re-experience a past event as past. H.M. lost this almost entirely and kept everything else.",
    stain: "golgi",
  },
  {
    id: "semantic",
    name: "Semantic memory",
    holds: "Facts, word meanings, category structure",
    duration: "Extremely durable",
    substrate:
      "Neocortical networks, with a graded left-anterior temporal pole for the most abstract and frequently retrieved material.",
    signature:
      "Grows through most of life and is the last system to decay. It is also the one most reliably preserved in amnesia, which is why H.M. could learn new vocabulary.",
    stain: "melanin",
  },
  {
    id: "procedural",
    name: "Procedural memory",
    holds: "Skills and habits",
    duration: "Effectively permanent",
    substrate:
      "Cerebellum, basal ganglia and motor cortex, with little hippocampal involvement. Amnesic patients learn to ride a bike and keep it.",
    signature:
      "The most reliable memory in the body. You cannot consciously recall how you learned it, you cannot describe it while doing it, and you cannot lose it through head injury.",
    stain: "vessel",
  },
  {
    id: "priming",
    name: "Priming",
    holds: "A change in the speed of response",
    duration: "Seconds to hours",
    substrate:
      "Unclear and probably distributed — both the memory systems above, and possibly a separate one.",
    signature:
      "Completing the fragment “elephant is a large grey ____” is faster than a neutral control. You cannot report having been helped, and the effect survives in amnesia.",
    stain: "gfp",
  },
];

export const FORGETTING: {
  name: string;
  finding: string;
  caveat: string;
  stain: Stain;
}[] = [
  {
    name: "Ebbinghaus forgetting curve",
    finding: "Retention falls off fastest in the first hour, then flattens into a long tail.",
    caveat:
      "Ebbinghaus measured himself, on nonsense syllables, in a solitary nineteenth-century laboratory. The curve's shape is robust; the exact parameters are not.",
    stain: "gfp",
  },
  {
    name: "Spacing effect",
    finding:
      "Studying across several days beats cramming — sometimes by a factor of three or more on delayed tests.",
    caveat: "The effect is large and reliable, and is not fully explained by any current model of how forgetting works.",
    stain: "melanin",
  },
  {
    name: "Testing effect",
    finding:
      "Retrieval practice beats re-exposure for long-term retention, even when re-exposure feels more effective.",
    caveat:
      "It also works in infancy, which rules out explanations that require metacognitive strategy or an explicit sense of what studying is for.",
    stain: "golgi",
  },
  {
    name: "Desirable difficulties",
    finding:
      "Conditions that impair encoding — spacing, interleaving, delay — improve later retention. Conditions that make encoding effortless improve it least.",
    caveat:
      "Bjork's framing has been widely adopted and also widely overextended into education advice without the supporting evidence.",
    stain: "vessel",
  },
];

export const BIASES: Bias[] = [
  {
    id: "anchoring",
    name: "Anchoring",
    aka: ["Tversky & Kahneman"],
    mechanism:
      "The first number you encounter becomes the reference point, and later estimates adjust from it rather than from nothing.",
    payoff: "It is a fast, low-variance default. You do not have to evaluate a proposition from first principles every time.",
    cost:
      "The adjustment is always insufficient, so arbitrary anchors leak into real judgements — sentencing, valuation, and estimates from numbers nobody checked.",
    study: "Tversky & Kahneman, 1974",
    stain: "gfp",
  },
  {
    id: "avail",
    name: "Availability heuristic",
    mechanism:
      "The probability of something is estimated by how easily examples of it come to mind, not by how many there are.",
    payoff: "It is fast and it works, as long as salience tracks frequency.",
    cost:
      "It fails precisely when salience and frequency diverge: rare events that are vivid are systematically overestimated. This is the Dragnet problem.",
    study: "Tversky & Kahneman, 1973",
    stain: "vessel",
  },
  {
    id: "dk",
    name: "Dunning–Kruger effect",
    mechanism:
      "The skills needed to perform a task are largely the skills needed to judge how well you performed it, so the two are acquired together.",
    payoff: "None. It is entirely a cost.",
    cost:
      "Bottom-quartile performers reliably place in the top quartile of their field. The replication is fragile in magnitude but robust in direction.",
    study: "Dunning & Kruger, 1999",
    stain: "melanin",
  },
  {
    id: "fundament",
    name: "Fundamental attribution error",
    mechanism:
      "When you explain someone else's behaviour, you reach for disposition; when you explain your own, for situation.",
    payoff: "It is a good default under uncertainty — dispositions are usually more stable and more useful to know.",
    cost:
      "It systematically underweights situations that actually caused the behaviour, which is how structural explanations get dismissed as personal failings.",
    study: "Ross, 1977",
    stain: "golgi",
  },
  {
    id: "inattentional",
    name: "Inattentional blindness",
    aka: ["change blindness"],
    mechanism:
      "Attention is not a wider camera. It is a small, selective, task-defined aperture, and you have no introspective access to what it excluded.",
    payoff: "It is what makes focused work possible. A wider aperture would be useless for anything requiring precision.",
    cost:
      "It explains most eyewitness failure, most failures to notice an error in your own work, and most of why a second pair of eyes catches what yours did not.",
    study: "Simons & Chabris, 1999",
    stain: "gfp",
  },
  {
    id: "loftus",
    name: "Misinformation effect",
    aka: ["leading questions"],
    mechanism:
      "A memory trace is reconsolidated on each retrieval. When the original trace is reconstructed, the new context is written into it.",
    payoff: "Reconsolidation is what makes memory updatable rather than merely accumulative.",
    cost:
      "Confidence in a memory tracks how fluently it is retrieved, not how accurately. Loftus showed that the wording of a question can add a car that was not in the original crash.",
    study: "Loftus & Palmer, 1974",
    stain: "vessel",
  },
  {
    id: "sunk",
    name: "Sunk cost fallacy",
    mechanism:
      "Past investment is irrelevant to the value of a future decision, but it is highly salient and emotionally loaded.",
    payoff: "None, except as an occasionally accurate proxy for how much switching cost you will actually bear.",
    cost:
      "A non-trivial fraction of projects are continued past the point where any reasonable person would stop, precisely because of this.",
    study: "Arkes & Blumer, 1985",
    stain: "melanin",
  },
  {
    id: "optimism",
    name: "Optimism bias",
    mechanism:
      "Estimating your own likelihood of negative outcomes runs systematically low, in every domain and in every culture measured.",
    payoff:
      "Necessary. A system that weighted its own chances accurately would be paralysed by the base rate of things going wrong.",
    cost:
      "It is measurable, stable and large — and it is much larger about things caused by other people than about things you cause yourself, which suggests it is partly a bargaining position rather than a miscalculation.",
    study: "Weinstein, 1980",
    stain: "golgi",
  },
  {
    id: "dot",
    name: "Directorship illusion",
    aka: ["illusion of intentionality"],
    mechanism:
      "When two actors' motion is described by the same verbs, observers infer a shared intention that no one holds.",
    payoff: "It is an efficient heuristic for social inference under time pressure.",
    cost:
      "It explains a whole class of well-documented failures of crowd safety, financial coordination and negotiation, and it is very hard to argue with in the moment.",
    study: "Ross & Richardson, 2001",
    stain: "gfp",
  },
  {
    id: "spotlight",
    name: "Spotlight effect",
    mechanism:
      "You estimate how much others notice you, and you consistently overestimate by a large factor.",
    payoff: "None obvious.",
    cost:
      "It explains stage fright, the social cost of visible mistakes, and why the notice you think you received did not arrive.",
    study: "Gilovich, Medvec & Savitsky, 1998",
    stain: "vessel",
  },
  {
    id: "saviour",
    name: "Saviour effect",
    mechanism:
      "Knowing that someone else is being paid to help you reduces how hard you try to solve it yourself first.",
    payoff: "None, except reduced cost.",
    cost:
      "It predicts that outsourcing a task reduces engagement with it even when the outsourcing is to a machine you could have corrected.",
    study: "Berger & Heath, 2007",
    stain: "melanin",
  },
  {
    id: "negativity",
    name: "Negativity bias",
    mechanism:
      "A loss is felt roughly twice as intensely as an equal gain. The effect has held across cultures, species and centuries.",
    payoff:
      "It is adaptive. The asymmetry made organisms that avoided threats more likely to survive than symmetric optimisers.",
    cost:
      "It explains loss aversion in economics, the disproportionate weight of criticism, and why a single bad review is worth more than a hundred good ones.",
    study: "Kahneman & Tversky, 1979",
    stain: "gfp",
  },
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: "milgram",
    name: "Milgram obedience",
    year: "1963",
    by: "Stanley Milgram",
    did: "Recruited men for a “punishment” study; told them to deliver escalating electric shocks to a learner who had made errors.",
    found: "Around 65% went to the maximum 450V setting, administered by a live researcher, in an unimpressive Yale office.",
    caveat:
      "Contested in detail: demand characteristics, proximity to authority, variations in setting, and the ethics approval process all attract serious criticism. Recent archival work suggests participants were deeply sceptical and often acted knowingly.",
    stain: "vessel",
  },
  {
    id: "spe",
    name: "Stanford Prison Experiment",
    year: "1971",
    by: "Philip Zimbardo",
    did: "Assigned 24 male students to guards and prisoners in a simulated prison over two weeks.",
    found: "Guards escalated to cruelty within days. The study is usually cited for how fast ordinary people adopt a role.",
    caveat:
      "Heavily criticised and substantially discredited: demand characteristics, the study design, the experimenter's own coaching of guards, fabricated data in the recordings, and fabricated and withheld details in the published account. Zimbardo apologised publicly in 2019.",
    stain: "melanin",
  },
  {
    id: "asch",
    name: "Asch conformity",
    year: "1951",
    by: "Solomon Asch",
    did: "Had confederates give obviously wrong answers to an unambiguous perceptual question in a group of up to eight.",
    found: "About a third of responses conformed to the unanimous wrong majority. One dissenting ally cut conformity by roughly three quarters.",
    caveat:
      "The effect is robust but smaller in the replication literature, and it is much smaller with online participants and reduced social stakes — which suggests it may be about conformity to people rather than to perception.",
    stain: "gfp",
  },
  {
    id: "sperry",
    name: "Split-brain",
    year: "1968",
    by: "Roger Sperry & Michael Gazzaniga",
    did: "Severed the corpus callosum in patients with severe epilepsy, to control seizures.",
    found:
      "Each hemisphere operated independently. A picture shown only to the left visual field — which reaches the right hemisphere — could be drawn with the left hand but not named aloud.",
    caveat:
      "The famous “left hand says yes, right hand says no” reports are partly interpretive. The findings are solid; some of the anecdotes around them are reconstructions.",
    stain: "golgi",
  },
  {
    id: "hm",
    name: "H.M.",
    year: "1953",
    by: "Brenda Milner, Henry Molaison, William Scoville",
    did: "Removed both hippocampi and surrounding medial temporal tissue to control seizures in a 27-year-old man.",
    found:
      "Profound anterograde amnesia with preserved intelligence, personality and old memories. He learned new skills and new vocabulary; he could not remember having learned them.",
    caveat:
      "He was also mildly impaired in remote episodic memory, which weakens the cleanest version of the multiple-memory conclusion.",
    stain: "gfp",
  },
  {
    id: "gage",
    name: "Phineas Gage",
    year: "1848",
    by: "John Harlow",
    did: "Recorded the case of a 25-year-old railroad foreman who survived an iron tamping rod driven through his left cheek and skull.",
    found:
      "Harlow's 1868 report described a man who was unreliable, profane, and could no longer plan. It became the founding case for frontal lobe function.",
    caveat:
      "Harlow's first account called him entirely well; the disreputable version was the second. The rod destroyed left ventromedial prefrontal cortex, but nearly all modern imaging is reconstructions. Treat the personality story as hypothesis.",
    stain: "vessel",
  },
  {
    id: "littlealbert",
    name: "Little Albert",
    year: "1920",
    by: "John Watson & Rosalie Rayner",
    did: "Struck a white rat in front of an 11-month-old infant, then presented the rat paired with a loud noise.",
    found: "The child showed conditioned fear of the rat within weeks, and the effect generalised to rabbit and fur.",
    caveat:
      "The participant's identity, the timing of the exposures, and Rayner's account of how many experimental sessions were actually run are all disputed. Watson's own shorthand account was published fourteen years later and has never been reconciled with Rayner's notes.",
    stain: "melanin",
  },
  {
    id: "seligman",
    name: "Learned helplessness",
    year: "1967",
    by: "Martin Seligman & John Maier",
    did: "Exposed dogs to uncontrollable shocks, then later gave them the option to escape identical shocks.",
    found: "The dogs did not try to escape. They stopped trying, even when escape was available.",
    caveat:
      "The paradigm is ethically awful and the interpretation was contested for decades. A 2018 re-analysis argued the original result came from the shock itself damaging the animals' ability to move, not from learning — so the data do not support the theory as it stood.",
    stain: "gfp",
  },
  {
    id: "libet",
    name: "Libet's free-will experiment",
    year: "1983",
    by: "Benjamin Libet",
    did: "Asked subjects to flex a wrist whenever they chose, reporting via a clock the moment of the urge to move, while recording the EEG.",
    found: "Readiness potential began about 350ms before the reported urge, which was reported at around 200ms before movement.",
    caveat:
      "The timing of the subjective report is contested — the clock was read backwards and could not represent continuous time, and later replications with better apparatus found urge and readiness roughly simultaneous. Most neuroscientists read Libet as a method problem now.",
    stain: "golgi",
  },
  {
    id: "marshmallow",
    name: "Marshmallow test",
    year: "1972",
    by: "Walter Mischel",
    did: "Gave four-year-olds a marshmallow with a choice: eat it now, or wait and get two.",
    found: "Waiting correlated with later life outcomes, and was predicted by the child's age and home environment.",
    caveat:
      "The IQ and social background controls reduce or eliminate the effect. The usual cartoon version — a child waiting fifteen minutes for two marshmalloes — is not what the data support, and Mischel spent much of the later career correcting it.",
    stain: "vessel",
  },
  {
    id: "dweck",
    name: "Implicit theories",
    year: "1980s",
    by: "Carol Dweck",
    did: "Manipulated whether failure was framed as diagnostic of ability or of effort, then observed persistence on a solvable puzzle.",
    found: "A belief that ability is fixed produced rapid concession after failure. A growth framing produced continued, often incorrect, effort.",
    caveat:
      "The framing effects are small and vary with the learner's perceived ability. Dweck's later work on implicit theories narrowed considerably, and large-scale educational trials have not reliably reproduced the headline claim.",
    stain: "melanin",
  },
  {
    id: "chabris",
    name: "The selective attention task",
    year: "1972",
    by: "Ulric Neisser",
    did: "Asked observers to count the number of passes by two teams and to report, in the same trial, on the unexpected person.",
    found: "Around half of observers never reported the intruder, and reported having watched it all the same.",
    caveat:
      "Replications confirm inattentional blindness at high rates, but agreement varies substantially with the type of unexpected stimulus, and the striking “reported having watched it” claim is less robust than it is usually cited as being.",
    stain: "gfp",
  },
  {
    id: "faces",
    name: "Face advantage",
    year: "1979",
    by: "Zachary Laub, John Ochsner & D.W. Hood",
    did: "Showed subjects faces and words at 250ms while tracking where they looked.",
    found: "Faces drew sustained gaze; words drew rapid first-pass saccades and almost no sustained attention.",
    caveat:
      "The face advantage itself is highly replicable. The eye-tracking method is legacy and has been largely superseded by larger behavioural corpora.",
    stain: "golgi",
  },
  {
    id: "trob",
    name: "Robbers Cave experiment",
    year: "1954",
    by: "Muzafer Sherif",
    did: "Ran boys' summer camps with structured and unstructured intergroup competition.",
    found: "Enemies of yesterday became allies of today when a superordinate goal required cooperation.",
    caveat:
      "One famous replication was reported as failed. The finding has been persuasive in demonstration value and weaker as evidence.",
    stain: "melanin",
  },
];

export const CONCEPTS: {
  id: string;
  term: string;
  body: string;
  not: string;
  stain: Stain;
}[] = [
  {
    id: "plasticity",
    term: "Plasticity",
    body:
      "The nervous system's capacity to change its own wiring. Long-term potentiation and depression at glutamatergic synapses are the cellular basis; critical periods are its schedule.",
    not: "Plasticity is not unlimited. Critical periods close, and adult plasticity is real but constrained — which is why recovery from stroke is largest in children and still possible in adults.",
    stain: "gfp",
  },
  {
    id: "emotion",
    term: "Emotion",
    body:
      "Not a fixed list of six or eight feelings. Contemporary work treats emotion as a family of functionally distinct systems — fear, disgust, anger, sadness, and so on — each with its own neural signature, evolutionary function and facial configuration.",
    not: "The James–Lange claim that we feel afraid because we run is one hypothesis among several, not the settled account, and it does not generalise to all emotions.",
    stain: "vessel",
  },
  {
    id: "attention",
    term: "Attention",
    body:
      "A limited-capacity selection of information for further processing. It is better modelled as a priority computation — several signals bidding for a limited resource — than as a spotlight.",
    not: "Attention is not a single thing. Alerting, orienting, executive control and sustained vigilance behave differently enough that some researchers treat them as separate systems.",
    stain: "melanin",
  },
  {
    id: "perception",
    term: "Perception",
    body:
      "Perception is an inference from sensory evidence under strong assumptions about the world, not a readout of it. Under predictive processing it is best described as the settling of a generative model against prediction error.",
    not: "It is not a passive filter on reality either. Illusions are the standard evidence that the visual system is constructing something and occasionally constructing it wrongly.",
    stain: "golgi",
  },
  {
    id: "self",
    term: "The self",
    body:
      "There is no single place in the brain that is the self. Sense of body ownership comes from multisensory integration, sense of agency from efference copy, and the narrative sense of a persisting person appears to be assembled rather than found.",
    not: "This is a live question, not a settled one. The sense of being a subject is unusually resistant to localisation, which is precisely why it stays interesting.",
    stain: "gfp",
  },
];
