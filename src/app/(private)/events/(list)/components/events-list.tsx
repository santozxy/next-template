"use client";

import { ActionDelete } from "@/components/action-delete";
import { CanClient } from "@/components/can/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search } from "@/components/ui/search";
import { Permission } from "@/domains/auth/enums";
import { deleteEvent } from "@/domains/events/actions";
import { getEvents } from "@/domains/events/client";
import { Event } from "@/domains/events/types";
import { usePaginatedList } from "@/hooks/use-paginated-list";
import { QueryKeys } from "@/lib/tanstack-query/keys";
import { Edit, Eye, SearchCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { columns } from "./helpers";
import { EventsListLoading } from "./loading";

export function EventsList() {
  const limit = 10;
  const [search, setSearch] = useState("");
  const municipalityId = undefined; // Apenas simplificando exemplo

  const {
    items: events,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    total,
    currentTotal,
  } = usePaginatedList({
    queryKey: [QueryKeys.EventsList, search, municipalityId],
    queryFn: ({ pageParam: page }) =>
      getEvents({ page, limit, search, municipalityId }),
  });


  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <CardTitle>Eventos</CardTitle>
          <CardDescription>Lista de eventos cadastrados</CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="mt-2 w-full sm:mt-0 sm:w-64">
            <Search onSearch={setSearch} placeholder="Pesquisar eventos..." />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-muted-foreground mb-4 text-sm">
          Mostrando {currentTotal || 0} de {total || 0} eventos
        </div>

        {isLoading ? (
          <EventsListLoading />
        ) : events.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchCheck className="text-muted-foreground h-12 w-12" />
              </EmptyMedia>
              <EmptyTitle>Nenhuma atração encontrada</EmptyTitle>
              <EmptyDescription>
                Não há atrações cadastradas ou nenhuma corresponde aos filtros
                aplicados.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ScrollArea
            className={`h-96 pr-4 ${isRefetching ? "opacity-50" : ""}`}
          >
            <DataTable<Event>
              data={events}
              columns={columns}
              getRowKey={(event) => event.id}
              infiniteScroll
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onLoadMore={fetchNextPage}
              actionsHeader="Ações"
              actionsClassName="w-32 text-center"
              actions={(event) => (
                <>
                  <Link
                    href={`/events/${event.id}`}
                    className="text-primary hover:text-primary/80 border-border flex items-center gap-2 rounded-sm border p-1 transition"
                  >
                    <Eye className="h-4.5 w-4.5" />
                  </Link>

                  <CanClient permission={Permission.updateEvents}>
                    <Link
                      href={`/events/${event.id}/update`}
                      className="text-warning hover:text-warning/80 border-border flex items-center gap-2 rounded-sm border p-1 transition"
                    >
                      <Edit className="h-4.5 w-4.5" />
                    </Link>
                  </CanClient>

                  <CanClient permission={Permission.deleteEvents}>
                    <ActionDelete
                      name={event.name}
                      confirmDescription="Após confirmar, essa ação não poderá ser desfeita."
                      onDelete={async () => {
                        await deleteEvent(event.id);
                      }}
                      revalidateQueries={[QueryKeys.EventsList]}
                    />
                  </CanClient>
                </>
              )}
            />

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}