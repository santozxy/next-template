import React from "react";
import { CardRedirect } from "./components/card-redirect";

export default function Unauthorized() {
  return (
    <div className="flex h-screen items-center justify-center">
      <CardRedirect />
    </div>
  );
}
