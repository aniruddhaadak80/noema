"use client";

import { useEffect } from "react";

/** One observer for the whole site. Pages stay Server Components and
 *  ship no per-card JavaScript — the only client code is this, and it
 *  finds anything tagged with `data-reveal` as it arrives. */
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.setAttribute("data-shown", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "true");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.04 },
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")
        .forEach((el) => observer.observe(el));
    };

    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
