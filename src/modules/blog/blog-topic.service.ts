import { Injectable } from '@nestjs/common';
import { MediaType } from 'prisma/generated/prisma/client';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import {
  withoutDeleted,
  softDeleteData,
} from 'src/libs/prisma/soft-delete.helpers';
import {
  IBeforeTransformResponseType,
  IBeforeTransformPaginationResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { toResponseDto } from 'src/libs/utils/transform.utils';
import {
  normalizePaginationParams,
  processDataObject,
} from 'src/libs/utils/utils';
import { StorageService } from 'src/modules/storage/storage.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { blogTopicSelect } from './blog.select';
import { BlogTopicResponseDto } from './dto/blog-topic-response.dto';
import { CreateBlogTopicDto } from './dto/create-blog-topic.dto';
import { UpdateBlogTopicDto } from './dto/update-blog-topic.dto';
import { GetBlogTopicsQueryDto } from './dto/get-blog-topics-query.dto';
import { ensureUniqueSlug } from './helpers/slug.helper';

@Injectable()
export class BlogTopicService {
  constructor(
    private readonly storageService: StorageService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * Create a new blog topic
   */
  async createTopic(
    createTopicDto: CreateBlogTopicDto,
    userId?: string,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    try {
      // Validate parent topic if provided
      if (createTopicDto.parentId) {
        const parent = await this.prismaService.blogTopic.findFirst({
          where: withoutDeleted({ id: createTopicDto.parentId }),
        });

        if (!parent) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.PARENT_TOPIC_NOT_FOUND],
            ERROR_CODES.PARENT_TOPIC_NOT_FOUND,
          );
        }
      }

      // Handle image upload if provided
      let imageMediaId: string | undefined;
      if (createTopicDto.image) {
        const uploadedMedia = await this.storageService.uploadFile(
          {
            file: createTopicDto.image,
            type: MediaType.BLOG_TOPIC_IMAGE,
            userId,
          },
          {
            getDirectUrl: true,
          },
        );
        imageMediaId = uploadedMedia.id;
      }

      // Generate unique slug
      const slug = await ensureUniqueSlug(
        this.prismaService,
        createTopicDto.name,
        'topic',
      );

      // Process data object to handle undefined/null values
      const data: any = await processDataObject(createTopicDto, {
        excludeKeys: ['image'],
      });

      // Create topic
      const topic = await this.prismaService.blogTopic.create({
        data: {
          ...data,
          slug,
          imageMediaId,
        },
        select: blogTopicSelect,
      });

      const topicResponse = toResponseDto(BlogTopicResponseDto, topic);

      return {
        type: 'response',
        message: 'Tạo chủ đề blog thành công',
        data: topicResponse,
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

  /**
   * Create a sub-topic under a parent topic
   */
  async createSubTopic(
    parentId: string,
    createTopicDto: CreateBlogTopicDto,
    userId?: string,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    try {
      // Validate parent topic exists
      const parent = await this.prismaService.blogTopic.findFirst({
        where: withoutDeleted({ id: parentId }),
      });

      if (!parent) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PARENT_TOPIC_NOT_FOUND],
          ERROR_CODES.PARENT_TOPIC_NOT_FOUND,
        );
      }

      // Create the sub-topic with parentId set
      const subTopicDto = {
        ...createTopicDto,
        parentId,
      };

      return await this.createTopic(subTopicDto, userId);
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

  /**
   * Get all blog topics with pagination and filtering
   */
  async getAllTopics(
    query: GetBlogTopicsQueryDto,
  ): Promise<IBeforeTransformPaginationResponseType<BlogTopicResponseDto>> {
    try {
      const { page: normalizedPage, limit: normalizedLimit } =
        normalizePaginationParams({
          page: query.page,
          limit: query.limit,
        });

      // Build where clause
      const where: any = {
        ...withoutDeleted(),
        ...(query.isActive !== undefined && { isActive: query.isActive }),
        ...(query.search && {
          OR: [
            { name: { contains: query.search, mode: 'insensitive' } },
            { description: { contains: query.search, mode: 'insensitive' } },
          ],
        }),
      };

      // Execute queries in parallel
      const [topics, total] = await Promise.all([
        this.prismaService.blogTopic.findMany({
          where,
          skip: (normalizedPage - 1) * normalizedLimit,
          take: normalizedLimit,
          orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
          select: blogTopicSelect,
        }),
        this.prismaService.blogTopic.count({ where }),
      ]);

      const topicsResponse = topics.map((topic) =>
        toResponseDto(BlogTopicResponseDto, topic),
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách chủ đề blog thành công',
        data: {
          items: topicsResponse,
          totalCount: total,
          currentPage: normalizedPage,
          pageSize: normalizedLimit,
        },
      };
    } catch (error) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Get a blog topic by ID
   */
  async getTopicById(
    id: string,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    try {
      const topic = await this.prismaService.blogTopic.findFirst({
        where: withoutDeleted({ id }),
        select: blogTopicSelect,
      });

      if (!topic) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_TOPIC_NOT_FOUND],
          ERROR_CODES.BLOG_TOPIC_NOT_FOUND,
        );
      }

      const topicResponse = toResponseDto(BlogTopicResponseDto, topic);

      return {
        type: 'response',
        message: 'Lấy thông tin chủ đề blog thành công',
        data: topicResponse,
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

  /**
   * Update a blog topic
   */
  async updateTopic(
    id: string,
    updateTopicDto: UpdateBlogTopicDto,
    userId?: string,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    try {
      // Check if topic exists
      const existing = await this.prismaService.blogTopic.findFirst({
        where: withoutDeleted({ id }),
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_TOPIC_NOT_FOUND],
          ERROR_CODES.BLOG_TOPIC_NOT_FOUND,
        );
      }

      // Validate parent topic if provided
      if (updateTopicDto.parentId) {
        // Check if trying to set self as parent
        if (updateTopicDto.parentId === id) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.TOPIC_CANNOT_BE_OWN_PARENT],
            ERROR_CODES.TOPIC_CANNOT_BE_OWN_PARENT,
          );
        }

        const parent = await this.prismaService.blogTopic.findFirst({
          where: withoutDeleted({ id: updateTopicDto.parentId }),
        });

        if (!parent) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.PARENT_TOPIC_NOT_FOUND],
            ERROR_CODES.PARENT_TOPIC_NOT_FOUND,
          );
        }
      }

      // Process data object
      const data: any = await processDataObject(updateTopicDto, {
        excludeKeys: ['image'],
      });

      // Generate new slug if name changed
      if (data.name && data.name !== existing.name) {
        data.slug = await ensureUniqueSlug(
          this.prismaService,
          data.name,
          'topic',
          id,
        );
      }

      // Handle image upload if provided
      if (updateTopicDto.image) {
        const uploadedMedia = await this.storageService.uploadFile(
          {
            file: updateTopicDto.image,
            type: MediaType.BLOG_TOPIC_IMAGE,
            userId,
          },
          {
            getDirectUrl: true,
          },
        );
        data.imageMediaId = uploadedMedia.id;
      }

      // Update topic
      const updated = await this.prismaService.blogTopic.update({
        where: { id },
        data,
        select: blogTopicSelect,
      });

      const topicResponse = toResponseDto(BlogTopicResponseDto, updated);

      return {
        type: 'response',
        message: 'Cập nhật chủ đề blog thành công',
        data: topicResponse,
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

  /**
   * Soft delete a blog topic
   */
  async deleteTopic(
    id: string,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    try {
      // Check if topic exists
      const existing = await this.prismaService.blogTopic.findFirst({
        where: withoutDeleted({ id }),
        select: blogTopicSelect,
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_TOPIC_NOT_FOUND],
          ERROR_CODES.BLOG_TOPIC_NOT_FOUND,
        );
      }

      // Check if topic has children
      const childrenCount = await this.prismaService.blogTopic.count({
        where: withoutDeleted({ parentId: id }),
      });

      if (childrenCount > 0) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.DELETE_TOPIC_HAS_CHILDREN],
          ERROR_CODES.DELETE_TOPIC_HAS_CHILDREN,
        );
      }

      // Soft delete the topic
      await this.prismaService.blogTopic.update({
        where: { id },
        data: softDeleteData(),
      });

      const topicResponse = toResponseDto(BlogTopicResponseDto, existing);

      return {
        type: 'response',
        message: 'Xóa chủ đề blog thành công',
        data: topicResponse,
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

  /**
   * Get a blog topic by slug (public method)
   * Filters only active and non-deleted topics
   * Optionally includes post count
   */
  async getTopicBySlug(
    slug: string,
    includePostCount = false,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    try {
      // Query only active and non-deleted topics for public routes
      const topic = await this.prismaService.blogTopic.findFirst({
        where: {
          ...withoutDeleted(),
          slug,
          isActive: true,
        },
        select: blogTopicSelect,
      });

      if (!topic) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_TOPIC_NOT_FOUND],
          ERROR_CODES.BLOG_TOPIC_NOT_FOUND,
        );
      }

      const topicResponse = toResponseDto(BlogTopicResponseDto, topic);

      // Include post count if requested
      if (includePostCount) {
        const postCount = await this.prismaService.blogPost.count({
          where: {
            ...withoutDeleted(),
            topicId: topic.id,
            status: 'PUBLISHED',
          },
        });
        topicResponse.postCount = postCount;
      }

      return {
        type: 'response',
        message: 'Lấy thông tin chủ đề blog thành công',
        data: topicResponse,
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

  /**
   * Upload image for a blog topic
   * Validates image format (JPEG, PNG, WebP, GIF)
   * Links uploaded media to topic via imageMediaId
   */
  async uploadTopicImage(
    topicId: string,
    file: Express.Multer.File,
    userId?: string,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    try {
      // Check if topic exists
      const existing = await this.prismaService.blogTopic.findFirst({
        where: withoutDeleted({ id: topicId }),
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_TOPIC_NOT_FOUND],
          ERROR_CODES.BLOG_TOPIC_NOT_FOUND,
        );
      }

      // Validate image format (JPEG, PNG, WebP, GIF)
      const allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif',
      ];

      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVALID_IMAGE_FORMAT],
          ERROR_CODES.INVALID_IMAGE_FORMAT,
        );
      }

      // Upload image using StorageService
      const uploadedMedia = await this.storageService.uploadFile(
        {
          file,
          type: MediaType.BLOG_TOPIC_IMAGE,
          userId,
        },
        {
          getDirectUrl: true,
        },
      );

      // Link uploaded media to topic via imageMediaId
      const updated = await this.prismaService.blogTopic.update({
        where: { id: topicId },
        data: { imageMediaId: uploadedMedia.id },
        select: blogTopicSelect,
      });

      const topicResponse = toResponseDto(BlogTopicResponseDto, updated);

      return {
        type: 'response',
        message: 'Tải lên hình ảnh chủ đề blog thành công',
        data: topicResponse,
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
