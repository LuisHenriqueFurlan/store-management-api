import { z } from "zod";

export const brandIdSchema = z.object({
    id: z.uuid("ID inválido.")
});