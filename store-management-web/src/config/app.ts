export const appConfig = {
  name: "Jota Store",
  description: "Moda Masculina",
  apiBaseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3333",
} as const;
