import { z } from "zod";

export const createStockMovementSchema = z.object({
    produto_variacao_id: z.uuid("Variação de produto inválida."),

    usuario_id: z.uuid("Usuário inválido."),

    tipo: z.enum(
        ["ENTRADA", "SAIDA", "AJUSTE"],
        {
            error: "Tipo de movimentação inválido."
        }
    ),

    quantidade: z
        .number()
        .int("A quantidade deve ser um número inteiro.")
        .positive("A quantidade deve ser maior que zero."),

    observacao: z
        .string()
        .trim()
        .max(255, "A observação deve possuir no máximo 255 caracteres.")
        .optional()
});