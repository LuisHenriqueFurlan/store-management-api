import { api } from "./api";
import type { LoginRequest, LoginResponse } from "../types/auth";

export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/sessions", data);

  return response.data;
}
