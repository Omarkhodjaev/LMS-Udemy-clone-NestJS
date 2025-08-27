import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Length, MaxLength } from 'class-validator';
import { courseLevel, courseStatus } from '../entities/course.enum';

export class CreateCourseDto {
  @ApiProperty({
    description: 'The title of the course',
    example: 'Introduction to Programming',
  })
  @IsString({ message: 'Title must be a string' })
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'The description of the course',
    example: 'Learn the basics of programming.',
  })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({ description: 'The price of the course', example: 29.99 })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @ApiProperty({
    description: 'The image URL of the course',
    example: 'https://example.com/image.jpg',
  })
  @IsString({ message: 'Image must be a string' })
  image: string;

  @ApiProperty({
    description: 'The category ID of the course',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: 'Category ID must be a string' })
  categoryId: string;

  @ApiProperty({
    description: 'The instructor ID of the course',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: 'Instructor ID must be a string' })
  instructorId: string;

  @ApiProperty({
    description: 'The status of the course',
    enum: courseStatus,
    example: 'draft',
  })
  @IsEnum(courseStatus, {
    message: 'Status must be one of the following values: [draft or published]',
  })
  status: courseStatus;

  @ApiProperty({
    description: 'The level of the course',
    enum: courseLevel,
    example: courseLevel.BEGINNER,
  })
  @IsEnum(courseLevel, {
    message:
      'Level must be one of the following values: BEGINNER, INTERMEDIATE, ADVANCED',
  })
  level: courseLevel;

  @ApiProperty({
    description: 'ThumbnailUrl URL of the course',
    example: 'https://example.com/thumbnail.jpg',
  })
  @IsString({ message: 'ThumbnailUrl must be a string' })
  thumbnailUrl: string;
}
