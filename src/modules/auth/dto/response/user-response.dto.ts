import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';
import { MediaResponseDto } from 'src/libs/dto/media-response.dto';

/**
 * User Response DTO
 * Excludes sensitive fields like password and refreshToken
 * Automatically serialized by ClassSerializerInterceptor
 */
export class UserResponseDto extends BaseResponseDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+1234567890',
  })
  phone: string;

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'User avatar',
    type: MediaResponseDto,
    nullable: true,
  })
  avatarMedia?: MediaResponseDto;

  @ApiProperty({
    description: 'User active status',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'User verified status',
    example: false,
  })
  isVerified: boolean;

  @ApiProperty({
    description: 'User banned status',
    example: false,
  })
  isBanned: boolean;

  @ApiProperty({
    description: 'User deleted status',
    example: false,
  })
  isDeleted: boolean;

  @ApiProperty({
    description: 'Email verified status',
    example: false,
  })
  isEmailVerified: boolean;

  @ApiProperty({
    description: 'Phone verified status',
    example: false,
  })
  isPhoneVerified: boolean;

  @ApiPropertyOptional({
    description: 'Email verified timestamp',
    example: '2024-01-01T00:00:00.000Z',
    nullable: true,
  })
  @Transform(({ value }) => value?.toISOString())
  emailVerifiedAt?: Date | null;

  @ApiPropertyOptional({
    description: 'Phone verified timestamp',
    example: '2024-01-01T00:00:00.000Z',
    nullable: true,
  })
  @Transform(({ value }) => value?.toISOString())
  phoneVerifiedAt?: Date | null;

  // Exclude sensitive fields from response
  @Exclude()
  password: string;

  @Exclude()
  refreshToken?: string | null;
}
