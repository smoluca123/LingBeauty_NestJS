import { Injectable, Logger } from '@nestjs/common';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { BusinessException } from 'src/exceptions/business.exception';

export interface MigrationResult {
  productsProcessed: number;
  variantsCreated: number;
  inventoryMigrated: number;
  inventoryDeleted: number;
  flashSaleProductsUpdated: number;
  errors: string[];
}

@Injectable()
export class SystemService {
  private readonly logger = new Logger(SystemService.name);

  constructor(private readonly prismaService: PrismaService) {}

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
