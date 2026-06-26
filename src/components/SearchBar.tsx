import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { search, SearchResult } from "../search";

interface IProps {
  sections: { id: string; title: string; content: string }[];
  onNavigate: (id: string, query: string) => void;
}

// Highlight the query match inside a snippet string for the results dropdown.
function SnippetWithHighlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ background: "none" }} className="text-accent not-italic font-semibold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export const SearchBar = ({ sections, onNavigate }: IProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = search(sections, query);
    setResults(r);
    setFocused(0);
    setOpen(r.length > 0 && query.trim().length >= 2);
  }, [query, sections]);

  // Close dropdown when clicking outside.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = useCallback(
    (result: SearchResult) => {
      onNavigate(result.sectionId, query.trim());
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    },
    [onNavigate, query]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused((f) => Math.min(f + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => Math.max(f - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[focused]) select(results[focused]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-96">
      <div className="flex items-center gap-2 bg-surface border border-border rounded px-3 py-1.5 focus-within:border-accent transition-colors">
        <Search size={14} className="text-text-muted shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search docs…"
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none select-text!"
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); }} className="text-text-muted hover:text-text-secondary cursor-pointer">
            <X size={13} />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-surface border border-border rounded shadow-panel z-50 overflow-hidden max-h-80 overflow-y-auto">
          {results.map((result, i) => (
            <button
              key={`${result.sectionId}-${result.matchIndex}`}
              onClick={() => select(result)}
              onMouseEnter={() => setFocused(i)}
              className={`w-full text-left px-4 py-3 border-b border-border-subtle last:border-0 transition-colors cursor-pointer ${
                focused === i ? "bg-selected-bg" : "hover:bg-surface-hover"
              }`}
            >
              <p className="text-xs font-semibold text-accent mb-1">{result.sectionTitle}</p>
              <p className="text-xs text-text-muted leading-relaxed">
                <SnippetWithHighlight text={result.snippet} query={query.trim()} />
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
