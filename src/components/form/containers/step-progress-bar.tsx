"use client";

import { cn } from "@/lib/shadcn/utils";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

import React from "react";

export interface Step {
  id: number;
  name: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  isStepDisabled?: boolean;
}

interface StepProgressBarProps {
  currentStep: number;
  steps: Step[];
}

export function StepProgressBar({ currentStep, steps }: StepProgressBarProps) {
  return (
    <div className="mx-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep >= step.id;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                    isActive
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-muted border-border text-muted-foreground"
                  )}
                >
                  {step.icon ? (
                    <step.icon className="h-5 w-5" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <span className="text-center text-xs font-semibold max-sm:hidden">
                  {step.name}
                </span>
              </div>

              {/* Linha de conexão */}
              {index < steps.length - 1 && (
                <div className="bg-border mx-2 h-1 flex-1 rounded-full" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
