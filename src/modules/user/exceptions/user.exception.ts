import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
  constructor() {
    super('Email already exists', HttpStatus.CONFLICT);
  }
}

export class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
