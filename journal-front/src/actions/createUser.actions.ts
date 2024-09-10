'use server'

import { BaseUrl } from "@/config/env.config";
import { z } from "zod";
import ky from "ky";
import { createStudentSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const createStudent = async ({ name, surname, email }: z.infer<typeof createStudentSchema>) => {
     const res = await ky.post(`${BaseUrl}/students`, {
          json: {
               name,
               surname,
               email
          }
     })

     revalidatePath('/', 'page')
     
     return {
          ok: res.ok
     }


}

