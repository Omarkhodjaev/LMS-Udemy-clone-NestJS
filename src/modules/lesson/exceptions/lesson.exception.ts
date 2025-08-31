import { HttpException, HttpStatus } from '@nestjs/common';

export class LessonNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Lesson with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
