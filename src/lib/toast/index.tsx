import { ExternalToast, toast as sonnerToast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { JSX } from "react";
import { cn } from "../shadcn/utils";

export type ToastOptions = Omit<ExternalToast, "description">;

type CustomToastType = "success" | "error" | "info" | "warning" | "loading";

const icons: Record<CustomToastType, JSX.Element> = {
  success: <CheckCircle2 className="text-green-500" size={20} />,
  error: <XCircle className="text-red-500" size={20} />,
  info: <Info className="text-blue-500" size={20} />,
  warning: <AlertTriangle className="text-yellow-500" size={20} />,
  loading: <Loader2 className="animate-spin text-gray-500" size={20} />,
};

function CustomToast({
  type,
  title,
  description,
}: {
  type: CustomToastType;
  title: string;
  description?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border p-3 shadow-lg backdrop-blur-lg",
        {
          "border-green-500/30": type === "success",
          "border-red-500/30": type === "error",
          "border-blue-500/30": type === "info",
          "border-yellow-500/30": type === "warning",
          "border-gray-500/30": type === "loading",
        },
        {
          "bg-green-50/50 dark:bg-green-900/30": type === "success",
          "bg-red-50/50 dark:bg-red-900/30": type === "error",
          "bg-blue-50/50 dark:bg-blue-900/30": type === "info",
          "bg-yellow-50/50 dark:bg-yellow-900/30": type === "warning",
          "bg-gray-50/50 dark:bg-gray-900/30": type === "loading",
        },
      )}
    >
      <div className="mt-0.5">{icons[type]}</div>
      <div className="flex flex-col text-sm">
        <strong className="font-medium">{title}</strong>
        {description && (
          <span className="text-muted-foreground">{description}</span>
        )}
      </div>
    </div>
  );
}

export const toast = {
  success: (description = "Deu certo!", options?: ToastOptions) =>
    sonnerToast.custom(
      () => (
        <CustomToast type="success" title="Sucesso" description={description} />
      ),
      options,
    ),

  error: (description = "Ops! Algo deu errado.", options?: ToastOptions) =>
    sonnerToast.custom(
      () => <CustomToast type="error" title="Erro" description={description} />,
      options,
    ),

  info: (description = "Aqui vai uma informação.", options?: ToastOptions) =>
    sonnerToast.custom(
      () => (
        <CustomToast type="info" title="Informação" description={description} />
      ),
      options,
    ),

  warning: (description = "Atenção necessária.", options?: ToastOptions) =>
    sonnerToast.custom(
      () => (
        <CustomToast type="warning" title="Atenção" description={description} />
      ),
      options,
    ),

  loading: (description = "Carregando...", options?: ToastOptions) =>
    sonnerToast.custom(
      () => (
        <CustomToast
          type="loading"
          title="Carregando"
          description={description}
        />
      ),
      { duration: Infinity, ...options },
    ),
};
