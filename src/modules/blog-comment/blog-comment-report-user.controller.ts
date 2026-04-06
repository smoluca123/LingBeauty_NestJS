import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BlogCommentReportService } from './blog-comment-report.service';
import { CreateCommentReportDto, BlogCommentReportResponseDto } from './dto';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import { ApiCreateCommentReport } from './decorators/blog-comment.decorators';
import { type IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';

@ApiTags('Blog Comment Reports - User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('blog-comment-report')
export class BlogCommentReportUserController {
  constructor(private readonly reportService: BlogCommentReportService) {}

  // User endpoint: Create report
  @Post()
  @ApiCreateCommentReport()
  createReport(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
    @Body() dto: CreateCommentReportDto,
  ): Promise<IBeforeTransformResponseType<BlogCommentReportResponseDto>> {
    return this.reportService.createReport(decodedToken.userId, dto);
  }
}
