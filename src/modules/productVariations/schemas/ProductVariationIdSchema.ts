import { z } from "zod";

export const productVariationIdSchema = z.object({
    id: z.uuid("ID inválido.")
});