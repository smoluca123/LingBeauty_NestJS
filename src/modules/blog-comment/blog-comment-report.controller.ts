import {
  Controller,
  Get,
  Patch,
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
import { BlogCommentReportResponseDto, UpdateReportStatusDto } from './dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import {
  ApiGetReports,
  ApiUpdateReportStatus,
} from './decorators/blog-comment.decorators';
import { BlogCommentReportStatus } from 'prisma/generated/prisma/client';
import {
  RolesLevel,
  type IDecodedAccecssTokenType,
} from 'src/libs/types/interfaces/utils.interfaces';

@ApiTags('Blog Comment Reports - Admin')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Roles([RolesLevel.MANAGER])
@Controller('admin/blog-comment-report')
export class BlogCommentReportController {
  constructor(private readonly reportService: BlogCommentReportService) {}

  // Admin endpoints
  @Get()
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
    @Body() dto: UpdateReportStatusDto,
  ): Promise<IBeforeTransformResponseType<BlogCommentReportResponseDto>> {
    return this.reportService.updateReportStatus(
      decodedToken.userId,
      id,
      dto.status,
    );
  }
}
