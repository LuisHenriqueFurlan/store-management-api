export const routePaths = {
  login: "/",
  dashboard: "/dashboard",
  products: "/products",
  categories: "/categories",
  brands: "/brands",
  stock: "/stock",
  sales: "/sales",
  payments: "/payments",
} as const;

export type RoutePath = (typeof routePaths)[keyof typeof routePaths];
