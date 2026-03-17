"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/shadcn/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

interface ControlledWeekNavigatorProps<
  FormType extends FieldValues,
> extends UseControllerProps<FormType> {
  label?: string;
  className?: string;
  disabled?: boolean;
  rightComponent?: React.ReactNode;
  description?: string;
  daysToShow?: number;
  locale?: string;
  disablePastDays?: boolean;
  onSelectDate?: (date: Date) => void;
}

export function ControlledWeekNavigator<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  className,
  disabled,
  rightComponent,
  description,
  daysToShow = 7,
  locale = "pt-BR",
  disablePastDays = true,
  onSelectDate,
}: ControlledWeekNavigatorProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedDate = value ? new Date(value) : new Date();

        return (
          <div className="flex flex-col gap-1">
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
            <WeekNavigatorContent
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                onChange(date);
                if (onSelectDate) {
                  onSelectDate(date);
                }
              }}
              daysToShow={daysToShow}
              locale={locale}
              disabled={disabled}
              disablePastDays={disablePastDays}
              className={className}
              hasError={!!error}
            />
            {error?.message && (
              <p className="text-destructive mt-1 text-sm">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}

interface WeekNavigatorContentProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  daysToShow: number;
  locale: string;
  disabled?: boolean;
  disablePastDays?: boolean;
  className?: string;
  hasError?: boolean;
}

function WeekNavigatorContent({
  selectedDate,
  onSelectDate,
  daysToShow,
  locale,
  disabled,
  disablePastDays,
  className,
  hasError,
}: WeekNavigatorContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement>(null);

  const dates = useMemo(() => {
    const result: Date[] = [];
    const startDate = new Date(selectedDate);
    startDate.setDate(startDate.getDate() - Math.floor(daysToShow / 2));

    for (let i = 0; i < daysToShow * 3; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      result.push(date);
    }
    return result;
  }, [selectedDate, daysToShow]);

  const formatDayName = (date: Date) => {
    return date
      .toLocaleDateString(locale, { weekday: "short" })
      .slice(0, 3)
      .toUpperCase();
  };

  const formatDayNumber = (date: Date) => {
    return date.getDate();
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString(locale, { month: "long", year: "numeric" });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDay = (date: Date) => {
    if (!disablePastDays) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    newDate.setHours(0, 0, 0, 0);

    if (disablePastDays && newDate < today) {
      onSelectDate(today);
      return;
    }

    onSelectDate(newDate);
  };
  const scrollToSelected = () => {
    if (selectedButtonRef.current) {
      selectedButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  useLayoutEffect(() => {
    const timer = setTimeout(scrollToSelected, 50);
    return () => clearTimeout(timer);
  }, [selectedDate, dates]);

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          {formatMonthYear(selectedDate)}
        </h3>
        <div className="flex gap-2 max-sm:gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => navigateWeek("prev")}
            aria-label="Semana anterior"
            disabled={disabled}
            className="size-8"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => navigateWeek("next")}
            aria-label="Próxima semana"
            disabled={disabled}
            className="size-8"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={cn(
          "flex gap-2 overflow-x-auto pb-2 scroll-smooth",
          hasError && "ring-2 ring-destructive rounded-xl",
        )}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {dates.map((date, index) => {
          const selected = isSelected(date);
          const today = isToday(date);
          const pastDay = isPastDay(date);

          return (
            <button
              type="button"
              key={index}
              ref={selected ? selectedButtonRef : null}
              onClick={() => !pastDay && onSelectDate(date)}
              disabled={disabled || pastDay}
              className={cn(
                "flex min-w-15 flex-col items-center justify-center rounded-xl px-3 py-3 transition-all cursor-pointer",
                "hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-muted/50",
                selected
                  ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/80"
                  : "bg-accent/50 text-muted-foreground hover:text-foreground",
                today && !selected && "ring-2 ring-primary/30",
              )}
            >
              <span className="text-xs font-medium">{formatDayName(date)}</span>
              <span
                className={cn(
                  "text-xl font-bold",
                  selected ? "text-primary-foreground" : "text-foreground",
                )}
              >
                {formatDayNumber(date)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
