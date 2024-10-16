import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
});

export type LoginValues = z.infer<typeof loginSchema>;
