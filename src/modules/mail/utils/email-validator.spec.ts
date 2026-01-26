import {
  isValidEmail,
  validateEmails,
  sanitizeEmails,
  safeSanitizeEmails,
} from './email-validator';

describe('EmailValidator', () => {
  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.com',
        'user+tag@example.org',
        'user123@test.co.uk',
      ];

      validEmails.forEach((email) => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    it('should return false for invalid email addresses', () => {
      const invalidEmails = [
        'invalid',
        'invalid@',
        '@domain.com',
        'user@.com',
        '',
      ];

      invalidEmails.forEach((email) => {
        expect(isValidEmail(email)).toBe(false);
      });
    });
  });

  describe('validateEmails', () => {
    it('should separate valid and invalid emails', () => {
      const emails = ['valid@example.com', 'invalid', 'another@test.com'];
      const result = validateEmails(emails);

      expect(result.valid).toContain('valid@example.com');
      expect(result.valid).toContain('another@test.com');
      expect(result.invalid).toContain('invalid');
    });

    it('should handle single email string', () => {
      const result = validateEmails('test@example.com');
      expect(result.valid).toHaveLength(1);
      expect(result.invalid).toHaveLength(0);
    });

    it('should handle all valid emails', () => {
      const emails = ['a@b.com', 'c@d.com'];
      const result = validateEmails(emails);

      expect(result.valid).toHaveLength(2);
      expect(result.invalid).toHaveLength(0);
    });

    it('should handle all invalid emails', () => {
      const emails = ['invalid1', 'invalid2'];
      const result = validateEmails(emails);

      expect(result.valid).toHaveLength(0);
      expect(result.invalid).toHaveLength(2);
    });

    it('should trim and lowercase valid emails', () => {
      // Zod's email() with trim() handles trimming during validation
      const result = validateEmails('Test@EXAMPLE.COM');
      expect(result.valid[0]).toBe('test@example.com');
    });
  });

  describe('sanitizeEmails', () => {
    it('should sanitize valid emails', () => {
      const result = sanitizeEmails(['test@example.com', 'user@domain.com']);
      expect(result).toEqual(['test@example.com', 'user@domain.com']);
    });

    it('should trim and lowercase emails', () => {
      const result = sanitizeEmails(['Test@EXAMPLE.COM']);
      expect(result).toEqual(['test@example.com']);
    });

    it('should throw for invalid emails', () => {
      expect(() => sanitizeEmails(['invalid-email'])).toThrow();
    });
  });

  describe('safeSanitizeEmails', () => {
    it('should return success for valid emails', () => {
      const result = safeSanitizeEmails(['test@example.com']);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(['test@example.com']);
    });

    it('should return error for invalid emails', () => {
      const result = safeSanitizeEmails(['invalid']);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
