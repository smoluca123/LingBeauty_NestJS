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
import { BlogTopicService } from './blog-topic.service';
import { CreateBlogTopicDto } from './dto/create-blog-topic.dto';
import { UpdateBlogTopicDto } from './dto/update-blog-topic.dto';
import { GetBlogTopicsQueryDto } from './dto/get-blog-topics-query.dto';
import { BlogTopicResponseDto } from './dto/blog-topic-response.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  ApiGetAllTopics,
  ApiCreateTopic,
  ApiCreateSubTopic,
  ApiGetTopicById,
  ApiUpdateTopic,
  ApiDeleteTopic,
  ApiUploadTopicImage,
} from './decorators/blog-topic.decorators';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';

@ApiTags('Blog Topic Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('blog-topic')
export class BlogTopicController {
  constructor(private readonly blogTopicService: BlogTopicService) {}

  @Get()
  @ApiGetAllTopics()
  getAllTopics(
    @Query() query: GetBlogTopicsQueryDto,
  ): Promise<IBeforeTransformPaginationResponseType<BlogTopicResponseDto>> {
    return this.blogTopicService.getAllTopics(query);
  }

  @Post()
  @ApiCreateTopic()
  createTopic(
    @Body() createTopicDto: CreateBlogTopicDto,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    return this.blogTopicService.createTopic(
      createTopicDto,
      decodedAccessToken.userId,
    );
  }

  @Post(':parentId/sub-topic')
  @ApiCreateSubTopic()
  createSubTopic(
    @Param('parentId') parentId: string,
    @Body() createTopicDto: CreateBlogTopicDto,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    return this.blogTopicService.createSubTopic(
      parentId,
      createTopicDto,
      decodedAccessToken.userId,
    );
  }

  @Get(':id')
  @ApiGetTopicById()
  getTopicById(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    return this.blogTopicService.getTopicById(id);
  }

  @Patch(':id')
  @ApiUpdateTopic()
  updateTopic(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateBlogTopicDto,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    return this.blogTopicService.updateTopic(
      id,
      updateTopicDto,
      decodedAccessToken.userId,
    );
  }

  @Delete(':id')
  @ApiDeleteTopic()
  deleteTopic(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    return this.blogTopicService.deleteTopic(id);
  }

  @Post(':id/upload/image')
  @ApiUploadTopicImage()
  uploadTopicImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<BlogTopicResponseDto>> {
    return this.blogTopicService.uploadTopicImage(
      id,
      file,
      decodedAccessToken.userId,
    );
  }
}
