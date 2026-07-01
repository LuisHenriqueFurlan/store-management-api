import type { Payment, Product, ProductVariation, Sale } from "../../types/api";

const now = new Date();

function daysAgo(days: number) {
  const date = new Date(now);
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export const mockProducts: Product[] = [
  {
    id: "mock-prod-1",
    categoria_id: "mock-cat-1",
    marca_id: "mock-brand-1",
    nome: "Camiseta Premium",
    descricao: "Camiseta masculina algodao premium",
    preco: 89.9,
    ativo: true,
    created_at: daysAgo(14),
    updated_at: daysAgo(2),
  },
  {
    id: "mock-prod-2",
    categoria_id: "mock-cat-2",
    marca_id: "mock-brand-2",
    nome: "Calca Slim",
    descricao: "Calca masculina corte slim",
    preco: 179.9,
    ativo: true,
    created_at: daysAgo(18),
    updated_at: daysAgo(5),
  },
  {
    id: "mock-prod-3",
    categoria_id: "mock-cat-3",
    marca_id: "mock-brand-1",
    nome: "Jaqueta Casual",
    descricao: "Jaqueta casual masculina",
    preco: 249.9,
    ativo: true,
    created_at: daysAgo(20),
    updated_at: daysAgo(4),
  },
];

export const mockVariations: ProductVariation[] = [
  {
    id: "mock-var-1",
    produto_id: "mock-prod-1",
    tamanho: "M",
    quantidade_estoque: 4,
    estoque_minimo: 6,
    created_at: daysAgo(10),
  },
  {
    id: "mock-var-2",
    produto_id: "mock-prod-2",
    tamanho: "42",
    quantidade_estoque: 12,
    estoque_minimo: 5,
    created_at: daysAgo(8),
  },
  {
    id: "mock-var-3",
    produto_id: "mock-prod-3",
    tamanho: "G",
    quantidade_estoque: 2,
    estoque_minimo: 4,
    created_at: daysAgo(6),
  },
];

export const mockSales: Sale[] = [
  {
    id: "mock-sale-1",
    usuario_id: "mock-user",
    valor_bruto: 269.8,
    valor_desconto: 20,
    valor_final: 249.8,
    status: "FINALIZADA",
    created_at: daysAgo(0),
  },
  {
    id: "mock-sale-2",
    usuario_id: "mock-user",
    valor_bruto: 179.9,
    valor_desconto: 0,
    valor_final: 179.9,
    status: "PENDENTE",
    created_at: daysAgo(1),
  },
  {
    id: "mock-sale-3",
    usuario_id: "mock-user",
    valor_bruto: 429.8,
    valor_desconto: 30,
    valor_final: 399.8,
    status: "FINALIZADA",
    created_at: daysAgo(3),
  },
  {
    id: "mock-sale-4",
    usuario_id: "mock-user",
    valor_bruto: 89.9,
    valor_desconto: 0,
    valor_final: 89.9,
    status: "CANCELADA",
    created_at: daysAgo(5),
  },
];

export const mockPayments: Payment[] = [
  {
    id: "mock-pay-1",
    venda_id: "mock-sale-1",
    forma_pagamento: "PIX",
    valor: 249.8,
    parcelas: 1,
    created_at: daysAgo(0),
  },
  {
    id: "mock-pay-2",
    venda_id: "mock-sale-3",
    forma_pagamento: "CARTAO",
    valor: 399.8,
    parcelas: 3,
    created_at: daysAgo(3),
  },
  {
    id: "mock-pay-3",
    venda_id: "mock-sale-2",
    forma_pagamento: "DINHEIRO",
    valor: 179.9,
    parcelas: 1,
    created_at: daysAgo(1),
  },
];
