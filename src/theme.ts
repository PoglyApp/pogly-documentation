export type Theme = "dark" | "light" | "paper" | "nord" | "mocha" | "solarized" | "matcha";

export const THEME_LABELS: Record<Theme, string> = {
  dark: "Dark",
  light: "Light",
  paper: "Paper",
  nord: "Nord",
  mocha: "Mocha",
  solarized: "Solarized",
  matcha: "Matcha",
};

// Themes that use a light background — determines which logo variant to show.
export const LIGHT_BG_THEMES = new Set<Theme>(["light", "paper", "matcha"]);

export function applyTheme(theme: Theme) {
  const body = document.body;
  // Remove all existing theme classes
  body.classList.remove(...(Object.keys(THEME_LABELS) as Theme[]).map((t) => `theme-${t}`));
  if (theme !== "dark") {
    body.classList.add(`theme-${theme}`);
  }
}
