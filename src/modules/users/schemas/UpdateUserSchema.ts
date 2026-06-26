import { z } from "zod";

export const updateUserSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3)
        .max(150),

    email: z
        .email("E-mail inválido.")
        .trim()
        .toLowerCase()
});