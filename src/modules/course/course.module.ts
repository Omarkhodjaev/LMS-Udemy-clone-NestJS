import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CourseRepository } from './course.repository';
import { UserModule } from '../user/user.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UserModule, CategoriesModule],
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
  exports: ['ICourseService'],
})
export class CourseModule {}
