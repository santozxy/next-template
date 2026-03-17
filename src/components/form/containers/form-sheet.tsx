"use client";

import type React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VariantProps } from "class-variance-authority";
import { useState } from "react";
import { PenBoxIcon } from "lucide-react";

interface FormSheetProps {
  title: string;
  buttonText?: string;
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  buttonSize?: VariantProps<typeof buttonVariants>["size"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formComponent: React.ComponentType<any>;
  formProps: Record<string, unknown>;
  isEdit?: boolean;
  className?: string;
  description: string;
  side?: "top" | "right" | "bottom" | "left";
  onOpenChange?: (open: boolean) => void;
  customButton?: React.ReactNode;
}

export function FormSheet({
  title,
  buttonText = "Cadastrar",
  buttonVariant = "default",
  buttonSize = "sm",
  formComponent: FormComponent,
  formProps,
  isEdit = false,
  className,
  description,
  side = "right",
  customButton,
  onOpenChange,
}: FormSheetProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };
  const enhancedFormProps = {
    ...formProps,
    onSuccess: handleSuccess,
  };

  const toggleSheet = () => {
    setOpen(!open);
    if (onOpenChange) {
      onOpenChange(!open);
    }
  };

  return (
    <Sheet open={open} onOpenChange={toggleSheet}>
      <SheetTrigger asChild>
        {isEdit ? (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:hover:bg-transparent"
            title="Editar"
          >
            <PenBoxIcon className="h-4 w-4 text-warning" />
          </Button>
        ) : (
          customButton || (
            <Button size={buttonSize} variant={buttonVariant}>
              {buttonText}
            </Button>
          )
        )}
      </SheetTrigger>
      <SheetContent
        side={side}
        className={
          className || "w-full overflow-x-scroll sm:max-w-lg px-4 pb-2 gap-6"
        }
      >
        <SheetHeader className="px-0 pb-0">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <FormComponent {...enhancedFormProps} />
      </SheetContent>
    </Sheet>
  );
}
