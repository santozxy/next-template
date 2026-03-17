"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { type DefaultValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Step, StepProgressBar } from "./step-progress-bar";

interface FormProps<T, R> {
  children: React.ReactNode;
  steps?: Step[];
  onSubmit: (data: T) => Promise<R>;
  initialData?: Partial<T>;
  buttonTitle?: string;
  reset?: boolean;
}

export function GlobalForm<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
  R extends { status: string; message: string },
>({
  children,
  steps = [],
  onSubmit,
  initialData,
  buttonTitle = "Finalizar",
  reset = true,
}: FormProps<T, R>) {
  const [loading, setLoading] = useState(false);
  const methods = useForm<T>({
    defaultValues: initialData as DefaultValues<T>,
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      methods.reset(initialData as DefaultValues<T>);
    }
  }, [initialData, methods]);

  const [currentStep, setCurrentStep] = useState(0);

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const isStepValid = async () => {
    return await methods.trigger();
  };

  const handleNextStep = async () => {
    const isValid = await isStepValid();
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        await handleSubmitForm();
      }
    }
  };

  const handleSubmitForm = methods.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await onSubmit(data);
      if (response.status === "success") {
        if (reset) methods.reset();
        if (steps.length > 0) {
          setCurrentStep(0);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao finalizar");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      {steps.length > 0 && (
        <StepProgressBar currentStep={currentStep + 1} steps={steps} />
      )}
      <Card className="max-sm:py-0 max-sm:border-0">
        <CardContent className="max-sm:px-0">
          <FormProvider {...methods}>
            <div className="flex flex-col gap-6">
              <div className="gap-6 flex flex-col">
                {React.Children.toArray(children)[currentStep]}
              </div>
              <div className="flex  justify-between gap-6 flex-row">
                {steps.length > 0 && currentStep > 0 && (
                  <Button
                    onClick={goToPreviousStep}
                    variant="outline"
                    className="w-full"
                    disabled={methods.formState.isSubmitting || loading}
                  >
                    Voltar
                  </Button>
                )}
                {steps.length > 0 && currentStep < steps.length - 1 && (
                  <Button
                    onClick={handleNextStep}
                    className="w-full"
                    disabled={methods.formState.isSubmitting || loading}
                    loading={loading}
                  >
                    Próximo
                  </Button>
                )}
                {(steps.length === 0 || currentStep === steps.length - 1) && (
                  <Button
                    onClick={handleSubmitForm}
                    className="w-full"
                    disabled={methods.formState.isSubmitting || loading}
                    loading={loading}
                  >
                    {buttonTitle}
                  </Button>
                )}
              </div>
            </div>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
