import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { GetBlogPostsQueryDto } from './dto/get-blog-posts-query.dto';
import { BlogPostResponseDto } from './dto/blog-post-response.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  ApiGetAllPosts,
  ApiCreatePost,
  ApiGetPostById,
  ApiUpdatePost,
  ApiDeletePost,
  ApiUploadFeaturedImage,
} from './decorators/blog-post.decorators';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';

@ApiTags('Blog Post Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('blog-post')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Get()
  @ApiGetAllPosts()
  getAllPosts(
    @Query() query: GetBlogPostsQueryDto,
  ): Promise<IBeforeTransformPaginationResponseType<BlogPostResponseDto>> {
    return this.blogPostService.getAllPosts(query, true);
  }

  @Post()
  @ApiCreatePost()
  createPost(
    @Body() createPostDto: CreateBlogPostDto,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    return this.blogPostService.createPost(
      createPostDto,
      decodedAccessToken.userId,
    );
  }

  @Get(':id')
  @ApiGetPostById()
  getPostById(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    return this.blogPostService.getPostById(id);
  }

  @Patch(':id')
  @ApiUpdatePost()
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdateBlogPostDto,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    return this.blogPostService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @ApiDeletePost()
  deletePost(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    return this.blogPostService.deletePost(id);
  }

  @Post(':id/upload/featured-image')
  @ApiUploadFeaturedImage()
  uploadFeaturedImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<BlogPostResponseDto>> {
    return this.blogPostService.uploadFeaturedImage(
      id,
      file,
      decodedAccessToken.userId,
    );
  }
}
