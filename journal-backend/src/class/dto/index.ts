import z from 'zod';

export const createClassSchema = z.object({
     name: z.string(),
     classColor: z.string(),
});

export type createClassDto = z.infer<typeof createClassSchema>;