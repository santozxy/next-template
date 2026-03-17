"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ControlledInputCurrencyProps<FormType extends FieldValues>
  extends UseControllerProps<FormType>,
    Omit<
      React.ComponentProps<"input">,
      "name" | "defaultValue" | "onChange" | "value"
    > {
  label: string;
  placeholder?: string;
  rightComponent?: React.ReactNode;
}

function parseBRToNumber(
  value: string | number | null | undefined
): number | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "number") return value;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const normalized = trimmed.replace(/\./g, "").replace(/,/g, ".");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : undefined;
}

function formatToBR(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "";
  try {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return String(value);
  }
}

export function ControlledInputCurrency<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder,
  rightComponent,
  className,
  ...inputProps
}: ControlledInputCurrencyProps<FormType>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ control, name, rules });

  const [display, setDisplay] = useState("");

  const onlyDigits = useCallback((val: string) => val.replace(/\D/g, ""), []);

  const digitsToNumber = useCallback((digits: string): number | undefined => {
    if (!digits) return undefined;
    const int = parseInt(digits, 10);
    if (!Number.isFinite(int)) return undefined;
    return int / 100;
  }, []);

  const toBR = useCallback((num: number | undefined) => formatToBR(num), []);

  useEffect(() => {
    if (typeof value === "number") {
      setDisplay(formatToBR(value));
    } else if (typeof value === "string") {
      const fromBR = parseBRToNumber(value);
      if (fromBR !== undefined) {
        setDisplay(formatToBR(fromBR));
      } else {
        const n = digitsToNumber(onlyDigits(value));
        setDisplay(toBR(n) || "");
      }
    } else if (value == null) {
      setDisplay("");
    }
  }, [value, digitsToNumber, onlyDigits, toBR]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = onlyDigits(raw);
    const numeric = digitsToNumber(digits);
    const formatted = toBR(numeric) || "";
    setDisplay(formatted);
    onChange(numeric);
  };

  const onInputBlur = () => {
    onBlur();
    if (!display) return;
    const n = parseBRToNumber(display);
    setDisplay(toBR(n) || "");
  };

  return (
    <div className={"flex flex-col gap-1"}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="block text-sm font-medium">
          {label.replace("*", "")}
          {rules?.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {rightComponent && rightComponent}
      </div>
      <div className="relative flex items-center justify-between">
        <Input
          {...inputProps}
          id={name}
          inputMode="decimal"
          placeholder={placeholder ?? "0,00"}
          onChange={onInputChange}
          onBlur={onInputBlur}
          value={display}
          ref={ref}
          className={`${error ? "border-destructive" : ""} ${className || ""}`}
        />
      </div>
      {error?.message && (
        <p className="text-destructive mt-1 text-sm">{error.message}</p>
      )}
    </div>
  );
}
