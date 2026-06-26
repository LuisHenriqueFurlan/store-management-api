import { z } from "zod";

export const categoryIdSchema = z.object({
    id: z.uuid("ID inválido.")
});