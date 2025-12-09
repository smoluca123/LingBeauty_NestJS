import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '../../../constants/error-codes';
import { ERROR_MESSAGES } from '../../../constants/error-messages';

/**
 * Exception thrown when a requested email template is not found
 */
export class TemplateNotFoundException extends HttpException {
  constructor(templateName: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        errorCode: ERROR_CODES.MAIL_TEMPLATE_NOT_FOUND,
        message: ERROR_MESSAGES[ERROR_CODES.MAIL_TEMPLATE_NOT_FOUND],
        templateName,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
