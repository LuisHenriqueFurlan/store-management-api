import { api } from "./api";
import type {
  Brand,
  Category,
  Payment,
  Profile,
  Product,
  ProductVariation,
  Sale,
  SaleItem,
  StockMovement,
} from "../types/api";

export interface ProductPayload {
  nome: string;
  descricao: string;
  preco: number;
  categoria_id: string;
  marca_id: string;
}

export interface VariationPayload {
  produto_id: string;
  tamanho: string;
  quantidade_estoque: number;
  estoque_minimo: number;
}

export interface SaleItemPayload {
  venda_id: string;
  produto_variacao_id: string;
  quantidade: number;
  desconto_percentual: number;
}

export interface PaymentPayload {
  venda_id: string;
  forma_pagamento: "PIX" | "CARTAO" | "DINHEIRO";
  valor: number;
  parcelas: number;
}

export interface StockMovementPayload {
  produto_variacao_id: string;
  tipo: "ENTRADA" | "SAIDA" | "AJUSTE";
  quantidade: number;
  observacao?: string;
}

async function getData<T>(path: string) {
  const response = await api.get<T>(path);
  return response.data;
}

async function postData<T, TPayload>(path: string, payload: TPayload) {
  const response = await api.post<T>(path, payload);
  return response.data;
}

export const storeApi = {
  profile: () => getData<Profile>("/profile"),

  categories: () => getData<Category[]>("/categories"),
  createCategory: (nome: string) => postData<Category, { nome: string }>("/categories", { nome }),
  updateCategory: (id: string, nome: string) => api.put<Category>(`/categories/${id}`, { nome }),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),

  brands: () => getData<Brand[]>("/brands"),
  createBrand: (nome: string) => postData<Brand, { nome: string }>("/brands", { nome }),
  updateBrand: (id: string, nome: string) => api.put<Brand>(`/brands/${id}`, { nome }),
  deleteBrand: (id: string) => api.delete(`/brands/${id}`),

  products: () => getData<Product[]>("/products"),
  createProduct: (payload: ProductPayload) => postData<Product, ProductPayload>("/products", payload),
  updateProduct: (id: string, payload: ProductPayload) => api.put<Product>(`/products/${id}`, payload),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),

  variations: () => getData<ProductVariation[]>("/variations"),
  createVariation: (payload: VariationPayload) =>
    postData<ProductVariation, VariationPayload>("/variations", payload),
  updateVariation: (id: string, payload: Omit<VariationPayload, "produto_id">) =>
    api.put<ProductVariation>(`/variations/${id}`, payload),
  deleteVariation: (id: string) => api.delete(`/variations/${id}`),

  sales: () => getData<Sale[]>("/sales"),
  createSale: () => postData<Sale, Record<string, never>>("/sales", {}),
  finalizeSale: (id: string) => api.patch<Sale>(`/sales/${id}/finalize`),
  cancelSale: (id: string) => api.patch<Sale>(`/sales/${id}/cancel`),

  saleItems: () => getData<SaleItem[]>("/sale-items"),
  createSaleItem: (payload: SaleItemPayload) =>
    postData<SaleItem, SaleItemPayload>("/sale-items", payload),
  updateSaleItem: (id: string, payload: Pick<SaleItemPayload, "quantidade" | "desconto_percentual">) =>
    api.patch<SaleItem>(`/sale-items/${id}`, payload),
  deleteSaleItem: (id: string) => api.delete(`/sale-items/${id}`),

  payments: () => getData<Payment[]>("/payments"),
  createPayment: (payload: PaymentPayload) => postData<Payment, PaymentPayload>("/payments", payload),
  updatePayment: (id: string, payload: Omit<PaymentPayload, "venda_id">) =>
    api.put<Payment>(`/payments/${id}`, payload),
  deletePayment: (id: string) => api.delete(`/payments/${id}`),

  stockMovements: () => getData<StockMovement[]>("/stock-movements"),
  createStockMovement: (payload: StockMovementPayload) =>
    postData<StockMovement, StockMovementPayload>("/stock-movements", payload),
};
