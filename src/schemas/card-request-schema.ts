import {z} from "zod";

export const cardRequestSchema = z.object({
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    dni: z.string().length(8),
    cellphone: z.string(),
    street: z.string(),
});

export type CardRequestValues = z.infer<typeof cardRequestSchema>;
