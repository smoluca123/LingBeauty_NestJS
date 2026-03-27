import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SystemService } from './system.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import type { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { ERROR_CODES } from 'src/constants/error-codes';

@ApiTags('System Information')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('error-codes')
  @ApiOperation({ summary: 'Get all error codes' })
  getErrorCodes(): IBeforeTransformResponseType<typeof ERROR_CODES> {
    return this.systemService.getErrorCodes();
  }

  @Get('error-messages')
  @ApiOperation({ summary: 'Get all error messages' })
  getErrorMessages(): IBeforeTransformResponseType<
    Record<keyof typeof ERROR_CODES, string>
  > {
    return this.systemService.getErrorMessages();
  }
}
