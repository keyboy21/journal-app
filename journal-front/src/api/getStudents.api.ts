import { BaseUrl } from "@/config/env.config";
import { Student } from "@/types";
import ky from "ky";

export const getStudents = async (newStudents = true) => {
     const res = await ky.get(`${BaseUrl}/students?newStudents=${newStudents}`, {
          next: {
               tags: ['students']
          }
     }).json<Student[]>();

     return res

}