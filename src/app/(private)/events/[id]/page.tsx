import { getEventById } from "@/domains/events/server";
import { EventDetails } from "./components/events-details";

interface EventDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailsPage({ params }: EventDetailsProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return (
      <h1 className="text-destructive text-2xl font-bold">
        Evento não encontrado
      </h1>
    );
  }

  console.log("Rendering EventDetails for event:", event);

  return (
    <>
      <EventDetails event={event} />
    </>
  );
}
