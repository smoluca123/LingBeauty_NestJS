import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { TemplateService } from './template.service';
import { MAIL_MODULE_OPTIONS } from './interfaces';
import { InvalidEmailException } from './exceptions';

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    verify: jest.fn().mockResolvedValue(true),
    sendMail: jest.fn().mockResolvedValue({
      messageId: 'test-message-id-123',
    }),
  }),
}));

describe('MailService', () => {
  let service: MailService;
  let templateService: TemplateService;

  const mockOptions = {
    transport: {
      host: 'smtp.test.com',
      port: 587,
      secure: false,
      auth: { user: 'test', pass: 'test' },
    },
    defaults: {
      from: { name: 'Test Company', address: 'noreply@test.com' },
    },
  };

  const mockTemplateService = {
    renderTemplate: jest.fn().mockResolvedValue('<html>Test Email</html>'),
    onModuleInit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MAIL_MODULE_OPTIONS,
          useValue: mockOptions,
        },
        {
          provide: TemplateService,
          useValue: mockTemplateService,
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    templateService = module.get<TemplateService>(TemplateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('verifyConnection', () => {
    it('should verify SMTP connection successfully', async () => {
      const result = await service.verifyConnection();
      expect(result).toBe(true);
    });
  });

  describe('sendMail', () => {
    it('should send email successfully', async () => {
      const result = await service.sendMail({
        to: 'recipient@example.com',
        subject: 'Test Subject',
        html: '<h1>Test</h1>',
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toBe('test-message-id-123');
    });

    it('should send email to multiple recipients', async () => {
      const result = await service.sendMail({
        to: ['user1@example.com', 'user2@example.com'],
        subject: 'Test Subject',
        html: '<h1>Test</h1>',
      });

      expect(result.success).toBe(true);
    });

    it('should throw InvalidEmailException for invalid email', async () => {
      await expect(
        service.sendMail({
          to: 'invalid-email',
          subject: 'Test',
          html: '<h1>Test</h1>',
        }),
      ).rejects.toThrow(InvalidEmailException);
    });

    it('should throw InvalidEmailException for invalid CC email', async () => {
      await expect(
        service.sendMail({
          to: 'valid@example.com',
          cc: 'invalid-cc',
          subject: 'Test',
          html: '<h1>Test</h1>',
        }),
      ).rejects.toThrow(InvalidEmailException);
    });

    it('should throw InvalidEmailException for invalid BCC email', async () => {
      await expect(
        service.sendMail({
          to: 'valid@example.com',
          bcc: 'invalid-bcc',
          subject: 'Test',
          html: '<h1>Test</h1>',
        }),
      ).rejects.toThrow(InvalidEmailException);
    });

    it('should handle CC and BCC recipients', async () => {
      const result = await service.sendMail({
        to: 'recipient@example.com',
        cc: 'cc@example.com',
        bcc: ['bcc1@example.com', 'bcc2@example.com'],
        subject: 'Test Subject',
        html: '<h1>Test</h1>',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sendTemplatedMail', () => {
    it('should send templated email successfully', async () => {
      const result = await service.sendTemplatedMail({
        to: 'recipient@example.com',
        subject: 'Test Subject',
        template: 'welcome',
        context: { userName: 'John' },
      });

      expect(result.success).toBe(true);
      expect(templateService.renderTemplate).toHaveBeenCalledWith(
        'welcome',
        expect.objectContaining({ userName: 'John' }),
      );
    });

    it('should add year to context automatically', async () => {
      await service.sendTemplatedMail({
        to: 'recipient@example.com',
        subject: 'Test',
        template: 'welcome',
        context: { userName: 'John' },
      });

      expect(templateService.renderTemplate).toHaveBeenCalledWith(
        'welcome',
        expect.objectContaining({ year: new Date().getFullYear() }),
      );
    });
  });

  describe('sendWelcomeEmail', () => {
    it('should send welcome email with correct template', async () => {
      const result = await service.sendWelcomeEmail('user@example.com', {
        userName: 'John',
        verificationLink: 'https://example.com/verify',
        companyName: 'Test Co',
      });

      expect(result.success).toBe(true);
      expect(templateService.renderTemplate).toHaveBeenCalledWith(
        'welcome',
        expect.objectContaining({
          userName: 'John',
          verificationLink: 'https://example.com/verify',
          companyName: 'Test Co',
          expiresIn: '24 giờ',
        }),
      );
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should send password reset email with correct template', async () => {
      const result = await service.sendPasswordResetEmail('user@example.com', {
        userName: 'John',
        resetLink: 'https://example.com/reset',
        companyName: 'Test Co',
      });

      expect(result.success).toBe(true);
      expect(templateService.renderTemplate).toHaveBeenCalledWith(
        'password-reset',
        expect.objectContaining({
          userName: 'John',
          resetLink: 'https://example.com/reset',
          expiresIn: '1 giờ',
        }),
      );
    });
  });

  describe('sendOtpEmail', () => {
    it('should send OTP email with correct template', async () => {
      const result = await service.sendOtpEmail('user@example.com', {
        userName: 'John',
        otpCode: '123456',
        companyName: 'Test Co',
      });

      expect(result.success).toBe(true);
      expect(templateService.renderTemplate).toHaveBeenCalledWith(
        'otp-verification',
        expect.objectContaining({
          userName: 'John',
          otpCode: '123456',
          expiresIn: '5 phút',
        }),
      );
    });
  });

  describe('sendOrderConfirmationEmail', () => {
    it('should send order confirmation email with correct template', async () => {
      const orderContext = {
        userName: 'John',
        orderNumber: 'ORD-001',
        orderDate: '2024-01-01',
        items: [{ name: 'Product', quantity: 1, price: 100, subtotal: 100 }],
        total: 100,
        companyName: 'Test Co',
      };

      const result = await service.sendOrderConfirmationEmail(
        'user@example.com',
        orderContext,
      );

      expect(result.success).toBe(true);
      expect(templateService.renderTemplate).toHaveBeenCalledWith(
        'order-confirmation',
        expect.objectContaining(orderContext),
      );
    });
  });
});
