import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { CertificateRepository } from './certificate.repository';
import { Certificate } from 'crypto';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate])],
  controllers: [CertificateController],
  providers: [
    {
      provide: 'ICertificateService',
      useClass: CertificateService,
    },
    {
      provide: 'ICertificateRepository',
      useClass: CertificateRepository,
    },
  ],
})
export class CertificateModule {}
