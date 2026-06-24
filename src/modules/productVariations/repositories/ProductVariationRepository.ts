import { produto_variacoes } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";
import { IProductVariationRepository } from "../interfaces/IProductVariationRepository";

export class ProductVariationRepository implements IProductVariationRepository {
    async findById(id: string): Promise<produto_variacoes | null> {
        const produto = await prisma.produto_variacoes.findUnique({
            where: {
                id,
            },
        });

        return produto;
    }

    async findAll(): Promise<produto_variacoes[]> {
        const produtos = await prisma.produto_variacoes.findMany();

        return produtos;
    }

    async findByProductAndSize(produto_id: string, tamanho: string): Promise<produto_variacoes | null> {
        const produto = await prisma.produto_variacoes.findFirst({
            where: {
                produto_id,
                tamanho,
            },
        });

        return produto;
    }
    
    async create(produto_id: string, tamanho: string, quantidade_estoque: number, estoque_minimo: number): Promise<produto_variacoes> {
        const produto = await prisma.produto_variacoes.create({
            data: {
                produto_id,
                tamanho,
                quantidade_estoque,
                estoque_minimo,
            },
        });

        return produto;
    }

    async update(id: string, tamanho: string, quantidade_estoque: number, estoque_minimo: number): Promise<produto_variacoes> {
        const produtoAtualizado = await prisma.produto_variacoes.update({
            where: {
                id,
            },
            data: {
                tamanho,
                quantidade_estoque,
                estoque_minimo,
            },
        });

        return produtoAtualizado;
    }

    async delete(id: string): Promise<void> {
        await prisma.produto_variacoes.delete({
            where: {
                id,
            },
        });

    }    
}
