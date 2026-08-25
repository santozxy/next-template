"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const commands = [
  {
    label: "Clone o repositório",
    command: "git clone https://github.com/syslae-solutions/next-template.git",
  },
  {
    label: "Instale as dependências",
    command: "cd next-template && pnpm install",
  },
  {
    label: "Inicie o servidor de desenvolvimento",
    command: "pnpm dev",
  },
];

export function Started() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (command: string, index: number) => {
    await navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="get-started" className="border-border border-t py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            <span className="text-foreground">Comece em</span>{" "}
            <span className="text-muted-foreground">segundos</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
            Três comandos simples para ter seu projeto rodando.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {commands.map((item, index) => (
            <div
              key={index}
              className="border-border bg-card overflow-hidden rounded-lg border"
            >
              <div className="border-border bg-secondary/30 flex items-center justify-between border-b px-4 py-2">
                <span className="text-muted-foreground text-sm">
                  {index + 1}. {item.label}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 p-4">
                <code className="text-foreground flex-1 overflow-x-auto font-mono text-sm">
                  <span className="text-muted-foreground mr-2">$</span>
                  {item.command}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => handleCopy(item.command, index)}
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="text-muted-foreground h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-border from-secondary/50 to-card mt-12 rounded-xl border bg-linear-to-b p-8 text-center">
          <p className="text-foreground text-lg font-medium">
            Pronto para começar?
          </p>
          <p className="text-muted-foreground mt-2">
            Abra em{" "}
            <code className="bg-secondary rounded px-2 py-1 text-sm">
              http://localhost:3000
            </code>{" "}
            e comece a construir.
          </p>
        </div>
      </div>
    </section>
  );
}
