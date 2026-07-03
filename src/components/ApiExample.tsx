import { useState } from "react";
import { CopyButton } from "./CopyButton";

interface Segment {
  label: string;
  status?: string;
  code: string;
}

const LANG_LABELS: Record<string, string> = {
  curl: "cURL",
  javascript: "JavaScript",
  js: "JavaScript",
  python: "Python",
  http: "HTTP",
};

function parseSegments(source: string): Segment[] {
  const lines = source.split("\n");
  const segments: Segment[] = [];
  let current: Segment | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (current) {
      current.code = buffer.join("\n").replace(/^\n+|\n+$/g, "");
      segments.push(current);
    }
    buffer = [];
  };

  for (const line of lines) {
    const marker = line.match(/^@@\s+(\S+)(?:\s+(.+?))?\s*$/);
    if (marker) {
      flush();
      current = { label: marker[1].toLowerCase(), status: marker[2], code: "" };
    } else if (current) {
      buffer.push(line);
    }
  }
  flush();
  return segments;
}

const codeStyle = { fontFamily: '"Geist Mono", monospace' } as const;

export const ApiExample = ({ source }: { source: string }) => {
  const segments = parseSegments(source);
  const requests = segments.filter((s) => s.label !== "response");
  const response = segments.find((s) => s.label === "response");

  const [active, setActive] = useState(0);
  const current = requests[active] ?? requests[0];

  if (requests.length === 0) return null;

  return (
    <div className="my-4 rounded-lg bg-surface border border-border overflow-hidden">
      <div className="flex items-center justify-between border-b border-border-subtle pl-2 pr-4">
        <div className="flex">
          {requests.map((req, i) => (
            <button
              key={req.label}
              onClick={() => setActive(i)}
              className={`px-3 py-2 text-[11px] uppercase tracking-wide transition-colors cursor-pointer border-b-2 -mb-px ${
                i === active
                  ? "border-accent text-text-primary"
                  : "border-transparent text-text-muted hover:text-text-secondary"
              }`}
            >
              {LANG_LABELS[req.label] ?? req.label}
            </button>
          ))}
        </div>
        <CopyButton code={current.code} />
      </div>

      <pre className="overflow-x-auto p-4 m-0">
        <code style={codeStyle} className="text-sm text-text-secondary whitespace-pre select-text">
          {current.code}
        </code>
      </pre>

      {response && (
        <>
          <div className="flex items-center gap-2 px-4 py-2 border-t border-border-subtle bg-body">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
            <span className="text-[11px] uppercase tracking-wide text-text-muted">Response</span>
            {response.status && (
              <span
                style={codeStyle}
                className="text-[11px] text-text-secondary bg-surface border border-border-subtle rounded px-1.5 py-0.5"
              >
                {response.status}
              </span>
            )}
          </div>
          <pre className="overflow-x-auto p-4 m-0 bg-body">
            <code style={codeStyle} className="text-sm text-text-secondary whitespace-pre select-text">
              {response.code}
            </code>
          </pre>
        </>
      )}
    </div>
  );
};
