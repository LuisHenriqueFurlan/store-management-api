import { z } from "zod";

export const saleItemIdSchema = z.object({
    id: z.uuid("ID inválido.")
});