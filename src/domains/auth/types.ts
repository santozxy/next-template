import { User } from "../users/types";

export interface Auth {
  token: string;
  user: User;
}

export interface Credentials {
  email: string;
  password: string;
}
