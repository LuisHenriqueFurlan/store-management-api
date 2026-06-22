import { FastifyRequest, FastifyReply } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserService } from "../services/CreateUserService";

export class UserController {

  async create(request: FastifyRequest, reply: FastifyReply) {

    const { nome, email, senha_hash } = request.body as {
      nome: string;
      email: string;
      senha_hash: string;
    };

    const repository = new UserRepository();

    const service = new CreateUserService(
      repository
    );

    const user = await service.execute(
      nome,
      email,
      senha_hash
    );

    return reply.status(201).send(user);
  }

}