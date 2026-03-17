"use client";

import type { EventDetails } from "@/domains/events/types";

interface EventDetailsProps {
  event: EventDetails;
}

export function EventDetails({ event }: EventDetailsProps) {

  return (
    <pre>{JSON.stringify(event, null, 2)}</pre>
  );
}
