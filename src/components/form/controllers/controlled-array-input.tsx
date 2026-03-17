"use client";

import React, { useCallback, useState, KeyboardEvent } from "react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ControlledArrayInputProps<FormType extends FieldValues>
  extends UseControllerProps<FormType> {
  label: string;
  placeholder?: string;
}

export function ControlledArrayInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder,
}: ControlledArrayInputProps<FormType>) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = useCallback(
    (
      e: KeyboardEvent<HTMLInputElement>,
      value: string[],
      onChange: (v: string[]) => void
    ) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        const newTag = inputValue.trim();
        if (newTag && !value.includes(newTag)) {
          onChange([...value, newTag]);
          setInputValue("");
        }
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        onChange(value.slice(0, -1));
      }
    },
    [inputValue]
  );

  const handleRemove = useCallback(
    (index: number, value: string[], onChange: (v: string[]) => void) => {
      const newValues = value.filter((_, i) => i !== index);
      onChange(newValues);
    },
    []
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value = [], ref },
        fieldState: { error },
      }) => (
        <div className="flex flex-col gap-1">
          <Label htmlFor={name} className="block text-sm font-medium">
            {label.replace("*", "")}
            {rules?.required && (
              <span className="text-destructive ml-1">*</span>
            )}
          </Label>

          <Input
            id={name}
            ref={ref}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, value, onChange)}
            placeholder={placeholder}
            className={`${error ? "border-destructive" : ""}`}
          />

          {value.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {value.map((tag: string, index: number) => (
                <div
                  key={index}
                  className="bg-muted flex items-center gap-1 rounded-md px-2 py-1"
                >
                  <span className="text-sm">{tag}</span>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemove(index, value, onChange)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {error?.message && (
            <p className="text-destructive mt-1 text-sm">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
