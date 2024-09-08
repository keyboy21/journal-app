import { getClasses } from "@/api/getClasses.api"
import { getStudents } from "@/api/getStudents.api"
import { MultipleContainer } from "./MultipleContainer"

export const getTable = async () => {
     const [students, classes] = await Promise.all(
          [getStudents({ newStudents: true }), getClasses()]
     )

     if (!students || !classes) {
          return {
               students: [],
               classes: []
          }
     }

     return {
          students,
          classes
     }
}

export const Table = async () => {

     const { students, classes } = await getTable()

     return (<MultipleContainer classes={classes} newStudents={students} />)
}