import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CourseRepository } from './course.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UserModule],
  controllers: [CourseController],
  providers: [
    {
      provide: 'ICourseService',
      useClass: CourseService,
    },
    {
      provide: 'ICourseRepository',
      useClass: CourseRepository,
    },
  ],
})
export class CourseModule {}
