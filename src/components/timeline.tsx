const ITEMS = [
  { year: "~200 CE", who: "Galen", idea: "Ventricular theory of cognition" },
  { year: "1543", who: "Vesalius", idea: "De humani corporis fabrica shifts focus to structure" },
  { year: "1791", who: "Galvani", idea: "Animal electricity demonstrated" },
  { year: "1870", who: "Fritsch & Hitzig", idea: "Cortical stimulation elicits movement" },
  { year: "1873", who: "Golgi", idea: "Reticular theory of nervous tissue" },
  { year: "1888", who: "Cajal", idea: "Neuron doctrine" },
  { year: "1861", who: "Broca", idea: "Left inferior frontal damage impairs speech" },
  { year: "1874", who: "Wernicke", idea: "Posterior temporal lesion impairs comprehension" },
  { year: "1924", who: "Berger", idea: "First human EEG recording" },
  { year: "1949", who: "Hebb", idea: "\u201cCells that fire together, wire together\u201d" },
  { year: "1957", who: "Hartline", idea: "Receptive fields in retina" },
  { year: "1962", who: "Hubel & Wiesel", idea: "Orientation selectivity in V1" },
  { year: "1973", who: "Kandel", idea: "Synaptic basis of learning in Aplysia" },
  { year: "1990", who: "Ogawa et al.", idea: "BOLD fMRI introduced" },
  { year: "2005\u2013now", who: "Human Connectome Project", idea: "Large-scale wiring maps" },
  { year: "2010\u2013now", who: "Optogenetics era", idea: "Cell-type specific causal control" },
];

export default function Timeline() {
  return (
    <div className="relative mx-auto max-w-4xl pl-6">
      <div className="absolute left-2 top-0 h-full w-px bg-hair" />
      {ITEMS.map((it, i) => (
        <article key={i} className="relative mb-10">
          <span className="absolute -left-[9px] top-1.5 size-2 rounded-full bg-golgi ring-2 ring-ink" />
          <div className="ml-6 rounded-[1.25rem] bg-panel p-5 ring-1 ring-white/[0.06]">
            <div className="flex flex-wrap items-baseline gap-3">
              <p className="font-display text-xl leading-none text-bone">{it.year}</p>
              <p className="text-sm text-dim">{it.who}</p>
            </div>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-mute">{it.idea}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
