import type { Lobe, LobeMeta, Region } from "@/lib/types";

/* ── The plate's geometry ───────────────────────────────────────
   A lateral view, frontal pole to the left. Two masses rather than
   one, because the temporal lobe really is a separate lobe joined
   along the Sylvian fissure, and drawing that fissure as a shared
   edge between two shapes is both simpler and more honest than
   carving a re-entrant channel out of a single path.

   CORPUS CLIPPING is to CEREBRUM alone, TEMPORAL regions to
   TEMPORAL alone, and the deep structures to both with a dashed
   edge — because on a lateral surface you cannot see them, and
   the drawing should not pretend otherwise. */

export const SYLVIAN =
  "M 250,452 C 292,486 350,502 410,506 C 490,516 588,508 676,488 " +
  "C 722,478 766,470 800,476";

export const CEREBRUM =
  "M 250,452 C 216,442 150,398 104,350 C 76,322 84,270 118,222 " +
  "C 190,146 340,100 480,94 C 630,88 760,132 838,222 " +
  "C 898,290 940,368 928,428 C 918,470 890,496 852,502 " +
  "C 826,494 810,488 800,476 " +
  "C 766,470 722,478 676,488 C 588,508 490,516 410,506 " +
  "C 350,502 292,486 250,452 Z";

export const TEMPORAL =
  "M 250,452 C 292,486 350,502 410,506 C 490,516 588,508 676,488 " +
  "C 722,478 766,470 800,476 C 824,514 830,556 810,590 " +
  "C 772,636 694,666 598,676 C 500,686 402,676 342,644 " +
  "C 300,620 274,582 270,540 C 266,502 256,472 250,452 Z";

export const CEREBELLUM =
  "M 736,468 C 800,460 860,486 884,530 C 906,572 888,614 838,632 " +
  "C 786,650 722,634 700,598 C 682,566 692,480 736,468 Z";

export const BRAINSTEM =
  "M 600,492 C 640,504 662,532 662,566 C 662,622 650,684 632,734 " +
  "C 620,766 588,768 580,736 C 570,684 562,622 562,568 " +
  "C 562,528 572,498 600,492 Z";

export const LOBES: LobeMeta[] = [
  {
    id: "frontal",
    name: "Frontal lobe",
    stain: "gfp",
    summary:
      "The prediction engine. Roughly a third of the human cortex, and the part that grew most between ape and human. It holds the future open, holds it for long, and refuses to let it contaminate the present.",
  },
  {
    id: "parietal",
    name: "Parietal lobe",
    stain: "melanin",
    summary:
      "Where the body becomes a map. Somatosensory cortex reads skin; the parietal operculum and posterior regions build the stable spatial frame every action is aimed inside.",
  },
  {
    id: "temporal",
    name: "Temporal lobe",
    stain: "golgi",
    summary:
      "Everything that happened, plus the machinery for hearing and for reading meaning off a face. Mostly hidden inside the skull — the temporal pole sits behind the cheekbone, not at the surface you picture.",
  },
  {
    id: "occipital",
    name: "Occipital lobe",
    stain: "vessel",
    summary:
      "The only cortex that gets zero say in what it looks at. One job, done thoroughly: raw retinal signal in, perceptual maps out, two parallel streams heading forward.",
  },
  {
    id: "insula",
    name: "Insula",
    stain: "melanin",
    summary:
      "Folded away inside the lateral sulcus so no one would find it. It is where bodily sensation stops being background and becomes the explicit object of attention.",
  },
  {
    id: "cingulate",
    name: "Cingulate cortex",
    stain: "gfp",
    summary:
      "The medial rim. Error detection, conflict monitoring, pain's unpleasant half, and the machinery of directed attention. It hurts when it fires, which is roughly what it is for.",
  },
  {
    id: "subcortical",
    name: "Basal ganglia & thalamus",
    stain: "golgi",
    summary:
      "Cortical action selection in a loop with the cortex, plus the thalamus relaying almost everything that gets through. Damage here doesn't erase a faculty; it removes the timing and the on/off switch.",
  },
  {
    id: "brainstem",
    name: "Brainstem",
    stain: "vessel",
    summary:
      "The part that keeps you alive while the rest of you is having ideas. Midbrain, pons, medulla: arousal, the reticular formation, every autonomic reflex that predates language by a hundred million years.",
  },
  {
    id: "cerebellum",
    name: "Cerebellum",
    stain: "gfp",
    summary:
      "Eighty percent of the brain's neurons packed into a tenth of its volume. Not a movement organ — a prediction organ. It has become the single densest and least appreciated structure in the skull.",
  },
  {
    id: "commissural",
    name: "Corpus callosum",
    stain: "melanin",
    summary:
      "About two hundred million axons crossing the midline, because evolution built a second brain and then wired them together. Cut it, and one mind becomes two.",
  },
];

