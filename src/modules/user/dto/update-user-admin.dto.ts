import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
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
}

