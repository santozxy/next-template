import {
  Zap,
  Paintbrush,
  Blocks,
  Sparkles,
  Shield,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Next.js 16",
    description:
      "Construído com a versão mais recente do Next.js com App Router e Server Components.",
  },
  {
    icon: Paintbrush,
    title: "Tailwind CSS",
    description:
      "Estilização rápida e responsiva com Tailwind CSS v4 e design tokens customizáveis.",
  },
  {
    icon: Blocks,
    title: "shadcn/ui",
    description:
      "Componentes acessíveis e bonitos do shadcn/ui prontos para customização.",
  },
  {
    icon: Sparkles,
    title: "TypeScript",
    description:
      "Tipagem estática completa para maior segurança e melhor experiência de desenvolvimento.",
  },
  {
    icon: Shield,
    title: "ESLint & Prettier",
    description:
      "Configuração de linting e formatação para manter o código limpo e consistente.",
  },
  {
    icon: Rocket,
    title: "Deploy Fácil",
    description:
      "Pronto para deploy na Vercel com um clique ou qualquer outra plataforma.",
  },
];

export function Features() {
  return (
    <section className="border-border bg-card/30 border-t py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            <span className="text-foreground">O que está</span>{" "}
            <span className="text-muted-foreground">incluído?</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            Tudo que você precisa para começar a construir seu próximo projeto
            web.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group border-border bg-card/50 hover:border-muted-foreground/30 hover:bg-card rounded-xl border p-6 transition-colors"
            >
              <div className="border-border bg-secondary mb-4 inline-flex rounded-lg border p-3">
                <feature.icon className="text-foreground h-5 w-5" />
              </div>
              <h3 className="text-foreground text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
