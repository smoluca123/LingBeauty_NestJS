import { ApiProperty } from '@nestjs/swagger';

export class MailResponseDto {
  @ApiProperty({
    description: 'Whether email was sent successfully',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Message ID from SMTP server',
    example: '<abc123@smtp.example.com>',
  })
  messageId: string;
}
