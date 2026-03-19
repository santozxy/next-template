import { TagsType } from "@/domains/tags/enums"


const eventsKeys = {
  all: ["events"] as const, // Chave principal para tudo relacionado a eventos
  lists: () => [...eventsKeys.all, "list"] as const, // Todas as listas de eventos (com ou sem filtros)
  list: (params?: Record<string, unknown>) =>
    [...eventsKeys.lists(), params ?? {}] as const, // Lista de eventos com filtros específicos (ex: search, municipalityId)
  details: () => [...eventsKeys.all, "detail"] as const, // Todas as details de eventos
  detail: (id: string) => [...eventsKeys.details(), id] as const, // Detail de um evento específico 
}

const tagsKeys = {
  all: ["tags"] as const, // Chave principal para tudo relacionado a tags
  lists: () => [...tagsKeys.all, "list"] as const, // Todas as listas de tags (com ou sem filtros)
  list: (type: TagsType) => [...tagsKeys.lists(), type] as const, // Lista de tags com tipo específico
}

export const queryKeys = {
  events: eventsKeys,
  tags: tagsKeys,
}
