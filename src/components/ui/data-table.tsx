"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/shadcn/utils";
import { countActionNodes } from "@/utils/array";
import {
  getValueByColumnKey,
  NestedKeyOf,
  PathValue,
} from "@/utils/data-table";
import { type ReactNode, useMemo } from "react";
import { LoadMore, LoadMoreMobile } from "./load-more";

export interface ColumnDef<T, K extends NestedKeyOf<T> = NestedKeyOf<T>> {
  key: K;
  header: string;
  render?: (value: PathValue<T, K>, row: T) => ReactNode;
  className?: HTMLTableCellElement["className"];
  primary?: boolean;
  isStatus?: boolean;
  hideOnMobile?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  actions?: (row: T) => ReactNode;
  loadingActionsCount?: number;
  actionsHeader?: string;
  actionsClassName?: string;
  loading?: boolean;
  loadingRows?: number;
  getRowKey?: (row: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
  infiniteScroll?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

export function DataTable<T>({
  data,
  columns,
  actions,
  loadingActionsCount,
  actionsHeader = "Ações",
  actionsClassName,
  loading = false,
  loadingRows = 8,
  getRowKey,
  emptyMessage = "Nenhum registro encontrado.",
  className,
  infiniteScroll = false,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
}: DataTableProps<T>) {
  const hasActions = !!actions;
  const totalColumns = columns.length + (hasActions ? 1 : 0);
  const resolvedLoadingActionsCount = useMemo(() => {
    if (!hasActions) return 0;
    if (loadingActionsCount) return Math.max(1, loadingActionsCount);

    try {
      const previewActions = actions({} as T);
      const count = countActionNodes(previewActions);

      if (count > 0) return count;
    } catch {
      // Usa a quantidade padrão quando não for possível inferir as ações.
    }

    return 2;
  }, [actions, hasActions, loadingActionsCount]);

  const primaryColumn = columns.find((column) => column.primary) || columns[0];
  const statusColumn = columns.find((column) => column.isStatus);
  const secondaryColumns = columns.filter(
    (column) =>
      column !== primaryColumn && !column.isStatus && !column.hideOnMobile
  );

  return (
    <>
      <div
        className={cn(
          "border-border bg-card hidden rounded-md border lg:block dark:bg-transparent",
          className
        )}
      >
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={cn("font-semibold", column.className)}
                >
                  {column.header}
                </TableHead>
              ))}

              {hasActions && (
                <TableHead className={cn("text-center", actionsClassName)}>
                  {actionsHeader}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading &&
              Array.from({ length: loadingRows }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      className={column.className}
                    >
                      <Skeleton className="h-4 w-[60%] rounded" />
                    </TableCell>
                  ))}

                  {hasActions && (
                    <TableCell className={cn("text-center", actionsClassName)}>
                      <div className="flex items-center justify-center gap-2">
                        {Array.from({
                          length: resolvedLoadingActionsCount,
                        }).map((_, actionIndex) => (
                          <Skeleton
                            key={`desktop-action-skeleton-${rowIndex}-${actionIndex}`}
                            className="h-8 w-8 rounded"
                          />
                        ))}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}

            {!loading && data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={totalColumns}
                  className="text-muted-foreground h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              data.map((row, rowIndex) => {
                const key = getRowKey ? getRowKey(row, rowIndex) : rowIndex;

                return (
                  <TableRow key={key}>
                    {columns.map((column) => {
                      const value = getValueByColumnKey(row, column.key);

                      return (
                        <TableCell
                          key={String(column.key)}
                          className={column.className}
                        >
                          {column.render
                            ? column.render(value, row)
                            : String(value ?? "")}
                        </TableCell>
                      );
                    })}

                    {hasActions && (
                      <TableCell
                        className={cn("text-center", actionsClassName)}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {actions(row)}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}

            {infiniteScroll && onLoadMore && (
              <LoadMore
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={onLoadMore}
                colSpan={totalColumns}
              />
            )}
          </TableBody>
        </Table>
      </div>

      <div className={cn("lg:hidden", className)}>
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: loadingRows }).map((_, rowIndex) => (
              <div
                key={`mobile-skeleton-${rowIndex}`}
                className="border-border bg-card rounded-lg border p-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <Skeleton className="h-5 w-[65%] rounded" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>

                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-3 w-20 rounded" />
                      <Skeleton className="h-4 w-28 rounded" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-3 w-16 rounded" />
                      <Skeleton className="h-4 w-24 rounded" />
                    </div>
                  </div>

                  {hasActions && (
                    <div className="border-border mt-3 flex justify-end gap-1 border-t pt-3">
                      {Array.from({ length: resolvedLoadingActionsCount }).map(
                        (_, actionIndex) => (
                          <Skeleton
                            key={`mobile-action-skeleton-${rowIndex}-${actionIndex}`}
                            className="h-9 w-9 rounded-md"
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && data.length === 0 && (
          <div className="border-border bg-card flex h-32 items-center justify-center rounded-lg border">
            <p className="text-muted-foreground text-sm">{emptyMessage}</p>
          </div>
        )}

        {!loading && data.length > 0 && (
          <div className="space-y-3">
            {data.map((row, rowIndex) => {
              const key = getRowKey ? getRowKey(row, rowIndex) : rowIndex;
              const primaryValue = getValueByColumnKey(row, primaryColumn.key);
              const statusValue = statusColumn
                ? getValueByColumnKey(row, statusColumn.key)
                : null;

              return (
                <div
                  key={key}
                  className="border-border bg-card active:bg-muted/50 rounded-lg border p-4 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-foreground min-w-0 flex-1 overflow-hidden font-medium wrap-break-word">
                      {primaryColumn.render ? (
                        primaryColumn.render(primaryValue, row)
                      ) : (
                        <span className="block truncate">
                          {String(primaryValue ?? "")}
                        </span>
                      )}
                    </div>

                    {statusColumn && statusValue !== null && (
                      <div className="shrink-0">
                        {statusColumn.render
                          ? statusColumn.render(statusValue, row)
                          : String(statusValue ?? "")}
                      </div>
                    )}
                  </div>

                  {secondaryColumns.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-start gap-4">
                      {secondaryColumns.map((column) => {
                        const value = getValueByColumnKey(row, column.key);
                        const renderedValue = column.render
                          ? column.render(value, row)
                          : String(value ?? "");

                        if (!renderedValue && renderedValue !== 0) return null;

                        return (
                          <div
                            key={String(column.key)}
                            className="flex flex-col gap-1 text-sm"
                          >
                            <span className="text-muted-foreground shrink-0 text-[10px] font-medium tracking-wider uppercase">
                              {column.header}:
                            </span>
                            <span className="text-foreground truncate">
                              {renderedValue}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {hasActions && (
                    <div className="border-border mt-3 flex justify-end gap-1 border-t pt-3">
                      {actions(row)}
                    </div>
                  )}
                </div>
              );
            })}

            {infiniteScroll && onLoadMore && (
              <LoadMoreMobile
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={onLoadMore}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
