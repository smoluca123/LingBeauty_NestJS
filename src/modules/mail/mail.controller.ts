import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { TestMailDto, TestRawMailDto } from './dto/test-mail.dto';
import { ApiTestMail, ApiTestRawMail } from './decorators/mail-api.decorators';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { MailResponseDto } from './dto/mail-response.dto';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('test')
  @ApiTestMail()
  async testSendMail(
    @Body() dto: TestMailDto,
  ): Promise<IBeforeTransformResponseType<MailResponseDto>> {
    const { to, template = 'welcome', userName = 'Test User' } = dto;

    let result: MailResponseDto;

    switch (template) {
      case 'welcome':
        result = await this.mailService.sendWelcomeEmail(to, {
          userName,
          verificationLink: 'https://example.com/verify?token=test123',
          companyName: 'My App',
        });
        break;

      case 'password-reset':
        result = await this.mailService.sendPasswordResetEmail(to, {
          userName,
          resetLink: 'https://example.com/reset?token=test123',
          companyName: 'My App',
        });
        break;

      case 'otp-verification':
        result = await this.mailService.sendOtpEmail(to, {
          userName,
          otpCode: '123456',
          companyName: 'My App',
        });
        break;

      case 'order-confirmation':
        result = await this.mailService.sendOrderConfirmationEmail(to, {
          userName,
          orderNumber: 'ORD-2024-001',
          orderDate: new Date().toLocaleDateString('vi-VN'),
          items: [
            { name: 'Product A', quantity: 2, price: 100000, subtotal: 200000 },
            { name: 'Product B', quantity: 1, price: 150000, subtotal: 150000 },
          ],
          total: 350000,
          companyName: 'My App',
          shippingAddress: '123 Test Street, District 1, HCMC',
          shippingFee: 30000,
        });
        break;

      default:
        result = await this.mailService.sendWelcomeEmail(to, {
          userName,
          verificationLink: 'https://example.com/verify?token=test123',
          companyName: 'My App',
        });
    }

    return {
      type: 'response',
      message: 'Email sent successfully',
      data: result,
    };
  }

  @Post('test/raw')
  @ApiTestRawMail()
  async testSendRawMail(
    @Body() dto: TestRawMailDto,
  ): Promise<IBeforeTransformResponseType<MailResponseDto>> {
    const result = await this.mailService.sendMail({
      to: dto.to,
      subject: dto.subject,
      html: dto.html,
    });

    return {
      type: 'response',
      message: 'Email sent successfully',
      data: result,
    };
  }
}
