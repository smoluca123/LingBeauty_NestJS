import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

/**
 * Base response DTO with common fields
 * Can be extended by other response DTOs
 */
export class BaseResponseDto {
  @ApiProperty({ description: 'Unique identifier', example: 'uuid-string' })
  id: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  // @Transform(({ value }: { value: Date }) => value.toDateString())
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  // @Transform(({ value }: { value: Date }) => value.toDateString())
  updatedAt: Date;
}
