"use client";
import { getSession, signOut } from "next-auth/react";
import { HandleError } from "./error";
import { ApiResponse, ApiResponseError } from "./types";

const configURL = () => {
  switch (process.env.NEXT_PUBLIC_MODE) {
    case "prod":
      return process.env.NEXT_PUBLIC_API_PROD_BASE_URL;
    case "dev":
      return process.env.NEXT_PUBLIC_API_DEV_BASE_URL;
    case "demo":
    default:
      return process.env.NEXT_PUBLIC_API_DEMO_BASE_URL;
  }
};

export async function fetchClient<T>(
  path: string,
  options?: Omit<RequestInit, "body"> & { body?: object }
): Promise<T> {
  const session = await getSession();
  const jwt = session?.user?.token || "";
  const baseUrl = configURL();
  const url = `${baseUrl}${path}`;

  const headers = {
    Accept: "application/json",
    ...(jwt && { Authorization: `Bearer ${jwt}` }),
    ...options?.headers,
    ...(options?.body && { "Content-Type": "application/json" }),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (response.status === 401) {
      await signOut();
      throw new HandleError({
        message: "Sessão expirada. Por favor, faça login novamente.",
        code: 401,
      });
    }

    if (response.status === 403) {
      throw new HandleError({
        message:
          "Você não tem permissão para acessar este recurso. Contate o administrador.",
        code: 403,
      });
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof HandleError) {
      throw new HandleError({
        message: error.message,
        status: error.status,
        code: error.code,
        timestamp: error.timestamp,
      });
    } else {
      throw new HandleError(error as Error);
    }
  }
}

export async function handleServerActionError(
  response: ApiResponse<unknown> | ApiResponseError
) {
  if (response.status === "error") {
    throw new HandleError(response);
  }
  return;
}
