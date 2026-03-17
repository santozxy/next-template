"use client";

import type React from "react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/shadcn/utils";
import { Clock, Check } from "lucide-react";

interface Option {
  id: string;
  name: string;
}

interface ControlledTimeSlotPickerProps<
  FormType extends FieldValues,
> extends UseControllerProps<FormType> {
  label?: string;
  className?: string;
  disabled?: boolean;
  rightComponent?: React.ReactNode;
  description?: string;
  placeholder?: string;
  options: Option[];
  loading?: boolean;
  multiple?: boolean;
}

export function ControlledTimeSlotPicker<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  className,
  disabled,
  rightComponent,
  description,
  placeholder = "Nenhum horário disponível",
  options,
  loading = false,
  multiple = false,
}: ControlledTimeSlotPickerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedOptions = multiple
          ? Array.isArray(value)
            ? value
            : []
          : value
            ? [value as string]
            : [];

        const toggleOption = (optionId: string) => {
          if (disabled) return;

          if (multiple) {
            if (selectedOptions.includes(optionId)) {
              onChange(selectedOptions.filter((id) => id !== optionId));
            } else {
              onChange([...selectedOptions, optionId]);
            }
          } else {
            if (selectedOptions.includes(optionId)) {
              onChange(null);
            } else {
              onChange(optionId);
            }
          }
        };

        return (
          <div className={cn("flex flex-col gap-1", className)}>
            {label && (
              <div className="flex items-center justify-between">
                <Label htmlFor={name} className="block text-sm font-medium">
                  {label.replace("*", "")}
                  {label.includes("*") && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </Label>
                {rightComponent && rightComponent}
              </div>
            )}
            {description && (
              <p className="text-muted-foreground mb-2 text-sm">
                {description}
              </p>
            )}

            <TimeSlotPickerContent
              options={options}
              selectedOptions={selectedOptions}
              onToggle={toggleOption}
              loading={loading}
              disabled={disabled}
              placeholder={placeholder}
              hasError={!!error}
            />

            {selectedOptions.length > 0 && multiple && (
              <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span>
                    {selectedOptions.length}{" "}
                    {selectedOptions.length === 1
                      ? "horário selecionado"
                      : "horários selecionados"}
                  </span>
                </div>
              </div>
            )}

            {error?.message && (
              <p className="text-destructive mt-1 text-sm">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}

interface TimeSlotPickerContentProps {
  options: Option[];
  selectedOptions: string[];
  onToggle: (optionId: string) => void;
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  hasError?: boolean;
}

function TimeSlotPickerContent({
  options,
  selectedOptions,
  onToggle,
  loading,
  disabled,
  placeholder,
  hasError,
}: TimeSlotPickerContentProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (options.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center py-8 px-4 rounded-xl border border-dashed border-muted-foreground/30 bg-muted/30",
          hasError && "border-destructive",
        )}
      >
        <Clock className="h-10 w-10 text-muted-foreground/50 mb-3" />
        <p className="text-sm text-muted-foreground text-center">
          {placeholder}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-1 rounded-xl",
        hasError && "ring-2 ring-destructive",
      )}
    >
      {options.map((option) => {
        const isSelected = selectedOptions.includes(option.id);

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onToggle(option.id)}
            disabled={disabled}
            className={cn(
              "group relative flex flex-col items-center justify-center",
              "h-16 px-3 rounded-xl border-2 transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isSelected
                ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]"
                : "border-border bg-card hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm",
            )}
          >
            {/* Check indicator */}
            <div
              className={cn(
                "absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full",
                "flex items-center justify-center transition-all duration-200",
                isSelected
                  ? "bg-primary-foreground text-primary scale-100 opacity-100"
                  : "scale-0 opacity-0",
              )}
            >
              <Check className="h-3 w-3" />
            </div>

            {/* Clock icon */}
            <Clock
              className={cn(
                "h-4 w-4 mb-1 transition-colors duration-200",
                isSelected
                  ? "text-primary-foreground"
                  : "text-muted-foreground group-hover:text-primary",
              )}
            />

            {/* Option name */}
            <span
              className={cn(
                "text-sm font-semibold tracking-tight transition-colors duration-200",
                isSelected ? "text-primary-foreground" : "text-foreground",
              )}
            >
              {option.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
