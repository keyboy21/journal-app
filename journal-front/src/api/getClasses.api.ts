import { BaseUrl } from "@/config/env.config";
import { Class } from "@/types";
import ky from "ky";

export const getClasses = async () => {

     const res = await ky.get(`${BaseUrl}/class`,{
          next: {
               tags: ['getClasses']
          }
     }).json<Class[]>();

     return res
}