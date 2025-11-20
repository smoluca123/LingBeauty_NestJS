import { Injectable } from '@nestjs/common';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';

@Injectable()
export class SystemService {
  getErrorCodes(): IBeforeTransformResponseType<typeof ERROR_CODES> {
    return {
      type: 'response',
      message: 'Error codes fetched successfully',
      data: ERROR_CODES,
    };
  }

  getErrorMessages(): IBeforeTransformResponseType<
    Record<keyof typeof ERROR_CODES, string>
  > {
    return {
      type: 'response',
      message: 'Error messages fetched successfully',
      data: ERROR_MESSAGES as unknown as Record<
        keyof typeof ERROR_CODES,
        string
      >,
    };
  }
}
