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
import { BlogCommentService } from './blog-comment.service';
import {
  CreateBlogCommentDto,
  UpdateBlogCommentDto,
  BlogCommentResponseDto,
} from './dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import {
  ApiGetPostComments,
  ApiGetCommentById,
  ApiCreateComment,
  ApiUpdateComment,
  ApiDeleteComment,
} from './decorators/blog-comment.decorators';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';

@ApiTags('Blog Comments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('blog-comment')
export class BlogCommentController {
  constructor(private readonly commentService: BlogCommentService) {}

  @Get()
  @ApiGetPostComments()
  getPostComments(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('postId') postId?: string,
    @Query('userId') userId?: string,
    @Query('parentId') parentId?: string,
  ): Promise<IBeforeTransformPaginationResponseType<BlogCommentResponseDto>> {
    return this.commentService.getPostComments({
      page,
      limit,
      postId,
      userId,
      parentId: parentId === 'null' ? null : parentId,
    });
  }

  @Get(':id')
  @ApiGetCommentById()
  getCommentById(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<BlogCommentResponseDto>> {
    return this.commentService.getCommentById(id);
  }

  @Post()
  @ApiCreateComment()
  createComment(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
    @Body() dto: CreateBlogCommentDto,
  ): Promise<IBeforeTransformResponseType<BlogCommentResponseDto>> {
    return this.commentService.createComment(decodedToken.userId, dto);
  }

  @Patch(':id')
  @ApiUpdateComment()
  updateComment(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
    @Param('id') id: string,
    @Body() dto: UpdateBlogCommentDto,
  ): Promise<IBeforeTransformResponseType<BlogCommentResponseDto>> {
    return this.commentService.updateComment(decodedToken.userId, id, dto);
  }

  @Delete(':id')
  @ApiDeleteComment()
  deleteComment(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.commentService.deleteComment(decodedToken.userId, id);
  }
}
