import { z } from 'zod';

/**
 * Zod schema for email validation
 */
export const emailSchema = z.email().trim().toLowerCase();

/**
 * Zod schema for array of emails
 */
export const emailArraySchema = z.array(emailSchema).min(1);

/**
 * Zod schema for single or array of emails
 */
export const emailOrArraySchema = z.union([emailSchema, emailArraySchema]);

/**
 * Validate a single email address using Zod
 */
export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

/**
 * Validate multiple email addresses using Zod
 */
export function validateEmails(emails: string | string[]): {
  valid: string[];
  invalid: string[];
} {
  const emailList = Array.isArray(emails) ? emails : [emails];
  const valid: string[] = [];
  const invalid: string[] = [];

  for (const email of emailList) {
    const result = emailSchema.safeParse(email);
    if (result.success) {
      valid.push(result.data);
    } else {
      invalid.push(email);
    }
  }

  return { valid, invalid };
}

/**
 * Sanitize and validate emails - returns sanitized emails or throws
 */
export function sanitizeEmails(emails: string | string[]): string[] {
  const emailList = Array.isArray(emails) ? emails : [emails];
  return emailList.map((email) => emailSchema.parse(email));
}

/**
 * Safe sanitize emails - returns result object instead of throwing
 */
export function safeSanitizeEmails(emails: string | string[]): {
  success: boolean;
  data?: string[];
  error?: z.ZodError;
} {
  const emailList = Array.isArray(emails) ? emails : [emails];
  const result = z.array(emailSchema).safeParse(emailList);

  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
