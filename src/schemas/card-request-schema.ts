import {z} from "zod";

export const cardRequestSchema = z.object({
    email: z.string().min(1).email(),
    first_name: z.string().min(1, "El nombre es requerido"),
    last_name: z.string().min(1, "El apellido es requerido"),
    dni: z.string().length(8, "El formato DNI no es válido").min(1, "El DNI es requerido"),
    cellphone: z.string(),
    street: z.string(),
});

export type CardRequestValues = z.infer<typeof cardRequestSchema>;
