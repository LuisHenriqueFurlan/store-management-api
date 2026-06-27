import { prisma } from "../../../shared/database/prisma";
import { itens_venda } from "@prisma/client";
import { ISaleItemRepository } from "../interfaces/ISalesItemRepository";

export class SaleItemRepository implements ISaleItemRepository {

    async findById(id: string): Promise<itens_venda | null> {
        const item = await prisma.itens_venda.findUnique({
            where: {
                id,
            },
        });

        return item;
    }

    async findAll(): Promise<itens_venda[]> {
        const items = await prisma.itens_venda.findMany();

        return items;
    }

    async create(venda_id: string,produto_variacao_id: string,quantidade: number,preco_unitario: number,desconto_percentual: number,subtotal: number): Promise<itens_venda> {

        const item = await prisma.itens_venda.create({
            data: {
                venda_id,
                produto_variacao_id,
                quantidade,
                preco_unitario,
                desconto_percentual,
                subtotal,
            },
        });

        return item;
    }

    async update(
        id: string,
        venda_id: string,
        produto_variacao_id: string,
        quantidade: number,
        preco_unitario: number,
        desconto_percentual: number,
        subtotal: number
    ): Promise<itens_venda> {

    const item = await prisma.itens_venda.update({
        where: {
            id,
        },
        data: {
            venda_id,
            produto_variacao_id,
            quantidade,
            preco_unitario,
            desconto_percentual,
            subtotal,
        },
    });

    return item;
}

    async delete(id: string): Promise<void> {
        await prisma.itens_venda.delete({
            where: {
                id,
            },
        });
    }

    async findBySaleId(venda_id: string): Promise<itens_venda[]> {

    return prisma.itens_venda.findMany({
        where: {
            venda_id,
        },
    });

}
}