import { ApiProperty } from '@nestjs/swagger';

/**
 * Response DTO for track product view endpoint
 */
export class TrackProductViewResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Product view tracked successfully',
  })
  message: string;
}

/**
 * Response DTO for get hot products endpoint
 * This is just metadata - actual products use ProductResponseDto[]
 */
export class HotProductsResponseMetaDto {
  @ApiProperty({
    description: 'Total number of hot products returned',
    example: 10,
  })
  total: number;

  @ApiProperty({
    description: 'Criteria used for filtering',
    example: 'composite',
  })
  criteria: string;

  @ApiProperty({
    description: 'Period used for calculation',
    example: '30d',
  })
  period: string;
}
