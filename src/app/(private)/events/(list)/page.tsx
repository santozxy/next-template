import Link from "next/link";
import { EventsList } from "./components/events-list";
import { Button } from "@/components/ui/button";
import { CanServer } from "@/components/can/server";
import { Permission } from "@/domains/auth/enums";

export default function Events() {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <p>Visualize e gerencie os eventos cadastrados</p>
        <CanServer permission={Permission.createEvents}>
          <Link href="/events/create" className="self-end">
            <Button size="sm">Criar evento</Button>
          </Link>
        </CanServer>
      </div>
      <EventsList />
    </>
  );
}
