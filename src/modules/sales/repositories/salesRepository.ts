import { vendas } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";
import { ISalesRepository } from "../interfaces/ISaleRepository";

export class SalesRepository implements ISalesRepository {
    async findById(id: string): Promise<vendas | null> {
        const venda = await prisma.vendas.findUnique({
            where: {
                id,
            },
        });

        return venda;
    }

    async findAll(): Promise<vendas[]> {
        const vendas = await prisma.vendas.findMany();

        return vendas;
    }

    async create(usuario_id: string, status: string): Promise<vendas> {
        const venda = await prisma.vendas.create({
            data: {
                usuario_id,
                valor_bruto: 0,
                valor_desconto: 0,
                valor_final: 0,
                status,
            },
            
        });

        return venda;
    }

    async updateTotals(
    id: string,
    valor_bruto: number,
    valor_desconto: number,
    valor_final: number
) {

    return prisma.vendas.update({
        where: {
            id,
        },
        data: {
            valor_bruto,
            valor_desconto,
            valor_final,
        },
    });

}

async updateStatus(
    id: string,
    status: string
) {

    return prisma.vendas.update({
        where: {
            id
        },
        data: {
            status
        }
    });

}


}