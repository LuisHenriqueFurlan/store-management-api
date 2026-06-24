import { BrandRepository } from "../repositories/BrandRepository";
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateBrandService } from "../services/CreateBrandService";
import { ListBrandService } from "../services/ListBrandsByIdService";
import { FindBrandByIdService } from "../services/FindBrandByIdService";
import { UpdateBrandService } from "../services/UpdateBrandService";
import { DeleteBrandService } from "../services/DeleteBrandService";


export class BrandController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { nome } = request.body as { nome:string; };

        const repository = new BrandRepository();
        const service = new CreateBrandService(repository);

        const brand = await service.execute(nome);

        return reply.status(201).send(brand);
        
    }

    async list(request: FastifyRequest, reply: FastifyReply) {

    const repository = new BrandRepository();
    const service = new ListBrandService(repository);

    const brands = await service.execute();

    return reply.send(brands);

    }

    async findById(request: FastifyRequest, reply: FastifyReply) {

    const { id } = request.params as {id: string;};

    const repository = new BrandRepository();
    const service = new FindBrandByIdService(repository);

    const brand = await service.execute(id);

    return reply.send(brand);

    }

    async update(request: FastifyRequest, reply: FastifyReply) {

    const { id } = request.params as {id: string;};

    const { nome } = request.body as {nome: string;};

    const repository = new BrandRepository();
    const service = new UpdateBrandService(repository);

    const brand = await service.execute(id, nome);

    return reply.send(brand);

    }

    async delete(request: FastifyRequest, reply: FastifyReply) {

    const { id } = request.params as {id: string;};

    const repository = new BrandRepository();
    const service = new DeleteBrandService(repository);

    const result = await service.execute(id);

    return reply.send(result);
}

}