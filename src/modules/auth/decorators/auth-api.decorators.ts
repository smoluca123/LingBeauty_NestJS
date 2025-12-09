import { applyDecorators } from '@nestjs/common';
import { AuthResponseDto } from '../dto/response/auth-response.dto';
import { ValidateTokenResponseDto } from '../dto/response/validate-token-response.dto';
import {
  ApiProtectedAuthOperation,
  ApiPublicOperation,
} from 'src/decorators/api.decorators';
import { ApiResponse } from '@nestjs/swagger';

/**
 * Specific decorators for common auth endpoints
 */
export const ApiRegister = () =>
  ApiPublicOperation({
    summary: 'Register a new user',
    description: 'User registered successfully',
  });

export const ApiLogin = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Login with email and password',
      description: 'Login successful',
    }),
    ApiResponse({
      status: 200,
      description: 'Login successful',
      type: AuthResponseDto,
    }),
  );

export const ApiRefreshToken = () =>
  ApiProtectedAuthOperation({
    summary: 'Refresh access token using refresh token',
    description: 'Token refreshed successfully',
  });

export const ApiSendEmailVerification = () =>
  ApiProtectedAuthOperation({
    summary: 'Send email verification code',
    description: 'Verification code sent to email',
  });

export const ApiVerifyEmail = () =>
  ApiProtectedAuthOperation({
    summary: 'Verify email with OTP code',
    description: 'Email verified successfully',
  });

export const ApiSendPhoneVerification = () =>
  ApiProtectedAuthOperation({
    summary: 'Send phone verification code',
    description: 'Verification code sent to phone',
  });

export const ApiVerifyPhone = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Verify phone with OTP code',
      description: 'Phone verified successfully',
    }),
    ApiResponse({
      status: 200,
      description: 'Phone verified successfully',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Phone verified successfully',
            example: 'Your phone number has been verified successfully',
          },
        },
      },
    }),
  );

export const ApiValidateToken = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Validate access token',
      description:
        'Validate access token from header and return user data with expiration info',
    }),
    ApiResponse({
      status: 200,
      description: 'Token is valid',
      type: ValidateTokenResponseDto,
    }),
  );
