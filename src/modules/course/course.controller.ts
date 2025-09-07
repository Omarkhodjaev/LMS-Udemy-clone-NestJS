import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import type { ICourseService } from './interfaces/course.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from '../user/entities/user.entity';
import { UserRole } from 'src/common/enums/user.enum';

@ApiBearerAuth()
@Controller('course')
export class CourseController {
  constructor(
    @Inject('ICourseService') private readonly courseService: ICourseService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'Course created successfully.' })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Courses retrieved successfully.' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.courseService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiResponse({ status: 200, description: 'Course retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a course by ID' })
  @ApiResponse({ status: 200, description: 'Course updated successfully.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a course by ID' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.courseService.remove(id);
  }
}
