import { Inject, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import type { ILessonRepository } from './interfaces/lesson.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ILessonService } from './interfaces/lesson.service';
import { ResData } from 'src/database/resData';
import { Lesson } from './entities/lesson.entity';
import { LessonNotFoundException } from './exceptions/lesson.exception';
import type { ICourseService } from '../course/interfaces/course.service';

@Injectable()
export class LessonService implements ILessonService {
  constructor(
    @Inject('ILessonRepository')
    private readonly lessonRepository: ILessonRepository,
    @Inject('ICourseService')
    private readonly courseService: ICourseService,
  ) {}

  async create(
    createLessonDto: CreateLessonDto,
    content: Express.Multer.File,
  ): Promise<ResData<Lesson>> {
    createLessonDto.content = content.path;

    await this.courseService.findOne(createLessonDto.courseId);

    const lesson = await this.lessonRepository.create(createLessonDto);

    return new ResData('Lesson created successfully', 201, lesson);
  }

  async findOne(id: string): Promise<ResData<Lesson>> {
    const lesson = await this.lessonRepository.findById(id);

    if (!lesson) {
      throw new LessonNotFoundException(id);
    }

    return new ResData('Lesson retrieved successfully', 200, lesson);
  }

  async findAll(paginationDto: PaginationDto): Promise<ResData<Lesson[]>> {
    const lessons = await this.lessonRepository.findAll(paginationDto);
    return new ResData('Lessons retrieved successfully', 200, lessons);
  }

  async update(
    id: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<ResData<Lesson>> {
    await this.findOne(id);

    if (updateLessonDto.courseId) {
      await this.courseService.findOne(updateLessonDto.courseId);
    }

    const lesson = await this.lessonRepository.update(id, updateLessonDto);

    return new ResData('Lesson updated successfully', 200, lesson);
  }

  async remove(id: string): Promise<ResData<void>> {
    await this.findOne(id);

    await this.lessonRepository.remove(id);

    return new ResData('Lesson removed successfully', 200);
  }
}
