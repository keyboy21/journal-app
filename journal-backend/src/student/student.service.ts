import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { changeClassDto, createStudentDto } from './dto';

@Injectable()
export class StudentService {

     constructor(private readonly prismaService: PrismaService) { }

     public async getStudents({ newStudents }: { newStudents: boolean }) {
          return await this.prismaService.student.findMany({
               where: {
                    cLassId: newStudents ? null : { not: null }
               }
          });
     }

     public async createStudent(data: createStudentDto) {
          return await this.prismaService.student.create({
               data: {
                    email: data.email,
                    name: data.name,
                    surname: data.surname
               }
          })
     }

     public async addStudentToClass(data: changeClassDto) {
          return await this.prismaService.cLass.update({
               where: {
                    id: data.classId,
                    code: data.classCode
               },
               data: {
                    students: {
                         connect: {
                              id: data.studentId
                         }
                    }
               }
          })
     }

     public async disconnectFromClass(data: changeClassDto) {
          return await this.prismaService.cLass.update({
               where: {
                    id: data.classId,
                    code: data.classCode
               },
               data: {
                    students: {
                         disconnect: {
                              id: data.studentId
                         }
                    }
               }
          })
     }
}
