import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCertificateDto {
  @ApiProperty({
    type: String,
    description: 'The ID of the student receiving the certificate',
  })
  @IsUUID()
  studentId: string;

  @ApiProperty({
    type: String,
    description: 'The ID of the course for which the certificate is issued',
  })
  @IsUUID()
  courseId: string;

  @ApiProperty({
    type: String,
    description: 'The URL of the issued certificate',
  })
  @IsString()
  certificateUrl: string;


}
