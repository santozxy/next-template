import { QueryKey } from "@tanstack/react-query";
import { queryClient } from "./client";

export async function refetchQuery(
  queryKey: QueryKey[] | QueryKey,
  type: "active" | "inactive" | "all" = "all",
) {
  await queryClient.refetchQueries({ queryKey, type });
}