import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import type { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import type { IAPIInfoType } from 'src/libs/types/interfaces/utils.interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getInfo(): IBeforeTransformResponseType<IAPIInfoType> {
    return this.appService.getInfo();
  }
}
