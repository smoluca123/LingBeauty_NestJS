import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  Matches,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Full name of the recipient',
    example: 'Nguyen Van A',
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, {
    message: 'Invalid phone number format',
  })
  @ApiProperty({
    description: 'Phone number',
    example: '+84123456789',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Address line 1',
    example: '123 Nguyen Hue Street',
  })
  addressLine1: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Address line 2 (optional)',
    example: 'Apartment 4B',
  })
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'City',
    example: 'Ho Chi Minh City',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Province/State',
    example: 'Ho Chi Minh',
  })
  province: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Postal code',
    example: '700000',
  })
  postalCode: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Country',
    example: 'Vietnam',
    default: 'Vietnam',
  })
  country?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Set as default address',
    example: false,
    default: false,
  })
  isDefault?: boolean;
}

