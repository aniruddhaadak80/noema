import type { ReactNode } from "react";
import { Tag } from "@/components/ui";
import { STAIN } from "@/lib/stain";
import type { Stain } from "@/lib/types";

export default function PageHeader({
  over,
  title,
  lede,
  s = "gfp",
  aside,
  children,
}: {
  over: string;
  title: ReactNode;
  lede: string;
  s?: Stain;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="px-5 pt-36 pb-16 md:px-10 md:pt-48 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <div
          className="flex items-center gap-3"
          style={{ animation: "noema-rise 700ms var(--ease-fluid) 60ms both" }}
        >
          <span className={`h-px w-10 ${STAIN[s].bg}`} aria-hidden />
          <p className="eyebrow">{over}</p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <h1
              className="text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.9] text-bone"
              style={{ animation: "noema-rise 900ms var(--ease-fluid) 130ms both" }}
            >
              {title}
            </h1>
            <p
              className="prose-measure-wide mt-8 text-[1.0625rem] leading-relaxed text-mute"
              style={{ animation: "noema-rise 900ms var(--ease-fluid) 230ms both" }}
            >
              {lede}
            </p>
          </div>
          {aside ? (
            <div
              className="lg:border-l lg:border-hair lg:pl-8"
              style={{ animation: "noema-rise 900ms var(--ease-fluid) 330ms both" }}
            >
              {aside}
            </div>
          ) : null}
        </div>

        {children ? (
          <div
            className="mt-10 flex flex-wrap gap-2"
            style={{ animation: "noema-rise 900ms var(--ease-fluid) 420ms both" }}
          >
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}

export { Tag };
