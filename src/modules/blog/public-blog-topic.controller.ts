import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogTopicService } from './blog-topic.service';
import { GetBlogTopicsQueryDto } from './dto/get-blog-topics-query.dto';
import { BlogTopicResponseDto } from './dto/blog-topic-response.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  ApiGetAllPublicTopics,
  ApiGetTopicBySlug,
} from './decorators/blog-topic.decorators';

@ApiTags('Public Blog Topics')
@Controller('public/blog-topic')
export class PublicBlogTopicController {
  constructor(private readonly blogTopicService: BlogTopicService) {}

  @Get()
  @ApiGetAllPublicTopics()
  getAllPublicTopics(
    @Query() query: GetBlogTopicsQueryDto,
  ): Promise<IBeforeTransformPaginationResponseType<BlogTopicResponseDto>> {
    return this.blogTopicService.getAllTopics(query);
  }

  @Get('slug/:slug')
  @ApiGetTopicBySlug()
  getTopicBySlug(
    @Param('slug') slug: string,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    return this.blogTopicService.getTopicBySlug(slug, true);
  }
}
