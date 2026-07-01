export interface Category {
  id: string;
  nome: string;
  created_at: string;
}

export interface Brand {
  id: string;
  nome: string;
  created_at: string;
}

export interface Product {
  id: string;
  categoria_id: string;
  marca_id: string;
  nome: string;
  descricao: string | null;
  preco: string | number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductVariation {
  id: string;
  produto_id: string;
  tamanho: string;
  quantidade_estoque: number;
  estoque_minimo: number;
  created_at: string;
}

export interface Sale {
  id: string;
  usuario_id: string;
  valor_bruto: string | number;
  valor_desconto: string | number;
  valor_final: string | number;
  status: "PENDENTE" | "FINALIZADA" | "CANCELADA" | string;
  created_at: string;
}

export interface SaleItem {
  id: string;
  venda_id: string;
  produto_variacao_id: string;
  quantidade: number;
  preco_unitario: string | number;
  desconto_percentual: string | number;
  subtotal: string | number;
}

export interface Payment {
  id: string;
  venda_id: string;
  forma_pagamento: "PIX" | "CARTAO" | "DINHEIRO" | string;
  valor: string | number;
  parcelas: number;
  created_at: string;
}

export interface StockMovement {
  id: string;
  produto_variacao_id: string;
  usuario_id: string;
  tipo: "ENTRADA" | "SAIDA" | "AJUSTE" | string;
  quantidade: number;
  observacao?: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  nome: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}
