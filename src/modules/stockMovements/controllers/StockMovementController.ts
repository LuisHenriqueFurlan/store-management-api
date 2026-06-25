import { FastifyReply, FastifyRequest } from "fastify";

import { StockMovementRepository } from "../repositories/StockMovementRepository";

import { CreateStockMovementService } from "../services/CreateStockMovementService";
import { ListStockMovementsService } from "../services/ListStockMovementsService";
import { FindStockMovementByIdService } from "../services/FindStockMovementByIdService";

export class StockMovementController {

    async create(request: FastifyRequest, reply: FastifyReply) {

        const {
            produto_variacao_id,
            usuario_id,
            tipo,
            quantidade,
            observacao,
        } = request.body as {
            produto_variacao_id: string;
            usuario_id: string;
            tipo: string;
            quantidade: number;
            observacao?: string;
        };

        const repository = new StockMovementRepository();
        const service = new CreateStockMovementService(repository);

        const movement = await service.execute(
            produto_variacao_id,
            usuario_id,
            tipo,
            quantidade,
            observacao
        );

        return reply.status(201).send(movement);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {

        const repository = new StockMovementRepository();
        const service = new ListStockMovementsService(repository);

        const movements = await service.execute();

        return reply.send(movements);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as { id: string };

        const repository = new StockMovementRepository();
        const service = new FindStockMovementByIdService(repository);

        const movement = await service.execute(id);

        return reply.send(movement);
    }

}