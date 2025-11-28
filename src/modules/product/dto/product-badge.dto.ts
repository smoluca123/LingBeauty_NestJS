import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ProductBadgeType,
  ProductBadgeVariant,
} from 'prisma/generated/prisma/client';

export class CreateSingleBadgeDto {
  @ApiProperty({
    example: 'New Arrival',
    description: 'The name of the product badge',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Sort order for display',
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the badge is active',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    enum: ProductBadgeVariant,
    example: ProductBadgeVariant.INFO,
    description: 'Badge variant style',
    default: ProductBadgeVariant.INFO,
  })
  @IsOptional()
  @IsEnum(ProductBadgeVariant)
  variant?: ProductBadgeVariant;

  @ApiPropertyOptional({
    enum: ProductBadgeType,
    example: ProductBadgeType.NEW,
    description: 'Badge type',
    default: ProductBadgeType.NEW,
  })
  @IsOptional()
  @IsEnum(ProductBadgeType)
  type?: ProductBadgeType;
}

export class CreateMultipleBadgesDto {
  @ApiProperty({
    type: [CreateSingleBadgeDto],
    description: 'Array of badges to create',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSingleBadgeDto)
  @ArrayMinSize(1)
  badges: CreateSingleBadgeDto[];
}

export class UpdateBadgeDto {
  @ApiPropertyOptional({
    example: 'New Arrival',
    description: 'The name of the product badge',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Sort order for display',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the badge is active',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    enum: ProductBadgeVariant,
    example: ProductBadgeVariant.INFO,
    description: 'Badge variant style',
  })
  @IsOptional()
  @IsEnum(ProductBadgeVariant)
  variant?: ProductBadgeVariant;

  @ApiPropertyOptional({
    enum: ProductBadgeType,
    example: ProductBadgeType.NEW,
    description: 'Badge type',
  })
  @IsOptional()
  @IsEnum(ProductBadgeType)
  type?: ProductBadgeType;
}
