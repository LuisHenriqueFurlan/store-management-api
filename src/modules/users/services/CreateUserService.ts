import { IUserRepository } from "../interfaces/IUserRepository";
import bcrypt from "bcrypt";

export class CreateUserService {

  constructor(private userRepository: IUserRepository) {

  }

  async execute(nome:string, email:string, senha_hash:string) {

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error("Usuário já existe");
    }

    const senhaHash = await bcrypt.hash(senha_hash, 10);

    const user = await this.userRepository.create({
        nome,
        email,
        senha_hash: senhaHash,
      });

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  }

}