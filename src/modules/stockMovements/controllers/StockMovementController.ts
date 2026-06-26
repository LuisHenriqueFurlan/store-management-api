import { FastifyReply, FastifyRequest } from "fastify";
import { StockMovementRepository } from "../repositories/StockMovementRepository";
import { CreateStockMovementService } from "../services/CreateStockMovementService";
import { ListStockMovementsService } from "../services/ListStockMovementsService";
import { FindStockMovementByIdService } from "../services/FindStockMovementByIdService";
import { createStockMovementSchema } from "../schemas/CreateStockMovementSchema";
import { stockMovementIdSchema } from "../schemas/StockMovementIdSchema";



export class StockMovementController {

    async create(request: FastifyRequest, reply: FastifyReply) {

        const data = createStockMovementSchema.parse(request.body);

        const repository = new StockMovementRepository();
        const service = new CreateStockMovementService(repository);

        const movement = await service.execute(
            data.produto_variacao_id,
            request.user.id,
            data.tipo,
            data.quantidade,
            data.observacao
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

        const { id } = stockMovementIdSchema.parse(request.params);

        const repository = new StockMovementRepository();
        const service = new FindStockMovementByIdService(repository);

        const movement = await service.execute(id);

        return reply.send(movement);
    }

}