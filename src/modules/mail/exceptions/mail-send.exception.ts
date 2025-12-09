import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '../../../constants/error-codes';
import { ERROR_MESSAGES } from '../../../constants/error-messages';

/**
 * Exception thrown when email sending fails
 */
export class MailSendException extends HttpException {
  constructor(details?: Record<string, unknown>) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorCode: ERROR_CODES.MAIL_SEND_FAILED,
        message: ERROR_MESSAGES[ERROR_CODES.MAIL_SEND_FAILED],
        details,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
