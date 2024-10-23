import {z} from "zod";

export const cardUpdateSchema = z.object({
    amount: z
        .string()
        .refine((val) => !isNaN(parseFloat(val)), {
            message: "Debe ser un número válido",
        })
        .transform((val) => parseFloat(val))
        .refine((val) => val > 0, {
            message: "El monto debe ser mayor que 0",
        }),
});

export type CardUpdateValues = z.infer<typeof cardUpdateSchema>;
