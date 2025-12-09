import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MailResponseDto } from '../dto/mail-response.dto';

export function ApiTestMail() {
  return applyDecorators(
    ApiOperation({ summary: 'Test send email with template' }),
    ApiResponse({
      status: 200,
      description: 'Email sent successfully',
      type: MailResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Invalid request data' }),
    ApiResponse({ status: 500, description: 'Failed to send email' }),
  );
}

export function ApiTestRawMail() {
  return applyDecorators(
    ApiOperation({ summary: 'Test send raw HTML email' }),
    ApiResponse({
      status: 200,
      description: 'Email sent successfully',
      type: MailResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Invalid request data' }),
    ApiResponse({ status: 500, description: 'Failed to send email' }),
  );
}
