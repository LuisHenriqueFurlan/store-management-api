import { User } from "../entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User |null>;

  create(data: {
    nome: string;
    email: string;
    senha_hash: string;
  }): Promise<User>;
}