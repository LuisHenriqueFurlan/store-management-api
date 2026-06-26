import { z } from "zod";

export const paymentIdSchema = z.object({
    id: z.uuid("ID inválido.")
});