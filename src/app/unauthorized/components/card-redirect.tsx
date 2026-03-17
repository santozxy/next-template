"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function CardRedirect() {
  const [progress, setProgress] = useState(100);

  const handleSignOut = async () => {
    signOut();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer);

          return 0;
        }
        return prevProgress - 1;
      });
    }, 100);
    if (progress <= 0) {
      handleSignOut();
    }

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className="bg-secondary flex w-full max-w-md flex-col justify-between gap-8 rounded-lg border p-8 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="flex justify-center">
        <AlertCircle className="h-16 w-16 animate-pulse text-yellow-500" />
      </div>
      <div className="space-y-4">
        <h1 className="text-primary text-center text-2xl font-bold">
          Seu acesso expirou
        </h1>
        <p className="text-muted-foreground text-center">
          Por favor, faça login novamente para continuar usando o sistema.
        </p>
      </div>
      <div className="space-y-4">
        <Progress value={progress} className="w-full" />
        <p className="text-center text-sm text-gray-500">
          Redirecionando em {Math.ceil(progress / 10)} segundos...
        </p>
      </div>
      <Button className="w-full" title="Sair" onClick={handleSignOut}>
        Sair
      </Button>
    </div>
  );
}
