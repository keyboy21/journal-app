'use server'

import { BaseUrl } from "@/config/env.config";
import { changeClassSchema } from "@/schemas";
import ky from "ky";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const changeClass = async ({ classCode, studentId }: z.infer<typeof changeClassSchema>) => {

     const res = await ky.post(`${BaseUrl}/students/changeClass`, {
          json: {
               classCode,
               studentId
          }
     })

     if (res.ok) {
          revalidateTag('getClasses')
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

