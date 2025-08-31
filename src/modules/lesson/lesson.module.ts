import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { LessonRepository } from './lesson.repository';
import { Lesson } from './entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), CourseModule],
  controllers: [LessonController],
  providers: [
    {
      provide: 'ILessonService',
      useClass: LessonService,
    },
    {
      provide: 'ILessonRepository',
      useClass: LessonRepository,
    },
  ],
})
export class LessonModule {}
