"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, THEME_VALUES, applyTheme } from "@/lib/theme";

const ICONS = {
  light: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  ),
  system: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8m-4-4v4" />
    </svg>
  ),
};

const LABELS = { light: "Light", dark: "Dark", system: "System" };

// useSyncExternalStore requires these to be stable references.
const subscribe = (onChange) => {
  // storage fires when the theme is changed from another tab.
  window.addEventListener("storage", onChange);
  // Keep "system" live if the OS preference changes.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    media.removeEventListener("change", onChange);
  };
};

// Runs on the server (and during hydration) — same snapshot for everyone,
// so server HTML and first client render always match.
const getServerSnapshot = () => "system";

const getSnapshot = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return THEME_VALUES.includes(stored) ? stored : "system";
};

export default function ThemeToggle() {
  // Reading localStorage via useSyncExternalStore avoids the hydration
  // mismatch: the server renders "system", and React re-renders with the
  // stored value after hydration instead of comparing mismatched HTML.
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const selectTheme = (next) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
    // useSyncExternalStore has no setter — nudge it by dispatching the
    // same event it listens for.
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center rounded-lg border border-gray-300 dark:border-gray-700 p-0.5 gap-0.5"
    >
      {THEME_VALUES.map((value) => (
        <button
          key={value}
          role="radio"
          aria-checked={theme === value}
          aria-label={`${LABELS[value]} theme`}
          title={`${LABELS[value]} theme`}
          onClick={() => selectTheme(value)}
          className={`p-1.5 rounded-md transition ${
            theme === value
              ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          {ICONS[value]}
        </button>
      ))}
    </div>
  );
}
