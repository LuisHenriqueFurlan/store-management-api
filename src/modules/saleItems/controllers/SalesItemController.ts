import { FastifyReply, FastifyRequest } from "fastify";
import { SaleItemRepository } from "../repositories/SalesItemRepository";
import { CreateSaleItemService } from "../services/CreateSaleItemService";
import { ListSaleItemService } from "../services/ListSaleItemService";
import { FindSaleItemByIdService } from "../services/FindSaleItemByIdService";
import { UpdateSaleItemService } from "../services/UpdateSaleItemService";
import { DeleteSaleItemService } from "../services/DeleteSaleItemService";

export class SaleItemController {

    async create(request: FastifyRequest, reply: FastifyReply) {

        const {
            venda_id,
            produto_variacao_id,
            quantidade,
            preco_unitario,
            desconto_percentual
        } = request.body as {
            venda_id: string;
            produto_variacao_id: string;
            quantidade: number;
            preco_unitario: number;
            desconto_percentual: number;
        };

        const repository = new SaleItemRepository();
        const service = new CreateSaleItemService(repository);

        const item = await service.execute(
            venda_id,
            produto_variacao_id,
            quantidade,
            preco_unitario,
            desconto_percentual
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

        const { id } = request.params as { id: string };

        const repository = new SaleItemRepository();
        const service = new FindSaleItemByIdService(repository);

        const item = await service.execute(id);

        return reply.send(item);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as { id: string };

        const {
            quantidade,
            preco_unitario,
            desconto_percentual
        } = request.body as {
            quantidade: number;
            preco_unitario: number;
            desconto_percentual: number;
        };

        const repository = new SaleItemRepository();
        const service = new UpdateSaleItemService(repository);

        const item = await service.execute(
            id,
            quantidade,
            preco_unitario,
            desconto_percentual
        );

        return reply.send(item);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as { id: string };

        const repository = new SaleItemRepository();
        const service = new DeleteSaleItemService(repository);

        const result = await service.execute(id);

        return reply.send(result);
    }
}