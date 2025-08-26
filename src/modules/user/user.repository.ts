import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from './interfaces/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id: id });
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email: email });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.repository.save({ ...updateUserDto, id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({ id: id });
  }
}
