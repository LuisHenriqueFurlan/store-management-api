import { z } from "zod";

export const stockMovementIdSchema = z.object({
    id: z.uuid("ID inválido.")
});