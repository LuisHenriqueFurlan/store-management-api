import { storageKeys } from "../constants/storage";
import type { AuthUser } from "../types/auth";

export function getStoredToken() {
  return localStorage.getItem(storageKeys.token);
}

export function setStoredToken(token: string) {
  localStorage.setItem(storageKeys.token, token);
}

export function getStoredUser() {
  const storedUser = localStorage.getItem(storageKeys.user);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(storageKeys.user);
    return null;
  }
}

export function setStoredUser(user: AuthUser) {
  localStorage.setItem(storageKeys.user, JSON.stringify(user));
}

export function clearStoredSession() {
  localStorage.removeItem(storageKeys.token);
  localStorage.removeItem(storageKeys.user);
}
