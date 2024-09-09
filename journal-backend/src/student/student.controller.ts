import { Body, Controller, Get, ParseBoolPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/shared/zodValidationPipe';
import { changeClassDto, changeClassSchema, createStudentDto, createStudentSchema } from './dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {

     constructor(private readonly studentsService: StudentService) { }

     @Get()
     public async getStudents(@Query('newStudents', ParseBoolPipe) newStudents: boolean,) {
          return await this.studentsService.getStudents({ newStudents });
     }

     @Post()
     @UsePipes(new ZodValidationPipe(createStudentSchema))
     public async createStudent(@Body() body: createStudentDto) {
          return await this.studentsService.createStudent(body);
     }

     @Post('/add-to-class')
     @UsePipes(new ZodValidationPipe(changeClassSchema))
     public async changeClass(@Body() body: changeClassDto) {
          return await this.studentsService.addStudentToClass(body);
     }

     @Post('/remove-from-class')
     @UsePipes(new ZodValidationPipe(changeClassSchema))
     public async disconnectFromClass(@Body() body: changeClassDto) {
          return await this.studentsService.disconnectFromClass(body);
     }
}
