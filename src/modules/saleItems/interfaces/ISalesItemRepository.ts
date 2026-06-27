import { itens_venda } from "@prisma/client";

export interface ISaleItemRepository {
    findById(id: string): Promise<itens_venda | null>;

    findAll(): Promise<itens_venda[]>;

    create(
        venda_id: string,
        produto_variacao_id: string,
        quantidade: number,
        preco_unitario: number,
        desconto_percentual: number,
        subtotal: number
    ): Promise<itens_venda>;

    update(
        id: string,
        venda_id: string,
        produto_variacao_id: string,
        quantidade: number,
        preco_unitario: number,
        desconto_percentual: number,
        subtotal: number
    ): Promise<itens_venda>;

    delete(id: string): Promise<void>;

    findBySaleId(venda_id: string): Promise<itens_venda[]>;
    
}