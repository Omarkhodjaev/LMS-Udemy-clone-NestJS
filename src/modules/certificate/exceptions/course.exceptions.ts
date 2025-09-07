import { HttpException, HttpStatus } from '@nestjs/common';

export class CertificateAlreadyExistsException extends HttpException {
  constructor() {
    super('Certificate already exists', HttpStatus.CONFLICT);
  }
}

export class CertificateNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Certificate with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
