import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Email address',
    example: 'user@example.com',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiPropertyOptional({
    description: 'Password (minimum 6 characters)',
    example: 'password123',
    minLength: 6,
  })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'First name',
    example: 'John',
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Last name',
    example: 'Doe',
  })
  lastName?: string;

  @IsString()
  @IsOptional()
  @Matches(
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
    {
      message: 'Invalid phone number format',
    },
  )
  @ApiPropertyOptional({
    description: 'Phone number',
    example: '+1234567890',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  @ApiPropertyOptional({
    description: 'Username (3+ characters, alphanumeric and underscore only)',
    example: 'johndoe',
    minLength: 3,
  })
  username?: string;
}
