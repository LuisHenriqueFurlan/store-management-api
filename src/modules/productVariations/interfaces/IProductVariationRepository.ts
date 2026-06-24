import { produto_variacoes } from "@prisma/client";

export interface IProductVariationRepository {
    findById(id: string): Promise<produto_variacoes | null>;

    findAll(): Promise<produto_variacoes[]>;

    create(
           produto_id: string,
           tamanho: string,
           quantidade_estoque: number,
           estoque_minimo: number
    ): Promise<produto_variacoes>;

    update(
        id: string,
        tamanho: string,
        quantidade_estoque: number,
        estoque_minimo: number
    ): Promise<produto_variacoes>;

    delete(id:string): Promise<void>;

    findByProductAndSize(
        produto_id: string,
        tamanho: string
    ): Promise<produto_variacoes | null>;
    
}
