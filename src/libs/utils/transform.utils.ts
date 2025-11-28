import { Decimal } from '@prisma/client/runtime/client';
import { plainToInstance, ClassConstructor } from 'class-transformer';

/**
 * Recursively transforms Prisma-specific types and other non-serializable values
 * to JSON-safe types for API responses.
 *
 * Handles:
 * - BigInt -> string
 * - Date -> ISO string
 * - Prisma Decimal -> string (preserves precision)
 * - Maps, Sets, Buffers -> appropriate JSON representation
 * - Circular references protection
 *
 * @param obj - The object to transform
 * @param visited - Set to track circular references (internal use)
 * @returns Transformed object safe for JSON serialization
 */
export function serializeForResponse<T>(
  obj: T,
  visited = new WeakSet<object>(),
): T extends object ? any : T {
  // Handle primitives and null
  if (obj === null || obj === undefined) {
    return obj as any;
  }

  // Handle BigInt
  if (typeof obj === 'bigint') {
    return obj.toString() as any;
  }

  // Handle Date
  if (obj instanceof Date) {
    return obj.toISOString() as any;
  }

  // Handle Prisma Decimal
  // Check instanceof first, then fallback to checking constructor name and toString method
  if (obj instanceof Decimal) {
    return obj.toString() as any;
  }
  if (
    obj &&
    typeof obj === 'object' &&
    'constructor' in obj &&
    obj.constructor?.name === 'Decimal' &&
    typeof (obj as unknown as Decimal).toString === 'function'
  ) {
    return (obj as unknown as Decimal).toString() as any;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => serializeForResponse(item, visited)) as any;
  }

  // Handle Buffer (Node.js)
  if (Buffer.isBuffer(obj)) {
    return (obj as Buffer).toString('base64') as any;
  }

  // Handle Map
  if (obj instanceof Map) {
    return Object.fromEntries(
      Array.from(obj.entries()).map(([key, value]) => [
        serializeForResponse(key, visited),
        serializeForResponse(value, visited),
      ]),
    ) as any;
  }

  // Handle Set
  if (obj instanceof Set) {
    return Array.from(obj).map((item) =>
      serializeForResponse(item, visited),
    ) as any;
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    return obj.toString() as any;
  }

  // Handle plain objects
  if (typeof obj === 'object') {
    // Prevent circular reference
    if (visited.has(obj as object)) {
      return '[Circular]' as any;
    }

    visited.add(obj as object);

    try {
      const result: Record<string, any> = {};

      // Use Object.entries for better compatibility
      // This includes enumerable properties and handles Symbol keys if needed
      for (const [key, value] of Object.entries(obj as Record<string, any>)) {
        result[key] = serializeForResponse(value, visited);
      }

      // Handle Symbol keys if needed (optional, only if you use Symbol keys)
      const symbolKeys = Object.getOwnPropertySymbols(obj as object);
      if (symbolKeys.length > 0) {
        for (const symKey of symbolKeys) {
          const value = (obj as Record<symbol, any>)[symKey];
          // Convert Symbol to string key (optional behavior)
          result[String(symKey)] = serializeForResponse(value, visited);
        }
      }

      return result as any;
    } finally {
      visited.delete(obj as object);
    }
  }

  // Return primitive values as-is
  return obj as any;
}

/**
 * Transforms Prisma result(s) to Response DTO instance(s)
 * Works with single objects or arrays
 * Automatically handles @Exclude() decorators via ClassSerializerInterceptor
 *
 * @param dtoClass - The DTO class to transform to
 * @param data - Prisma result(s) to transform
 * @returns Transformed DTO instance(s)
 *
 * @example
 * const user = await prisma.user.findUnique({ where: { id } });
 * const userDto = toResponseDto(UserResponseDto, user);
 *
 * @example
 * const users = await prisma.user.findMany();
 * const userDtos = toResponseDto(UserResponseDto, users);
 */
export function toResponseDto<T>(dtoClass: ClassConstructor<T>, data: any): T {
  // First serialize to convert Decimal, BigInt, Date, etc. to JSON-safe types
  const serialized = serializeForResponse(data);
  return plainToInstance(dtoClass, serialized, {
    excludeExtraneousValues: false,
  });
}

/**
 * Transforms an array of Prisma results to Response DTO instances
 *
 * @param dtoClass - The DTO class to transform to
 * @param dataArray - Array of Prisma results to transform
 * @returns Array of transformed DTO instances
 *
 * @example
 * const users = await prisma.user.findMany();
 * const userDtos = toResponseDtoArray(UserResponseDto, users);
 */
export function toResponseDtoArray<T>(
  dtoClass: ClassConstructor<T>,
  dataArray: any[],
): T[] {
  return dataArray.map((item) => toResponseDto(dtoClass, item));
}
