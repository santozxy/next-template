"use client";

import type React from "react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type MaskKey,
  type MaskType,
  applyMask,
  mask,
  removeMask,
} from "@/utils/mask";
import { useCallback, useMemo } from "react";

interface ControlledInputProps<FormType extends FieldValues>
  extends UseControllerProps<FormType>,
    Omit<React.ComponentProps<"input">, "name" | "defaultValue"> {
  label: string;
  maskType?: MaskKey;
  customMask?: MaskType;
  placeholder: string;
  rightComponent?: React.ReactNode;
}

export function ControlledInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  maskType,
  customMask,
  placeholder,
  rightComponent,
  ...inputProps
}: ControlledInputProps<FormType>) {
  const maskToUse = maskType ? mask[maskType] : customMask;

  const maskedValue = useMemo(() => {
    return (val: string) => (maskToUse ? applyMask(val || "", maskToUse) : val);
  }, [maskToUse]);

 const handleChange = useCallback(
   (onChange: (arg0: string | number) => void) =>
     (e: React.ChangeEvent<HTMLInputElement>) => {
       const newValue = e.target.value;

       if (maskToUse) {
         const maskedValue = applyMask(newValue, maskToUse);
         const unmaskedValue = removeMask(maskedValue, maskToUse);
         onChange(unmaskedValue);
         return;
       }

       if (inputProps.type === "number") {
         const numericValue = Number(newValue);

         const max =
           inputProps.max !== undefined ? Number(inputProps.max) : null;
         const min =
           inputProps.min !== undefined ? Number(inputProps.min) : null;

         if (max !== null && numericValue > max) {
           onChange(max);
           return;
         }

         if (min !== null && numericValue < min) {
           onChange(min);
           return;
         }

         onChange(numericValue);
         return;
       }

       onChange(newValue);
     },
   [maskToUse, inputProps],
 );


  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        return (
          <div className={"flex flex-col gap-1"}>
            <div className="flex items-center justify-between">
              <Label htmlFor={name} className="block text-sm font-medium">
                {label.replace("*", "")}
                {rules?.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </Label>
              {rightComponent && rightComponent}
            </div>
            <div className="relative flex items-center justify-between">
              <Input
                {...inputProps}
                id={name}
                placeholder={placeholder}
                onChange={handleChange(onChange)}
                onBlur={onBlur}
                value={maskedValue(value) || ""}
                ref={ref}
                className={`${error ? "border-destructive" : ""} ${
                  inputProps.className || ""
                }`}
              />
            </div>
            {error?.message && (
              <p className="text-destructive mt-1 text-sm">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
