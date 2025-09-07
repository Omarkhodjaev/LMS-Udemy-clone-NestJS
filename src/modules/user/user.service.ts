import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ResData } from 'src/database/resData';
import { IUserService } from './interfaces/user.service';
import type { IUserRepository } from './interfaces/user.repository';
import { BcryptEncryption } from 'src/library/bcrypt';
import {
  EmailAlreadyExistsException,
  UserEmailNotFoundException,
  UserNotFoundException,
} from './exceptions/user.exception';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResData<User>> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }

    const hashedPassword = await BcryptEncryption.encrypt(
      createUserDto.password,
    );

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return new ResData('User created successfully', 201, user);
  }

  async findAll(paginationDto: PaginationDto): Promise<ResData<User[]>> {
    const users = await this.userRepository.findAll(paginationDto);
    return new ResData('All users retrieved successfully', 200, users);
  }

  async findByEmail(email: string): Promise<ResData<User | null>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserEmailNotFoundException(email);
    }

    return new ResData('User retrieved successfully', 200, user);
  }

  async findOne(id: string): Promise<ResData<User>> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException(id);
    }

    return new ResData(`User with id ${id} retrieved successfully`, 200, user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResData<User>> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException(id);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await BcryptEncryption.encrypt(
        updateUserDto.password,
      );
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateUserDto.email,
      );

      if (existingUser) {
        throw new EmailAlreadyExistsException();
      }
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto);

    return new ResData(
      `User with id ${id} updated successfully`,
      200,
      updatedUser,
    );
  }

  async remove(id: string): Promise<ResData<void>> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException(id);
    }

    await this.userRepository.remove(id);

    return new ResData(`User with id ${id} removed successfully`, 204);
  }
}
