import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key for marking routes as public
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator to mark routes as public (bypass authentication)
 * Use this decorator on controller methods that should be accessible without authentication
 *
 * @example
 * ```typescript
 * @Get('public')
 * @Public()
 * getPublicData() {
 *   return this.service.getPublicData();
 * }
 * ```
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
