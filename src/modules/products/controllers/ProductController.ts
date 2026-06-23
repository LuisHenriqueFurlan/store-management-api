import { FastifyRequest, FastifyReply } from "fastify";
import { ProductRepository } from "../repositories/ProductRepository";
import { CreateProductService } from "../services/CreateProductService";
import { ListProductsService } from "../services/ListProductsService";
import { FindProductByIdService } from "../services/FindProductByIdService";
import { DeleteProductService } from "../services/DeleteProductService";
import { UpdateProductService } from "../services/UpdateProductService";

export class ProductController {

    async create(request: FastifyRequest, reply: FastifyReply) {

        const { nome, descricao, preco, categoria_id, marca_id } = request.body as
        { nome: string; descricao: string | null; preco: number; categoria_id: string; marca_id: string;};
        
        const repository = new ProductRepository();
        const service = new CreateProductService(repository);

        const product = await service.execute( nome, descricao, preco, categoria_id, marca_id);

        return reply.status(201).send(product);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {

        const repository = new ProductRepository();
        const service = new ListProductsService(repository);

        const products = await service.execute();

        return reply.send(products);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new ProductRepository();
        const service = new FindProductByIdService(repository);

        const product = await service.execute(id);

        return reply.send(product);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string; };

        const repository = new ProductRepository();
        const service = new DeleteProductService(repository);

        const result = await service.execute(id);

        return reply.send(result);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string; };

        const {
            nome,
            descricao,
            preco,
            categoria_id,
            marca_id,
        } = request.body as {
            nome: string;
            descricao: string | null,
            preco: number;
            categoria_id: string;
            marca_id: string;
        };

        const repository = new ProductRepository();
        const service = new UpdateProductService(repository);

        const product = await service.execute(
            id,
            nome,
            descricao,
            preco,
            categoria_id,
            marca_id
        );  

        return reply.send(product);
    }
}

