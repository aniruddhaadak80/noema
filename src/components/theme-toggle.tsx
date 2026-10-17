"use client";

import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`grid size-8 place-items-center rounded-full text-mute ring-1 ring-white/10 transition-all duration-500 ease-fluid hover:text-bone hover:ring-white/25 active:scale-[0.96] ${className}`}
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
        {theme === "dark" ? (
          <>
            <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M12.8 3.2l-1.1 1.1M4.3 11.7l-1.1 1.1"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </>
        ) : (
          <path
            d="M13 9.6A5.6 5.6 0 0 1 6.4 3a5.6 5.6 0 1 0 6.6 6.6Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}