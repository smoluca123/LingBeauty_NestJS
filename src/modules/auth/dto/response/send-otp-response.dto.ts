import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendOtpResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Verification code has been sent to your email',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'OTP code (only returned in development mode)',
    example: '123456',
  })
  code?: string;
}
