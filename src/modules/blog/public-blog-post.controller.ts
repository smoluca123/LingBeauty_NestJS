import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogPostService } from './blog-post.service';
import { GetBlogPostsQueryDto } from './dto/get-blog-posts-query.dto';
import { BlogPostResponseDto } from './dto/blog-post-response.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  ApiGetAllPublicPosts,
  ApiGetPostBySlug,
} from './decorators/blog-post.decorators';

@ApiTags('Public Blog Posts')
@Controller('public/blog-post')
export class PublicBlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Get()
  @ApiGetAllPublicPosts()
  getAllPublicPosts(
    @Query() query: GetBlogPostsQueryDto,
  ): Promise<IBeforeTransformPaginationResponseType<BlogPostResponseDto>> {
    return this.blogPostService.getAllPosts(query, false);
  }

  @Get('slug/:slug')
  @ApiGetPostBySlug()
  getPostBySlug(
    @Param('slug') slug: string,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    return this.blogPostService.getPostBySlug(slug, true);
  }
}
