import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { BlogCommentReportService } from './blog-comment-report.service';
import { BlogCommentService } from './blog-comment.service';
import { CreateCommentReportDto, BlogCommentReportResponseDto } from './dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';

import {
  ApiCreateCommentReport,
  ApiGetReports,
  ApiUpdateReportStatus,
  ApiAdminDeleteComment,
} from './decorators/blog-comment.decorators';
import { BlogCommentReportStatus } from 'prisma/generated/prisma/client';
import {
  RolesLevel,
  type IDecodedAccecssTokenType,
} from 'src/libs/types/interfaces/utils.interfaces';

@ApiTags('Blog Comment Reports')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('blog-comment-report')
export class BlogCommentReportController {
  constructor(
    private readonly reportService: BlogCommentReportService,
    private readonly commentService: BlogCommentService,
  ) {}

  // User endpoint: Create report
  @Post()
  @ApiCreateCommentReport()
  createReport(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
    @Body() dto: CreateCommentReportDto,
  ): Promise<IBeforeTransformResponseType<BlogCommentReportResponseDto>> {
    return this.reportService.createReport(decodedToken.userId, dto);
  }

  // Admin endpoints
  @Get()
  @UseGuards(RoleGuard)
  @Roles([RolesLevel.MANAGER])
  @ApiGetReports()
  getReports(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('status') status?: BlogCommentReportStatus,
    @Query('reason') reason?: string,
    @Query('commentId') commentId?: string,
  ): Promise<
    IBeforeTransformPaginationResponseType<BlogCommentReportResponseDto>
  > {
    return this.reportService.getReports({
      page,
      limit,
      status,
      commentId,
    });
  }

  @Get(':id')
  getReportById(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<BlogCommentReportResponseDto>> {
    return this.reportService.getReportById(id);
  }

  @Patch(':id/status')
  @ApiUpdateReportStatus()
  updateReportStatus(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
    @Param('id') id: string,
    @Body('status') status: BlogCommentReportStatus,
  ): Promise<IBeforeTransformResponseType<BlogCommentReportResponseDto>> {
    return this.reportService.updateReportStatus(
      decodedToken.userId,
      id,
      status,
    );
  }

  @Delete('comment/:id')
  @ApiAdminDeleteComment()
  adminDeleteComment(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.commentService.adminDeleteComment(id);
  }
}
