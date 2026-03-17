import { fetchClient } from "@/api/client";
import { ApiResponsePaginated, PaginationParams } from "@/api/types";
import { Event, EventsFilters } from "./types";
import { encodeQueryString } from "@/utils/queries";

export async function getEvents({
  page = 1,
  limit = 10,
  search,
  municipalityId,
}: EventsFilters & PaginationParams) {
  const params = encodeQueryString({
    page,
    limit,
    search,
    municipalityId,
  });

  const data = await fetchClient<ApiResponsePaginated<Event[]>>(
    `/events/admin${params}`
  );
  return data;
}
