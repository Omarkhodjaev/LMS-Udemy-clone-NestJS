import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPasswordOrEmailException extends HttpException {
  constructor() {
    super('Wrong email or password', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidRoleException extends HttpException {
  constructor() {
    super('Invalid role', HttpStatus.FORBIDDEN);
  }
}
