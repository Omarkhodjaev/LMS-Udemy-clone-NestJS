import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Lesson } from '../entities/lesson.entity';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { ResData } from 'src/database/resData';
import { UpdateLessonDto } from '../dto/update-lesson.dto';

export interface ILessonService {
  create(
    createLessonDto: CreateLessonDto,
    content: Express.Multer.File,
  ): Promise<ResData<Lesson>>;
  findOne(id: string): Promise<ResData<Lesson>>;
  findAll(paginationDto: PaginationDto): Promise<ResData<Lesson[]>>;
  update(
    id: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<ResData<Lesson>>;
  remove(id: string): Promise<ResData<void>>;
}
