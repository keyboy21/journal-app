'use server'

import { BaseUrl } from "@/config/env.config";
import { createClassSchema } from "@/schemas";
import ky from "ky";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createClass = async ({ name, classColor }: z.infer<typeof createClassSchema>) => {

     const res = await ky.post(`${BaseUrl}/class/create`, {
          json: {
               name,
               classColor
          }
     })
     
     revalidatePath('/', 'page')

     return {
          ok: res.ok
     }
}

