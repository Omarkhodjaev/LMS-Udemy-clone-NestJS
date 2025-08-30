import { ResData } from 'src/database/resData';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export interface ICategoriesService {
  create(categegory: CreateCategoryDto): Promise<ResData<Category>>;
  findAll(paginationDto?: PaginationDto): Promise<ResData<Category[]>>;
  findOne(id: string): Promise<ResData<Category>>;
  findByName(name: string): Promise<ResData<Category>>;
  update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResData<Category>>;
  remove(id: string): Promise<ResData<void>>;
}
