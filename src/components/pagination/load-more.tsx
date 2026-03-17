"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { useInView } from "react-intersection-observer";

interface LoadMoreProps {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
  colSpan?: number;
}

export function LoadMore({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  colSpan = 3,
}: LoadMoreProps) {
  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (!hasNextPage) {
    return null;
  }

  return (
    <TableRow ref={ref} className="hover:bg-transparent">
      <TableCell colSpan={colSpan} className="h-20 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-muted-foreground text-sm">
            Carregando dados...
          </span>
          <Spinner className="text-primary h-5 w-5" />
        </div>
      </TableCell>
    </TableRow>
  );
}
