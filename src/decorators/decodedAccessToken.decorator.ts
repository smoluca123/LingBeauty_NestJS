import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import {
  IDecodedAccecssTokenType,
  IRequestWithDecodedAccessToken,
} from 'src/libs/types/interfaces/utils.interfaces';

export const DecodedAccessToken = createParamDecorator(
  (data: string, ctx: ExecutionContext): IDecodedAccecssTokenType => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const request = ctx
      .switchToHttp()
      .getRequest() as IRequestWithDecodedAccessToken;
    return request.decodedAccessToken;
  },
);
