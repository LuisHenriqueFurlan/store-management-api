import { z } from "zod";

export const updatePaymentSchema = z.object({
    forma_pagamento: z.enum(
        ["PIX", "CARTAO", "DINHEIRO"],
        {
            error: "Forma de pagamento inválida."
        }
    ),

    valor: z
        .number()
        .positive("O valor deve ser maior que zero."),

    parcelas: z
        .number()
        .int("As parcelas devem ser um número inteiro.")
        .min(1, "Deve haver pelo menos 1 parcela.")
        .max(12, "O máximo permitido é 12 parcelas.")
});