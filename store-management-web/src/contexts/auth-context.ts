import { createContext } from "react";

import type { AuthUser, LoginResponse } from "../types/auth";

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  signIn: (session: LoginResponse) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