export const REGIONS: Region[] = [
  {
    id: "dlpfc",
    name: "Dorsolateral prefrontal cortex",
    aka: ["DLPFC", "BA 9/46", "frontopolar cortex"],
    lobe: "frontal",
    hemisphere: "bilateral",
    stain: "gfp",
    path:
      "M 116,318 C 104,236 148,160 236,130 C 306,108 356,120 380,144 C 340,218 326,304 328,384 C 248,406 152,378 116,318 Z",
    cx: 250,
    cy: 250,
    functions: [
      "Holds a rule or a goal in mind and keeps it there across distraction",
      "Runs the central executive of working memory — updating without wiping",
      "Generates and evaluates candidate actions against a criterion",
      "The substrate most cognitive-control tasks are measured on",
    ],
    lesions:
      "Lesions produce a striking dissociation: IQ often survives intact while planning, set-shifting, and rule-learning collapse. The patient can describe a maze, understand it, and then fail to start.",
    oddity:
      "It is one of the last cortical regions to finish myelinating, into the third decade — and it is among the first to go grey in schizophrenia and other psychotic disorders.",
  },
  {
    id: "orbitofrontal",
    name: "Orbitofrontal cortex",
    aka: ["OFC", "BA 11/12", "ventromedial prefrontal cortex"],
    lobe: "frontal",
    hemisphere: "bilateral",
    stain: "golgi",
    path:
      "M 240,430 C 282,462 330,482 380,488 C 384,518 372,544 350,558 C 300,544 254,512 234,478 C 224,458 232,440 240,430 Z",
    cx: 300,
    cy: 505,
    functions: [
      "Assigns value to outcomes, independent of how much you like them on reflection",
      "Reverses a preference once the real consequence is known rather than the imagined one",
      "Integrates reward history into choice, so the second time costs less than the first",
      "Suppresses the prepotent impulsive response in favour of the delayed one",
    ],
    lesions:
      "The classic Phineas Gage pattern: socially fluent, emotionally flat, and unable to keep a plan once the emotional reason for it evaporates. Modern imaging shows the effect is real but narrower than the legend.",
    oddity:
      "Its neurons fire differently depending on whether a stimulus is presented to the subject or merely imagined — which makes it one of the few places where 'what you are thinking' can be read off a trace.",
  },
  {
    id: "vmPFC",
    name: "Ventromedial prefrontal cortex",
    aka: ["vmPFC", "area 32 / area 25 interface", "medial orbitofrontal"],
    lobe: "frontal",
    hemisphere: "bilateral",
    stain: "melanin",
    path:
      "M 356,486 C 402,516 450,530 498,528 C 502,562 488,590 464,606 C 416,600 372,562 348,528 Z",
    cx: 424,
    cy: 552,
    functions: [
      "Autonomic and endocrine output — the direct route from cortex to body",
      "Emotional tagging of outcomes, feeding back into valuation",
      "Regulates the extinction of fear, which is learning, not deletion",
      "Part of the circuit James Papez proposed as the anatomical seat of emotion",
    ],
    lesions:
      "Bilateral damage produces the acquired sociopathy seen in Phineas Gage: unable to feel the pull of social consequences even while fully understanding them intellectually.",
    oddity:
      "It sits directly above the hypothalamus and is one of the few places where a thought can become a heartbeat within a second.",
  },
  {
    id: "frontopolar",
    name: "Frontopolar cortex",
    aka: ["BA 10", "rostral prefrontal cortex", "frontal pole"],
    lobe: "frontal",
    hemisphere: "bilateral",
    stain: "gfp",
    path:
      "M 104,252 C 98,304 108,362 140,402 C 172,424 214,422 244,410 " +
      "C 254,360 252,300 240,250 C 204,230 140,232 104,252 Z",
    cx: 176,
    cy: 326,
    functions: [
      "Holds a pending goal while you work on another — the branching of attention",
      "Prospective memory: remembering to act on an intention at the right future moment",
      "Integrates the outcomes of two separate tasks to decide what to do next",
    ],
    lesions:
      "Multitasking collapses while single tasks survive: the patient can do A and can do B, but cannot hold the intention to do B while doing A.",
    oddity:
      "Brodmann area 10 is disproportionately enlarged in humans relative to apes — one of the largest such differences in the entire cortex — and it is also among the least understood.",
  },
  {
    id: "premotor",
    name: "Premotor & supplementary motor",
    aka: ["SMA", "BA 6", "pre-SMA"],
    lobe: "frontal",
    hemisphere: "bilateral",
    stain: "gfp",
    path:
      "M 352,146 C 378,228 388,348 378,486 C 352,482 332,478 316,472 C 328,340 320,214 294,154 C 314,144 334,142 352,146 Z",
    cx: 340,
    cy: 310,
    functions: [
      "Chooses the movement for a given goal, especially when the goal is cued externally",
      "Internally generates and sequences movements with no external trigger",
      "Mirrors observed action — the neural basis of action understanding",
      "Holds learned movement sequences in a compressed, executable chunk",
    ],
    lesions:
      "Apraxia: the patient understands the goal, has the strength, but cannot produce the learned sequence — sometimes even for gestures they performed thousands of times.",
    oddity:
      "Mirror neurons were found here in macaques, and the leap from that to human empathy was made in a Nature commentary in 1998. It has not aged well.",
  },
  {
    id: "motor",
    name: "Primary motor cortex",
    aka: ["M1", "Brodmann area 4", "precentral gyrus"],
    lobe: "frontal",
    hemisphere: "left",
    stain: "vessel",
    path:
      "M 396,120 C 432,212 448,326 434,496 L 366,500 C 378,352 366,232 340,150 C 360,132 380,120 396,120 Z",
    cx: 404,
    cy: 300,
    functions: [
      "Somatotopic map of the body, distorted by use — hands and lips take the space shins do",
      "Direct corticospinal drive to the opposite side's muscles",
      "Outputs a signal to move; the spinal cord and brainstem decide how",
    ],
    lesions:
      "Stroke here produces contralateral paralysis. Because the map is somatotopic, the deficit tells you where the stroke was — face and arm sparing but leg paralysis localises to the parasagittal strip.",
    oddity:
      "Decades before Penfield mapped it by stimulating living brains, Eduard Hitzig and Gustav Fritsch had already found a strip of cortex where faradisation produced movement, on a dog, in 1870.",
  },
  {
    id: "broca",
    name: "Broca's area",
    aka: ["BA 44/45", "inferior frontal gyrus"],
    lobe: "frontal",
    hemisphere: "left",
    stain: "golgi",
    path:
      "M 268,410 C 300,432 344,448 388,452 C 392,486 380,514 358,532 C 316,520 278,490 264,456 C 260,438 262,422 268,410 Z",
    cx: 316,
    cy: 468,
    functions: [
      "Retrieves and sequences the motor plans for speech",
      "Grammatical construction, especially on-line sentence assembly",
      "Sequences the phonemes of a word before it is said",
    ],
    lesions:
      "Broca's aphasia: speech becomes effortful, halting and agrammatic, while comprehension largely survives. Patients typically know it is wrong and get frustrated.",
    oddity:
      "Paul Broca's first two patients could not speak but could sing. One could swear fluently when enraged — an observation that has never been fully explained.",
  },
  {
    id: "somatosensory",
    name: "Primary somatosensory cortex",
    aka: ["S1", "Brodmann area 3, 1, 2", "postcentral gyrus"],
    lobe: "parietal",
    hemisphere: "bilateral",
    stain: "melanin",
    path:
      "M 444,116 C 482,210 498,324 484,500 L 444,504 C 456,346 444,234 412,146 C 424,130 434,118 444,116 Z",
    cx: 460,
    cy: 300,
    functions: [
      "Maps touch, pressure, vibration, temperature and proprioception",
      "Receptive fields get smaller toward the cortex's middle — hand and lips again",
      "Feeds forward into body schema and into the dorsal attention stream",
    ],
    lesions:
      "Loss of sensation on the far side of the body, with cortical sensory loss: you cannot localise a touch you can clearly detect.",
    oddity:
      "The map is a map of the nerve endings in skin, not of the body. A phantom limb's cortical representation does not move, but its phantom does.",
  },
  {
    id: "dacc",
    name: "Anterior cingulate cortex",
    aka: ["ACC", "dACC and subgenual", "BA 24/32"],
    lobe: "cingulate",
    hemisphere: "bilateral",
    stain: "vessel",
    path:
      "M 386,130 C 460,102 578,96 676,116 C 736,128 784,156 812,196 C 754,220 668,226 578,218 C 486,210 414,184 372,158 Z",
    cx: 590,
    cy: 158,
    functions: [
      "Conflict monitoring — the dorsal ACC detects the mismatch between expected and got",
      "Effort and pain unpleasantness, which share much of the same circuitry",
      "Cognitive control reallocation: it decides when to spend more effort",
    ],
    lesions:
      "Abolishes the subjective pain of most acute pains while leaving the nociceptive reflex untouched — which is why it is the target of deep brain stimulation for refractory depression.",
    oddity:
      "The same electrodes that relieve chronic pain also relieve depression. Two conditions that look nothing alike share a circuit that dislikes prediction error.",
  },
  {
    id: "corpus",
    name: "Corpus callosum",
    aka: ["great commissure", "CC"],
    lobe: "commissural",
    hemisphere: "bilateral",
    stain: "melanin",
    path:
      "M 336,306 C 430,264 566,248 690,264 C 726,270 740,292 720,306 C 590,288 448,300 366,332 C 340,340 324,318 336,306 Z",
    cx: 528,
    cy: 292,
    functions: [
      "Around 200 million axons, connecting the two hemispheres point for point",
      "Transfers sensory, motor and the bulk of semantic information across",
      "Laterality itself: what gets disconnected, and what does not, defines what each side is for",
    ],
    lesions:
      "Split-brain patients — the corpus callosum surgically severed to control epilepsy — can name an object shown only to the right visual field, and cannot name one shown only to the left, while drawing it with the left hand.",
    oddity:
      "Sperry won the Nobel for this, and it remains the cleanest evidence in biology that two processes can share a brain and not share a mind.",
  },
  {
    id: "postcingulate",
    name: "Posterior cingulate cortex",
    aka: ["PCC", "BA 23/31", "precuneus interface"],
    lobe: "cingulate",
    hemisphere: "bilateral",
    stain: "vessel",
    path:
      "M 596,208 C 656,200 716,208 762,232 C 788,250 786,276 760,288 " +
      "C 700,300 632,294 592,272 C 570,254 574,216 596,208 Z",
    cx: 678,
    cy: 250,
    functions: [
      "A core hub of the default mode network, with the precuneus the most connected node in the cortex",
      "Self-referential processing and autobiographical retrieval — the 'me' in a memory",
      "Toggles with the dorsal attention network: when one rises, the other falls",
    ],
    lesions:
      "Among the earliest sites of amyloid deposition and metabolic decline in Alzheimer's, years before symptoms — which is why the DMN was first noticed failing there.",
    oddity:
      "It consumes more energy at rest than almost any other cortical region, which is part of why a brain doing 'nothing' still draws twenty watts.",
  },
  {
    id: "splenium",
    name: "Superior parietal lobule",
    aka: ["BA 5/7", "posterior parietal cortex"],
    lobe: "parietal",
    hemisphere: "right",
    stain: "vessel",
    path:
      "M 502,116 C 566,110 640,126 700,158 C 664,220 646,292 646,366 C 626,398 566,412 500,418 C 508,320 506,214 502,116 Z",
    cx: 578,
    cy: 264,
    functions: [
      "Visuospatial attention — where to look next, and reorienting when something changes",
      "Body ownership and the feeling of a limb being yours",
      "Numerical and spatial magnitude estimation, including line and angle judgement",
    ],
    lesions:
      "Right-sided damage gives hemispatial neglect: the left half of the world stops registering. Patients shave half their face, eat from one side of the plate, and are not aware there is an other side.",
    oddity:
      "Neglect can be relieved for hours by cold water splashed over the left ear. Cooling the ear cools the adjacent parietal cortex, and attention snaps back — a treatment found by accident.",
  },
  {
    id: "angular",
    name: "Angular gyrus",
    aka: ["BA 39", "supramarginal gyrus"],
    lobe: "parietal",
    hemisphere: "left",
    stain: "gfp",
    path:
      "M 500,426 C 560,424 618,412 656,388 C 692,366 736,360 776,372 C 762,420 716,458 654,478 C 604,494 542,482 506,458 Z",
    cx: 640,
    cy: 428,
    functions: [
      "The default route by which number, space and meaning meet — arithmetic depends on it",
      "Supports reading comprehension and the binding of words to world knowledge",
      "Integrates sight with meaning in the ventral stream's posterior end",
    ],
    lesions:
      "Gerstmann syndrome: finger agnosia, right-left confusion, agraphia and acalculia together — a bizarre package that has never been cleanly split.",
    oddity:
      "It is one of the few places where damage produces a supernormal effect: number-blind patients asked to estimate large quantities guess closer to the truth than controls.",
  },
  {
    id: "dorsal",
    name: "Dorsal stream",
    aka: ["where/how pathway", "posterior parietal action system"],
    lobe: "parietal",
    hemisphere: "bilateral",
    stain: "gfp",
    path:
      "M 668,242 C 726,208 790,208 824,244 C 856,282 850,344 812,382 C 768,422 702,420 662,378 C 630,346 626,278 668,242 Z",
    cx: 740,
    cy: 314,
    functions: [
      "Answers where and how: reaching, grasping, navigating, joint guidance",
      "Applies sensory information to action directly, bypassing the need for identification",
      "Eyes and hands in a loop — this is why it is called the vision-for-action stream",
    ],
    lesions:
      "Optic ataxia: you can name and recognise an object perfectly but reach for it inaccurately, scaling the error with target size. Balint's syndrome adds simultanagnosia and optic ataxia together.",
    oddity:
      "Goodall's chimps could use tools to solve problems but did not carry the tool to the problem. That gap between knowing and doing turned out to be dorsal, not cognitive.",
  },
  {
    id: "v1",
    name: "Primary visual cortex",
    aka: ["V1", "striate cortex", "BA 17", "calcarine sulcus"],
    lobe: "occipital",
    hemisphere: "bilateral",
    stain: "vessel",
    path:
      "M 826,236 C 876,258 912,312 916,372 C 920,424 892,462 846,478 C 822,448 808,402 806,350 C 804,300 812,256 826,236 Z",
    cx: 862,
    cy: 356,
    functions: [
      "First cortical map of retinal input — retinotopy preserved, left field to right",
      "Orientation and spatial-frequency selectivity, in columns that look alike across species",
      "Sends everything onward down two streams that never talk again",
    ],
    lesions:
      "Cortical blindness in the affected field, with denial in some cases. The visual field map survives so precisely that the shape of the blind spot sketches the lesion.",
    oddity:
      "Hubel and Wiesel showed kitten V1 is malformed if one eye is briefly closed after birth — the wiring is built by what it sees, which is the template for all later critical-period research.",
  },
  {
    id: "ventral",
    name: "Ventral stream",
    aka: ["what pathway", "inferotemporal cortex"],
    lobe: "occipital",
    hemisphere: "bilateral",
    stain: "golgi",
    path:
      "M 748,428 C 802,418 852,438 872,482 C 890,524 866,564 822,580 C 776,594 736,566 730,522 C 726,482 736,438 748,428 Z",
    cx: 796,
    cy: 502,
    functions: [
      "Answers what: identity, category, meaning of an object",
      "Viewpoint and size invariance — the same object from any angle is the same object",
      "Runs to inferior temporal cortex and onward into semantic memory",
    ],
    lesions:
      "Visual agnosia: the patient sees perfectly, sees motion and action, and cannot say what they are looking at.",
    oddity:
      "Decades after the two-stream proposal was published, it was still controversial — a fact worth remembering when a clean-sounding division of the brain sounds settled.",
  },
  {
    id: "insula",
    name: "Insula",
    aka: ["Island of Reil", "BA 13"],
    lobe: "insula",
    hemisphere: "bilateral",
    stain: "melanin",
    path:
      "M 424,438 C 464,458 508,468 552,464 C 560,500 552,532 532,556 " +
      "C 490,560 442,544 412,516 C 396,494 410,458 424,438 Z",
    cx: 482,
    cy: 500,
    functions: [
      "Interoception: the sense of what your body is doing, made available to awareness",
      "The unpleasantness dimension of pain — the locus coeruleus and ACC give the feeling",
      "Salience and disgust, and the subjective texture of a craving",
    ],
    lesions:
      "Loss of the feeling that a body state is one's own, and of pain's unpleasant half. Patients will report a hand being on fire with flat affect.",
    oddity:
      "Craig's work argued that the posterior insula is where a raw feeling of being a body is constructed — arguably the closest thing neuroscience has to a 'where is the self' address.",
  },
  {
    id: "auditory",
    name: "Primary auditory cortex",
    aka: ["A1", "BA 41/42", "Heschl's gyrus"],
    lobe: "temporal",
    hemisphere: "bilateral",
    stain: "golgi",
    path:
      "M 462,476 C 510,504 576,514 642,504 C 696,496 740,492 772,502 C 772,536 750,562 710,572 C 640,584 556,572 500,546 C 468,530 454,500 462,476 Z",
    cx: 616,
    cy: 528,
    functions: [
      "Tonotopic map — high frequencies frontally, low laterally, like a piano rolled up",
      "First cortical bin for sound, before anything is recognised as speech or music",
      "Feeds the superior temporal gyrus, where auditory objects get identified",
    ],
    lesions:
      "Bilateral damage produces cortical deafness: intact inner ear, intact brainstem, no sound at all in the cortex. Unilateral damage usually goes unnoticed.",
    oddity:
      "Sound reaches the auditory cortex before the cortex knows what it is — and the tonotopic map is invariant across people to a striking degree, unlike almost every other cortical map.",
  },
  {
    id: "wernicke",
    name: "Wernicke's area",
    aka: ["BA 22", "posterior superior temporal gyrus"],
    lobe: "temporal",
    hemisphere: "left",
    stain: "melanin",
    path:
      "M 674,486 C 726,474 782,484 820,510 C 846,528 848,558 826,578 C 778,592 714,586 678,564 C 656,542 660,510 674,486 Z",
    cx: 748,
    cy: 534,
    functions: [
      "Speech comprehension — turning acoustic form into lexical meaning",
      "Semantic retrieval for spoken and written language",
      "Feeds the dorsal 'how' and ventral 'what' language pathways",
    ],
    lesions:
      "Wernicke's aphasia: fluent, grammatical, effortless speech with almost no content — the opposite dissociation to Broca's. The patient is unaware anything is wrong.",
    oddity:
      "The classic dissociation depends on the lesion being left-lateralised. In a large fraction of left-handers, language lateralises right — which was itself first discovered by studying this lesion.",
  },
  {
    id: "fusiform",
    name: "Fusiform gyrus & face area",
    aka: ["FFA", "occipitotemporal face area", "BA 37"],
    lobe: "temporal",
    hemisphere: "right",
    stain: "vessel",
    path:
      "M 710,592 C 762,572 816,578 846,608 C 872,634 866,668 836,684 C 796,704 738,698 712,666 C 690,638 692,608 710,592 Z",
    cx: 776,
    cy: 640,
    functions: [
      "Face detection and identity, with its own dedicated cortical territory",
      "Fine-grained discrimination of expression and of eye direction",
      "Stores the mental representations of familiar faces you know by name",
    ],
    lesions:
      "Prosopagnosia: you can see faces, see that they are faces, and be unable to identify a single familiar one. Much of it is congenital, so it is not damage but absent development.",
    oddity:
      "The FFA has yet to yield to fMRI anyone who is blind from birth but recognises faces by touch — which is evidence for a domain that is about faces specifically, not vision generally.",
  },
  {
    id: "amygdala",
    name: "Amygdala",
    aka: ["BLA", "basolateral nucleus", "ALIC"],
    lobe: "temporal",
    hemisphere: "bilateral",
    stain: "vessel",
    path:
      "M 406,554 C 438,568 460,596 462,628 C 464,654 448,674 424,676 C 396,668 382,640 384,606 C 386,580 392,560 406,554 Z",
    cx: 420,
    cy: 616,
    functions: [
      "Assigns biological significance — especially threat — in as little as 100 ms",
      "Acquires and stores conditioned fear responses, and does not forget them easily",
      "Interacts with the prefrontal cortex to compute value and suppress the automatic",
    ],
    lesions:
      "Urbaida and Jänich, 1955: a bilateral amygdalectomy for rage produced a placid man who had to be shown food to eat it and could not recognise his relatives.",
    oddity:
      "It is not the fear centre. It does not feel fear. It assigns significance, and the feeling is assembled somewhere else entirely.",
  },
  {
    id: "hippocampus",
    name: "Hippocampus",
    aka: ["Ammon's horn", "CA1–CA4", "dentate gyrus"],
    lobe: "temporal",
    hemisphere: "bilateral",
    stain: "gfp",
    path:
      "M 472,592 C 520,602 562,628 584,662 C 600,690 590,718 566,730 C 522,730 484,704 466,666 C 452,634 454,598 472,592 Z",
    cx: 518,
    cy: 660,
    functions: [
      "Binds a scene or event to the time and place it happened — contextual indexing",
      "Replays experience during rest, compressed up to twenty-fold, to consolidate it",
      "The critical period: memories are flexible for hours, then largely immutable",
      "Relational structure, not storage — where the memory lives remains contested",
    ],
    lesions:
      "H.M. lost both hippocampi in 1953 for epilepsy and could not form new declarative memories at all. His old memories were intact; his ability to learn was not.",
    oddity:
      "Place cells were found there first — neurons that fire in one specific location. The hippocampus is a map. That is not a metaphor; the cells are doing it.",
  },
  {
    id: "entorhinal",
    name: "Entorhinal cortex",
    aka: ["Brodmann area 28", "gateway to the hippocampus"],
    lobe: "temporal",
    hemisphere: "bilateral",
    stain: "gfp",
    path:
      "M 588,612 C 632,610 674,624 702,646 C 722,662 724,686 708,700 C 666,712 618,708 588,690 C 566,674 570,618 588,612 Z",
    cx: 640,
    cy: 660,
    functions: [
      "The main funnel into the hippocampus — where cortical input becomes memory input",
      "Grid and border cells: a self-updating map of location, firing as you move",
      "First relay in the ventral stream for objects that are not faces",
    ],
    lesions:
      "The earliest and most consistent pathology in Alzheimer's disease: entorhinal and hippocampal tau deposition years before any memory complaint appears.",
    oddity:
      "Grid cells won the Nobel Prize in 2014 for letting a rat keep track of where it was — discovered by fitting an equation to spikes recorded by a tetrode during a walk across a field.",
  },
  {
    id: "parahippocampal",
    name: "Parahippocampal gyrus",
    aka: ["PPA", "parahippocampal place area", "BA 36/37 medial"],
    lobe: "temporal",
    hemisphere: "bilateral",
    stain: "melanin",
    path:
      "M 648,596 C 694,592 738,606 764,630 C 784,648 784,674 766,688 " +
      "C 724,702 674,696 646,676 C 626,658 630,602 648,596 Z",
    cx: 706,
    cy: 648,
    functions: [
      "Scene and place recognition — rooms, landscapes, spatial layouts, not faces or objects",
      "The other half of the classic double dissociation: FFA damage spares places, PPA damage spares faces",
      "Feeds spatial context into the entorhinal cortex and onward to the hippocampus",
    ],
    lesions:
      "Topographical disorientation: the patient recognises every object and face in a room and cannot tell which room it is, including their own.",
    oddity:
      "Epstein and Kanwisher found it in 1998 by showing subjects empty rooms. It responds more to a photograph of a kitchen with the appliances removed than to any face ever recorded.",
  },
  {
    id: "thalamus",
    name: "Thalamus",
    aka: ["diencephalon", "LGN / MGN / VL"],
    lobe: "subcortical",
    hemisphere: "bilateral",
    stain: "melanin",
    path:
      "M 554,484 C 602,476 652,490 684,520 C 708,544 702,574 674,586 C 628,596 580,582 554,554 C 536,536 538,496 554,484 Z",
    cx: 610,
    cy: 534,
    functions: [
      "Nearly every cortical signal passes through thalamic relay nuclei on its way in",
      "Loops back to cortex, so thalamocortical timing is part of how cortex is organised",
      "The thalamic reticular nucleus gates attention like an adjustable shutter",
    ],
    lesions:
      "Deafferentation causes oscillatory thalamic activity and a tremor no longer driven by the cortex that first caused it.",
    oddity:
      "Sleep spindles are generated inside the thalamus and broadcast to the whole cortex. The architecture of overnight memory maintenance is, in a real sense, built here.",
  },
  {
    id: "accumbens",
    name: "Nucleus accumbens",
    aka: ["ventral striatum", "NAc", "reward pathway"],
    lobe: "subcortical",
    hemisphere: "bilateral",
    stain: "golgi",
    path:
      "M 462,602 C 496,614 524,638 538,668 C 550,694 538,718 514,722 C 480,718 450,692 436,658 C 424,628 434,604 462,602 Z",
    cx: 486,
    cy: 660,
    functions: [
      "The ventral striatum: incentive salience — wanting, distinct from liking",
      "Receives dopamine prediction-error from the midbrain and drives approach",
      "Gates which cortical and limbic outputs get selected as the action to take",
    ],
    lesions:
      "Anhedonia and a flat motivational state with no change in capacity to enjoy when directly stimulated.",
    oddity:
      "'Wanting' and 'liking' come apart. In addiction the wanting keeps climbing long after the liking has gone — which is why craving outlives pleasure.",
  },
  {
    id: "striatum",
    name: "Caudate & putamen",
    aka: ["dorsal striatum", "caudate nucleus", "putamen"],
    lobe: "subcortical",
    hemisphere: "bilateral",
    stain: "vessel",
    path:
      "M 480,500 C 522,492 570,500 602,528 C 626,550 622,580 596,594 C 552,606 500,596 474,570 C 454,550 458,510 480,500 Z",
    cx: 536,
    cy: 546,
    functions: [
      "Action selection and habit formation — a direct cortical–striatal loop",
      "Chunks action sequences so they stop needing conscious guidance",
      "Cognitive control via the frontostriatal loops, task by task",
    ],
    lesions:
      "Huntington's disease kills the striatum early, producing chorea and — before movement changes — a loss of cognitive flexibility that families usually notice first.",
    oddity:
      "The direct and indirect pathways run in opposite directions and both increase movement; one smooths a selected action, the other cancels the competing one.",
  },
  {
    id: "hypothalamus",
    name: "Hypothalamus",
    aka: ["optic chiasm to mammillary bodies"],
    lobe: "subcortical",
    hemisphere: "bilateral",
    stain: "gfp",
    path:
      "M 508,650 C 550,662 584,684 600,712 C 610,732 600,750 580,752 C 546,748 518,726 506,698 C 496,674 496,654 508,650 Z",
    cx: 550,
    cy: 700,
    functions: [
      "Homeostasis: temperature, hunger, thirst, circadian timing, osmolality",
      "Controls the pituitary — every hormonal axis in the body routes through it",
      "Orchestrates the stress response and, via the suprachiasmatic nucleus, the day",
    ],
    lesions:
      "Loss of the SCN destroys circadian rhythm; the suprachiasmatic nucleus is why melatonin follows a 24-hour cycle at all.",
    oddity:
      "It is roughly the size of a lentil and it runs the temperature of a laboratory, the timing of a year, and the timing of your children arriving.",
  },
  {
    id: "substantia",
    name: "Substantia nigra",
    aka: ["SNc and SNr", "nigrostriatal pathway"],
    lobe: "brainstem",
    hemisphere: "bilateral",
    stain: "gfp",
    path:
      "M 620,622 C 650,632 668,660 666,694 C 664,724 646,744 622,746 C 600,740 590,712 592,682 C 594,652 602,626 620,622 Z",
    cx: 628,
    cy: 684,
    functions: [
      "Dopaminergic neurons degenerate selectively in Parkinson's — a named pathology by mechanism",
      "Its compact cells project striatum-wide; the retrorubral cells project mesolimbic and mesocortical",
      "A teaching signal about which actions were worth repeating",
    ],
    lesions:
      "Bradykinesia, rigidity and resting tremor. Lewy bodies were found in the substantia nigra of patients decades before the dopamine link was established.",
    oddity:
      "Neuromelanin made these neurons look brown to the first anatomists, which is where the name comes from. The pigment is a marker of age — young brains barely have any.",
  },
  {
    id: "cerebellum",
    name: "Cerebellum",
    aka: ["little brain", "vermis and hemispheres"],
    lobe: "cerebellum",
    hemisphere: "bilateral",
    stain: "gfp",
    path: CEREBELLUM,
    cx: 803,
    cy: 555,
    functions: [
      "Predicts the sensory consequence of an action milliseconds before it happens",
      "Error correction in real time — timing, force and trajectory",
      "Cognition and language, and the timing of thought itself",
    ],
    lesions:
      "Ataxia: past-pointing, intention tremor, dysarthria and a wide-based gait. The phylogenetically oldest cortex of the three is the one that has quietly taken over motor timing.",
    oddity:
      "It holds roughly 80% of the brain's neurons — about 69 billion — in about 10% of the volume. The most neuron-dense structure in the skull, and the last one most people learn to name.",
  },
  {
    id: "brainstem",
    name: "Brainstem",
    aka: ["midbrain, pons, medulla", "reticular formation"],
    lobe: "brainstem",
    hemisphere: "bilateral",
    stain: "vessel",
    path: BRAINSTEM,
    cx: 612,
    cy: 630,
    functions: [
      "Nucleus basalis of Meynert, the cholinergic wake-up system that keeps cortex awake",
      "The reticular formation modulating arousal and attention globally",
      "All involuntary life support — breathing, heart rate, reflexes, swallowing",
    ],
    lesions:
      "Descending reticular activating system damage causes coma in seconds. Nothing higher up can override it, because it is the switchboard, not the machine.",
    oddity:
      "Everything you have ever done without deciding to do it — swallowing, blinking, breathing, and almost all of your postural control — is running machinery located here.",
  },
];

export const REGION_LOBE = new Map<string, Lobe>(REGIONS.map((r) => [r.id, r.lobe]));
