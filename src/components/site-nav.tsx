"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/stain";
import CommandPalette from "@/components/command-palette";

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* Close the menu on navigation (including back/forward, which no
     click handler can see). Idempotent and conditional, so it never
     loops — the lint heuristic below cannot tell that apart from a
     cascading render, hence the scoped disable. */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Detached pill. Not glued to the top edge. */}
      <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
        <div
          className={`pointer-events-auto flex items-center gap-1 rounded-full p-1.5 ring-1 transition-colors duration-700 ease-fluid ${
            open
              ? "bg-ink/70 ring-white/10 backdrop-blur-2xl"
              : "bg-ink/55 ring-white/[0.07] backdrop-blur-xl"
          }`}
        >
          <Link
            href="/"
            className="group ml-2.5 mr-1.5 flex items-baseline gap-1.5 transition-opacity duration-500 hover:opacity-70"
            aria-label="Noema, home"
          >
            <span className="font-display text-[1.35rem] leading-none tracking-tight text-bone">
              Noema
            </span>
            <span className="text-[0.6rem] text-dim" aria-hidden>
              νόημα
            </span>
          </Link>

          <div className="hidden items-center md:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-[0.8125rem] transition-colors duration-500 ease-fluid ${
                    active ? "text-ink" : "text-mute hover:text-bone"
                  }`}
                >
                  {active ? (
                    <span className="absolute inset-0 rounded-full bg-bone" aria-hidden />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <span className="mx-1 hidden h-4 w-px bg-hair md:block" aria-hidden />

          <div className="flex items-center">
            <CommandPalette />

            {/* Three strokes that fold into a cross. */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative mr-1 grid size-8 place-items-center rounded-full transition-colors duration-500 hover:bg-white/5"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-full bg-bone transition-all duration-500 ease-fluid ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute top-1.5 left-0 block h-px w-full bg-bone transition-all duration-500 ease-fluid ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-bone transition-all duration-500 ease-fluid ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {open ? (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-between bg-ink/92 px-6 pt-32 pb-10 backdrop-blur-3xl md:hidden"
          style={{ animation: "noema-fade 420ms var(--ease-fluid)" }}
        >
          <ul className="space-y-1">
            {[{ href: "/", label: "Home" }, ...NAV].map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-hair py-4 font-display text-[2.75rem] leading-none text-bone"
                  style={{
                    animation: `noema-rise 620ms var(--ease-fluid) ${i * 55 + 90}ms both`,
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p
            className="text-xs leading-relaxed text-dim"
            style={{ animation: "noema-rise 620ms var(--ease-fluid) 460ms both" }}
          >
            An atlas of the mind — from the axon up to the argument, and
            back down to the machine.
          </p>
        </div>
      ) : null}
    </>
  );
}
