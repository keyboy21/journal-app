import { z } from "zod";

export const createClassSchema = z.object({
     name: z.string(
          z
               .string()
               .min(3, "Name must be at least 3 characters")
               .max(50, "Name must be less than 50 characters")
     ),
     classColor: z.string(
          z
               .string()
               .min(3, "Name must be at least 3 characters")
               .max(50, "Name must be less than 50 characters")
     ),
})

export const createStudentSchema = z.object({
     name: z.string(
          z
               .string()
               .min(3, "Name must be at least 3 characters")
               .max(50, "Name must be less than 50 characters")
     ),
     surname: z.string(
          z
               .string()
               .min(3, "Surname must be at least 3 characters")
               .max(50, "Surname must be less than 50 characters")
     ),
     email: z.string().email(),
})

export const changeClassSchema = z.object({
     classId: z.number(),
     studentId: z.number(),
     classCode: z.string(),
})