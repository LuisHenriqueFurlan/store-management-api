import { IUserRepository } from "../interfaces/IUserRepository";

export class GetProfileService {
  constructor(
    private repository: IUserRepository
  ) {}

  async execute(userId: string) {

    const user = await this.repository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  }
}