import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAvatarDto {
  @ApiProperty({
    description: 'The avatar of the user',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @IsString()
  file: Express.Multer.File;
}
