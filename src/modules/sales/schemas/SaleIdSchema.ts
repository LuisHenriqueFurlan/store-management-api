import { z } from "zod";

export const saleIdSchema = z.object({
    id: z.uuid("ID inválido.")
});