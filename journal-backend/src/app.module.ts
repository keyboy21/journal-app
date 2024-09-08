import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), StudentModule, ClassModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
