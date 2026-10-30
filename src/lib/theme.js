export const THEME_STORAGE_KEY = "imageutility-theme";
export const THEME_VALUES = ["light", "dark", "system"];

/**
 * Applies a theme ("light" | "dark" | "system") by adding/removing the
 * `dark` class on <html>. "system" resolves via the OS preference.
 */
export function applyTheme(theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle("dark", isDark);
}
