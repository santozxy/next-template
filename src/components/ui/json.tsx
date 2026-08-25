import { ReactNode } from "react";

export function Json({ title, value }: { title: string; value: unknown }) {
  const hasValue = value !== null && value !== undefined;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">{title}</h4>
      <pre className="bg-secondary/70 border-border text-foreground/80 max-h-64 overflow-auto rounded-md border p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
        {hasValue ? (
          highlightJson(value)
        ) : (
          <span className="text-muted-foreground italic">Não registrado</span>
        )}
      </pre>
    </div>
  );
}

const JSON_TOKEN_PATTERN =
  /("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false)\b|\b(null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;

function highlightJson(value: unknown) {
  const json = JSON.stringify(value, null, 2);
  if (!json) return null;

  const tokens: ReactNode[] = [];
  let cursor = 0;

  for (const match of json.matchAll(JSON_TOKEN_PATTERN)) {
    const index = match.index ?? 0;

    if (index > cursor) {
      tokens.push(json.slice(cursor, index));
    }

    if (match[1]) {
      const isKey = Boolean(match[2]);
      tokens.push(
        <span
          key={`token-${index}`}
          className={
            isKey
              ? "text-sky-700 dark:text-sky-300"
              : "text-emerald-700 dark:text-emerald-300"
          }
        >
          {match[1]}
        </span>
      );

      if (match[2]) tokens.push(match[2]);
    } else if (match[3]) {
      tokens.push(
        <span
          key={`token-${index}`}
          className="text-violet-700 dark:text-violet-300"
        >
          {match[3]}
        </span>
      );
    } else if (match[4]) {
      tokens.push(
        <span
          key={`token-${index}`}
          className="text-rose-700 italic dark:text-rose-300"
        >
          {match[4]}
        </span>
      );
    } else {
      tokens.push(
        <span
          key={`token-${index}`}
          className="text-amber-700 dark:text-amber-300"
        >
          {match[0]}
        </span>
      );
    }

    cursor = index + match[0].length;
  }

  if (cursor < json.length) {
    tokens.push(json.slice(cursor));
  }

  return tokens;
}
