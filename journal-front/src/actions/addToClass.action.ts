'use server'

import { BaseUrl } from "@/config/env.config";
import { changeClassSchema } from "@/schemas";
import ky from "ky";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const addToClass = async ({ classCode, studentId, classId }: z.infer<typeof changeClassSchema>) => {

     const res = await ky.post(`${BaseUrl}/students/add-to-class`, {
          json: {
               classCode,
               studentId,
               classId
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

