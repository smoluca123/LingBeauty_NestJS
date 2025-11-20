import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class VerifyPhoneDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'Verification code must be exactly 6 digits' })
  @Matches(/^\d{6}$/, {
    message: 'Verification code must be 6 digits',
  })
  @ApiProperty({
    description: '6-digit verification code sent to phone',
    example: '123456',
    minLength: 6,
    maxLength: 6,
  })
  code: string;
}

