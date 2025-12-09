import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import {
  MAIL_MODULE_OPTIONS,
  SendMailOptions,
  SendMailResult,
  SendTemplatedMailOptions,
  MailSender,
} from './interfaces';
import type { MailModuleOptions } from './interfaces';
import {
  MailSendException,
  MailConfigurationException,
  InvalidEmailException,
} from './exceptions';
import { TemplateService } from './template.service';
import { validateEmails, sanitizeEmails } from './utils/email-validator';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter;
  private defaultFrom: MailSender;

  constructor(
    @Inject(MAIL_MODULE_OPTIONS)
    private readonly options: MailModuleOptions,
    private readonly templateService: TemplateService,
  ) {
    this.defaultFrom = options.defaults.from;
    this.initializeTransporter();
  }

  private initializeTransporter(): void {
    try {
      this.transporter = nodemailer.createTransport({
        host: this.options.transport.host,
        port: this.options.transport.port,
        secure: this.options.transport.secure,
        auth: {
          user: this.options.transport.auth.user,
          pass: this.options.transport.auth.pass,
        },
      });
    } catch (error) {
      this.logger.error('Failed to initialize mail transporter', error);
      throw new MailConfigurationException({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async onModuleInit(): Promise<void> {
    await this.verifyConnection();
  }

  /**
   * Verify SMTP connection
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('SMTP connection verified successfully');
      return true;
    } catch (error) {
      this.logger.error('SMTP connection verification failed', error);
      return false;
    }
  }

  /**
   * Resolve sender information (use provided or default)
   */
  private resolveSender(from?: MailSender): string {
    const sender = from || this.defaultFrom;
    return `"${sender.name}" <${sender.address}>`;
  }

  /**
   * Validate all email addresses in options
   */
  private validateEmailAddresses(options: SendMailOptions): void {
    const allEmails: string[] = [];

    // Collect all email addresses
    if (options.to) {
      allEmails.push(
        ...(Array.isArray(options.to) ? options.to : [options.to]),
      );
    }
    if (options.cc) {
      allEmails.push(
        ...(Array.isArray(options.cc) ? options.cc : [options.cc]),
      );
    }
    if (options.bcc) {
      allEmails.push(
        ...(Array.isArray(options.bcc) ? options.bcc : [options.bcc]),
      );
    }

    // Validate all emails
    const { invalid } = validateEmails(allEmails);

    if (invalid.length > 0) {
      throw new InvalidEmailException(invalid);
    }
  }

  /**
   * Send raw email (without template)
   */
  async sendMail(options: SendMailOptions): Promise<SendMailResult> {
    // Validate email addresses
    this.validateEmailAddresses(options);

    try {
      // Sanitize email addresses
      const toEmails = sanitizeEmails(options.to);
      const ccEmails = options.cc ? sanitizeEmails(options.cc) : undefined;
      const bccEmails = options.bcc ? sanitizeEmails(options.bcc) : undefined;

      const mailOptions = {
        from: this.resolveSender(options.from),
        to: toEmails.join(', '),
        subject: options.subject,
        html: options.html,
        text: options.text,
        cc: ccEmails?.join(', '),
        bcc: bccEmails?.join(', '),
        attachments: options.attachments,
      };

      const result = await this.transporter.sendMail(mailOptions);

      this.logger.log(`Email sent successfully: ${result.messageId}`);

      return {
        success: true,
        messageId: result.messageId,
      };
    } catch (error) {
      this.logger.error('Failed to send email', error);
      throw new MailSendException({
        error: error instanceof Error ? error.message : String(error),
        to: options.to,
        subject: options.subject,
      });
    }
  }

  /**
   * Send templated email
   */
  async sendTemplatedMail(
    options: SendTemplatedMailOptions,
  ): Promise<SendMailResult> {
    try {
      // Add default context values
      const context = {
        ...options.context,
        year: new Date().getFullYear(),
      };

      const html = await this.templateService.renderTemplate(
        options.template,
        context,
      );

      return this.sendMail({
        to: options.to,
        subject: options.subject,
        html,
        cc: options.cc,
        bcc: options.bcc,
        attachments: options.attachments,
        from: options.from,
      });
    } catch (error) {
      if (error instanceof MailSendException) {
        throw error;
      }
      this.logger.error('Failed to send templated email', error);
      throw new MailSendException({
        error: error instanceof Error ? error.message : String(error),
        template: options.template,
        to: options.to,
      });
    }
  }

  /**
   * Send welcome/verification email
   */
  async sendWelcomeEmail(
    to: string,
    context: {
      userName: string;
      verificationLink: string;
      companyName: string;
      expiresIn?: string;
    },
  ): Promise<SendMailResult> {
    return this.sendTemplatedMail({
      to,
      subject: `Chào mừng bạn đến với ${context.companyName}`,
      template: 'welcome',
      context: {
        ...context,
        expiresIn: context.expiresIn || '24 giờ',
      },
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(
    to: string,
    context: {
      userName: string;
      resetLink: string;
      companyName: string;
      expiresIn?: string;
    },
  ): Promise<SendMailResult> {
    return this.sendTemplatedMail({
      to,
      subject: 'Yêu cầu đặt lại mật khẩu',
      template: 'password-reset',
      context: {
        ...context,
        expiresIn: context.expiresIn || '1 giờ',
      },
    });
  }

  /**
   * Send OTP verification email
   */
  async sendOtpEmail(
    to: string,
    context: {
      userName: string;
      otpCode: string;
      companyName: string;
      expiresIn?: string;
    },
  ): Promise<SendMailResult> {
    return this.sendTemplatedMail({
      to,
      subject: 'Mã xác thực OTP',
      template: 'otp-verification',
      context: {
        ...context,
        expiresIn: context.expiresIn || '5 phút',
      },
    });
  }

  /**
   * Send order confirmation email
   */
  async sendOrderConfirmationEmail(
    to: string,
    context: {
      userName: string;
      orderNumber: string;
      orderDate: string;
      items: Array<{
        name: string;
        quantity: number;
        price: number;
        subtotal: number;
      }>;
      total: number;
      companyName: string;
      shippingAddress?: string;
      shippingFee?: number;
      discount?: number;
      trackingLink?: string;
    },
  ): Promise<SendMailResult> {
    return this.sendTemplatedMail({
      to,
      subject: `Xác nhận đơn hàng #${context.orderNumber}`,
      template: 'order-confirmation',
      context,
    });
  }
}
