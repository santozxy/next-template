"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getUsers } from "@/domains/users/client";
import { User } from "@/domains/users/types";
import { usePaginatedList } from "@/hooks/use-paginated-list";
import { queryKeys } from "@/lib/tanstack-query/keys";
import { columns } from "./helpers";

export function UsersTable() {
  const {
    items: users,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    total,
    currentTotal,
  } = usePaginatedList<User>({
    queryKey: queryKeys.users.list(),
    queryFn: ({ pageParam: page }) => getUsers({ page }),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Usuários</CardTitle>
        <p className="text-muted-foreground text-sm">
          Visualize os usuários cadastrados no tenant atual.
        </p>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              Não foi possível carregar os usuários. Tente novamente.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && total > 0 && (
          <p className="text-muted-foreground mb-3 text-sm">
            {currentTotal} de {total} usuários carregados
            {isRefetching && !isFetchingNextPage ? " · Atualizando..." : ""}
          </p>
        )}

        <DataTable
          data={users}
          columns={columns}
          loading={isLoading}
          getRowKey={(user) => user.id}
          emptyMessage="Nenhum usuário cadastrado."
          infiniteScroll
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      </CardContent>
    </Card>
  );
}
