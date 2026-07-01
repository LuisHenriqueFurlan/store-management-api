import bcrypt from "bcrypt";
import { IUserRepository } from "../interfaces/IUserRepository";
import jwt from "jsonwebtoken";

export class AuthenticateUserService {
  constructor(private userRepository: IUserRepository) {

  }

  async execute(email:string, senha: string){

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
        throw new Error("Email ou senha invalidos");
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaCorreta) {
        throw new Error("Email ou senha invalidos");
    }

    const token = jwt.sign(
    {
      nome: user.nome
    },
    process.env.JWT_SECRET as string,
    {
      subject: user.id,
      expiresIn: "1d"
    }
  );

    return {
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
      token
    };
  }
}

