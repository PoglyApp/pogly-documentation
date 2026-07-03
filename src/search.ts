export interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  snippet: string;
  matchIndex: number;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^>\s*\[!.*?\]\s*/gm, "")
    .replace(/^>\s*/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\|/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function extractSnippet(text: string, matchIndex: number, radius = 80): string {
  const start = Math.max(0, matchIndex - radius);
  const end = Math.min(text.length, matchIndex + radius);
  let snippet = text.slice(start, end).trim();
  if (start > 0) snippet = "…" + snippet;
  if (end < text.length) snippet = snippet + "…";
  return snippet;
}

export function search(
  sections: { id: string; title: string; content: string }[],
  query: string,
  maxResultsPerSection = 2,
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const results: SearchResult[] = [];

  for (const section of sections) {
    const plain = stripMarkdown(section.content);
    const lower = plain.toLowerCase();
    let searchFrom = 0;
    let count = 0;

    while (count < maxResultsPerSection) {
      const idx = lower.indexOf(q, searchFrom);
      if (idx === -1) break;
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        snippet: extractSnippet(plain, idx),
        matchIndex: idx,
      });
      searchFrom = idx + q.length;
      count++;
    }
  }

  return results;
}
