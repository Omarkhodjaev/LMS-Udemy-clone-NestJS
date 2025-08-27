import { HttpException, HttpStatus } from '@nestjs/common';

export class CourseAlreadyExistsException extends HttpException {
  constructor() {
    super('Course already exists', HttpStatus.CONFLICT);
  }
}

export class CourseNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Course with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

