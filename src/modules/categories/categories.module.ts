import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: 'ICategoriesRepository',
      useClass: CategoriesRepository,
    },
    {
      provide: 'ICategoriesService',
      useClass: CategoriesService,
    },
  ],
  exports: ['ICategoriesService'],
})
export class CategoriesModule {}
