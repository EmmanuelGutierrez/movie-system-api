import { roles } from "../constant/role.enum";

export interface UserToken {
  email: string;
  id: string;
  role: roles;
  iat: number;
  exp: number;
}
