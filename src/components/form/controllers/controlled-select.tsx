"use client";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface SelectOption {
  id: string;
  name: string | React.ReactNode;
  iconUrl?: string; // opcional: para exibir imagem
}

interface ControlledSelectProps<FormType extends FieldValues>
  extends UseControllerProps<FormType> {
  label: string;
  placeholder: string;
  options?: SelectOption[];
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  rightComponent?: React.ReactNode;
}

export function ControlledSelect<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder,
  options,
  className,
  disabled,
  loading,
  rightComponent,
}: ControlledSelectProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Label htmlFor={name} className="block text-sm font-medium">
              {label.replace("*", "")}
              {rules?.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            {rightComponent && rightComponent}
          </div>
          <Select disabled={disabled} onValueChange={onChange} value={value}>
            <SelectTrigger
              id={name}
              ref={ref}
              className={`${error ? "border-destructive" : "focus-visible:border-ring focus-visible:ring-primary/50"} ${
                className || ""
              }`}
            >
              <SelectValue
                placeholder={loading ? "Carregando..." : placeholder}
              />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  <div className="flex items-center gap-2">
                    {option.iconUrl && (
                      <Image
                        src={option.iconUrl}
                        alt={String(option.name)}
                        className="h-5 w-5"
                      />
                    )}
                    {option.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error?.message && (
            <p className="text-destructive text-sm">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
