export type NavItem = { id: string; label: string };
export type NavGroup = { label: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "for everyone",
    items: [
      { id: "getting-started", label: "Getting Started" },
      { id: "elements", label: "Elements" },
      { id: "layouts", label: "Layouts" },
      { id: "collaboration", label: "Collaboration" },
      { id: "permissions", label: "Permissions" },
    ],
  },
  {
    label: "editor",
    items: [
      { id: "canvas-editing", label: "Canvas & Editing" },
      { id: "settings", label: "Settings" },
      { id: "assets", label: "Assets" },
    ],
  },
  {
    label: "advanced",
    items: [
      { id: "widget-development", label: "Widget Development" },
      { id: "glossary", label: "Glossary" },
    ],
  },
];

interface IProps {
  activeSection: string;
  onSectionChange: (id: string, query?: string) => void;
}

export const DocsSidebar = ({ activeSection, onSectionChange }: IProps) => {
  const scrollToSection = (id: string) => {
    onSectionChange(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{ width: "220px" }}
      className="h-full overflow-y-auto bg-base border-r border-border flex-shrink-0 py-3"
    >
      {NAV_GROUPS.map((group, gi) => (
        <div key={group.label}>
          {gi > 0 && <div className="h-px bg-border mx-3 my-2" />}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted px-4 py-2">
            {group.label}
          </p>
          {group.items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left text-sm px-4 py-1.5 transition-colors cursor-pointer ${
                activeSection === item.id
                  ? "text-accent bg-selected-bg font-medium"
                  : "text-text-muted hover:text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
};
