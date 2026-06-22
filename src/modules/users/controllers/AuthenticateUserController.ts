import { FastifyRequest, FastifyReply } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthenticateUserController {

  async authenticate(request: FastifyRequest, reply: FastifyReply){
    const {email, senha } = request.body as {
        email: string;
        senha: string;
    };

    const repository = new UserRepository();

    const service = new AuthenticateUserService(repository);

    const user = await service.execute(email, senha);

    return reply.send(user);

  }

}
