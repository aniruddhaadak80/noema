import Link from "next/link";
import NeuralField from "@/components/neural-field";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pt-32 pb-24 md:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <NeuralField density={0.5} />
      </div>

      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Error 404 · No signal</p>
        <h1 className="mt-8 text-[clamp(3rem,9vw,6rem)] leading-[0.9] text-bone">
          Nothing at
          <br />
          <span className="italic text-melanin">this address</span>
        </h1>
        <p className="prose-measure mt-8 text-lg leading-relaxed text-mute">
          The region you asked for does not exist in this atlas. It may
          have been renamed, or it may be a concept rather than a place —
          which is a category error worth avoiding, as the last page
          argues.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-bone py-1.5 pr-1.5 pl-5 text-sm text-ink transition-transform duration-500 ease-fluid active:scale-[0.98]"
          >
            Back to the start
            <span className="grid size-7 place-items-center rounded-full bg-ink/10 transition-transform duration-500 ease-fluid group-hover:translate-x-0.5">
              <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden>
                <path
                  d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
          <Link
            href="/atlas"
            className="rounded-full px-5 py-3 text-sm text-mute ring-1 ring-white/10 transition-colors duration-500 hover:text-bone"
          >
            Open the atlas
          </Link>
        </div>
      </div>
    </section>
  );
}
