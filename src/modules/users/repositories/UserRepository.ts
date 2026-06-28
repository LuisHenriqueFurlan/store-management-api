import { prisma } from "../../../shared/database/prisma";
import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {

  async findByEmail(email: string): Promise<User | null> {
    return prisma.usuarios.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.usuarios.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: {
    nome: string;
    email: string;
    senha_hash: string;
  }): Promise<User> {
    return prisma.usuarios.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha_hash: data.senha_hash,
      },
    });
  }
}