import { z } from "zod";

export const formSchema = z
    .object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        bullets: z.record(z.object({
            text: z.string(),
        }).optional()).optional(),
        keywords: z.array(z.string()).optional()
    })
    