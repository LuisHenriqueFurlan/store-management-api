import { z } from "zod";

export const updateCategorySchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, "O nome deve possuir pelo menos 3 caracteres.")
});