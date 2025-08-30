import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { ICourseRepository } from './interfaces/course.repository';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.repository.create(createCourseDto);

    return this.repository.save(course);
  }

  findById(id: string): Promise<Course | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['instructor'],
    });
  }

  findAll(paginationDto: PaginationDto): Promise<Course[]> {
    const { page, limit } = paginationDto;

    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['instructor'],
    });
  }

  update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course | null> {
    return this.repository.save({ ...updateCourseDto, id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({ id: id });
  }
}
