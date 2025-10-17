import z from "zod";

export const fitrosSchema = z.object({
  nome: z.string().optional(),
  autor: z.string().optional(),
});

export type filtrosDTO = z.infer<typeof fitrosSchema>;
