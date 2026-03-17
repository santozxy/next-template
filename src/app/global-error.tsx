"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { ThemeProvider } from "@/providers/theme-provider";
import { useRouter } from "next/navigation";
import { ApiResponseError } from "@/api/types";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string } & ApiResponseError;
  reset: () => void;
}) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    window.location.reload();
  };

  const handleGoHome = () => {
    router.back();
  };

  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-6">
            <Image src={Logo} alt="Logo" width={305} height={65} />
            <Alert variant="destructive" className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <AlertTitle>Algo deu errado!</AlertTitle>
                  <AlertDescription>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Ocorreu um erro inesperado ao processar sua solicitação.
                    </p>
                  </AlertDescription>
                </div>
              </div>
              <div className="bg-destructive/10 border-destructive/30 text-destructive-foreground mt-3 w-full space-y-2 rounded-md border p-4 text-sm">
                {error.message && (
                  <div className="">
                    <span className="mb-1 block font-semibold">Mensagem:</span>
                    <pre className="bg-destructive/5 max-h-48 overflow-auto rounded-md p-2 break-all whitespace-pre-wrap">
                      {error.status ? JSON.stringify(error) : error.message}
                    </pre>
                  </div>
                )}
                {error.digest && (
                  <div className="">
                    <span className="mb-1 block font-semibold">Código:</span>
                    <pre className="bg-destructive/5 max-h-48 overflow-auto rounded-md p-2 break-all whitespace-pre-wrap">
                      {error.digest}
                    </pre>
                  </div>
                )}
              </div>
            </Alert>

            <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                onClick={handleRefresh}
                className="w-full"
                disabled={refreshing}
              >
                {refreshing ? "Recarregando..." : "Recarregar a página"}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoHome}
              >
                Voltar para a página anterior
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
