import { FastifyReply, FastifyRequest } from "fastify";
import { SaleItemRepository } from "../repositories/SalesItemRepository";
import { CreateSaleItemService } from "../services/CreateSaleItemService";
import { ListSaleItemService } from "../services/ListSaleItemService";
import { FindSaleItemByIdService } from "../services/FindSaleItemByIdService";
import { UpdateSaleItemService } from "../services/UpdateSaleItemService";
import { DeleteSaleItemService } from "../services/DeleteSaleItemService";
import { createSaleItemSchema } from "../schemas/CreateSaleItemSchema";
import { updateSaleItemSchema } from "../schemas/UpdateSaleItemSchema";
import { saleItemIdSchema } from "../schemas/SaleItemIdSchema";



export class SaleItemController {

    async create(request: FastifyRequest, reply: FastifyReply) {

        const data = createSaleItemSchema.parse(request.body);

        const repository = new SaleItemRepository();
        const service = new CreateSaleItemService(repository);

        const item = await service.execute(
            data.venda_id,
            data.produto_variacao_id,
            data.quantidade,
            data.preco_unitario,
            data.desconto_percentual
        );

        return reply.status(201).send(item);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {

        const repository = new SaleItemRepository();
        const service = new ListSaleItemService(repository);

        const items = await service.execute();

        return reply.send(items);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {

        const { id } = saleItemIdSchema.parse(request.params);

        const repository = new SaleItemRepository();
        const service = new FindSaleItemByIdService(repository);

        const item = await service.execute(id);

        return reply.send(item);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {

        const { id } = saleItemIdSchema.parse(request.params);

        const data = updateSaleItemSchema.parse(request.body);

        const repository = new SaleItemRepository();
        const service = new UpdateSaleItemService(repository);

        const item = await service.execute(
            id,
            data.quantidade,
            data.preco_unitario,
            data.desconto_percentual
        );

        return reply.send(item);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {

        const { id } = saleItemIdSchema.parse(request.params);

        const repository = new SaleItemRepository();
        const service = new DeleteSaleItemService(repository);

        const result = await service.execute(id);

        return reply.send(result);
    }
}