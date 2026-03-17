"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Importe o componente base que você postou
import { cn } from "@/lib/shadcn/utils";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

interface ControlledSwitchProps<FormType extends FieldValues>
  extends UseControllerProps<FormType> {
  label: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

export function ControlledSwitch<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  description,
  className,
  disabled,
}: ControlledSwitchProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={cn("space-y-2", className)}>
          <div className="flex items-center justify-start gap-4">
            <Switch
              id={name}
              checked={value}
              onCheckedChange={onChange}
              disabled={disabled}
            />
            <div className="space-y-0.5">
              <Label htmlFor={name} className="text-base font-medium">
                {label.replace("*", "")}
                {label.includes("*") && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </Label>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          {error?.message && (
            <p className="text-sm font-medium text-destructive">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
