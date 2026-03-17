"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

export function ButtonLogout() {
  function logout() {
    signOut();
  }
  return (
    <Button className="w-full" onClick={logout}>
      Sair agora
    </Button>
  );
}
