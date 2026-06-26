import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Info, Lightbulb, TriangleAlert, Copy, Check } from "lucide-react";
import type { Components } from "react-markdown";

// Recursively walk React children and wrap matched strings in <mark> elements.
// flashKey changes on every search navigate, forcing React to remount marks and replay the animation.
function applyHighlight(node: React.ReactNode, query: string, flashKey: number): React.ReactNode {
  if (!query) return node;

  if (typeof node === "string") {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = node.split(new RegExp(`(${escaped})`, "gi"));
    if (parts.length === 1) return node;
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={`${flashKey}-${i}`} className="highlight-flash text-inherit rounded-sm px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={i}>{applyHighlight(child, query, flashKey)}</React.Fragment>
    ));
  }

  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return React.cloneElement(el, {}, applyHighlight(el.props.children, query, flashKey));
  }

  return node;
}

// Detect GitHub-style alerts in blockquotes: > [!NOTE], > [!TIP], > [!WARNING]
// Optionally followed by a custom title on the same line: > [!WARNING] Advanced
const ALERT_RE = /^\[!(NOTE|TIP|WARNING)\](?:\s+(.+))?$/i;

type AlertType = "NOTE" | "TIP" | "WARNING";

const ALERT_CONFIG: Record<AlertType, { icon: typeof Info; iconColor: string; borderColor: string; bg: string; defaultTitle: string }> = {
  NOTE: {
    icon: Info,
    iconColor: "var(--color-accent)",
    borderColor: "var(--color-accent)",
    bg: "var(--color-accent-hover)",
    defaultTitle: "Note",
  },
  TIP: {
    icon: Lightbulb,
    iconColor: "#22c55e",
    borderColor: "#22c55e",
    bg: "var(--color-surface)",
    defaultTitle: "Tip",
  },
  WARNING: {
    icon: TriangleAlert,
    iconColor: "var(--color-warning)",
    borderColor: "var(--color-warning)",
    bg: "var(--color-surface)",
    defaultTitle: "Warning",
  },
};

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      className="text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
};

// Extract plain text from react-markdown child nodes for the blockquote alert parser.
function childrenToText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in (children as object)) {
    return childrenToText((children as React.ReactElement).props.children);
  }
  return "";
}

const components: Components = {
  // Section heading — h2 is stripped from content so we skip it;
  // it exists only to delineate sections and is rendered by Docs.tsx.
  h2: () => null,

  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-text-primary mt-8 mb-3">{children}</h3>
  ),

  h4: ({ children }) => (
    <h4 className="text-sm font-semibold text-text-primary mt-5 mb-2">{children}</h4>
  ),

  p: ({ children }) => (
    <p className="text-sm text-text-secondary leading-relaxed mb-3">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm text-text-secondary mb-4">{children}</ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-5 space-y-2 text-sm text-text-secondary mb-4">{children}</ol>
  ),

  li: ({ children }) => <li>{children}</li>,

  strong: ({ children }) => <span className="text-text-primary font-medium">{children}</span>,

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-accent underline underline-offset-2"
    >
      {children}
    </a>
  ),

  // Inline code
  code: ({ children, className }) => {
    // Fenced code blocks are handled by `pre` below; this handles inline code only.
    if (className) return <code className={className}>{children}</code>;
    return (
      <code
        style={{ fontFamily: '"Geist Mono", monospace' }}
        className="bg-surface border border-border-subtle rounded px-1.5 py-0.5 text-xs text-text-secondary select-text"
      >
        {children}
      </code>
    );
  },

  // Fenced code blocks
  pre: ({ children }) => {
    const child = children as React.ReactElement;
    const code = childrenToText(child?.props?.children ?? "");
    const langClass: string = child?.props?.className ?? "";
    const lang = langClass.replace("language-", "") || undefined;

    return (
      <div className="relative my-4 rounded-lg bg-surface border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle">
          {lang ? (
            <span
              style={{ fontFamily: '"Geist Mono", monospace' }}
              className="text-[11px] text-text-muted uppercase tracking-wide"
            >
              {lang}
            </span>
          ) : (
            <span />
          )}
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto p-4 m-0">
          <code
            style={{ fontFamily: '"Geist Mono", monospace' }}
            className="text-sm text-text-secondary whitespace-pre select-text"
          >
            {code}
          </code>
        </pre>
      </div>
    );
  },

  // Blockquotes become callout boxes when they start with [!NOTE], [!TIP], or [!WARNING].
  // We use the raw hast `node` (pre-render AST) for detection because it holds unambiguous
  // plain text. The rendered React `children` are used for the body so inline formatting
  // (bold, code, links) is preserved. The first rendered child (<p>[!TYPE]</p>) is skipped.
  blockquote: (props) => {
    const { children } = props;
    const hastNode = (props as any).node as any;

    const hastText = (n: any): string => {
      if (!n) return "";
      if (n.type === "text") return String(n.value ?? "");
      if (Array.isArray(n.children)) return (n.children as any[]).map(hastText).join("");
      return "";
    };

    const firstParaNode = hastNode?.children?.find(
      (c: any) => c.type === "element" && c.tagName === "p"
    );
    const firstParaText = hastText(firstParaNode).trim();
    const match = firstParaText.match(ALERT_RE);

    if (match) {
      const type = match[1].toUpperCase() as AlertType;
      const customTitle = match[2]?.trim();
      const cfg = ALERT_CONFIG[type];
      const Icon = cfg.icon;
      const bodyChildren = React.Children.toArray(children).filter(
        (child) => !ALERT_RE.test(childrenToText(child).trim())
      );

      return (
        <div
          style={{ backgroundColor: cfg.bg, borderLeft: `4px solid ${cfg.borderColor}` }}
          className="rounded-r-lg p-4 my-4 flex gap-3"
        >
          <Icon size={16} style={{ color: cfg.iconColor }} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-text-primary mb-1">
              {customTitle ?? cfg.defaultTitle}
            </p>
            <div className="text-sm text-text-secondary leading-relaxed">{bodyChildren}</div>
          </div>
        </div>
      );
    }

    return (
      <blockquote className="border-l-4 border-border pl-4 my-4 text-text-secondary text-sm italic">
        {children}
      </blockquote>
    );
  },

  table: ({ children }) => (
    <table className="w-full text-sm border-collapse mt-2 mb-6">{children}</table>
  ),

  thead: ({ children }) => <thead>{children}</thead>,

  tbody: ({ children }) => <tbody>{children}</tbody>,

  tr: ({ children }) => (
    <tr className="border-b border-border-subtle last:border-0">{children}</tr>
  ),

  th: ({ children }) => (
    <th className="text-left py-2 px-3 text-text-muted text-xs font-semibold uppercase tracking-wide border-b border-border">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="py-2 px-3 text-text-secondary">{children}</td>
  ),

  hr: () => <div className="h-px bg-border my-8" />,
};

interface IProps {
  content: string;
  highlight?: string;
  flashKey?: number;
}

export const DocsMarkdownRenderer = ({ content, highlight, flashKey = 0 }: IProps) => {
  const q = highlight?.trim() ?? "";

  const highlightedComponents: Components = {
    ...components,
    p: ({ children }) => (
      <p className="text-sm text-text-secondary leading-relaxed mb-3">
        {applyHighlight(children, q, flashKey)}
      </p>
    ),
    li: ({ children }) => <li>{applyHighlight(children, q, flashKey)}</li>,
    td: ({ children }) => (
      <td className="py-2 px-3 text-text-secondary">{applyHighlight(children, q, flashKey)}</td>
    ),
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={q ? highlightedComponents : components}>
      {content}
    </ReactMarkdown>
  );
};
