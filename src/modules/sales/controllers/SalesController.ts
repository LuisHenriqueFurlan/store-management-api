import { FastifyReply, FastifyRequest } from "fastify";
import { SalesRepository } from "../repositories/salesRepository";
import { CreateSaleService } from "../services/CreateSaleService";
import { ListSalesService } from "../services/ListSalesService";
import { FindSaleByIdService } from "../services/FindSaleByIdService";
import { createSaleSchema } from "../schemas/CreateSaleSchema";
import { saleIdSchema } from "../schemas/SaleIdSchema";
import { FinalizeSaleService } from "../services/FinalizeSaleService";
import { SaleItemRepository } from "../../saleItems/repositories/SalesItemRepository";


export class SalesController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = createSaleSchema.parse(request.body);

        const repository = new SalesRepository();
        const service = new CreateSaleService(repository);

        const venda = await service.execute(
          request.user.id,
        );

        return reply.status(201).send(venda);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        
        const repository = new SalesRepository;
        const service = new ListSalesService(repository);

        const listaVendas = await service.execute();

        return reply.send(listaVendas);  
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = saleIdSchema.parse(request.params);

        const repository = new SalesRepository();
        const service = new FindSaleByIdService(repository);

        const venda = await service.execute(id);

        return reply.send(venda);
    }

    async finalize(request: FastifyRequest, reply: FastifyReply) {

    const { id } = saleIdSchema.parse(request.params);

    const saleRepository = new SalesRepository();
    const saleItemRepository = new SaleItemRepository();

    const service = new FinalizeSaleService(
        saleRepository,
        saleItemRepository
    );

    const sale = await service.execute(id);

    return reply.send(sale);
}
}