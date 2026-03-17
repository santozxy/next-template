"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

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
]

export function Started() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (command: string, index: number) => {
    await navigator.clipboard.writeText(command)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section id="get-started" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            <span className="text-foreground">Comece em</span>{" "}
            <span className="text-muted-foreground">segundos</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Três comandos simples para ter seu projeto rodando.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {commands.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2">
                <span className="text-sm text-muted-foreground">
                  {index + 1}. {item.label}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 p-4">
                <code className="flex-1 overflow-x-auto font-mono text-sm text-foreground">
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
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-linear-to-b from-secondary/50 to-card p-8 text-center">
          <p className="text-lg font-medium text-foreground">Pronto para começar?</p>
          <p className="mt-2 text-muted-foreground">
            Abra em <code className="rounded bg-secondary px-2 py-1 text-sm">http://localhost:3000</code> e comece a construir.
          </p>
        </div>
      </div>
    </section>
  )
}
