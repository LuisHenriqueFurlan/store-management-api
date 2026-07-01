import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  clearStoredSession,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
} from "../services/sessionStorage";
import type { AuthUser, LoginResponse } from "../types/auth";
import { AuthContext } from "./auth-context";
import type { AuthContextValue } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  const signIn = useCallback((session: LoginResponse) => {
    setStoredToken(session.token);
    setStoredUser(session.user);
    setToken(session.token);
    setUser(session.user);
  }, []);

  const signOut = useCallback(() => {
    clearStoredSession();
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      signOut();
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [signOut]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      signIn,
      signOut,
    }),
    [signIn, signOut, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
