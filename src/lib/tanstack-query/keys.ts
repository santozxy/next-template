import { TagsType } from "@/domains/tags/enums"

const eventsKeys = {
  all: ["events"] as const,
  lists: () => [...eventsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) =>
    [...eventsKeys.lists(), params ?? {}] as const,
  details: () => [...eventsKeys.all, "detail"] as const,
  detail: (id: string) => [...eventsKeys.details(), id] as const,
}

const tagsKeys = {
  all: ["tags"] as const,
  lists: () => [...tagsKeys.all, "list"] as const,
  list: (type: TagsType) => [...tagsKeys.lists(), type] as const,
}

export const queryKeys = {
  events: eventsKeys,
  tags: tagsKeys,
}
