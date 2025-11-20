import { ApiProperty } from '@nestjs/swagger';

export class BaseUploadFileDto {
  @ApiProperty({
    description: 'The file to upload',
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
