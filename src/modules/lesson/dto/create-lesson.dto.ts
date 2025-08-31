import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @ApiProperty({
    type: String,
    description: 'The title of the lesson',
    example: 'First lesson',
  })
  @IsString({ message: 'Title must be a string' })
  @MaxLength(255, { message: 'Title must be at most 255 characters long' })
  title: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Upload a video lesson',
  })
  @IsOptional()
  content: any;

  @ApiProperty({ type: Number, description: 'The order of the lesson' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Order must be a number' })
  order: number;

  @ApiProperty({ type: String, description: 'The course id' })
  @IsString({ message: 'Course id must be a string' })
  courseId: string;

  @IsOptional()
  duration: number;
}
