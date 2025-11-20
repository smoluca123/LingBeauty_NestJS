import { ERROR_CODES } from './error-codes';

export const ERROR_MESSAGES = {
  // Authentication & Authorization
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Invalid username or password',
  [ERROR_CODES.INVALID_USERNAME]: 'Invalid username',
  [ERROR_CODES.INVALID_PASSWORD]: 'Password is incorrect',
  [ERROR_CODES.TOKEN_EXPIRED]: 'Authentication token has expired',
  [ERROR_CODES.TOKEN_INVALID]: 'Invalid authentication token',
  [ERROR_CODES.INSUFFICIENT_PERMISSIONS]:
    'Insufficient permissions to perform this action',
  [ERROR_CODES.ACCOUNT_LOCKED]:
    'Account has been locked due to security reasons',
  [ERROR_CODES.INVALID_ACCESS_TOKEN]: 'Invalid access token',
  [ERROR_CODES.INVALID_REFRESH_TOKEN]: 'Invalid refresh token',
  [ERROR_CODES.USER_BANNED]: 'User has been banned',
  [ERROR_CODES.INVALID_OLD_PASSWORD]: 'Invalid old password',
  [ERROR_CODES.NOT_LOGGED_IN_FOR_FIRST_TIME]:
    'User is not logged in for the first time',
  [ERROR_CODES.USER_OVER_STORAGE_LIMIT]: 'User has reached the storage limit',
  [ERROR_CODES.SUBSCRIPTION_NOT_FOUND]: 'Subscription not found',
  [ERROR_CODES.USER_STATS_NOT_FOUND]: 'User stats not found',
  [ERROR_CODES.UPDATE_AVATAR_FAILED]: 'Failed to update avatar',
  [ERROR_CODES.EMAIL_NOT_FOUND]: 'Email not found',
  // Category
  [ERROR_CODES.CATEGORY_NOT_FOUND]: 'Category not found',
  [ERROR_CODES.CATEGORY_ALREADY_EXISTS]: 'Category already exists',
  [ERROR_CODES.CATEGORY_CANNOT_BE_OWN_PARENT]:
    'Category cannot be its own parent',
  [ERROR_CODES.PARENT_CATEGORY_NOT_FOUND]: 'Parent category not found',
  [ERROR_CODES.DELETE_CATEGORY_HAS_CHILDREN]:
    'Cannot delete category with child categories',
  [ERROR_CODES.DELETE_CATEGORY_HAS_PRODUCTS]:
    'Cannot delete category with products',

  // Brand
  [ERROR_CODES.BRAND_NOT_FOUND]: 'Brand not found',
  [ERROR_CODES.BRAND_ALREADY_EXISTS]: 'Brand already exists',
  [ERROR_CODES.DELETE_BRAND_HAS_PRODUCTS]: 'Cannot delete brand with products',

  // Referral
  [ERROR_CODES.REFERRAL_NOT_FOUND]: 'Referral not found',
  [ERROR_CODES.REFERRAL_USER_ALREADY_EXISTS]: 'Referral user already exists',
  [ERROR_CODES.REFERRAL_STATS_NOT_FOUND]: 'Referral stats not found',

  // User Management
  [ERROR_CODES.USER_NOT_FOUND]: 'User not found',
  [ERROR_CODES.USER_ALREADY_EXISTS]: 'User already exists',
  [ERROR_CODES.USER_INACTIVE]: 'User account is inactive',
  [ERROR_CODES.EMAIL_ALREADY_EXISTS]: 'Email address is already registered',
  [ERROR_CODES.INVALID_USER_DATA]: 'Invalid user data provided',
  [ERROR_CODES.UPDATE_USER_FAILED]: 'Failed to update user',
  [ERROR_CODES.PHONE_ALREADY_EXISTS]: 'Phone number is already registered',
  [ERROR_CODES.USERNAME_ALREADY_EXISTS]: 'Username is already taken',
  [ERROR_CODES.ADDRESS_NOT_FOUND]: 'Address not found',
  [ERROR_CODES.CREATE_ADDRESS_FAILED]: 'Failed to create address',
  [ERROR_CODES.UPDATE_ADDRESS_FAILED]: 'Failed to update address',
  [ERROR_CODES.DELETE_ADDRESS_FAILED]: 'Failed to delete address',
  [ERROR_CODES.ADDRESS_NOT_OWNED]:
    'You do not have permission to access this address',
  [ERROR_CODES.UNAUTHORIZED]: 'Unauthorized',
  // Business Logic
  [ERROR_CODES.INVALID_OPERATION]: 'Invalid operation requested',
  [ERROR_CODES.RESOURCE_NOT_FOUND]: 'Requested resource not found',
  [ERROR_CODES.OPERATION_NOT_ALLOWED]: 'Operation not allowed',
  [ERROR_CODES.BUSINESS_RULE_VIOLATION]: 'Business rule violation',
  [ERROR_CODES.INSUFFICIENT_BALANCE]:
    'Insufficient balance to complete operation',
  [ERROR_CODES.NOT_ALLOWED_TO_ACCESS_FILE]:
    'You do not have access to this file',
  // Validation
  [ERROR_CODES.VALIDATION_FAILED]: 'Validation failed',
  [ERROR_CODES.INVALID_INPUT_FORMAT]: 'Invalid input format',
  [ERROR_CODES.REQUIRED_FIELD_MISSING]: 'Required field is missing',
  [ERROR_CODES.INVALID_FILE_TYPE]: 'Invalid file type',
  [ERROR_CODES.FILE_TOO_LARGE]: 'File size exceeds maximum limit',

  // System Errors
  [ERROR_CODES.DATABASE_ERROR]: 'Database operation failed',
  [ERROR_CODES.EXTERNAL_SERVICE_ERROR]: 'External service is unavailable',
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]:
    'Rate limit exceeded. Please try again later',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 'Service is temporarily unavailable',
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: 'Internal server error occurred',
  [ERROR_CODES.NOT_ALLOWED_BY_CORS]: 'Not allowed by CORS',
} as const;

export const getErrorMessage = (errorCode: string): string => {
  return (
    ERROR_MESSAGES[errorCode as keyof typeof ERROR_MESSAGES] ||
    'Unknown error occurred'
  );
};
