import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  Matches,
} from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Full name of the recipient',
    example: 'Nguyen Van A',
  })
  fullName?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, {
    message: 'Invalid phone number format',
  })
  @ApiPropertyOptional({
    description: 'Phone number',
    example: '+84123456789',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Address line 1',
    example: '123 Nguyen Hue Street',
  })
  addressLine1?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Address line 2 (optional)',
    example: 'Apartment 4B',
  })
  addressLine2?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'City',
    example: 'Ho Chi Minh City',
  })
  city?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Province/State',
    example: 'Ho Chi Minh',
  })
  province?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Postal code',
    example: '700000',
  })
  postalCode?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Country',
    example: 'Vietnam',
  })
  country?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Set as default address',
    example: false,
  })
  isDefault?: boolean;
}

