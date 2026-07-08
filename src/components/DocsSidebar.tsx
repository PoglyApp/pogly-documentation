import { Github, MessageCircle } from "lucide-react";
import type { Heading } from "../toc";

export type NavItem = { id: string; label: string };
export type NavGroup = { label: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "for everyone",
    items: [
      { id: "home", label: "Home" },
      { id: "getting-started", label: "Getting Started" },
      { id: "elements", label: "Elements" },
      { id: "media", label: "Media Players" },
      { id: "layouts", label: "Layouts" },
      { id: "collaboration", label: "Collaboration" },
      { id: "permissions", label: "Permissions" },
    ],
  },
  {
    label: "editor",
    items: [
      { id: "canvas-editing", label: "Canvas & Editing" },
      { id: "keybinds", label: "Keyboard Shortcuts" },
      { id: "chat-social", label: "Chat & Social" },
      { id: "settings", label: "Settings" },
      { id: "assets", label: "Assets" },
      { id: "backup", label: "Backup & Restore" },
    ],
  },
  {
    label: "advanced",
    items: [
      { id: "widget-development", label: "Widget Development" },
      { id: "http-api", label: "HTTP API" },
    ],
  },
  {
    label: "help",
    items: [
      { id: "troubleshooting", label: "Troubleshooting & FAQ" },
      { id: "glossary", label: "Glossary" },
    ],
  },
];

interface IProps {
  activeSection: string;
  onSectionChange: (id: string, query?: string) => void;
  headings: Heading[];
  activeHeading: string;
  onHeadingClick: (id: string) => void;
}

export const DocsSidebar = ({ activeSection, onSectionChange, headings, activeHeading, onHeadingClick }: IProps) => {
  const scrollToSection = (id: string) => {
    onSectionChange(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{ width: "220px" }} className="h-full flex flex-col bg-base border-r border-border flex-shrink-0">
      <div className="flex-1 min-h-0 overflow-y-auto py-3">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.label}>
            {gi > 0 && <div className="h-px bg-border mx-3 my-2" />}
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted px-4 py-2">
              {group.label}
            </p>
            {group.items.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left text-sm px-4 py-1.5 transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? "text-accent bg-selected-bg font-medium"
                      : "text-text-muted hover:text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {item.label}
                </button>

                {activeSection === item.id && headings.length > 0 && (
                  <div className="my-0.5 ml-4 border-l border-border">
                    {headings.map((heading) => (
                      <button
                        key={heading.id}
                        onClick={() => onHeadingClick(heading.id)}
                        className={`-ml-px w-[calc(100%+1px)] text-left text-xs py-1 pl-4 pr-3 border-l-2 transition-colors cursor-pointer ${
                          activeHeading === heading.id
                            ? "border-accent text-accent"
                            : "border-transparent text-text-muted hover:text-text-secondary hover:bg-surface-hover"
                        }`}
                      >
                        {heading.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex-shrink-0 border-t border-border py-2">
        <a
          href="https://github.com/PoglyApp/pogly-documentation"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-1.5 text-sm text-text-muted hover:text-text-secondary hover:bg-surface-hover transition-colors"
        >
          <Github size={15} /> Edit on GitHub
        </a>
        <a
          href="https://discord.gg/pogly"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-1.5 text-sm text-text-muted hover:text-text-secondary hover:bg-surface-hover transition-colors"
        >
          <MessageCircle size={15} /> Join our Discord
        </a>
      </div>
    </nav>
  );
};
