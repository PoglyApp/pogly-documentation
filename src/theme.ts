export type Theme = "dark" | "light" | "paper" | "nord" | "mocha" | "solarized" | "matcha" | "alypink";

export const THEME_LABELS: Record<Theme, string> = {
  dark: "Dark",
  light: "Light",
  paper: "Paper",
  nord: "Nord",
  mocha: "Mocha",
  solarized: "Solarized",
  matcha: "Matcha",
  alypink: "Alypink",
};

export const LIGHT_BG_THEMES = new Set<Theme>(["light", "paper", "matcha", "alypink"]);

export function applyTheme(theme: Theme) {
  const body = document.body;
  body.classList.remove(...(Object.keys(THEME_LABELS) as Theme[]).map((t) => `theme-${t}`));
  if (theme !== "dark") {
    body.classList.add(`theme-${theme}`);
  }
}
