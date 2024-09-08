'use server'

import { BaseUrl } from "@/config/env.config";
import { z } from "zod";
import ky from "ky";
import { revalidateTag } from "next/cache";
import { createStudentSchema } from "@/schemas";

export const createUser = async ({ name, surname, email }: z.infer<typeof createStudentSchema>) => {

     const res = await ky.post(`${BaseUrl}/students`, {
          json: {
               name,
               surname,
               email
          }
     })

     if (res.ok) {
          revalidateTag('students')
          return {
               ok: res.ok
          }
     } else {
          return {
               ok: res.ok
          }
     }
}

