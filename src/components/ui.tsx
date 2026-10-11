import Link from "next/link";
import type { ReactNode } from "react";
import type { Stain } from "@/lib/types";
import { STAIN } from "@/lib/stain";

/* An eyebrow that reports something rather than decorating. */
export function Tag({
  children,
  s = "gfp",
  className = "",
}: {
  children: ReactNode;
  s?: Stain;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase ${STAIN[s].text} ${STAIN[s].soft} ring-1 ${STAIN[s].ring} ${className}`}
    >
      {children}
    </span>
  );
}

/* Primary action. The arrow never sits naked beside the label — it
   is a disc in its own right, and the whole thing presses down. */
export function Action({
  href,
  children,
  s = "gfp",
  external = false,
}: {
  href: string;
  children: ReactNode;
  s?: Stain;
  external?: boolean;
}) {
  const inner = (
    <>
      <span>{children}</span>
      <span
        className={`grid size-7 shrink-0 place-items-center rounded-full ${STAIN[s].soft} transition-transform duration-500 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105`}
      >
        <svg viewBox="0 0 16 16" className="size-3" aria-hidden fill="none">
          <path
            d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );

  const cls =
    `group inline-flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-5 text-sm ` +
    `transition-[transform,background-color] duration-500 ease-fluid active:scale-[0.98] ` +
    STAIN[s].text;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* A section title that behaves like a plate caption. */
export function Plate({
  over,
  title,
  lede,
  s = "gfp",
}: {
  over: string;
  title: string;
  lede?: string;
  s?: Stain;
}) {
  return (
    <header className="max-w-3xl">
      <div className={`mb-5 h-px w-14 ${STAIN[s].bg}`} />
      <p className="eyebrow mb-4">{over}</p>
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-bone">{title}</h2>
      {lede ? (
        <p className="prose-measure mt-6 text-[1.0625rem] leading-relaxed text-mute">{lede}</p>
      ) : null}
    </header>
  );
}

/* The little square that sits in front of a list entry. Reads as a
   tissue sample on a slide rather than a bullet point. */
export function Pin({ s = "gfp" }: { s?: Stain }) {
  return (
    <span
      className={`mt-[0.55em] size-1.5 shrink-0 rotate-45 ring-1 ${STAIN[s].ring} ${STAIN[s].bg}`}
      aria-hidden
    />
  );
}
