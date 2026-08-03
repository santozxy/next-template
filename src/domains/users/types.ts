import { Role } from "@/domains/auth/enums";

export interface User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
}

export type UpdateUser = Partial<CreateUser>;
