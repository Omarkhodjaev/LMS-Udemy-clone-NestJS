import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateCertificateDto } from '../dto/update-certificate.dto';
import { CreateCertificateDto } from '../dto/create-certificate.dto';
import { Certificate } from '../entities/certificate.entity';

export interface ICertificateRepository {
  create(createCertificateDto: CreateCertificateDto): Promise<Certificate>;
  findById(id: string): Promise<Certificate | null>;
  findAll(paginationDto: PaginationDto): Promise<Certificate[]>;
  remove(id: string): Promise<void>;
}
