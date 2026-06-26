import { Theme, LIGHT_BG_THEMES, THEME_LABELS } from "../theme";

interface IProps {
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}

export const DocsHeader = ({ theme, onThemeChange }: IProps) => {
  const logoSrc = LIGHT_BG_THEMES.has(theme) ? "/assets/logo_light.svg" : "/assets/logo.svg";

  return (
    <header className="flex items-center justify-between px-6 h-[52px] bg-surface border-b border-border flex-shrink-0 select-none">
      <div className="flex items-center gap-3">
        <img src={logoSrc} alt="Pogly Logo" className="h-8 w-8" />
        <span className="text-text-primary text-base font-medium">pogly</span>
        <span className="text-text-muted text-sm">/</span>
        <span className="text-text-muted text-sm">docs</span>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value as Theme)}
          className="text-sm bg-surface border border-border text-text-secondary rounded px-2 py-1 cursor-pointer outline-none hover:border-border-subtle transition-colors"
        >
          {(Object.keys(THEME_LABELS) as Theme[]).map((t) => (
            <option key={t} value={t}>
              {THEME_LABELS[t]}
            </option>
          ))}
        </select>

        <a
          href="https://cloud.pogly.gg"
          target="_blank"
          rel="noreferrer"
          className="text-sm px-3 py-1.5 rounded border border-border text-text-secondary hover:text-text-primary hover:border-border-subtle transition-colors"
        >
          Open App →
        </a>
      </div>
    </header>
  );
};
