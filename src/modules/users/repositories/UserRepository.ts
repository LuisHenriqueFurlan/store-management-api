import { prisma } from "../../../shared/database/prisma";
import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {

  async findByEmail(email: string): Promise<User | null> {

    const user = await prisma.usuarios.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: {nome:string; email:string; senha_hash:string;}): Promise<User> {

    const user = await prisma.usuarios.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha_hash: data.senha_hash,
      },
    });

    return user;
  }

}