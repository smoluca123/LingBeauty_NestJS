import {
  Controller,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { BlogCommentService } from './blog-comment.service';
import { UpdateBlogCommentDto, BlogCommentResponseDto } from './dto';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import {
  ApiAdminUpdateComment,
  ApiAdminDeleteComment,
} from './decorators/blog-comment.decorators';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';

@ApiTags('Blog Comment Admin')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Roles([RolesLevel.MANAGER])
@Controller('admin/blog-comment')
export class BlogCommentAdminController {
  constructor(private readonly commentService: BlogCommentService) {}

  @Patch(':id')
  @ApiAdminUpdateComment()
  adminUpdateComment(
    @Param('id') id: string,
    @Body() dto: UpdateBlogCommentDto,
  ): Promise<IBeforeTransformResponseType<BlogCommentResponseDto>> {
    return this.commentService.adminUpdateComment(id, dto);
  }

  @Delete(':id')
  @ApiAdminDeleteComment()
  adminDeleteComment(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.commentService.adminDeleteComment(id);
  }
}
