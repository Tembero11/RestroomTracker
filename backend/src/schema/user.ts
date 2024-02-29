import { z } from "zod";

export const patchSchema = {
    body: z.object({
        username: z.string().min(2).max(32),
    }),
}