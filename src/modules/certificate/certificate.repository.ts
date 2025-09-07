import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ICertificateRepository } from './interfaces/certificate.repository';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';

@Injectable()
export class CertificateRepository implements ICertificateRepository {
  constructor(
    @InjectRepository(Certificate)
    private readonly repository: Repository<Certificate>,
  ) {}

  async create(
    createCertificateDto: CreateCertificateDto,
  ): Promise<Certificate> {
    const certificate = this.repository.create(createCertificateDto);
    return this.repository.save(certificate);
  }

  async findById(id: string): Promise<Certificate | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(paginationDto: PaginationDto): Promise<Certificate[]> {
    const { limit, page } = paginationDto;
    return this.repository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async update(
    id: string,
    updateCertificateDto: UpdateCertificateDto,
  ): Promise<Certificate | null> {
    await this.repository.update(id, updateCertificateDto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
