import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Certificate } from '../entities/certificate.entity';
import { CreateCertificateDto } from '../dto/create-certificate.dto';
import { ResData } from 'src/database/resData';
import { UpdateCertificateDto } from '../dto/update-certificate.dto';

export interface ICertificateService {
  create(
    createCertificateDto: CreateCertificateDto,
  ): Promise<ResData<Certificate>>;
  findOne(id: string): Promise<ResData<Certificate>>;
  findAll(paginationDto: PaginationDto): Promise<ResData<Certificate[]>>;
 
  remove(id: string): Promise<ResData<void>>;
}
