import { Module } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentReportService } from './blog-comment-report.service';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentReportController } from './blog-comment-report.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BlogCommentController, BlogCommentReportController],
  providers: [BlogCommentService, BlogCommentReportService],
  exports: [BlogCommentService, BlogCommentReportService],
})
export class BlogCommentModule {}
