import { FastifyRequest, FastifyReply } from "fastify";
import { ProductRepository } from "../repositories/ProductRepository";
import { CreateProductService } from "../services/CreateProductService";
import { ListProductsService } from "../services/ListProductsService";
import { FindProductByIdService } from "../services/FindProductByIdService";
import { DeleteProductService } from "../services/DeleteProductService";
import { UpdateProductService } from "../services/UpdateProductService";
import { createProductSchema } from "../schemas/CreateProductSchema";
import { updateProductSchema } from "../schemas/UpdateProductSchema";
import { productIdSchema } from "../schemas/ProductIdSchema";




export class ProductController {

    async create(request: FastifyRequest, reply: FastifyReply) {

        const data = createProductSchema.parse(request.body);
        
        const repository = new ProductRepository();
        const service = new CreateProductService(repository);

        const product = await service.execute(
            data.nome,
            data.descricao,
            data.preco,
            data.categoria_id,
            data.marca_id
        );

        return reply.status(201).send(product);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        console.log(request.user);

        const repository = new ProductRepository();
        const service = new ListProductsService(repository);

        const products = await service.execute();

        return reply.send(products);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {
        
        const { id } = productIdSchema.parse(request.params);        

        const repository = new ProductRepository();
        const service = new FindProductByIdService(repository);

        const product = await service.execute(id);

        return reply.send(product);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = productIdSchema.parse(request.params);

        const repository = new ProductRepository();
        const service = new DeleteProductService(repository);

        const result = await service.execute(id);

        return reply.send(result);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = productIdSchema.parse(request.params);

        const data = updateProductSchema.parse(request.body);

        const repository = new ProductRepository();
        const service = new UpdateProductService(repository);

        const product = await service.execute(
            id,
            data.nome,
            data.descricao,
            data.preco,
            data.categoria_id,
            data.marca_id    
        );  

        return reply.send(product);
    }
}

