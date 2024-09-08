import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { createClassDto, createClassSchema } from './dto';
import { ZodValidationPipe } from 'src/shared/zodValidationPipe';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {

     constructor(private readonly classService: ClassService) { }

     @Get()
     public async getClasses() {
          return await this.classService.getClasses();
     }

     @Post('/create')
     @UsePipes(new ZodValidationPipe(createClassSchema))
     public async createClass(@Body() body: createClassDto) {
          return await this.classService.createClass(body);
     }

}
