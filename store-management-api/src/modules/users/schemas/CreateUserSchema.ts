import { z } from "zod";

export const createUserSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, "O nome deve possuir pelo menos 3 caracteres.")
        .max(150, "O nome deve possuir no máximo 150 caracteres."),

    email: z
        .email("E-mail inválido.")
        .trim()
        .toLowerCase(),

    senha: z
        .string()
        .min(6, "A senha deve possuir pelo menos 6 caracteres.")
        .max(100, "A senha deve possuir no máximo 100 caracteres.")
});