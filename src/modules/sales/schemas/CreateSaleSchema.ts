import { z } from "zod";

export const createSaleSchema = z.object({
    

    valor_bruto: z
        .number()
        .min(0, "O valor bruto não pode ser negativo."),

    valor_desconto: z
        .number()
        .min(0, "O desconto não pode ser negativo."),

    valor_final: z
        .number()
        .min(0, "O valor final não pode ser negativo."),

    status: z.enum(
        ["PENDENTE", "FINALIZADA", "CANCELADA"],
        {
            error: "Status inválido."
        }
    )
});