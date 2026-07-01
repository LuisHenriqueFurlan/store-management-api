export interface Product {
  id: string;
  categoria_id: string;
  marca_id: string;

  nome: string;
  descricao: string;

  preco: string;

  ativo: boolean;

  created_at: string;
  updated_at: string;
}