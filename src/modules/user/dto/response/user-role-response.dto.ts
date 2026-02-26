import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';

export class UserRoleResponseDto extends BaseResponseDto {
  @ApiProperty({
    description: 'Role name',
    example: 'ADMIN',
  })
  name: string;
}
