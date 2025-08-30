import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

export interface ICategoriesRepository {
  create(category: CreateCategoryDto): Promise<Category>;
  findAll(paginationDto?: PaginationDto): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  update(id: string, category: UpdateCategoryDto): Promise<Category | null>;
  remove(id: string): Promise<void>;
}
