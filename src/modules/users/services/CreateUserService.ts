import { IUserRepository } from "../interfaces/IUserRepository";

export class CreateUserService {

  constructor(private userRepository: IUserRepository) {

  }

  async execute(nome:string, email:string, senha_hash:string) {

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error("Usuário já existe");
    }

    const user = await this.userRepository.create({
        nome,
        email,
        senha_hash,
      });

    return user;
  }

}