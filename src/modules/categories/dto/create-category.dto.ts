import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    type: String,
    example: 'Web Development',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @ApiProperty({
    description: 'The ID of the parent category',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  parentId?: string;
}
