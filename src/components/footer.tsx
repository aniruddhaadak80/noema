import Link from "next/link";
import { NAV } from "@/lib/stain";

const SOURCES = [
  { label: "Herculano-Houzel, isotropic fractionator", href: "https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/neuro.09.031.2009/full" },
  { label: "von Bartheld, Bahney & Herculano-Houzel (2016)", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5063692/" },
  { label: "Goriely, 'Eighty-six billion and counting' (2024)", href: "https://academic.oup.com/brain/article/148/3/689/7909879" },
  { label: "Yeo et al., 17-network parcellation", href: "https://www.pnas.org/doi/10.1073/pnas.1834582110" },
  { label: "Raichle et al., the default mode network", href: "https://www.pnas.org/doi/10.1073/pnas.98.2.676" },
  { label: "Melloni, Lauer & Ga Science: energy of AI inference", href: "https://www.cell.com/joule/fulltext/S2542-4351(26)00114-5" },
  { label: "Epoch AI, power demands of frontier training", href: "https://epoch.ai/publications/power-demands-of-frontier-ai-training" },
];

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-hair px-5 py-16 md:mt-40 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-[2rem] leading-none text-bone">Noema</p>
            <p className="eyebrow mt-3">An atlas of the mind</p>
            <p className="prose-measure mt-6 max-w-sm text-sm leading-relaxed text-mute">
              Built from the neuroscience literature rather than from
              summaries of it. Where a famous number is contested, it is
              shown as contested. Where a famous study is weaker than its
              reputation, that is said too.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Sections</p>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm text-mute transition-colors duration-500 hover:text-bone"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Sources</p>
            <ul className="space-y-2.5">
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block text-sm text-mute transition-colors duration-500 hover:text-bone"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hair pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-relaxed text-dim">
            An educational project. Not medical advice, and not a clinical
            reference. Figures cited here are from the literature as of
            October 2026 and several are actively disputed.
          </p>
          <p className="text-xs text-dim">Built with Next.js · Open source</p>
        </div>
      </div>
    </footer>
  );
}
