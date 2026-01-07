import { ApiProperty } from '@nestjs/swagger';

export class RateLimitErrorDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Too many requests. Please try again in 120 seconds',
  })
  message: string;

  @ApiProperty({
    description: 'Remaining cooldown time in seconds',
    example: 120,
  })
  remainingCooldown: number;
}
