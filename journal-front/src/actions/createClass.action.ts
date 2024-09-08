'use server'

import { BaseUrl } from "@/config/env.config";
import { createClassSchema } from "@/schemas";
import ky from "ky";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const createClass = async ({ name, classColor }: z.infer<typeof createClassSchema>) => {

     const res = await ky.post(`${BaseUrl}/class/create`, {
          json: {
               name,
               classColor
          }
     })

     if (res.ok) {
          revalidateTag('getClasses')
          return {
               ok: res.ok
          }
     } else {
          return {
               ok: res.ok
          }
     }
}

