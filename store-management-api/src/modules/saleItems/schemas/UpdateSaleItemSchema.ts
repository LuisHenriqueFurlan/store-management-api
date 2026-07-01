import { z } from "zod";

export const updateSaleItemSchema = z.object({
    quantidade: z
        .number()
        .int("A quantidade deve ser um número inteiro.")
        .min(1, "A quantidade deve ser maior que zero."),

    desconto_percentual: z
        .number()
        .min(0, "O desconto não pode ser negativo.")
        .max(100, "O desconto não pode ser maior que 100%."),
});