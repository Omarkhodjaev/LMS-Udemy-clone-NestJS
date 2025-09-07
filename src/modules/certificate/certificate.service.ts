import { Inject, Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ICertificateService } from './interfaces/certificate.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResData } from 'src/database/resData';
import { Certificate } from './entities/certificate.entity';
import type { ICertificateRepository } from './interfaces/certificate.repository';
import { CertificateNotFoundException } from './exceptions/course.exceptions';

@Injectable()
export class CertificateService implements ICertificateService {
  constructor(
    @Inject('ICertificateRepository')
    private readonly certificateRepository: ICertificateRepository,
  ) {}

  async create(
    createCertificateDto: CreateCertificateDto,
  ): Promise<ResData<Certificate>> {
    const certificate =
      await this.certificateRepository.create(createCertificateDto);

    return new ResData('Certificate created successfully', 201, certificate);
  }

  async findOne(id: string): Promise<ResData<Certificate>> {
    const existingCertificate = await this.certificateRepository.findById(id);

    if (!existingCertificate) {
      throw new CertificateNotFoundException(id);
    }

    return new ResData(
      'Certificate found successfully',
      200,
      existingCertificate,
    );
  }

  async findAll(paginationDto: PaginationDto): Promise<ResData<Certificate[]>> {
    const certificates =
      await this.certificateRepository.findAll(paginationDto);

    return new ResData('Certificates found successfully', 200, certificates);
  }

  async remove(id: string): Promise<ResData<void>> {
    await this.certificateRepository.remove(id);

    return new ResData('Certificate deleted successfully', 200, null);
  }
}
