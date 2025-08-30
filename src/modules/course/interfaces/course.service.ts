import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCourseDto } from '../dto/create-course.dto';
import { Course } from '../entities/course.entity';
import { ResData } from 'src/database/resData';
import { UpdateCourseDto } from '../dto/update-course.dto';

export interface ICourseService {
  create(createCourseDto: CreateCourseDto): Promise<ResData<Course>>;
  findOne(id: string): Promise<ResData<Course>>;
  findAll(paginationDto: PaginationDto): Promise<ResData<Course[]>>;
  update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<ResData<Course>>;
  remove(id: string): Promise<ResData<void>>;
}
