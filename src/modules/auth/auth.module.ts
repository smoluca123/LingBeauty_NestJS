import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { JwtAuthModule } from 'src/modules/jwt/jwt.module';
import { MailModule } from 'src/modules/mail/mail.module';

@Module({
  imports: [PrismaModule, JwtAuthModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
