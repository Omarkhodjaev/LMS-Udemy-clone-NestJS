import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  Inject,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { multerConfig } from 'src/config/multer';

const { getVideoDurationInSeconds } = require('get-video-duration');

@Controller('lessons')
export class LessonController {
  constructor(
    @Inject('ILessonService') private readonly lessonService: LessonService,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload lesson file',
    type: CreateLessonDto,
  })
  @UseInterceptors(FileInterceptor('content', multerConfig))
  async uploadVideo(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFile() content: Express.Multer.File,
  ) {
    if (!content) {
      throw new BadRequestException('Video file is required');
    }

    const filePath = content.path;
    const duration = await getVideoDurationInSeconds(filePath);

    createLessonDto.duration = duration;

    return this.lessonService.create(createLessonDto, content);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({
    status: 200,
    description: 'List of lessons retrieved successfully.',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.lessonService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lesson by ID' })
  @ApiResponse({
    status: 200,
    description: 'Lesson retrieved successfully.',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.lessonService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.lessonService.remove(id);
  }
}
