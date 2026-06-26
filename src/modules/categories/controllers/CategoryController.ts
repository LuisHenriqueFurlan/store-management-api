import { FastifyRequest, FastifyReply } from "fastify";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";
import { ListCategoriesService } from "../services/ListCategoriesService";
import { DeleteCategoryService } from "../services/DeleteCategoryService";
import { FindCategoryByIdService } from "../services/FindCategoryByIdService";
import { createCategorySchema } from "../schemas/CreateCategorySchema";
import { categoryIdSchema } from "../schemas/CategoryIdSchema";


export class CategoryController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = createCategorySchema.parse(request.body);

        const repository = new CategoryRepository();
        const service = new CreateCategoryService(repository);

        const category = await service.execute(data.nome);

        return reply.status(201).send(category);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {

        const repository = new CategoryRepository();
        const service = new ListCategoriesService(repository);

        const categories = await service.execute()

        return reply.send(categories);
    }

    async delete(request: FastifyRequest, reply:FastifyReply) {
        const { id } = categoryIdSchema.parse(request.params);

        const repository = new CategoryRepository();
        const service = new DeleteCategoryService(repository);

        const result = await service.execute(id);

        return reply.send(result);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = categoryIdSchema.parse(request.params);

        const repository = new CategoryRepository();
        const service = new FindCategoryByIdService(repository);

        const category = await service.execute(id);

        return reply.send(category);
    }
}