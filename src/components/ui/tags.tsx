"use client";

import { Badge } from "@/components/ui/badge";

interface Tag {
  id: string;
  name: string;
}

interface TagsListProps {
  tags: Tag[];
  limit?: number;
}

export function TagsList({ tags, limit = 3 }: TagsListProps) {
  if (!tags || tags.length === 0) {
    return (
      <span className="text-muted-foreground truncate text-xs">Sem tags</span>
    );
  }

  const visibleTags = tags.slice(0, limit);
  const remaining = tags.length - limit;

  return (
    <>
      {visibleTags.map((tag) => (
        <Badge key={tag.id} variant="outline" className="text-xs">
          {tag.name}
        </Badge>
      ))}

      {remaining > 0 && (
        <Badge
          variant="outline"
          className="text-primary border-primary/30 text-xs"
        >
          +{remaining}
        </Badge>
      )}
    </>
  );
}
