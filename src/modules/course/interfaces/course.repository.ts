import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCourseDto } from '../dto/create-course.dto';
import { Course } from '../entities/course.entity';
import { UpdateCourseDto } from '../dto/update-course.dto';

export interface ICourseRepository {
  create(createCourseDto: CreateCourseDto): Promise<Course>;
  findById(id: string): Promise<Course | null>;
  findAll(paginationDto: PaginationDto): Promise<Course[]>;
  update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course | null>;
  remove(id: string): Promise<void>;
}
