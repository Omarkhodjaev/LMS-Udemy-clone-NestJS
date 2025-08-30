import { HttpException } from '@nestjs/common';

export class CategoryNameAlreadyExistsException extends HttpException {
  constructor() {
    super('Category name already exists', 409);
  }
}

export class CategoryNotFoundException extends HttpException {
  constructor() {
    super('Category not found', 404);
  }
}
