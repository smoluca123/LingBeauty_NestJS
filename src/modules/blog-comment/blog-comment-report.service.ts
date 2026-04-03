import { Injectable } from '@nestjs/common';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { withoutDeleted } from 'src/libs/prisma/soft-delete.helpers';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  toResponseDto,
  toResponseDtoArray,
} from 'src/libs/utils/transform.utils';
import { CreateCommentReportDto, BlogCommentReportResponseDto } from './dto';
import { commentReportSelect } from 'src/libs/prisma/blog-comment-select';
import {
  BlogCommentReportStatus,
  BlogCommentReportReason,
} from 'prisma/generated/prisma/client';

export interface GetReportsParams {
  page?: number;
  limit?: number;
  commentId?: string;
  reporterId?: string;
  status?: BlogCommentReportStatus;
  reason?: BlogCommentReportReason;
  sortBy?: 'createdAt';
  order?: 'asc' | 'desc';
}

@Injectable()
export class BlogCommentReportService {
  constructor(private readonly prismaService: PrismaService) {}

  async getReports(
    params: GetReportsParams,
  ): Promise<
    IBeforeTransformPaginationResponseType<BlogCommentReportResponseDto>
  > {
    const {
      page = 1,
      limit = 20,
      commentId,
      reporterId,
      status,
      reason,
      sortBy = 'createdAt',
      order = 'desc',
    } = params;

    try {
      const whereQuery = {
        ...(commentId && { commentId }),
        ...(reporterId && { reporterId }),
        ...(status && { status }),
        ...(reason && { reason }),
      };

      const [reports, totalCount] = await Promise.all([
        this.prismaService.blogCommentReport.findMany({
          where: whereQuery,
          select: commentReportSelect,
          orderBy: { [sortBy]: order },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.blogCommentReport.count({
          where: whereQuery,
        }),
      ]);

      const reportResponses = toResponseDtoArray(
        BlogCommentReportResponseDto,
        reports,
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách báo cáo thành công',
        data: {
          items: reportResponses,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getReportById(
    reportId: string,
  ): Promise<IBeforeTransformResponseType<BlogCommentReportResponseDto>> {
    try {
      const report = await this.prismaService.blogCommentReport.findUnique({
        where: { id: reportId },
        select: commentReportSelect,
      });

      if (!report) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REPORT_NOT_FOUND],
          ERROR_CODES.REPORT_NOT_FOUND,
        );
      }

      const result = toResponseDto(BlogCommentReportResponseDto, report);

      return {
        type: 'response',
        message: 'Lấy thông tin báo cáo thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async createReport(
    userId: string,
    dto: CreateCommentReportDto,
  ): Promise<IBeforeTransformResponseType<BlogCommentReportResponseDto>> {
    try {
      // Check if comment exists and not deleted
      const comment = await this.prismaService.blogComment.findFirst({
        where: withoutDeleted({ id: dto.commentId }),
        select: { id: true, userId: true },
      });

      if (!comment) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.COMMENT_NOT_FOUND],
          ERROR_CODES.COMMENT_NOT_FOUND,
        );
      }

      // Prevent users from reporting their own comments
      if (comment.userId === userId) {
        throw new BusinessException(
          'Không thể báo cáo bình luận của chính mình',
          ERROR_CODES.CANNOT_REPORT_OWN_COMMENT,
        );
      }

      // Check if user already reported this comment
      const existingReport =
        await this.prismaService.blogCommentReport.findFirst({
          where: {
            commentId: dto.commentId,
            reporterId: userId,
          },
          select: { id: true },
        });

      if (existingReport) {
        throw new BusinessException(
          'Bạn đã báo cáo bình luận này rồi',
          ERROR_CODES.REPORT_ALREADY_EXISTS,
        );
      }

      const report = await this.prismaService.blogCommentReport.create({
        data: {
          commentId: dto.commentId,
          reporterId: userId,
          reason: dto.reason,
          description: dto.description,
        },
        select: commentReportSelect,
      });

      const result = toResponseDto(BlogCommentReportResponseDto, report);

      return {
        type: 'response',
        message: 'Báo cáo bình luận thành công',
        data: result,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // Admin method to update report status
  async updateReportStatus(
    adminId: string,
    reportId: string,
    status: BlogCommentReportStatus,
  ): Promise<IBeforeTransformResponseType<BlogCommentReportResponseDto>> {
    try {
      const existingReport =
        await this.prismaService.blogCommentReport.findUnique({
          where: { id: reportId },
          select: { id: true },
        });

      if (!existingReport) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REPORT_NOT_FOUND],
          ERROR_CODES.REPORT_NOT_FOUND,
        );
      }

      const updated = await this.prismaService.blogCommentReport.update({
        where: { id: reportId },
        data: {
          status,
          reviewedBy: adminId,
          reviewedAt: new Date(),
        },
        select: commentReportSelect,
      });

      const result = toResponseDto(BlogCommentReportResponseDto, updated);

      return {
        type: 'response',
        message: 'Cập nhật trạng thái báo cáo thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
}
