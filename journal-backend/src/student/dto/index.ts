import z from 'zod';

export const createStudentSchema = z.object({
     name: z.string(),
     surname: z.string(),
     email: z.string().email(),
});

export const changeClassSchema = z.object({
     classId: z.number(),
     studentId: z.number(),
     classCode: z.string(),
});

export type createStudentDto = z.infer<typeof createStudentSchema>;
export type changeClassDto = z.infer<typeof changeClassSchema>;