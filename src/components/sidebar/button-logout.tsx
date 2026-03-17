"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

interface ButtonLogoutProps {
  showDialog?: boolean;
}

export function ButtonLogout({ showDialog = true }: ButtonLogoutProps) {
  const logout = async () => {
    signOut({ callbackUrl: "/login" });
  };

  if (!showDialog) {
    return (
      <Button variant="secondary" className="h-8 w-full" onClick={logout}>
        Sair
      </Button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-start justify-start pl-2"
        >
          Sair
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogDescription>Confirmação</AlertDialogDescription>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza que deseja sair?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
