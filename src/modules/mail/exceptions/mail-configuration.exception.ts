import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '../../../constants/error-codes';
import { ERROR_MESSAGES } from '../../../constants/error-messages';

/**
 * Exception thrown when mail module configuration is invalid
 */
export class MailConfigurationException extends HttpException {
  constructor(details?: Record<string, unknown>) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorCode: ERROR_CODES.MAIL_CONFIGURATION_ERROR,
        message: ERROR_MESSAGES[ERROR_CODES.MAIL_CONFIGURATION_ERROR],
        details,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
