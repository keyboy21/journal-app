import { BaseUrl } from "@/config/env.config";
import { Class } from "@/types";
import ky from "ky";

export const getClasses = async () => {

     const res = await ky.get(`${BaseUrl}/class`,{
          cache: 'no-store',
     }).json<Class[]>();

     return res
}