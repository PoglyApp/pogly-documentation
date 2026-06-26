import { useState, useEffect } from "react";
import { DocsHeader } from "../components/DocsHeader";
import { DocsSidebar, NAV_GROUPS } from "../components/DocsSidebar";
import { DocsMarkdownRenderer } from "../components/DocsMarkdownRenderer";
import { Theme, applyTheme } from "../theme";

import gettingStartedMd from "../docs/getting-started.md?raw";
import elementsMd from "../docs/elements.md?raw";
import layoutsMd from "../docs/layouts.md?raw";
import collaborationMd from "../docs/collaboration.md?raw";
import permissionsMd from "../docs/permissions.md?raw";
import canvasEditingMd from "../docs/canvas-editing.md?raw";
import settingsMd from "../docs/settings.md?raw";
import assetsMd from "../docs/assets.md?raw";
import widgetDevelopmentMd from "../docs/widget-development.md?raw";
import glossaryMd from "../docs/glossary.md?raw";

const ALL_SECTIONS = NAV_GROUPS.flatMap((g) => g.items);

// Maps section IDs to their markdown content and display title.
const SECTIONS: { id: string; title: string; content: string }[] = [
  { id: "getting-started",    title: "Getting Started",    content: gettingStartedMd },
  { id: "elements",           title: "Elements",           content: elementsMd },
  { id: "layouts",            title: "Layouts",            content: layoutsMd },
  { id: "collaboration",      title: "Collaboration",      content: collaborationMd },
  { id: "permissions",        title: "Permissions",        content: permissionsMd },
  { id: "canvas-editing",     title: "Canvas & Editing",   content: canvasEditingMd },
  { id: "settings",           title: "Settings",           content: settingsMd },
  { id: "assets",             title: "Assets",             content: assetsMd },
  { id: "widget-development", title: "Widget Development", content: widgetDevelopmentMd },
  { id: "glossary",           title: "Glossary",           content: glossaryMd },
];

const SAVED_THEME_KEY = "pogly-docs-theme";
const VALID_IDS = new Set(ALL_SECTIONS.map((s) => s.id));

function getInitialSection(): string {
  const hash = window.location.hash.slice(1);
  return VALID_IDS.has(hash) ? hash : "getting-started";
}

export const Docs = () => {
  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [highlightQuery, setHighlightQuery] = useState("");
  const [flashKey, setFlashKey] = useState(0);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(SAVED_THEME_KEY) as Theme) ?? "dark";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(SAVED_THEME_KEY, theme);
  }, [theme]);

  // Keep the hash in sync with the active section.
  useEffect(() => {
    window.location.hash = activeSection;
  }, [activeSection]);

  // Handle browser back/forward navigation.
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (VALID_IDS.has(hash)) setActiveSection(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const currentIndex = ALL_SECTIONS.findIndex((s) => s.id === activeSection);
  const section = SECTIONS[currentIndex];

  const navigate = (id: string, query = "") => {
    setActiveSection(id);
    setHighlightQuery(query);
    if (query) {
      setFlashKey((k) => k + 1);
      setTimeout(() => setHighlightQuery(""), 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-body overflow-hidden">
      <DocsHeader theme={theme} onThemeChange={setTheme} sections={SECTIONS} onSearchNavigate={navigate} />

      <div className="flex flex-1 overflow-hidden">
        <DocsSidebar activeSection={activeSection} onSectionChange={navigate} />

        {/* index.css has an UNLAYERED `* { user-select: none }`, while Tailwind utilities live
            inside `@layer utilities`. Unlayered rules beat layered ones regardless of specificity,
            so a normal select-text utility loses. The `!` (important) is required: a layered
            !important declaration outranks the unlayered normal rule. [&_*] applies it to every
            descendant, since the universal rule sets user-select directly on each child. */}
        <main key={section.id} className="flex-1 overflow-y-auto px-10 py-10 select-text! [&_*]:select-text!">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">{section.title}</h2>
            <div className="h-px bg-border mb-8" />
            <DocsMarkdownRenderer content={section.content} highlight={highlightQuery} flashKey={flashKey} />

            <div className="flex justify-between mt-16 pt-8 border-t border-border">
              {currentIndex > 0 && (
                <button
                  onClick={() => navigate(ALL_SECTIONS[currentIndex - 1].id)}
                  className="text-sm px-3 py-1.5 rounded border border-border text-text-secondary hover:text-text-primary hover:border-border-subtle transition-colors cursor-pointer"
                >
                  ← {ALL_SECTIONS[currentIndex - 1].label}
                </button>
              )}
              {currentIndex < ALL_SECTIONS.length - 1 && (
                <button
                  onClick={() => navigate(ALL_SECTIONS[currentIndex + 1].id)}
                  className="ml-auto text-sm px-3 py-1.5 rounded border border-border text-text-secondary hover:text-text-primary hover:border-border-subtle transition-colors cursor-pointer"
                >
                  {ALL_SECTIONS[currentIndex + 1].label} →
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
