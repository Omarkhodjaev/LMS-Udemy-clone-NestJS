import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserRole } from '../entities/user.enum';

export class CreateUserDto {
  @IsString({ message: 'Full name must be a string' })
  @Length(1, 50, { message: 'Full name must be between 1 and 50 characters' })
  fullName: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @Length(1, 100, { message: 'Email must be between 1 and 100 characters' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  password: string;

  @IsEnum(UserRole, {
    message: 'Role must be one of the following: student, instructor, admin',
  })
  role: UserRole;

  @IsString({ message: 'Bio must be a string' })
  bio?: string;

  @IsString({ message: 'Avatar URL must be a string' })
  avatarUrl?: string;
}
