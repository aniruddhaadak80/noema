# Noema — an atlas of the mind

**An interactive atlas of the human brain and mind: 31 cortical and subcortical regions, 12 neurotransmitters, 7 large-scale networks, 14 landmark experiments, 24 positions on the philosophy of mind, and an honest comparison against artificial intelligence.**

Built with Next.js 16, Turbopack, and Tailwind CSS v4. Deployed on Vercel.

## What's inside

| Section | Contents |
|---------|----------|
| **Atlas** | 31 regions rendered as interactive stains on a lateral brain silhouette. Each region shows its function, what happens when it stops, and the detail that rarely makes it into a textbook. |
| **Circuits** | 12 neurotransmitters (with excess/deficit columns), 6 diffuse neuromodulatory nuclei, 7 large-scale brain networks, 4 sleep stages, and 5 theories of consciousness that disagree with each other. |
| **Mind** | 5 memory systems with different substrates and half-lives, 12 cognitive biases (mechanism + payoff + cost), 14 landmark experiments (including caveats), 5 concepts with defended + popular + gap. |
| **Questions** | 24 positions on the mind–body problem, consciousness, free will, personal identity and embodied cognition — each stated with the claim and the bill. |
| **Mirror** | 12 axes of comparison between a human brain and a 2026 frontier AI model — with the evidence rather than the analogy. Includes the axis where hardware has already caught up and the one where it has not. |

## Honest figures

The famous "86 billion neurons" is documented as contested:

- **Herculano-Houzel 2009**: 86.1 ± 8.1 billion across four adult male brains (average), confidence interval ~73–99 billion; underlying data were never published.
- **Goriely 2024**: The only statement supportable from the data is that the mean lies between about 73 and 99 billion.
- **Second study** (five older women): 61–73 billion — a range that does not overlap with the male study.
- **Total**: Nine whole brains have ever been counted. Everything else is inference from partial data.

## Design

- Anti-sloped UI per the `high-end-visual-design` skill: no banned fonts (Inter/Roboto/Arial), no thick-stroked icons, no generic borders/shadows, no edge-to-edge sticky navs.
- Deep gray (`#06070b`) ground with Golgi magenta, immunofluorescence cyan, melanin amber, and vessel red as the only saturated accents — the way histology actually looks on a fluorescence scope.
- Nested double-bezel architecture on every card: outer shell with hairline + fill, inner core with concentric smaller radius and inset highlight.
- Custom cubic-bezier transitions (`cubic-bezier(0.32, 0.72, 0, 1)`) throughout; no `linear` or `ease-in-out`.
- Macro-whitespace: `py-24` to `py-40` for sections; the layout breathes heavily.
- All animations use only `transform` and `opacity` — no layout-triggering properties.
- `backdrop-blur` only on fixed/sticky elements, never on scrolling content.
- Layout collapses gracefully below 768px to single-column with `w-full` and `px-4`.
- Variable fonts: `Geist` (sans) and `Bodoni Moda` (display), self-hosted via `next/font`.

## Sections (5 routes)

| Route | Index | Title | Subtitle |
|-------|-------|-------|----------|
| `/` | 01 | Atlas | The anatomy, region by region |
| `/circuits` | 02 | Circuits | Chemistry, networks, sleep, consciousness |
| `/mind` | 03 | Mind | Memory, bias, and the studies everyone cites |
| `/questions` | 04 | Questions | What the neuroscience does not settle |
| `/mirror` | 05 | Mirror | The other kind of brain |

## Quick start

```bash
# install
npm install

# develop
npm run dev

# build
npm run build

# start production
npm run start
```

## Deploy

This project is configured for Vercel. Push to GitHub and connect the repository on Vercel, or:

```bash
vercel
vercel --prod
```

## License

MIT. Data citations are in the individual sections; see the sources footnote in each.

---

Built by Aniruddha Adak. Not medical advice, not a clinical reference. Figures cited are from the literature as of October 2026 and several are actively disputed.