import { ApiProperty } from '@nestjs/swagger';

export class UserRoleResponseDto {
  @ApiProperty({
    description: 'User role ID',
    example: 'cm123456789',
  })
  id: string;

  @ApiProperty({
    description: 'Role name',
    example: 'admin',
  })
  name: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class UserRoleAssignmentsResponseDto {
  @ApiProperty({
    description: 'User role assignment ID',
    example: 'cm123456789',
  })
  id: string;

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

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
