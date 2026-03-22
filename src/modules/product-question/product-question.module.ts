import { Module } from '@nestjs/common';
import { ProductQuestionService } from './product-question.service';
import { ProductQuestionController } from './product-question.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [ProductQuestionController],
  providers: [ProductQuestionService, PrismaService],
  exports: [ProductQuestionService],
})
export class ProductQuestionModule {}
