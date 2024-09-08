export interface Student {
     id: number
     name: string
     surname: string
     email: string
}

export interface Class {
     id: number
     name: string
     code: string
     classColor: string
     students: Student[]
}