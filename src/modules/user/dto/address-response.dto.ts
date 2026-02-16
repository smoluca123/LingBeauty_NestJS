import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressType } from 'prisma/generated/prisma';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';

export class AddressResponseDto extends BaseResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: 'uuid-string',
  })
  userId: string;

  @ApiProperty({
    description: 'Full name of the recipient',
    example: 'Nguyen Van A',
  })
  fullName: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+84123456789',
  })
  phone: string;

  @ApiProperty({
    description: 'Address line 1',
    example: '123 Nguyen Hue Street',
  })
  addressLine1: string;

  @ApiPropertyOptional({
    description: 'Address line 2 (optional)',
    example: 'Apartment 4B',
  })
  addressLine2?: string;

  @ApiProperty({
    description: 'City',
    example: 'Ho Chi Minh City',
  })
  city: string;

  @ApiProperty({
    description: 'Province/State',
    example: 'Ho Chi Minh',
  })
  province: string;

  @ApiProperty({
    description: 'Postal code',
    example: '700000',
  })
  postalCode: string;

  @ApiProperty({
    description: 'Country',
    example: 'Vietnam',
  })
  country: string;

  @ApiProperty({
    description: 'Type',
    example: 'HOME',
    enum: AddressType,
  })
  type: AddressType;

  @ApiProperty({
    description: 'Is default address',
    example: false,
  })
  isDefault: boolean;
}
