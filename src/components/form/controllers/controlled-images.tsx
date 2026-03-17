"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

interface ControlledImagesProps<
  FormType extends FieldValues,
> extends UseControllerProps<FormType> {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  className?: string;
  rightComponent?: React.ReactNode;
  limit?: number;
}

export function ControlledImages<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder = "Selecione uma imagem",
  disabled,
  multiple = false,
  className,
  rightComponent,
  limit = 5,
}: ControlledImagesProps<FormType>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSelectFile = useCallback(() => {
    if (!disabled) fileInputRef.current?.click();
  }, [disabled]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const images: string[] = Array.isArray(value)
          ? value
          : value
            ? [value]
            : [];

        const hasLimit = multiple && typeof limit === "number";
        const isLimitReached = hasLimit && images.length >= (limit ?? 0);

        const handleRemove = (index: number) => {
          if (multiple) {
            const newImages = images.filter((_, i) => i !== index);
            onChange(newImages);
          } else {
            onChange(null);
          }
        };

        const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFiles = e.target.files
            ? Array.from(e.target.files)
            : [];

          const base64Files = await Promise.all(
            selectedFiles.map((file) => fileToBase64(file)),
          );

          if (multiple) {
            const updated = [...images, ...base64Files].slice(
              0,
              limit ?? Infinity,
            );
            onChange(updated);
          } else {
            onChange(base64Files[0] || null);
          }

          e.target.value = "";
        };

        return (
          <>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor={name} className="block text-sm font-medium">
                    {label.replace("*", "")}
                    {rules?.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>

                  {hasLimit && (
                    <span
                      className={`text-xs font-medium ${
                        isLimitReached
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      ({images.length}/{limit})
                    </span>
                  )}
                </div>

                {rightComponent}
              </div>

              <div
                className={`dark:bg-input/30 flex flex-col items-center justify-center rounded-lg border border-dashed p-4 shadow-sm transition-colors ${
                  error ? "border-destructive" : "border-border"
                } ${
                  disabled || isLimitReached
                    ? "cursor-not-allowed"
                    : "hover:bg-muted/30 cursor-pointer"
                } ${className || ""}`}
                onClick={() => {
                  if (!disabled && !isLimitReached) handleSelectFile();
                }}
              >
                {images && images.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-4">
                    {images.map((base64, index) => (
                      <div key={index} className="group relative h-24 w-24">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage(base64);
                          }}
                          className="h-full w-full"
                        >
                          <Image
                            src={base64}
                            alt={`Imagem ${index + 1}`}
                            fill
                            className="cursor-pointer rounded-lg border object-cover"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(index);
                          }}
                          className="hover:bg-destructive absolute top-1 right-1 cursor-pointer rounded-full bg-black/60 p-1 opacity-0 transition group-hover:opacity-100"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-center text-sm">
                    {placeholder}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  id={name}
                  type="file"
                  accept="image/*"
                  multiple={multiple}
                  disabled={disabled || isLimitReached}
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
              {error?.message && (
                <p className="text-destructive mt-1 text-sm">{error.message}</p>
              )}
            </div>

            <Dialog
              open={!!previewImage}
              onOpenChange={() => setPreviewImage(null)}
            >
              <DialogContent className="max-w-4xl overflow-hidden p-0">
                <DialogHeader className="p-4 pb-0">
                  <DialogTitle>Visualizar imagem</DialogTitle>
                </DialogHeader>
                {previewImage && (
                  <div className="relative h-[70vh] w-full">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      fill
                      className="bg-black/90 object-contain"
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </>
        );
      }}
    />
  );
}
