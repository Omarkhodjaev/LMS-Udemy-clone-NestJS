import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/user.enum';

export class AuthRegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsString({ message: 'Full name must be a string' })
  @Length(1, 50, { message: 'Full name must be between 1 and 50 characters' })
  fullName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @Length(1, 100, { message: 'Email must be between 1 and 100 characters' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty({
    example: 'A brief bio about the user',
    description: 'The bio of the user',
  })
  @IsString({ message: 'Bio must be a string' })
  @IsOptional()
  bio?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'The avatar URL of the user',
  })
  @IsString({ message: 'Avatar URL must be a string' })
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({
    example: 'student',
    description: 'The role of the user (student, instructor)',
    enum: UserRole,
  })
  @IsEnum(UserRole, {
    message: 'Role must be one of the following: student, instructor',
  })
  role: UserRole;
}
