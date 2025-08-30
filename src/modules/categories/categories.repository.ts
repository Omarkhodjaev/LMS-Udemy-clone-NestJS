import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ICategoriesRepository } from './interfaces/categories.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(category: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  findAll(paginationDto: PaginationDto): Promise<Category[]> {
    const { page, limit } = paginationDto;

    return this.categoryRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['children'],
    });
  }

  findByName(name: string): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ name });
  }

  findById(id: string): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id });
  }

  update(id: string, category: UpdateCategoryDto): Promise<Category | null> {
    return this.categoryRepository.save({ ...category, id });
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete({ id });
  }
}
