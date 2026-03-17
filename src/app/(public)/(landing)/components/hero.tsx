import { Button } from "@/components/ui/button"
import { Github, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-size-[64px_64px]" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />
      
      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center md:py-48">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Open Source
        </div>

        {/* Heading */}
        <h1 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">
          <span className="text-foreground">Next</span>
          <span className="text-muted-foreground">Template</span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Um template moderno para iniciar seus projetos Next.js com tudo que você precisa. TypeScript, Tailwind CSS e shadcn/ui prontos para uso.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="https://github.com" target="_blank">
              <Github className="h-5 w-5" />
              Ver no GitHub
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="#get-started">
              Começar Agora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Command */}
        <div className="mt-12 inline-flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm">
          <span className="text-muted-foreground">$</span>
          <code className="text-foreground">pnpm create-next-app@latest https://github.com/syslae-solutions/next-template</code>
        </div>
      </div>
    </section>
  )
}
