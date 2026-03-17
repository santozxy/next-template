"use client";

import { fetchClient } from "@/api/client";
import { ApiResponse } from "@/api/types";
import { TagsType } from "./enums";
import { Tag } from "./types";

export async function getTags(categories?: TagsType[]) {
  const { data } = await fetchClient<ApiResponse<Tag[]>>(
    `/tags?categories=${categories}`
  );
  return data;
}
