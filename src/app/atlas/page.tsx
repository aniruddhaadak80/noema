import type { Metadata } from "next";
import BrainAtlas from "@/components/brain-atlas";
import PageHeader from "@/components/page-header";
import { LOBES, REGIONS } from "@/data/regions";
import { MOLECULES } from "@/data/circuits";
import { STAIN } from "@/lib/stain";

export const metadata: Metadata = {
  title: "Atlas",
  description:
    "An interactive lateral diagram of the human brain. Thirty-one regions, each with its function, its lesion profile, and the detail that does not fit in a textbook sentence.",
};

export default function AtlasPage() {
  const cortex = REGIONS.filter((r) => !["cerebellum", "brainstem"].includes(r.lobe)).length;

  return (
    <>
      <PageHeader
        over="Register one · Neuroanatomy"
        s="gfp"
        title={
          <>
            Thirty-one regions,
            <br />
            <span className="italic text-gfp">one sheet of tissue</span>
          </>
        }
        lede="A lateral view of the left hemisphere. The coloured areas are not tiles — they overlap, the way stains overlap on a real section, and each is held inside the cortical silhouette so the outline stays honest. Select any region to read what it does, what happens when it stops, and the detail that rarely makes it into a textbook."
        aside={
          <dl className="grid grid-cols-2 gap-x-8 gap-y-5">
            {[
              ["31", "regions mapped"],
              ["10", "divisions"],
              [String(cortex), "of them cortical"],
              ["2", "drawn outside the sheet"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-[2rem] leading-none text-bone">{n}</dt>
                <dd className="mt-1.5 text-[11px] leading-tight text-dim">{l}</dd>
              </div>
            ))}
            <p className="col-span-2 mt-2 border-l border-hair pl-4 text-[13px] leading-relaxed text-dim">
              Boundaries shown: the central sulcus, the lateral sulcus,
              and the parieto-occipital sulcus. Everything else is drawn
              from the region it belongs to, not from the skull.
            </p>
          </dl>
        }
      >
        {LOBES.map((l) => (
          <span
            key={l.id}
            className={`rounded-full px-2.5 py-1 text-[11px] ring-1 ${STAIN[l.stain].ring} ${STAIN[l.stain].text}`}
          >
            {l.name}
          </span>
        ))}
      </PageHeader>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <BrainAtlas />
        </div>
      </section>

      {/* The chemistry underneath the anatomy. */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal className="max-w-3xl">
            <div className={`mb-5 h-px w-14 ${STAIN.golgi.bg}`} />
            <p className="eyebrow mb-4">Why the stains are those colours</p>
            <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] text-bone">
              Nothing on this page does anything on its own
            </h2>
            <p className="prose-measure mt-6 text-[1.0625rem] leading-relaxed text-mute">
              Every region above runs on the same handful of chemicals.
              Two of them — glutamate and GABA — carry almost all the
              traffic. The rest set the gain, the timing, and whether any
              of it gets through. The full set is on the circuits page.
            </p>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MOLECULES.slice(0, 8).map((m, i) => (
              <Link2 key={m.id} href="/circuits" s={m.stain} delay={i * 55}>
                <p className={`font-display text-[1.4rem] leading-tight ${STAIN[m.stain].text}`}>
                  {m.name}
                </p>
                <p className="mt-1.5 text-[11px] tracking-[0.1em] text-dim uppercase">
                  {m.cls}
                </p>
                <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-mute">
                  {m.role}
                </p>
              </Link2>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Link2({
  href,
  children,
  s,
  delay,
}: {
  href: string;
  children: React.ReactNode;
  s: keyof typeof STAIN;
  delay: number;
}) {
  return (
    <a
      href={href}
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className="block rounded-[1.5rem] bg-panel p-6 ring-1 ring-white/[0.06] transition-colors duration-700 ease-fluid hover:bg-raised"
    >
      {children}
    </a>
  );
}
