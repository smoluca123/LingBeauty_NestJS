import { Injectable } from '@nestjs/common';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  softDeleteData,
  withoutDeleted,
} from 'src/libs/prisma/soft-delete.helpers';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  toResponseDto,
  toResponseDtoArray,
} from 'src/libs/utils/transform.utils';
import {
  CreateBlogCommentDto,
  UpdateBlogCommentDto,
  BlogCommentResponseDto,
} from './dto';
import {
  blogCommentSelect,
  blogCommentWithRepliesSelect,
} from 'src/libs/prisma/blog-comment-select';

export interface GetCommentsParams {
  page?: number;
  limit?: number;
  postId?: string;
  userId?: string;
  parentId?: string | null;
  sortBy?: 'createdAt';
  order?: 'asc' | 'desc';
}

@Injectable()
export class BlogCommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPostComments(
    params: GetCommentsParams,
  ): Promise<IBeforeTransformPaginationResponseType<BlogCommentResponseDto>> {
    const {
      page = 1,
      limit = 20,
      postId,
      userId,
      parentId,
      sortBy = 'createdAt',
      order = 'desc',
    } = params;

    try {
      const whereQuery = withoutDeleted({
        ...(postId && { postId }),
        ...(userId && { userId }),
        ...(parentId !== undefined && { parentId }),
      });

      const [comments, totalCount] = await Promise.all([
        this.prismaService.blogComment.findMany({
          where: whereQuery,
          select: blogCommentWithRepliesSelect,
          orderBy: { [sortBy]: order },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.blogComment.count({
          where: whereQuery,
        }),
      ]);

      const commentResponses = toResponseDtoArray(
        BlogCommentResponseDto,
        comments,
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách bình luận thành công',
        data: {
          items: commentResponses,
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

  async getCommentById(
    commentId: string,
  ): Promise<IBeforeTransformResponseType<BlogCommentResponseDto>> {
    try {
      const comment = await this.prismaService.blogComment.findFirst({
        where: withoutDeleted({ id: commentId }),
        select: blogCommentWithRepliesSelect,
      });

      if (!comment) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.COMMENT_NOT_FOUND],
          ERROR_CODES.COMMENT_NOT_FOUND,
        );
      }

      const result = toResponseDto(BlogCommentResponseDto, comment);

      return {
        type: 'response',
        message: 'Lấy thông tin bình luận thành công',
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

  async createComment(
    userId: string,
    dto: CreateBlogCommentDto,
  ): Promise<IBeforeTransformResponseType<BlogCommentResponseDto>> {
    try {
      // Check if blog post exists and not deleted
      const post = await this.prismaService.blogPost.findFirst({
        where: withoutDeleted({ id: dto.postId }),
        select: { id: true, status: true },
      });

      if (!post) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_POST_NOT_FOUND],
          ERROR_CODES.BLOG_POST_NOT_FOUND,
        );
      }

      // Only allow comments on published posts
      if (post.status !== 'PUBLISHED') {
        throw new BusinessException(
          'Không thể bình luận trên bài viết chưa được xuất bản',
          ERROR_CODES.BLOG_POST_NOT_PUBLISHED,
        );
      }

      // If parentId is provided, check if parent comment exists
      if (dto.parentId) {
        const parentComment = await this.prismaService.blogComment.findFirst({
          where: withoutDeleted({ id: dto.parentId, postId: dto.postId }),
          select: { id: true },
        });

        if (!parentComment) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.COMMENT_NOT_FOUND],
            ERROR_CODES.COMMENT_NOT_FOUND,
          );
        }
      }

      const comment = await this.prismaService.blogComment.create({
        data: {
          postId: dto.postId,
          userId,
          content: dto.content,
          parentId: dto.parentId,
        },
        select: blogCommentSelect,
      });

      const result = toResponseDto(BlogCommentResponseDto, comment);

      return {
        type: 'response',
        message: 'Tạo bình luận thành công',
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

  async updateComment(
    userId: string,
    commentId: string,
    dto: UpdateBlogCommentDto,
  ): Promise<IBeforeTransformResponseType<BlogCommentResponseDto>> {
    try {
      const existingComment = await this.prismaService.blogComment.findFirst({
        where: withoutDeleted({ id: commentId }),
        select: { id: true, userId: true },
      });

      if (!existingComment) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.COMMENT_NOT_FOUND],
          ERROR_CODES.COMMENT_NOT_FOUND,
        );
      }

      if (existingComment.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.COMMENT_NOT_OWNED],
          ERROR_CODES.COMMENT_NOT_OWNED,
        );
      }

      const updated = await this.prismaService.blogComment.update({
        where: { id: commentId },
        data: {
          content: dto.content,
        },
        select: blogCommentSelect,
      });

      const result = toResponseDto(BlogCommentResponseDto, updated);

      return {
        type: 'response',
        message: 'Cập nhật bình luận thành công',
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

  async deleteComment(
    userId: string,
    commentId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const existingComment = await this.prismaService.blogComment.findFirst({
        where: withoutDeleted({ id: commentId }),
        select: { id: true, userId: true },
      });

      if (!existingComment) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.COMMENT_NOT_FOUND],
          ERROR_CODES.COMMENT_NOT_FOUND,
        );
      }

      if (existingComment.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.COMMENT_NOT_OWNED],
          ERROR_CODES.COMMENT_NOT_OWNED,
        );
      }

      // Soft delete
      await this.prismaService.blogComment.update({
        where: { id: commentId },
        data: softDeleteData(),
      });

      return {
        type: 'response',
        message: 'Xóa bình luận thành công',
        data: { message: 'Xóa bình luận thành công' },
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

  // Admin method to delete any comment
  async adminDeleteComment(
    commentId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const existingComment = await this.prismaService.blogComment.findFirst({
        where: withoutDeleted({ id: commentId }),
        select: { id: true },
      });

      if (!existingComment) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.COMMENT_NOT_FOUND],
          ERROR_CODES.COMMENT_NOT_FOUND,
        );
      }

      // Soft delete
      await this.prismaService.blogComment.update({
        where: { id: commentId },
        data: softDeleteData(),
      });

      return {
        type: 'response',
        message: 'Xóa bình luận thành công',
        data: { message: 'Xóa bình luận thành công' },
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
