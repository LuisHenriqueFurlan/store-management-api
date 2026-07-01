import { FastifyRequest, FastifyReply } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserService } from "../services/CreateUserService";
import { createUserSchema } from "../schemas/CreateUserSchema";


export class UserController {

  async create(request: FastifyRequest, reply: FastifyReply) {

    const data = createUserSchema.parse(request.body);

    const repository = new UserRepository();

    const service = new CreateUserService(
      repository
    );

    const user = await service.execute(
      data.nome,
      data.email,
      data.senha
    );

    return reply.status(201).send(user);
  }

}