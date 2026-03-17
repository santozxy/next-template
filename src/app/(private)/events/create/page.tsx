import React from "react";
import { CreateEventForm } from "./components/create-event-form";

export default function CreateEvent() {
  return (
    <>
      <p>Preencha os dados abaixo para adicionar um novo evento.</p>
      <CreateEventForm />
    </>
  );
}
