"use server";

import { fetchServer } from "@/api/server";
import { ApiResponse, ApiResponseError } from "@/api/types";
import { CreateUser, UpdateUser, User } from "./types";

export async function createUser(body: CreateUser) {
  try {
    return await fetchServer<ApiResponse<User>>("/users", {
      method: "POST",
      body,
    });
  } catch (error) {
    return error as ApiResponseError;
  }
}

export async function updateUser(id: string, body: UpdateUser) {
  try {
    return await fetchServer<ApiResponse<User>>(`/users/${id}`, {
      method: "PUT",
      body,
    });
  } catch (error) {
    return error as ApiResponseError;
  }
}

export async function deleteUser(id: string) {
  await fetchServer(`/users/${id}`, { method: "DELETE" });
}
