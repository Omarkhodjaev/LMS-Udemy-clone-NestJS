import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
} from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { ICertificateService } from './interfaces/certificate.service';

@Controller('certificate')
export class CertificateController {
  constructor(
    @Inject('ICertificateService')
    private readonly certificateService: ICertificateService,
  ) {}

  @Post()
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificateService.create(createCertificateDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.certificateService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificateService.remove(id);
  }
}
