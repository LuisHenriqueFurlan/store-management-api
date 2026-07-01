import axios from "axios";

import { appConfig } from "../config/app";
import { clearStoredSession, getStoredToken } from "./sessionStorage";

export const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearStoredSession();
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    return Promise.reject(error);
  },
);
