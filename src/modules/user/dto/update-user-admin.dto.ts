import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateUserByAdminDto extends UpdateUserDto {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'User active status',
    example: true,
  })
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'User verified status',
    example: false,
  })
  isVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'User banned status',
    example: false,
  })
  isBanned?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Email verified status',
    example: false,
  })
  isEmailVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Phone verified status',
    example: false,
  })
  isPhoneVerified?: boolean;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional({
    description:
      'List of role IDs to assign to the user (replaces existing roles)',
    type: [String],
    example: ['role-id-1', 'role-id-2'],
  })
  roleIds?: string[];
}
