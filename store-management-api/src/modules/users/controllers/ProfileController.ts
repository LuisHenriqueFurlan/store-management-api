import { FastifyReply, FastifyRequest } from "fastify";

import { UserRepository } from "../repositories/UserRepository";
import { GetProfileService } from "../services/GetProfileService";

export class ProfileController {

  async show(
    request: FastifyRequest,
    reply: FastifyReply
  ) {

    const repository = new UserRepository();

    const service = new GetProfileService(repository);

    const user = await service.execute(request.user.id);

    return reply.send(user);

  }

}