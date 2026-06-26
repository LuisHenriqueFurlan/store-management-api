import { FastifyReply, FastifyRequest } from "fastify";
import { SalesRepository } from "../repositories/salesRepository";
import { CreateSaleService } from "../services/CreateSaleService";
import { ListSalesService } from "../services/ListSalesService";
import { FindSaleByIdService } from "../services/FindSaleByIdService";
import { createSaleSchema } from "../schemas/CreateSaleSchema";
import { saleIdSchema } from "../schemas/SaleIdSchema";

export class SalesController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = createSaleSchema.parse(request.body);

        const repository = new SalesRepository();
        const service = new CreateSaleService(repository);

        const venda = await service.execute(
          request.user.id,
          data.valor_bruto,
          data.valor_desconto,
          data.valor_final,
          data.status
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
}