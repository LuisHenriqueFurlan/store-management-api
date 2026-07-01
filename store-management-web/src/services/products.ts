import { api } from "./api";
import type { Product } from "../types/Product";

export async function getProducts(): Promise<Product[]> {
  const response = await api.get("/products");

  return response.data;
}

export async function createProduct() {}

export async function updateProduct() {}

export async function deleteProduct() {}