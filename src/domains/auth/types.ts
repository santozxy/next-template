// import { Permission } from "./enums";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // permissions: Permission[];
}

export interface UserDetails extends User {
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface Auth {
  token: string;
  user: User;
}
