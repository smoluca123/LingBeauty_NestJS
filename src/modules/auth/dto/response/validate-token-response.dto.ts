import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';
import { Type } from 'class-transformer';

/**
 * Validate Token Response DTO
 * Contains validation result, user information and token expiration
 */
export class ValidateTokenResponseDto {
  @ApiProperty({
    description: 'Whether the token is valid',
    example: true,
  })
  valid: boolean;

  @ApiPropertyOptional({
    description: 'User information',
    type: UserResponseDto,
  })
  @Type(() => UserResponseDto)
  user?: UserResponseDto;

  @ApiPropertyOptional({
    description: 'Token expiration timestamp',
    example: '2024-12-31T23:59:59.000Z',
  })
  expiresAt?: Date;
}
