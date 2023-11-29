import { z } from "zod";

export const formSchema = z
    .object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        bullets: z.array(z.string()).optional(),
        keywords: z.array(z.string()).optional()
    })
