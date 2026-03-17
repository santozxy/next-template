"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/shadcn/utils";
import { ptBR } from "date-fns/locale";

interface ControlledDateTimePickerProps<
  FormType extends FieldValues,
> extends UseControllerProps<FormType> {
  label: string;
  description?: string;
  placeholder?: string;
  className?: string;
  formatDate?: string;
  showTime?: boolean;
}

export function ControlledDateTimePicker<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  description,
  placeholder = "Selecione uma data e hora",
  className,
  showTime = true,
  formatDate = "dd/MM/yyyy",
}: ControlledDateTimePickerProps<FormType>) {
  const TIMEZONE = "America/Sao_Paulo";

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        function parseISOToLocalDate(isoString: string): Date {
          const date = new Date(isoString);
          // Ajusta para o timezone local removendo o offset
          const offset = date.getTimezoneOffset() * 60000;
          return new Date(date.getTime() + offset);
        }

        const displayDate = value ? parseISOToLocalDate(value) : undefined;

        function handleDateSelect(date: Date | undefined) {
          if (date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            if (value && showTime) {
              const current = displayDate!;
              const newDate = new Date(
                year,
                month,
                day,
                current.getHours(),
                current.getMinutes(),
              );
              const offset = newDate.getTimezoneOffset() * 60000;
              const isoDate = new Date(newDate.getTime() - offset);
              onChange(isoDate.toISOString());
            } else if (!showTime) {
              const newDate = new Date(year, month, day, 0, 0, 0, 0);
              const offset = newDate.getTimezoneOffset() * 60000;
              const isoDate = new Date(newDate.getTime() - offset);
              onChange(isoDate.toISOString());
            } else {
              const newDate = new Date(year, month, day);
              const offset = newDate.getTimezoneOffset() * 60000;
              const isoDate = new Date(newDate.getTime() - offset);
              onChange(isoDate.toISOString());
            }
          }
        }

        function handleTimeChange(
          type: "hour" | "minute" | "second",
          val: number,
        ) {
          const currentDate = displayDate || new Date();
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          const day = currentDate.getDate();
          const hours = type === "hour" ? val : currentDate.getHours();
          const minutes = type === "minute" ? val : currentDate.getMinutes();
          const seconds = type === "second" ? val : currentDate.getSeconds();

          const newDate = new Date(year, month, day, hours, minutes, seconds);
          const offset = newDate.getTimezoneOffset() * 60000;
          const isoDate = new Date(newDate.getTime() - offset);
          onChange(isoDate.toISOString());
        }

        const dateFormat = showTime ? "dd/MM/yyyy HH:mm" : formatDate;
        return (
          <div className={cn("flex flex-col gap-1", className)}>
            <Label className="block text-sm font-medium">
              {label}
              {rules?.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Popover>
              <PopoverTrigger asChild type="button">
                <Button
                  id={name}
                  ref={ref}
                  type="button"
                  variant={"outline"}
                  className={cn(
                    "flex w-full flex-row justify-between",
                    !value && "text-muted-foreground",
                    error ? "border-destructive" : "",
                  )}
                >
                  {displayDate ? (
                    format(displayDate, dateFormat, { locale: ptBR })
                  ) : (
                    <span className="trucante max-w-sm">{placeholder}</span>
                  )}
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="sm:flex">
                  <Calendar
                    mode="single"
                    selected={displayDate}
                    onSelect={handleDateSelect}
                    timeZone={TIMEZONE}
                    locale={ptBR}
                    disabled={{ before: new Date() }}
                  />
                  {showTime && (
                    <div className="flex flex-col divide-y sm:h-75 sm:flex-row sm:divide-x sm:divide-y-0">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex p-2 sm:flex-col">
                          {Array.from({ length: 24 }, (_, i) => i)
                            .reverse()
                            .map((hour) => (
                              <Button
                                key={hour}
                                size="icon"
                                type="button"
                                variant={
                                  displayDate && displayDate.getHours() === hour
                                    ? "default"
                                    : "ghost"
                                }
                                className="aspect-square shrink-0 sm:w-full"
                                onClick={() => handleTimeChange("hour", hour)}
                              >
                                {hour.toString().padStart(2, "0")}
                              </Button>
                            ))}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex p-2 sm:flex-col">
                          {Array.from({ length: 12 }, (_, i) => i * 5).map(
                            (minute) => (
                              <Button
                                key={minute}
                                size="icon"
                                type="button"
                                variant={
                                  displayDate &&
                                  displayDate.getMinutes() === minute
                                    ? "default"
                                    : "ghost"
                                }
                                className="aspect-square shrink-0 sm:w-full"
                                onClick={() =>
                                  handleTimeChange("minute", minute)
                                }
                              >
                                {minute.toString().padStart(2, "0")}
                              </Button>
                            ),
                          )}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            {description && !error && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
            {error?.message && (
              <p className="text-destructive text-sm">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
