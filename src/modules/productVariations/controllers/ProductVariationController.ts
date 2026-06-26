import { FastifyReply, FastifyRequest } from "fastify";
import { ProductVariationRepository } from "../repositories/ProductVariationRepository";
import { CreateProductVariationService } from "../services/CreateProductVariationService";
import { ListProductVariationsService } from "../services/ListProductVariationsService";
import { FindProductVariationByIdService } from "../services/FindProductVariationByIdService";
import { UpdateProductVariationService } from "../services/UpdateProductVariationService";
import { DeleteProductVariationService } from "../services/DeleteProductVariationService";
import { createProductVariationSchema } from "../schemas/CreateProductVariationSchema";
import { updateProductVariationSchema } from "../schemas/UpdateProductVariationSchema";
import { productVariationIdSchema } from "../schemas/ProductVariationIdSchema";


export class ProductVariationController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = createProductVariationSchema.parse(request.body);
        
        const repository = new ProductVariationRepository();
        const service = new CreateProductVariationService(repository);

        const productVariation = await service.execute(
            data.produto_id,
            data.tamanho,
            data.quantidade_estoque,
            data.estoque_minimo
            
        );

        return reply.status(201).send(productVariation);

    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const repository = new ProductVariationRepository();
        const service = new ListProductVariationsService(repository);

        const variations = await service.execute();

        return reply.send(variations);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = productVariationIdSchema.parse(request.params);

        const repository = new ProductVariationRepository();
        const service = new FindProductVariationByIdService(repository);

        const variation = await service.execute(id);

        return reply.send(variation);
    }  


    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = productVariationIdSchema.parse(request.params);
        const data = updateProductVariationSchema.parse(request.body);

        const repository = new ProductVariationRepository();
        const service = new UpdateProductVariationService(repository);

        const variation = await service.execute(
            id,
            data.tamanho,
            data.quantidade_estoque,
            data.estoque_minimo
        );

        return reply.send(variation);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = productVariationIdSchema.parse(request.params);

        const repository = new ProductVariationRepository();
        const service = new DeleteProductVariationService(repository);

        const result = await service.execute(id);

        return reply.send(result);
    }


}