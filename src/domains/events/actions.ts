"use server";

import { fetchServer } from "@/api/server";
import { ApiResponse, ApiResponseError } from "@/api/types";
import { CreateEvent, Event, UpdateEvent } from "./types";

export async function createEvent(body: CreateEvent) {
  try {
    const event = await fetchServer<ApiResponse<Event>>("/events", {
      method: "POST",
      body,
    });
    return event;
  } catch (error) {
    return error as ApiResponseError;
  }
}

export async function updateEvent(id: string, body: UpdateEvent) {
  try {
    const event = await fetchServer<ApiResponse<Event>>(`/events/${id}`, {
      method: "PUT",
      body,
    });
    return event;
  } catch (error) {
    return error as ApiResponseError;
  }
}

export async function deleteEvent(id: string) {
  await fetchServer(`/events/${id}`, {
    method: "DELETE",
  });
}
