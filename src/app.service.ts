import { HttpStatus, Injectable } from '@nestjs/common';
import { ERROR_CODES } from 'src/constants/error-codes';
import {
  BusinessException,
  CustomUnauthorizedException,
} from 'src/exceptions/business.exception';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { IAPIInfoType } from 'src/libs/types/interfaces/utils.interfaces';

@Injectable()
export class AppService {
  getInfo(): IBeforeTransformResponseType<IAPIInfoType> {
    return {
      type: 'response',
      message: 'API is running',
      data: {
        name: 'API',
        version: '1.0.0',
        description: 'API for the project',
        author: 'Ling',
        license: 'MIT',
        contact: 'icaluca12@gmail.com',
        website: 'https://lingdethuong.com',
        documentation: 'https://lingdethuong.com/docs',
        support: 'https://lingdethuong.com/support',
      },
    };
  }
}
