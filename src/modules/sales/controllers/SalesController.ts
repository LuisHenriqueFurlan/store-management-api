import { FastifyReply, FastifyRequest } from "fastify";
import { SalesRepository } from "../repositories/salesRepository";
import { CreateSaleService } from "../services/CreateSaleService";
import { ListSalesService } from "../services/ListSalesService";
import { FindSaleByIdService } from "../services/FindSaleByIdService";


export class SalesController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { usuario_id,valor_bruto,valor_desconto,valor_final,status } = request.body as {
            usuario_id:string,
            valor_bruto:number,
            valor_desconto:number,
            valor_final:number,
            status:string,
        }

        const repository = new SalesRepository();
        const service = new CreateSaleService(repository);

        const venda = await service.execute(
            usuario_id,
            valor_bruto,
            valor_desconto,
            valor_final,
            status
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
        const { id } = request.params as { id:string };

        const repository = new SalesRepository();
        const service = new FindSaleByIdService(repository);

        const venda = await service.execute(id);

        return reply.send(venda);
    }
}