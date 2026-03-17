import { getEventById } from "@/domains/events/server";
import { UpdateEventsForm } from "./components/update-event-form";

interface EventDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetails({ params }: EventDetailsProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return (
      <h1 className="text-destructive text-2xl font-bold">
        Evento não encontrado
      </h1>
    );
  }
  
  return (
    <>
      <UpdateEventsForm event={event} />
    </>
  );
}
