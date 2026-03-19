"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { refetchQuery } from "@/lib/tanstack-query/methods";
import { toast } from "@/lib/toast";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

interface ActionDeleteProps<TArgs = void> {
  /** Ação assíncrona que realmente deleta o item (server action, API call etc) */
  onDelete: (args?: TArgs) => Promise<void>;
  /** Nome do item (para mensagens no toast) */
  name?: string;
  /** Queries para revalidar após sucesso */
  revalidateQueries?: readonly unknown[];
  /** Desabilita o botão */
  disabled?: boolean;
  /** Mensagens customizáveis */
  confirmTitle?: string;
  confirmDescription?: string;
}

export function ActionDelete<TArgs = void>({
  onDelete,
  name = "item",
  revalidateQueries,
  disabled,
  confirmTitle = "Confirmar exclusão",
  confirmDescription = "Tem certeza que deseja excluir este item? Essa ação não poderá ser desfeita.",
}: ActionDeleteProps<TArgs>) {
  const [showDialog, setShowDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    setShowDialog(true);
  };

  const confirmDelete = () => {
    setShowDialog(false);
    startTransition(async () => {
      try {
        await onDelete();
        toast.success(`${name} foi excluído com sucesso!`);
        if (revalidateQueries?.length) {
          await refetchQuery(revalidateQueries);
        }
      } catch (err) {
        console.error(err);
        toast.error(`Não foi possível excluir ${name}.`);
      }
    });
  };

  return (
    <>
      {/* Botão de ação visualmente igual aos outros (ícone dentro da tabela) */}
      <Button
        variant="ghost"
        onClick={handleDelete}
        disabled={disabled || isPending}
        className={
          "text-destructive hover:text-destructive/80 border-border flex h-7 w-7 items-center gap-2 rounded-sm border p-1 transition"
        }
      >
        <Trash2 className="h-4.5 w-4.5" />
      </Button>

      {/* Dialog de confirmação */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmTitle}</DialogTitle>
            <DialogDescription>{confirmDescription}</DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={isPending}
              variant="destructive"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
