import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';
import { ApiTags } from '@nestjs/swagger';
import type { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';

@ApiTags('System Information')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('error-codes')
  getErrorCodes(): IBeforeTransformResponseType<typeof ERROR_CODES> {
    return this.systemService.getErrorCodes();
  }

  @Get('error-messages')
  getErrorMessages(): IBeforeTransformResponseType<
    Record<keyof typeof ERROR_CODES, string>
  > {
    return this.systemService.getErrorMessages();
  }
}
