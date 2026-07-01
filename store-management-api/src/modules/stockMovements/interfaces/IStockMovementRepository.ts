import { movimentacoes_estoque } from "@prisma/client";

export interface IStockMovementRepository {
    findById(id: string): Promise<movimentacoes_estoque | null>;

    findAll(): Promise<movimentacoes_estoque[]>;

    create(
        produto_variacao_id: string,
        usuario_id: string,
        tipo: string,
        quantidade: number,
        observacao?: string
    ): Promise<movimentacoes_estoque>;
}