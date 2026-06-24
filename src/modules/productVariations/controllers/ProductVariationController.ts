import { FastifyReply, FastifyRequest } from "fastify";
import { ProductVariationRepository } from "../repositories/ProductVariationRepository";
import { CreateProductVariationService } from "../services/CreateProductVariationService";
import { ListProductVariationsService } from "../services/ListProductVariationsService";
import { FindProductVariationByIdService } from "../services/FindProductVariationByIdService";
import { UpdateProductVariationService } from "../services/UpdateProductVariationService";
import { DeleteProductVariationService } from "../services/DeleteProductVariationService";


export class ProductVariationController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { produto_id, tamanho, quantidade_estoque, estoque_minimo } = request.body as {produto_id: string,tamanho: string,quantidade_estoque: number,estoque_minimo: number}
        
        const repository = new ProductVariationRepository();
        const service = new CreateProductVariationService(repository);

        const productVariation = await service.execute(produto_id, tamanho, quantidade_estoque, estoque_minimo);

        return reply.status(201).send(productVariation);

    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const repository = new ProductVariationRepository();
        const service = new ListProductVariationsService(repository);

        const variations = await service.execute();

        return reply.send(variations);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new ProductVariationRepository();
        const service = new FindProductVariationByIdService(repository);

        const variation = await service.execute(id);

        return reply.send(variation);
    }  


    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const {
            tamanho,
            quantidade_estoque,
            estoque_minimo
        } = request.body as {
            tamanho: string;
            quantidade_estoque: number;
            estoque_minimo: number;
        };

        const repository = new ProductVariationRepository();
        const service = new UpdateProductVariationService(repository);

        const variation = await service.execute(
            id,
            tamanho,
            quantidade_estoque,
            estoque_minimo
        );

        return reply.send(variation);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new ProductVariationRepository();
        const service = new DeleteProductVariationService(repository);

        const result = await service.execute(id);

        return reply.send(result);
    }


}