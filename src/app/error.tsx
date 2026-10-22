"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error without interrupting the user.
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center px-5 pt-32 md:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Something broke</p>
        <h1 className="mt-6 text-[clamp(2rem,6vw,3.5rem)] leading-[1.08] text-bone">
          That region of the page
          <br />
          <span className="italic text-vessel">refuses to render</span>
        </h1>
        <p className="prose-measure mx-auto mt-6 text-mute">
          A client-side error occurred. You can retry without refreshing the
          whole atlas — your best scores and favourites stay intact.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-10 rounded-full bg-bone px-6 py-3 text-sm text-ink transition-transform duration-500 ease-fluid active:scale-[0.98]"
        >
          Retry
        </button>
      </div>
    </section>
  );
}
