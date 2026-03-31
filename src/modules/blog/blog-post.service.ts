import { Injectable } from '@nestjs/common';
import { BlogPostStatus, MediaType } from 'prisma/generated/prisma/client';
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
import { blogPostSelect } from './blog.select';
import { BlogPostResponseDto } from './dto/blog-post-response.dto';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { GetBlogPostsQueryDto } from './dto/get-blog-posts-query.dto';
import { ensureUniqueSlug } from './helpers/slug.helper';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly storageService: StorageService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * Normalize tags: trim, lowercase, remove duplicates
   */
  private normalizeTags(tags: string[]): string[] {
    return tags
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0)
      .filter((tag, index, self) => self.indexOf(tag) === index);
  }

  /**
   * Generate SEO metadata defaults
   */
  private generateSeoMetadata(post: {
    title: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
  }) {
    return {
      metaTitle: post.metaTitle || post.title,
      metaDescription:
        post.metaDescription ||
        post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    };
  }

  /**
   * Create a new blog post
   */
  async createPost(
    createPostDto: CreateBlogPostDto,
    authorId: string,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    try {
      // Validate topic if provided
      if (createPostDto.topicId) {
        const topic = await this.prismaService.blogTopic.findFirst({
          where: withoutDeleted({ id: createPostDto.topicId }),
        });

        if (!topic) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.BLOG_TOPIC_NOT_FOUND],
            ERROR_CODES.BLOG_TOPIC_NOT_FOUND,
          );
        }
      }

      // Handle featured image upload if provided
      let featuredImageId: string | undefined;
      if (createPostDto.featuredImage) {
        const uploadedMedia = await this.storageService.uploadFile(
          {
            file: createPostDto.featuredImage,
            type: MediaType.BLOG_POST_IMAGE,
            userId: authorId,
          },
          {
            getDirectUrl: true,
          },
        );
        featuredImageId = uploadedMedia.id;
      }

      // Generate unique slug
      const slug = await ensureUniqueSlug(
        this.prismaService,
        createPostDto.title,
        'post',
      );

      // Process data object to handle undefined/null values
      const data: any = await processDataObject(createPostDto, {
        excludeKeys: ['featuredImage'],
      });

      // Normalize tags if provided
      if (data.tags && Array.isArray(data.tags)) {
        data.tags = this.normalizeTags(data.tags);
      }

      // Generate SEO metadata
      const seoMetadata = this.generateSeoMetadata({
        title: data.title,
        content: data.content,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      });

      // Set publishedAt if status is PUBLISHED
      const publishedAt =
        data.status === BlogPostStatus.PUBLISHED ? new Date() : undefined;

      // Create post
      const post = await this.prismaService.blogPost.create({
        data: {
          ...data,
          slug,
          authorId,
          featuredImageId,
          metaTitle: seoMetadata.metaTitle,
          metaDescription: seoMetadata.metaDescription,
          publishedAt,
          status: data.status || BlogPostStatus.DRAFT,
        },
        select: blogPostSelect,
      });

      const postResponse = toResponseDto(BlogPostResponseDto, post);

      return {
        type: 'response',
        message: 'Tạo bài viết blog thành công',
        data: postResponse,
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
   * Get all blog posts with pagination, filtering, and sorting
   */
  async getAllPosts(
    query: GetBlogPostsQueryDto,
    includeUnpublished = false,
  ): Promise<IBeforeTransformPaginationResponseType<BlogPostResponseDto>> {
    try {
      const { page: normalizedPage, limit: normalizedLimit } =
        normalizePaginationParams({
          page: query.page,
          limit: query.limit,
        });

      // Build where clause with filters
      const where: any = {
        ...withoutDeleted(),
        ...(includeUnpublished ? {} : { status: BlogPostStatus.PUBLISHED }),
        ...(query.topicId && { topicId: query.topicId }),
        ...(query.authorId && { authorId: query.authorId }),
        ...(query.status && { status: query.status }),
        ...(query.tag && { tags: { has: query.tag } }),
        ...(query.search && {
          OR: [
            { title: { contains: query.search, mode: 'insensitive' } },
            { content: { contains: query.search, mode: 'insensitive' } },
            { tags: { has: query.search } },
          ],
        }),
      };

      // Determine sorting
      const sortBy = query.sortBy || 'createdAt';
      const order = query.order || 'desc';

      // Execute queries in parallel
      const [posts, total] = await Promise.all([
        this.prismaService.blogPost.findMany({
          where,
          skip: (normalizedPage - 1) * normalizedLimit,
          take: normalizedLimit,
          orderBy: { [sortBy]: order },
          select: blogPostSelect,
        }),
        this.prismaService.blogPost.count({ where }),
      ]);

      const postsResponse = posts.map((post) =>
        toResponseDto(BlogPostResponseDto, post),
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách bài viết blog thành công',
        data: {
          items: postsResponse,
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
   * Get a blog post by ID
   */
  async getPostById(
    id: string,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    try {
      const post = await this.prismaService.blogPost.findFirst({
        where: withoutDeleted({ id }),
        select: blogPostSelect,
      });

      if (!post) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_POST_NOT_FOUND],
          ERROR_CODES.BLOG_POST_NOT_FOUND,
        );
      }

      const postResponse = toResponseDto(BlogPostResponseDto, post);

      return {
        type: 'response',
        message: 'Lấy thông tin bài viết blog thành công',
        data: postResponse,
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
   * Update a blog post
   */
  async updatePost(
    id: string,
    updatePostDto: UpdateBlogPostDto,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    try {
      // Check if post exists
      const existing = await this.prismaService.blogPost.findFirst({
        where: withoutDeleted({ id }),
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_POST_NOT_FOUND],
          ERROR_CODES.BLOG_POST_NOT_FOUND,
        );
      }

      // Validate topic if provided
      if (updatePostDto.topicId) {
        const topic = await this.prismaService.blogTopic.findFirst({
          where: withoutDeleted({ id: updatePostDto.topicId }),
        });

        if (!topic) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.BLOG_TOPIC_NOT_FOUND],
            ERROR_CODES.BLOG_TOPIC_NOT_FOUND,
          );
        }
      }

      // Process data object
      const data: any = await processDataObject(updatePostDto, {
        excludeKeys: ['featuredImage'],
      });

      // Generate new slug if title changed
      if (data.title && data.title !== existing.title) {
        data.slug = await ensureUniqueSlug(
          this.prismaService,
          data.title,
          'post',
          id,
        );
      }

      // Normalize tags if provided
      if (data.tags && Array.isArray(data.tags)) {
        data.tags = this.normalizeTags(data.tags);
      }

      // Generate SEO metadata if title or content changed
      if (
        data.title ||
        data.content ||
        data.metaTitle ||
        data.metaDescription
      ) {
        const seoMetadata = this.generateSeoMetadata({
          title: data.title || existing.title,
          content: data.content || existing.content,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
        });

        if (!data.metaTitle) {
          data.metaTitle = seoMetadata.metaTitle;
        }
        if (!data.metaDescription) {
          data.metaDescription = seoMetadata.metaDescription;
        }
      }

      // Handle featured image upload if provided
      if (updatePostDto.featuredImage) {
        const uploadedMedia = await this.storageService.uploadFile(
          {
            file: updatePostDto.featuredImage,
            type: MediaType.BLOG_POST_IMAGE,
            userId: existing.authorId,
          },
          {
            getDirectUrl: true,
          },
        );
        data.featuredImageId = uploadedMedia.id;
      }

      // Set publishedAt if status changed to PUBLISHED
      if (
        data.status === BlogPostStatus.PUBLISHED &&
        existing.status !== BlogPostStatus.PUBLISHED
      ) {
        data.publishedAt = new Date();
      }

      // Update post
      const updated = await this.prismaService.blogPost.update({
        where: { id },
        data,
        select: blogPostSelect,
      });

      const postResponse = toResponseDto(BlogPostResponseDto, updated);

      return {
        type: 'response',
        message: 'Cập nhật bài viết blog thành công',
        data: postResponse,
      };
    } catch (error) {
      console.log(error);
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
   * Soft delete a blog post
   */
  async deletePost(
    id: string,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    try {
      // Check if post exists
      const existing = await this.prismaService.blogPost.findFirst({
        where: withoutDeleted({ id }),
        select: blogPostSelect,
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_POST_NOT_FOUND],
          ERROR_CODES.BLOG_POST_NOT_FOUND,
        );
      }

      // Soft delete the post
      await this.prismaService.blogPost.update({
        where: { id },
        data: softDeleteData(),
      });

      const postResponse = toResponseDto(BlogPostResponseDto, existing);

      return {
        type: 'response',
        message: 'Xóa bài viết blog thành công',
        data: postResponse,
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
   * Get a blog post by slug (public route)
   */
  async getPostBySlug(
    slug: string,
    incrementView = false,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    try {
      const post = await this.prismaService.blogPost.findFirst({
        where: withoutDeleted({
          slug,
          status: BlogPostStatus.PUBLISHED,
        }),
        select: blogPostSelect,
      });

      if (!post) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_POST_NOT_FOUND],
          ERROR_CODES.BLOG_POST_NOT_FOUND,
        );
      }

      // Increment view count if requested
      if (incrementView) {
        await this.incrementViewCount(post.id);
      }

      const postResponse = toResponseDto(BlogPostResponseDto, post);

      return {
        type: 'response',
        message: 'Lấy thông tin bài viết blog thành công',
        data: postResponse,
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
   * Increment view count for a blog post
   */
  async incrementViewCount(postId: string): Promise<void> {
    try {
      await this.prismaService.blogPost.update({
        where: { id: postId },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      // Silently fail - view count is not critical
      console.error('Failed to increment view count:', error);
    }
  }

  /**
   * Upload featured image for a blog post
   */
  async uploadFeaturedImage(
    postId: string,
    file: Express.Multer.File,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    try {
      // Check if post exists
      const existing = await this.prismaService.blogPost.findFirst({
        where: withoutDeleted({ id: postId }),
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BLOG_POST_NOT_FOUND],
          ERROR_CODES.BLOG_POST_NOT_FOUND,
        );
      }

      // Validate image format
      const validFormats = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
      ];
      if (!validFormats.includes(file.mimetype)) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVALID_IMAGE_FORMAT],
          ERROR_CODES.INVALID_IMAGE_FORMAT,
        );
      }

      // Upload image
      const uploadedMedia = await this.storageService.uploadFile(
        {
          file,
          type: MediaType.BLOG_POST_IMAGE,
        },
        {
          getDirectUrl: true,
        },
      );

      // Update post with new featured image
      const updated = await this.prismaService.blogPost.update({
        where: { id: postId },
        data: {
          featuredImageId: uploadedMedia.id,
        },
        select: blogPostSelect,
      });

      const postResponse = toResponseDto(BlogPostResponseDto, updated);

      return {
        type: 'response',
        message: 'Tải ảnh đại diện bài viết thành công',
        data: postResponse,
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
