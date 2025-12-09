import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '../../../constants/error-codes';
import { ERROR_MESSAGES } from '../../../constants/error-messages';

/**
 * Exception thrown when email address is invalid
 */
export class InvalidEmailException extends HttpException {
  constructor(invalidEmails: string[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: ERROR_CODES.MAIL_INVALID_EMAIL,
        message: ERROR_MESSAGES[ERROR_CODES.MAIL_INVALID_EMAIL],
        invalidEmails,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
