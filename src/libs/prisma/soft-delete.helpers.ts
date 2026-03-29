/**
 * Soft Delete Helper Functions
 * Use these functions to handle soft delete operations manually in services
 */

/**
 * Add isDeleted filter to where clause
 * Use this in all findMany/findFirst queries
 */
export function withoutDeleted<T extends Record<string, any>>(
  where?: T,
): T & { isDeleted: boolean } {
  return {
    ...where,
    isDeleted: false,
  } as T & { isDeleted: boolean };
}

/**
 * Include soft-deleted records in queries
 * Use when you need to query all records including deleted ones
 */
export function withDeleted<T extends Record<string, any>>(where?: T): T {
  // Don't add isDeleted filter, return as-is
  return where || ({} as T);
}

/**
 * Query only soft-deleted records
 * Use for admin interfaces to view deleted records
 */
export function onlyDeleted<T extends Record<string, any>>(
  where?: T,
): T & { isDeleted: boolean } {
  return {
    ...where,
    isDeleted: true,
  } as T & { isDeleted: boolean };
}

/**
 * Soft delete a record (set isDeleted = true)
 * Use this instead of prisma.model.delete()
 */
export function softDeleteData() {
  return {
    isDeleted: true,
    deletedAt: new Date(),
  };
}

/**
 * Restore a soft-deleted record
 * Use to undelete records
 */
export function restoreData() {
  return {
    isDeleted: false,
    deletedAt: null,
  };
}
