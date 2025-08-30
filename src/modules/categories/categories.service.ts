import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoriesService } from './interfaces/categories.service';
import { ResData } from 'src/database/resData';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Category } from './entities/category.entity';
import type { ICategoriesRepository } from './interfaces/categories.repository';
import {
  CategoryNameAlreadyExistsException,
  CategoryNotFoundException,
} from './exceptions/categories.exception';

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly categoyRepository: ICategoriesRepository,
  ) {}
  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ResData<Category>> {
    const existingCategory = await this.categoyRepository.findByName(
      createCategoryDto.name,
    );

    if (existingCategory) {
      throw new CategoryNameAlreadyExistsException();
    }

    const categegory = await this.categoyRepository.create(createCategoryDto);

    return new ResData('Category created successfully', 201, categegory);
  }

  async findAll(paginationDto: PaginationDto): Promise<ResData<Category[]>> {
    const categories = await this.categoyRepository.findAll(paginationDto);

    return new ResData('Category retrieved successfully', 200, categories);
  }

  async findOne(id: string): Promise<ResData<Category>> {
    const categegory = await this.categoyRepository.findById(id);

    if (!categegory) {
      throw new CategoryNotFoundException();
    }

    return new ResData('Category retrieved successfully', 200, categegory);
  }

  async findByName(name: string): Promise<ResData<Category>> {
    const category = await this.categoyRepository.findByName(name);

    if (!category) {
      throw new CategoryNameAlreadyExistsException();
    }

    return new ResData('Category retrieved successfully', 200, category);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResData<Category>> {
    const existingCategory = await this.categoyRepository.findById(id);

    if (!existingCategory) {
      throw new CategoryNotFoundException();
    }

    if (updateCategoryDto.name) {
      const categoryWithSameName = await this.categoyRepository.findByName(
        updateCategoryDto.name,
      );

      if (categoryWithSameName) {
        throw new CategoryNameAlreadyExistsException();
      }
    }

    const updatedCategory = await this.categoyRepository.update(
      id,
      updateCategoryDto,
    );

    return new ResData('Category updated successfully', 200, updatedCategory);
  }
  async remove(id: string): Promise<ResData<void>> {
    const existingCategory = await this.categoyRepository.findById(id);

    if (!existingCategory) {
      throw new CategoryNotFoundException();
    }

    await this.categoyRepository.remove(id);

    return new ResData('Category deleted successfully', 200);
  }
}
