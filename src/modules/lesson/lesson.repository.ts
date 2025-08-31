import { Injectable } from '@nestjs/common';
import { ILessonRepository } from './interfaces/lesson.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LessonRepository implements ILessonRepository {
  constructor(
    @InjectRepository(Lesson)
    private readonly repository: Repository<Lesson>,
  ) {}
  create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const lesson = this.repository.create(createLessonDto);
    return this.repository.save(lesson);
  }

  findById(id: string): Promise<Lesson | null> {
    return this.repository.findOne({ where: { id } });
  }

  findAll(paginationDto: PaginationDto): Promise<Lesson[]> {
    const { limit, page } = paginationDto;
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['course', 'course.instructor', 'course.category'],
    });
  }

  update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson | null> {
    return this.repository.save({ ...updateLessonDto, id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
