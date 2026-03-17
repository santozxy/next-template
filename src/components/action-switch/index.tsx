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
import { Switch } from "@/components/ui/switch";
import { refetchQuery } from "@/lib/tanstack-query/methods";
import { toast } from "@/lib/toast";
import { useState, useTransition } from "react";

interface ActionSwitchProps<TArgs = void> {
  checked: boolean;
  onAction: (newValue: boolean, args?: TArgs) => Promise<void>; // server action
  revalidateQueries?: string[];
  disabled?: boolean;
  confirmTitle?: string;
  confirmDescription?: string;
  title?: string;
  name: string;
}

export function ActionSwitch<TArgs = void>({
  checked,
  onAction,
  revalidateQueries,
  disabled,
  confirmTitle = "Confirmar alteração",
  confirmDescription = "Tem certeza que deseja alterar o estado?",
  title,
  name,
}: ActionSwitchProps<TArgs>) {
  const [isChecked, setIsChecked] = useState(checked);
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingValue, setPendingValue] = useState<boolean | null>(null);

  const handleChange = (newValue: boolean) => {
    setPendingValue(newValue);
    setShowDialog(true);
  };

  const confirmChange = async () => {
    if (pendingValue === null) return;
    setShowDialog(false);
    setIsChecked(pendingValue);

    startTransition(async () => {
      try {
        await onAction(pendingValue);
        toast.success(`O status de ${name} foi alterado com sucesso!`);
        if (revalidateQueries?.length) {
         await refetchQuery(revalidateQueries);
        }
      } catch (err) {
        console.error(err);
        toast.error("Não foi possível alterar o estado");
        setIsChecked((prev) => !prev);
      } finally {
        setPendingValue(null);
      }
    });
  };

  const cancelChange = () => {
    setShowDialog(false);
    setPendingValue(null);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {title && <span className="font-medium">{title}</span>}
        <Switch
          checked={isChecked}
          onCheckedChange={handleChange}
          disabled={isPending || disabled}
        />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmTitle}</DialogTitle>
            <DialogDescription>{confirmDescription}</DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={cancelChange}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button onClick={confirmChange} disabled={isPending}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
