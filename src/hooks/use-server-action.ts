"use client";

import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import { HandleError } from "@/api/error";
import { handleServerActionError } from "@/api/client";
import type { ApiResponse, ApiResponseError } from "@/api/types";

type ServerActionResult<T> = ApiResponse<T> | ApiResponseError;

interface UseServerActionProps<TData, TVariables, TContext = unknown>
  extends Omit<
    UseMutationOptions<ApiResponse<TData>, HandleError, TVariables, TContext>,
    "mutationFn"
  > {
  mutationFn: (
    variables: TVariables
  ) => Promise<ServerActionResult<TData>>;

  /** Mensagem de erro custom - É recomendado retornar a mensagem do servidor(Backend) para ações de erro */
  errorMessage?: string;

  /** Mensagem de sucesso custom - É recomendado retornar a mensagem do servidor(Backend) para ações de sucesso */
  successMessage?: string;

  /** Desabilitar toast automático de sucesso */
  disableSuccessToast?: boolean;
}

export function useServerAction<TData, TVariables = void, TContext = unknown>({
  mutationFn,
  errorMessage,
  successMessage,
  disableSuccessToast,
  onError,
  onSuccess,
  ...options
}: UseServerActionProps<TData, TVariables, TContext>): UseMutationResult<
  ApiResponse<TData>,
  HandleError,
  TVariables,
  TContext
> {
  return useMutation<ApiResponse<TData>, HandleError, TVariables, TContext>({
    ...options,

    mutationFn: async (variables) => {
      const response = await mutationFn(variables);
      await handleServerActionError(response);
      return response as ApiResponse<TData>;
    },

    onSuccess: (data, variables, onMutateResult, context) => {
      if (!disableSuccessToast) {
        toast.success(successMessage || data.message || "Sucesso");
      }

      onSuccess?.(data, variables, onMutateResult, context);
    },

    onError: (error, variables, onMutateResult, context) => {
      toast.error(errorMessage || error.message);
      onError?.(error, variables, onMutateResult, context);
    },
  });
}