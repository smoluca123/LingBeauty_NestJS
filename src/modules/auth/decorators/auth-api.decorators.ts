import { applyDecorators } from '@nestjs/common';
import { AuthResponseDto } from '../dto/response/auth-response.dto';
import { ValidateTokenResponseDto } from '../dto/response/validate-token-response.dto';
import { SendOtpResponseDto } from '../dto/response/send-otp-response.dto';
import { RateLimitErrorDto } from '../dto/response/rate-limit-error.dto';
import {
  ApiProtectedAuthOperation,
  ApiPublicOperation,
} from 'src/decorators/api.decorators';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Specific decorators for common auth endpoints
 */
export const ApiRegister = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Register a new user',
      description: 'User registered successfully',
    }),
    ApiResponse({
      status: 201,
      description: 'Register successful',
      type: AuthResponseDto,
    }),
  );

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
  applyDecorators(
    ApiOperation({
      summary: 'Refresh access token using refresh token',
      description: 'Token refreshed successfully',
    }),
    ApiHeader({
      name: 'accessToken',
      description: 'Bearer <accessToken>',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Token refreshed successfully',
      type: AuthResponseDto,
    }),
    // ApiProtectedAuthOperation({
    //   summary: 'Refresh access token using refresh token',
    //   description: 'Token refreshed successfully',
    // }),
  );

export const ApiSendEmailVerification = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Send email verification code',
      description:
        'Generate and send OTP code to user email. Rate limited to 3 requests per 5 minutes.',
    }),
    ApiResponse({
      status: 200,
      description: 'Verification code sent successfully',
      type: SendOtpResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Email is already verified',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Email is already verified' },
          errorCode: { type: 'string', example: 'BIZ_001' },
        },
      },
    }),
    ApiResponse({
      status: 429,
      description: 'Rate limit exceeded',
      type: RateLimitErrorDto,
    }),
  );

export const ApiVerifyEmail = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Verify email with OTP code',
      description:
        'Verify user email using the 6-digit OTP code sent via email',
    }),
    ApiResponse({
      status: 200,
      description: 'Email verified successfully',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Your email has been verified successfully',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Email is already verified',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Email is already verified' },
          errorCode: { type: 'string', example: 'BIZ_001' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Invalid or expired verification code',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Invalid verification code',
          },
          errorCode: { type: 'string', example: 'AUTH_001' },
        },
      },
    }),
  );

export const ApiResendEmailVerification = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Resend email verification code',
      description:
        'Resend OTP code to email. Invalidates previous OTP. Rate limited to 3 requests per 5 minutes.',
    }),
    ApiResponse({
      status: 200,
      description: 'Verification code resent successfully',
      type: SendOtpResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Email is already verified',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Email is already verified' },
          errorCode: { type: 'string', example: 'BIZ_001' },
        },
      },
    }),
    ApiResponse({
      status: 429,
      description: 'Rate limit exceeded',
      type: RateLimitErrorDto,
    }),
  );

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
