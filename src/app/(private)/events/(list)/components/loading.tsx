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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function EventsListLoading() {
  const rows = Array.from({ length: 10 }); // mesmo limit usado na listagem

  return (
    <ScrollArea className="h-96 pr-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-60">Nome</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Fim</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Município</TableHead>
            <TableHead className="w-32 text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((_, i) => (
            <TableRow key={i}>
              {/* Nome */}
              <TableCell className="max-w-48 truncate">
                <Skeleton className="h-5 w-44" />
              </TableCell>

              {/* Inicio */}
              <TableCell>
                <Skeleton className="h-5 w-18" />
              </TableCell>

              {/* Fim */}
              <TableCell>
                <Skeleton className="h-5 w-18" />
              </TableCell>

              {/* Tags */}
              <TableCell>
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-18 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
              </TableCell>

              {/* Município */}
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>

              {/* Ações */}
              <TableCell className="flex items-center justify-center gap-4">
                <Skeleton className="h-7 w-7 rounded-sm" />
                <Skeleton className="h-7 w-7 rounded-sm" />
                <Skeleton className="h-7 w-7 rounded-sm" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
