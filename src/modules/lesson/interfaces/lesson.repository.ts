import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { Lesson } from '../entities/lesson.entity';
import { UpdateLessonDto } from '../dto/update-lesson.dto';

export interface ILessonRepository {
  create(createLessonDto: CreateLessonDto): Promise<Lesson>;
  findById(id: string): Promise<Lesson | null>;
  findAll(paginationDto: PaginationDto): Promise<Lesson[]>;
  update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson | null>;
  remove(id: string): Promise<void>;
}
