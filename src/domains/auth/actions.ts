"use server";

import { fetchServer } from "@/api/server";
import { ApiResponse } from "@/api/types";
import { Auth } from "./types";

export interface Credentials {
  email: string;
  password: string;
}

export async function login(credentials: Credentials) {
  const body = { ...credentials, entity: "admin" };
  const response = await fetchServer<ApiResponse<Auth>>("/auth/login", {
    method: "POST",
    body,
  });
  return response?.data;
}
