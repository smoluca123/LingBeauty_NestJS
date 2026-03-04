import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';

export class UserRoleResponseDto extends BaseResponseDto {
  @ApiProperty({
    description: 'Role name',
    example: 'ADMIN',
  })
  name: string;
}

export class UserRoleAssignmentsResponseDto extends BaseResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: 'cm987654321',
  })
  userId: string;

  @ApiProperty({
    description: 'Role ID',
    example: 'cm456789123',
  })
  roleId: string;

  @ApiProperty({
    description: 'Role information',
    type: UserRoleResponseDto,
  })
  role: UserRoleResponseDto;
}
