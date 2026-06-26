import { z } from "zod";

export const createProductVariationSchema = z.object({
    produto_id: z.uuid("Produto inválido."),

    tamanho: z
        .string()
        .trim()
        .min(1, "Informe o tamanho.")
        .max(10, "O tamanho deve possuir no máximo 10 caracteres."),

    quantidade_estoque: z
        .number()
        .int("A quantidade deve ser um número inteiro.")
        .min(0, "A quantidade não pode ser negativa."),

    estoque_minimo: z
        .number()
        .int("O estoque mínimo deve ser um número inteiro.")
        .min(0, "O estoque mínimo não pode ser negativo.")
});