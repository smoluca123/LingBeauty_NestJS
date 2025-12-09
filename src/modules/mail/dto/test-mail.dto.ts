import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsIn,
} from 'class-validator';

export class TestMailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Recipient email address',
    example: 'test@example.com',
  })
  to: string;

  @IsString()
  @IsOptional()
  @IsIn(['welcome', 'password-reset', 'otp-verification', 'order-confirmation'])
  @ApiPropertyOptional({
    description: 'Email template to use',
    enum: [
      'welcome',
      'password-reset',
      'otp-verification',
      'order-confirmation',
    ],
    default: 'welcome',
  })
  template?:
    | 'welcome'
    | 'password-reset'
    | 'otp-verification'
    | 'order-confirmation';

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'User name for template',
    example: 'John Doe',
  })
  userName?: string;
}

export class TestRawMailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Recipient email address',
    example: 'test@example.com',
  })
  to: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email subject', example: 'Test Email' })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'HTML content', example: '<h1>Hello World</h1>' })
  html: string;
}
