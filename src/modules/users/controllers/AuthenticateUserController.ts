import { FastifyRequest, FastifyReply } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { loginSchema } from "../schemas/LoginSchema";

export class AuthenticateUserController {

  async authenticate(request: FastifyRequest, reply: FastifyReply){
    const data = loginSchema.parse(request.body);

    const repository = new UserRepository();

    const service = new AuthenticateUserService(repository);

    const user = await service.execute(data.email, data.senha);

    return reply.send(user);

  }

}
