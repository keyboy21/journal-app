import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createClassDto } from './dto';
const crypto = require('crypto');

@Injectable()
export class ClassService {

     constructor(private readonly prismaService: PrismaService) { }

     public async createClass(data: createClassDto) {

          const code = crypto.randomUUID();

          return await this.prismaService.cLass.create({
               data: {
                    name: data.name,
                    classColor: data.classColor,
                    code: code
               }
          })
     }

     public async getClasses() {
          return await this.prismaService.cLass.findMany({
               include: {
                    students: true
               }
          })
     }
}
