import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserByAdminDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email address',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty({
    description: 'Password (minimum 6 characters)',
    example: 'password123',
    minLength: 6,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
    {
      message: 'Invalid phone number format',
    },
  )
  @ApiProperty({
    description: 'Phone number',
    example: '+84901234567',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  @ApiProperty({
    description: 'Username (3+ characters, alphanumeric and underscore only)',
    example: 'johndoe',
    minLength: 3,
  })
  username: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({
    description:
      'Role ID to assign to the user (defaults to USER role if not provided)',
    example: 'uuid-string',
  })
  roleId?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'User active status',
    example: true,
    default: true,
  })
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Mark email as pre-verified (skips email verification step)',
    example: false,
    default: false,
  })
  isEmailVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Mark phone as pre-verified',
    example: false,
    default: false,
  })
  isPhoneVerified?: boolean;
}
