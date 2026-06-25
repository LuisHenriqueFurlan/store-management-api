import { movimentacoes_estoque } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";
import { IStockMovementRepository } from "../interfaces/IStockMovementRepository";

export class StockMovementRepository implements IStockMovementRepository {

    async findById(id: string): Promise<movimentacoes_estoque | null> {
        const movement = await prisma.movimentacoes_estoque.findUnique({
            where: {
                id,
            },
        });

        return movement;
    }

    async findAll(): Promise<movimentacoes_estoque[]> {
        const movements = await prisma.movimentacoes_estoque.findMany();

        return movements;
    }

    async create(
        produto_variacao_id: string,
        usuario_id: string,
        tipo: string,
        quantidade: number,
        observacao?: string
    ): Promise<movimentacoes_estoque> {

        const movement = await prisma.movimentacoes_estoque.create({
            data: {
                produto_variacao_id,
                usuario_id,
                tipo,
                quantidade,
                observacao,
            },
        });

        return movement;
    }

}