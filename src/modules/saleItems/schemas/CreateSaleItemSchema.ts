import { z } from "zod";

export const createSaleItemSchema = z.object({
    venda_id: z.uuid("Venda inválida."),

    produto_variacao_id: z.uuid("Variação de produto inválida."),

    quantidade: z
        .number()
        .int("A quantidade deve ser um número inteiro.")
        .min(1, "A quantidade deve ser maior que zero."),

    preco_unitario: z
        .number()
        .positive("O preço unitário deve ser maior que zero."),

    desconto_percentual: z
        .number()
        .min(0, "O desconto não pode ser negativo.")
        .max(100, "O desconto não pode ser maior que 100%.")
});