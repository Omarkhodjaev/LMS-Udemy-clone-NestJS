import { ResData } from 'src/database/resData';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<ResData<User>>;
  findOne(id: string): Promise<ResData<User>>;
  findAll(paginationDto: PaginationDto): Promise<ResData<User[]>>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<ResData<User>>;
  remove(id: string): Promise<ResData<void>>;
}
