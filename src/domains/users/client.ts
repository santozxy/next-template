"use client";
import { fetchClient } from "@/api/client";
import { ApiResponsePaginated, PaginationParams } from "@/api/types";
import { encodeQueryString } from "@/utils/queries";
import { User } from "./types";

export async function getUsers({ page = 1, limit = 10 }: PaginationParams) {
  const params = encodeQueryString({ page, perPage: limit });
  const data = await fetchClient<ApiResponsePaginated<User[]>>(
    `/users${params}`
  );
  return data;
}
