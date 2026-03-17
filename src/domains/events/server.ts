import { fetchServer } from "@/api/server";
import { ApiResponse } from "@/api/types";
import { EventDetails } from "./types";

export async function getEventById(id: string) {
  const { data } = await fetchServer<ApiResponse<EventDetails>>(
    `/events/${id}`
  );
  return data;
}
