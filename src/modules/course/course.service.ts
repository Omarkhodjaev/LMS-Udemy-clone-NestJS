import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import type { ICourseRepository } from './interfaces/course.repository';
import { ICourseService } from './interfaces/course.service';
import { ResData } from 'src/database/resData';
import { PaginationDto } from '../user/dto/pagination.dto';
import { Course } from './entities/course.entity';
import type { IUserService } from '../user/interfaces/user.service';
import { CourseNotFoundException } from './exceptions/course.exceptions';

@Injectable()
export class CourseService implements ICourseService {
  constructor(
    @Inject('ICourseRepository')
    private readonly courseRepository: ICourseRepository,
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<ResData<Course>> {
    await this.userService.findOne(createCourseDto.instructorId);

    const course = await this.courseRepository.create(createCourseDto);

    return new ResData('Course created successfully', 201, course);
  }

  async findOne(id: string): Promise<ResData<Course>> {
    const existingCourse = await this.courseRepository.findById(id);

    if (!existingCourse) {
      throw new CourseNotFoundException(id);
    }

    return new ResData('Course found successfully', 200, existingCourse);
  }

  async findAll(paginationDto: PaginationDto): Promise<ResData<Course[]>> {
    const courses = await this.courseRepository.findAll(paginationDto);

    return new ResData('Courses found successfully', 200, courses);
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<ResData<Course>> {
    const existingCourse = await this.courseRepository.findById(id);

    if (!existingCourse) {
      throw new CourseNotFoundException(id);
    }

    if (updateCourseDto.instructorId) {
      await this.userService.findOne(updateCourseDto.instructorId);
    }

    const updatedCourse = await this.courseRepository.update(
      id,
      updateCourseDto,
    );

    return new ResData('Course updated successfully', 200, updatedCourse);
  }

  async remove(id: string): Promise<ResData<void>> {
    await this.courseRepository.remove(id);

    return new ResData('Course deleted successfully', 200, null);
  }
}
