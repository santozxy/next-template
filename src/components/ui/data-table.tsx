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
import type { ReactNode } from "react";
import { LoadMore } from "../pagination/load-more";

/** Describes how a single column is mapped from the data to the table. */
export interface ColumnDef<T> {
  /** Unique key used to read the value from each row (supports nested via dot-notation). */
  key: string;
  /** Header label shown in <th>. */
  header: string;
  /** Optional custom render function – receives the value and the full row. */
  render?: (value: unknown, row: T) => ReactNode;
  /** Optional className applied to both <th> and <td>. */
  className?: string;
}

/** Props for the reusable DataTable component. */
export interface DataTableProps<T> {
  /** Array of data objects to display. */
  data: T[];
  /** Column definitions that map each field to the table. */
  columns: ColumnDef<T>[];
  /**
   * Render function for custom action buttons on each row.
   * Receives the row data and should return the JSX for the actions cell.
   */
  actions?: (row: T) => ReactNode;
  /** Header label for the actions column. @default "Ações" */
  actionsHeader?: string;
  /** className applied to the actions <th> and <td>. */
  actionsClassName?: string;
  /** When true, shows skeleton placeholders instead of data. */
  loading?: boolean;
  /** Number of skeleton rows to display while loading. @default 10 */
  loadingRows?: number;
  /** Optional unique key extractor for each row (defaults to index). */
  getRowKey?: (row: T, index: number) => string | number;
  /** Message shown when data is empty and not loading. */
  emptyMessage?: string;
  /** Optional className applied to the wrapper. */
  className?: string;

  // Infinite scroll
  /** Enables infinite scroll behavior. */
  infiniteScroll?: boolean;
  /** Whether there is another page available. */
  hasNextPage?: boolean;
  /** Whether the next page is currently being fetched. */
  isFetchingNextPage?: boolean;
  /** Function called when the table reaches the end. */
  onLoadMore?: () => void;
}


function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (
      acc &&
      typeof acc === "object" &&
      key in (acc as Record<string, unknown>)
    ) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DataTable<T>({
  data,
  columns,
  actions,
  actionsHeader = "Ações",
  actionsClassName,
  loading = false,
  loadingRows = 10,
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

  return (
    <div className={cn("rounded-md border border-border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn("font-semibold", col.className)}
              >
                {col.header}
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
            Array.from({ length: loadingRows }).map((_, rowIdx) => (
              <TableRow key={`skeleton-${rowIdx}`}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    <Skeleton className="h-4 w-[60%] rounded" />
                  </TableCell>
                ))}

                {hasActions && (
                  <TableCell className={cn("text-center", actionsClassName)}>
                    <div className="flex items-center justify-center gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}

          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={totalColumns}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            data.map((row, rowIdx) => {
              const key = getRowKey ? getRowKey(row, rowIdx) : rowIdx;

              return (
                <TableRow key={key}>
                  {columns.map((col) => {
                    const value = getNestedValue(row, col.key);

                    return (
                      <TableCell key={col.key} className={col.className}>
                        {col.render
                          ? col.render(value, row)
                          : String(value ?? "")}
                      </TableCell>
                    );
                  })}

                  {hasActions && (
                    <TableCell className={cn("text-center", actionsClassName)}>
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
  );
}
