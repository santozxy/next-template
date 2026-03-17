"use client";


import { Event } from "@/domains/events/types";

interface UpdateEventsFormProps {
  event: Event;
}


export function UpdateEventsForm({ event }: UpdateEventsFormProps) {
  return (
    <div>
      <pre>{JSON.stringify(event, null, 2)}</pre>
    </div>
  );
}