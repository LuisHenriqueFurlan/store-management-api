import { BrandRepository } from "../repositories/BrandRepository";
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateBrandService } from "../services/CreateBrandService";
import { ListBrandService } from "../services/ListBrandsByIdService";
import { FindBrandByIdService } from "../services/FindBrandByIdService";
import { UpdateBrandService } from "../services/UpdateBrandService";
import { DeleteBrandService } from "../services/DeleteBrandService";
import { createBrandSchema } from "../schemas/CreateBrandSchema";
import { updateBrandSchema } from "../schemas/UpdateBrandSchema";
import { brandIdSchema } from "../schemas/BrandIdSchema";
import { da } from "zod/locales";



export class BrandController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = createBrandSchema.parse(request.body);

        const repository = new BrandRepository();
        const service = new CreateBrandService(repository);

        const brand = await service.execute(data.nome);

        return reply.status(201).send(brand);
        
    }

    async list(request: FastifyRequest, reply: FastifyReply) {

    const repository = new BrandRepository();
    const service = new ListBrandService(repository);

    const brands = await service.execute();

    return reply.send(brands);

    }

    async findById(request: FastifyRequest, reply: FastifyReply) {

    const { id } = brandIdSchema.parse(request.params);

    const repository = new BrandRepository();
    const service = new FindBrandByIdService(repository);

    const brand = await service.execute(id);

    return reply.send(brand);

    }

    async update(request: FastifyRequest, reply: FastifyReply) {

    const { id } = brandIdSchema.parse(request.params);

    const data = updateBrandSchema.parse(request.body);

    const repository = new BrandRepository();
    const service = new UpdateBrandService(repository);

    const brand = await service.execute(id, data.nome);

    return reply.send(brand);

    }

    async delete(request: FastifyRequest, reply: FastifyReply) {

    const { id } = brandIdSchema.parse(request.params);

    const repository = new BrandRepository();
    const service = new DeleteBrandService(repository);

    const result = await service.execute(id);

    return reply.send(result);
}

}